import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Character } from "@/data/cases";
import { getCaseById as getCase } from "@/data/allCases";
import { useGame, Player } from "@/context/GameContext";
import {
  ArrowRight, Eye, ChevronDown, ChevronUp,
  Shield, Skull, Timer, Vote, CheckCircle, XCircle, Users
} from "lucide-react";

type Phase =
  | "case_intro"
  | "discuss"
  | "vote"
  | "tie_defense"
  | "round_result"
  | "game_over";

interface EliminatedRecord {
  player: Player;
  round: number;
  wasMafioso: boolean;
}

interface VoteRecord {
  voterId: string;
  accusedId: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function GamePlay() {
  const { caseId } = useParams<{ caseId: string }>();
  const [, setLocation] = useLocation();
  const { gameState } = useGame();
  const caseData = getCase(caseId!);

  // Game state
  const [phase, setPhase] = useState<Phase>("case_intro");
  const [currentRound, setCurrentRound] = useState(1);
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [eliminated, setEliminated] = useState<EliminatedRecord[]>([]);
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [tiedPlayers, setTiedPlayers] = useState<Player[]>([]);
  const [roundResult, setRoundResult] = useState<EliminatedRecord | null>(null);
  const [gameWinner, setGameWinner] = useState<"innocents" | "mafioso" | null>(null);
  const [showTrueStory, setShowTrueStory] = useState(false);
  const [expandedChar, setExpandedChar] = useState<string | null>(null);
  const [timerDefensePlayer, setTimerDefensePlayer] = useState(0); // index in tiedPlayers
  const [defensePhase, setDefensePhase] = useState<"first" | "second" | "revote">("first");

  // Timer
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRunning(false);
  }, []);

  const startTimer = useCallback((seconds: number, onEnd?: () => void) => {
    stopTimer();
    setTimeLeft(seconds);
    setTimerRunning(true);
    let remaining = seconds;
    timerRef.current = setInterval(() => {
      remaining--;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setTimerRunning(false);
        onEnd?.();
      }
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Initialize active players
  useEffect(() => {
    if (gameState.players.length > 0 && activePlayers.length === 0) {
      setActivePlayers([...gameState.players]);
    }
  }, [gameState.players]);

  if (!caseData || gameState.players.length === 0) {
    setLocation("/cases");
    return null;
  }

  const roundDurationSeconds = gameState.roundDuration * 60;
  const mafiosoPlayer = gameState.players.find(p => p.isMafioso);
  const mafiosoChar = caseData.characters.find(c => c.id === mafiosoPlayer?.characterId);

  // Voters for current round
  // Round 1 & 2: active players vote
  // Round 3: the 2 eliminated innocents vote
  const currentVoters: Player[] =
    currentRound === 3
      ? eliminated.filter(e => !e.wasMafioso).map(e => e.player).slice(0, 2)
      : activePlayers;

  // Candidates to vote on
  const voteTargets: Player[] =
    currentRound === 3
      ? activePlayers
      : activePlayers;

  // Count votes
  function tallyVotes(voteList: VoteRecord[]): Map<string, number> {
    const tally = new Map<string, number>();
    for (const v of voteList) {
      tally.set(v.accusedId, (tally.get(v.accusedId) || 0) + 1);
    }
    return tally;
  }

  function getTopVoted(tally: Map<string, number>): { maxCount: number; topPlayers: Player[] } {
    const maxCount = Math.max(...tally.values(), 0);
    const topIds = [...tally.entries()]
      .filter(([, count]) => count === maxCount)
      .map(([id]) => id);
    const topPlayers = voteTargets.filter(p => topIds.includes(p.id));
    return { maxCount, topPlayers };
  }

  function handleVoteSubmit(currentVotes: VoteRecord[]) {
    const tally = tallyVotes(currentVotes);
    const { topPlayers } = getTopVoted(tally);
    stopTimer();

    if (topPlayers.length > 1) {
      // Tie
      setTiedPlayers(topPlayers);
      setDefensePhase("first");
      setTimerDefensePlayer(0);
      setVotes([]);
      startTimer(60, () => {
        setTimerDefensePlayer(1);
        setDefensePhase("second");
        startTimer(60, () => {
          setDefensePhase("revote");
          setVotes([]);
        });
      });
      setPhase("tie_defense");
    } else {
      // One eliminated
      const eliminated_player = topPlayers[0];
      finalizeElimination(eliminated_player, currentVotes);
    }
  }

  function finalizeElimination(player: Player, currentVotes: VoteRecord[]) {
    const record: EliminatedRecord = {
      player,
      round: currentRound,
      wasMafioso: player.isMafioso,
    };
    const newEliminated = [...eliminated, record];
    setEliminated(newEliminated);
    setRoundResult(record);
    setActivePlayers(prev => prev.filter(p => p.id !== player.id));
    setVotes([]);

    if (player.isMafioso) {
      setGameWinner("innocents");
      setPhase("round_result");
    } else if (currentRound === 3) {
      setGameWinner("mafioso");
      setPhase("round_result");
    } else {
      setPhase("round_result");
    }
  }

  function handleNextRound() {
    const nextRound = currentRound + 1;
    setCurrentRound(nextRound);
    setRoundResult(null);
    setVotes([]);
    setTiedPlayers([]);
    startTimer(roundDurationSeconds, () => setPhase("vote"));
    setPhase("discuss");
  }

  function handleStartDiscuss() {
    startTimer(roundDurationSeconds, () => setPhase("vote"));
    setPhase("discuss");
  }

  function castVote(voterId: string, accusedId: string) {
    const newVotes = votes.filter(v => v.voterId !== voterId);
    newVotes.push({ voterId, accusedId });
    setVotes(newVotes);
  }

  const allVotesCast = votes.length === currentVoters.length && currentVoters.length > 0;
  const tally = tallyVotes(votes);

  // ─── PHASE: CASE INTRO ───────────────────────────────────────
  if (phase === "case_intro") {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => setLocation("/cases")} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-white flex-1 truncate" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {caseData.title}
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Cover */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl overflow-hidden h-44">
            <img src={caseData.coverImage} alt={caseData.title} className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 left-4">
              <span className="text-xs text-red-300 bg-red-950/70 px-2 py-1 rounded-lg border border-red-900/40">{caseData.category}</span>
              <h2 className="text-xl font-black text-white mt-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{caseData.title}</h2>
            </div>
          </motion.div>

          {/* Crime */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="text-sm font-bold text-red-400 mb-3" style={{ fontFamily: "'Cairo', sans-serif" }}>وصف الجريمة</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{caseData.crime}</p>
          </motion.div>

          {/* Characters */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
            <h3 className="text-sm font-bold text-zinc-400 mb-3" style={{ fontFamily: "'Cairo', sans-serif" }}>المشتبه بهم</h3>
            {caseData.characters.map((char) => {
              const player = gameState.players.find(p => p.characterId === char.id);
              return (
                <div key={char.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                  <button onClick={() => setExpandedChar(expandedChar === char.id ? null : char.id)}
                    className="w-full flex items-center gap-3 p-4 text-right">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0">
                      <span className="text-base font-black text-zinc-400">{char.name[0]}</span>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{char.name}</span>
                        {player && <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{player.name}</span>}
                      </div>
                      <p className="text-xs text-zinc-500">{char.profession}</p>
                    </div>
                    {expandedChar === char.id ? <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {expandedChar === char.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-4 pb-4 pt-0 space-y-2 border-t border-border">
                          <p className="text-xs text-zinc-400 leading-relaxed pt-3">{char.background}</p>
                          <div className="p-2 rounded-xl bg-amber-950/20 border border-amber-900/30">
                            <p className="text-xs text-amber-400/80"><span className="font-bold">الدافع: </span>{char.motive}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Game rules */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="grid grid-cols-3 gap-3 text-center">
              {["جولة ١", "جولة ٢", "جولة ٣"].map((r, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs font-black text-red-400">{r}</div>
                  <div className="text-xs text-zinc-500">دليل + تصويت</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleStartDiscuss}
            className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            ابدأ الجولة الأولى
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── PHASE: DISCUSS ──────────────────────────────────────────
  if (phase === "discuss") {
    const currentClue = caseData.clues[currentRound - 1];
    const pastClues = currentRound === 3 ? caseData.clues : [currentClue];
    const timerPercent = roundDurationSeconds > 0 ? (timeLeft / roundDurationSeconds) * 100 : 0;
    const timerColor = timerPercent > 50 ? "bg-green-500" : timerPercent > 25 ? "bg-amber-500" : "bg-red-500";

    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-950/40 border border-red-900/40 rounded-xl px-3 py-2">
              <Timer className="w-4 h-4 text-red-400" />
              <span className={`font-black text-lg tabular-nums ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            {/* Progress bar */}
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-colors ${timerColor}`}
                style={{ width: `${timerPercent}%` }}
                animate={{ width: `${timerPercent}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
            <div className="text-xs font-bold text-zinc-400 whitespace-nowrap">
              جولة {currentRound}/٣
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
          {/* Round header */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {currentRound === 3 ? "الجولة الأخيرة" : `الجولة ${["الأولى", "الثانية", "الثالثة"][currentRound - 1]}`}
            </h2>
            <p className="text-zinc-500 text-sm">
              {currentRound === 3 ? "كل الأدلة أمامكم. ناقشوا وصوّتوا." : "اقرؤوا الدليل، ناقشوا، ثم صوّتوا."}
            </p>
          </div>

          {/* Clues */}
          <div className="space-y-4">
            {currentRound === 3 ? (
              // Show all 3 clues in round 3
              caseData.clues.map((clue, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  className="p-5 rounded-2xl bg-card border border-amber-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-amber-900/50 flex items-center justify-center">
                      <span className="text-xs font-black text-amber-400">{idx + 1}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-400">دليل الجولة {["الأولى", "الثانية", "الثالثة"][idx]}</span>
                  </div>
                  <h3 className="font-black text-white text-base mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{clue.title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-3">{clue.description}</p>
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                    <p className="text-xs text-amber-400/80 leading-relaxed">
                      <span className="font-bold">ماذا يعني: </span>{clue.implication}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              // Current round clue
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-card border border-amber-900/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <span className="text-xs font-black text-amber-400">{currentRound}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">دليل الجولة {["الأولى", "الثانية", "الثالثة"][currentRound - 1]}</span>
                </div>
                <h3 className="font-black text-white text-lg mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{currentClue.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3">{currentClue.description}</p>
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                  <p className="text-xs text-amber-400/80 leading-relaxed">
                    <span className="font-bold">ماذا يعني: </span>{currentClue.implication}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Active players */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-3 flex items-center gap-2">
              <Users className="w-3 h-3" />
              اللاعبون المتبقون ({activePlayers.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {activePlayers.map(p => (
                <div key={p.id} className="flex items-center gap-1.5 bg-zinc-800 px-3 py-1.5 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{p.name}</span>
                </div>
              ))}
              {eliminated.map(e => (
                <div key={e.player.id} className="flex items-center gap-1.5 bg-zinc-800/40 px-3 py-1.5 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
                  <span className="text-xs text-zinc-500 line-through" style={{ fontFamily: "'Cairo', sans-serif" }}>{e.player.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Go to vote button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => { stopTimer(); setPhase("vote"); }}
            className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40 flex items-center justify-center gap-3"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            <Vote className="w-5 h-5" />
            انتقال للتصويت
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── PHASE: VOTE ─────────────────────────────────────────────
  if (phase === "vote") {
    const isRound3 = currentRound === 3;
    const eliminatedInnocents = eliminated.filter(e => !e.wasMafioso).map(e => e.player);

    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Vote className="w-5 h-5 text-red-400" />
              <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                تصويت الجولة {["الأولى", "الثانية", "الثالثة"][currentRound - 1]}
              </h1>
            </div>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-lg">
              {votes.length}/{currentVoters.length} صوّتوا
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {isRound3 && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-center">
              <p className="text-xs text-amber-400 font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                الجولة الأخيرة: {eliminatedInnocents.map(p => p.name).join(" و ")} يصوّتان
              </p>
            </div>
          )}

          {/* For each voter, show who they can vote for */}
          <div className="space-y-6">
            {currentVoters.map((voter, vi) => {
              const myVote = votes.find(v => v.voterId === voter.id)?.accusedId;
              return (
                <motion.div key={voter.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: vi * 0.08 }}
                  className="rounded-2xl bg-card border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-zinc-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-red-950/50 flex items-center justify-center">
                        <span className="text-xs font-black text-red-400">{voter.name[0]}</span>
                      </div>
                      <span className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{voter.name}</span>
                      <span className="text-xs text-zinc-500 mr-auto">يختار:</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    {voteTargets.filter(t => t.id !== voter.id).map(target => {
                      const char = caseData.characters.find(c => c.id === target.characterId);
                      const selected = myVote === target.id;
                      return (
                        <button key={target.id}
                          onClick={() => castVote(voter.id, target.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-right ${
                            selected
                              ? "bg-red-900/40 border-red-700/60 shadow-lg"
                              : "bg-zinc-800/40 border-zinc-700/30 hover:border-zinc-600"
                          }`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            selected ? "border-red-500 bg-red-600" : "border-zinc-600"
                          }`}>
                            {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{target.name}</p>
                            <p className="text-xs text-zinc-500">{char?.name} - {char?.profession}</p>
                          </div>
                          {selected && <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Vote tally preview */}
          {votes.length > 0 && (
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <p className="text-xs text-zinc-500 mb-3">الأصوات حتى الآن:</p>
              <div className="space-y-2">
                {voteTargets.map(target => {
                  const count = tally.get(target.id) || 0;
                  const pct = currentVoters.length > 0 ? (count / currentVoters.length) * 100 : 0;
                  return (
                    <div key={target.id} className="flex items-center gap-3">
                      <span className="text-xs text-zinc-400 w-20 truncate text-right" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        {target.name}
                      </span>
                      <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-700 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400 w-6 text-left">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <motion.button
            whileHover={allVotesCast ? { scale: 1.02 } : {}}
            whileTap={allVotesCast ? { scale: 0.98 } : {}}
            disabled={!allVotesCast}
            onClick={() => handleVoteSubmit(votes)}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border ${
              allVotesCast
                ? "bg-red-700 hover:bg-red-600 text-white glow-red border-red-600/40 cursor-pointer"
                : "bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed"
            }`}
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            {allVotesCast ? "إظهار نتيجة التصويت" : `انتظار ${currentVoters.length - votes.length} أصوات...`}
          </motion.button>
        </div>
      </div>
    );
  }

  // ─── PHASE: TIE DEFENSE ─────────────────────────────────────
  if (phase === "tie_defense") {
    const isRevotePhase = defensePhase === "revote";
    const currentDefendingPlayer = tiedPlayers[timerDefensePlayer];
    const defenseSeconds = 60;
    const timerPct = (timeLeft / defenseSeconds) * 100;

    return (
      <div className="min-h-screen bg-background flex flex-col" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-2">
              <Timer className="w-4 h-4 text-amber-400" />
              <span className={`font-black text-lg tabular-nums ${timeLeft <= 10 ? "text-red-400" : "text-amber-400"}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                {isRevotePhase ? "--:--" : formatTime(timeLeft)}
              </span>
            </div>
            <h1 className="text-base font-black text-white flex-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
              تعادل في التصويت
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-auto px-4 py-8 w-full space-y-6">
          {!isRevotePhase ? (
            <>
              {/* Timer bar */}
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-amber-500 rounded-full" style={{ width: `${timerPct}%` }}
                  animate={{ width: `${timerPct}%` }} transition={{ duration: 1, ease: "linear" }} />
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-amber-950/30 border border-amber-900/40 rounded-2xl px-4 py-2">
                  <span className="text-amber-400 font-bold text-sm">{defensePhase === "first" ? "المتهم الأول" : "المتهم الثاني"}</span>
                </div>
                <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {currentDefendingPlayer?.name}
                </h2>
                <p className="text-zinc-400 text-sm">
                  {caseData.characters.find(c => c.id === currentDefendingPlayer?.characterId)?.name}
                </p>
                <p className="text-zinc-500 text-sm leading-relaxed px-4">
                  دقيقة واحدة للدفاع عن نفسك. أقنع الآخرين بأنك بريء.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {tiedPlayers.map(p => (
                  <div key={p.id} className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    p.id === currentDefendingPlayer?.id
                      ? "bg-amber-900/30 border-amber-700/50 text-amber-300"
                      : "bg-zinc-800 border-zinc-700 text-zinc-400"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${p.id === currentDefendingPlayer?.id ? "bg-amber-400" : "bg-zinc-500"}`} />
                    <span className="font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{p.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>إعادة التصويت</h2>
                <p className="text-zinc-400 text-sm">بعد سماع دفاع المتعادلَين، صوّتوا مرة أخرى</p>
              </div>

              {/* Re-vote UI */}
              <div className="space-y-4">
                {currentVoters.map((voter) => {
                  const myVote = votes.find(v => v.voterId === voter.id)?.accusedId;
                  return (
                    <div key={voter.id} className="rounded-2xl bg-card border border-border overflow-hidden">
                      <div className="px-4 py-3 border-b border-border bg-zinc-900/50">
                        <span className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{voter.name}</span>
                        <span className="text-xs text-zinc-500 mr-2">يختار:</span>
                      </div>
                      <div className="p-3 space-y-2">
                        {tiedPlayers.filter(t => t.id !== voter.id).map(target => {
                          const char = caseData.characters.find(c => c.id === target.characterId);
                          const selected = myVote === target.id;
                          return (
                            <button key={target.id}
                              onClick={() => castVote(voter.id, target.id)}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                                selected ? "bg-red-900/40 border-red-700/60" : "bg-zinc-800/40 border-zinc-700/30 hover:border-zinc-600"
                              }`}>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                selected ? "border-red-500 bg-red-600" : "border-zinc-600"
                              }`}>
                                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <div className="flex-1 text-right">
                                <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{target.name}</p>
                                <p className="text-xs text-zinc-500">{char?.name}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                disabled={votes.length < currentVoters.length}
                onClick={() => handleVoteSubmit(votes)}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border ${
                  votes.length >= currentVoters.length
                    ? "bg-red-700 hover:bg-red-600 text-white glow-red border-red-600/40"
                    : "bg-zinc-800 text-zinc-500 border-zinc-700 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                تأكيد التصويت النهائي
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ─── PHASE: ROUND RESULT ─────────────────────────────────────
  if (phase === "round_result" && roundResult) {
    const isLastRound = currentRound === 3;
    const isMafiosoFound = roundResult.wasMafioso;
    const char = caseData.characters.find(c => c.id === roundResult.player.characterId);
    const gameEnded = isMafiosoFound || isLastRound;

    if (gameEnded && isMafiosoFound) {
      // Innocents won
      return <GameOverScreen
        winner="innocents"
        eliminated={[...eliminated]}
        players={gameState.players}
        caseData={caseData}
        mafiosoPlayer={mafiosoPlayer!}
        mafiosoChar={mafiosoChar}
        showTrueStory={showTrueStory}
        setShowTrueStory={setShowTrueStory}
        onReplay={() => setLocation(`/setup/${caseId}`)}
        onNewCase={() => setLocation("/cases")}
      />;
    }

    if (gameEnded && !isMafiosoFound) {
      // Mafioso won (3 rounds done, mafioso survived)
      return <GameOverScreen
        winner="mafioso"
        eliminated={[...eliminated]}
        players={gameState.players}
        caseData={caseData}
        mafiosoPlayer={mafiosoPlayer!}
        mafiosoChar={mafiosoChar}
        showTrueStory={showTrueStory}
        setShowTrueStory={setShowTrueStory}
        onReplay={() => setLocation(`/setup/${caseId}`)}
        onNewCase={() => setLocation("/cases")}
      />;
    }

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6" dir="rtl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 text-center">
          {/* Result badge */}
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto border-4 ${
            isMafiosoFound
              ? "bg-red-900/50 border-red-600 glow-red"
              : "bg-zinc-800 border-zinc-600"
          }`}>
            {isMafiosoFound
              ? <Skull className="w-12 h-12 text-red-400" />
              : <Shield className="w-12 h-12 text-green-400" />
            }
          </div>

          <div className="space-y-2">
            <div className={`text-sm font-bold uppercase tracking-widest ${isMafiosoFound ? "text-red-400" : "text-green-400"}`}>
              {isMafiosoFound ? "مافيوسو كُشف" : "بريء"}
            </div>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {roundResult.player.name} خرج
            </h2>
            <p className="text-zinc-400 text-sm">
              {char?.name} - {char?.profession}
            </p>
            <p className={`text-base font-bold mt-2 ${isMafiosoFound ? "text-red-300" : "text-zinc-300"}`}
              style={{ fontFamily: "'Cairo', sans-serif" }}>
              {isMafiosoFound
                ? "وجدتم المافيوسو"
                : `برئ - اللعبة تكمل للجولة ${["الثانية", "الثالثة"][currentRound - 1]}`
              }
            </p>
          </div>

          {/* Eliminated player card reveal */}
          <div className={`p-4 rounded-2xl border ${isMafiosoFound ? "bg-red-950/20 border-red-900/40" : "bg-zinc-900/50 border-zinc-800"}`}>
            <p className="text-xs text-zinc-500 mb-2">دوره كان:</p>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
              isMafiosoFound ? "bg-red-900/50 text-red-300" : "bg-green-900/30 text-green-300"
            }`}>
              {isMafiosoFound ? <Skull className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
              {isMafiosoFound ? "المافيوسو" : "بريء"}
            </div>
          </div>

          {!isMafiosoFound && (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleNextRound}
              className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
              style={{ fontFamily: "'Cairo', sans-serif" }}>
              الجولة {["الثانية", "الثالثة"][currentRound - 1]}
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  return null;
}

// ─── GAME OVER SCREEN COMPONENT ──────────────────────────────
function GameOverScreen({
  winner, eliminated, players, caseData, mafiosoPlayer, mafiosoChar,
  showTrueStory, setShowTrueStory, onReplay, onNewCase
}: {
  winner: "innocents" | "mafioso";
  eliminated: EliminatedRecord[];
  players: Player[];
  caseData: ReturnType<typeof getCase>;
  mafiosoPlayer: Player;
  mafiosoChar: Character | undefined;
  showTrueStory: boolean;
  setShowTrueStory: (v: boolean) => void;
  onReplay: () => void;
  onNewCase: () => void;
}) {
  if (!caseData) return null;
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Winner banner */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className={`p-6 rounded-3xl text-center border-2 ${
            winner === "innocents"
              ? "bg-gradient-to-br from-green-950/50 to-zinc-900 border-green-700/50"
              : "bg-gradient-to-br from-red-950/50 to-zinc-900 border-red-700/50"
          }`}>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            winner === "innocents" ? "bg-green-900/50 border-2 border-green-700" : "bg-red-900/50 border-2 border-red-700"
          }`}>
            {winner === "innocents" ? <Shield className="w-10 h-10 text-green-400" /> : <Skull className="w-10 h-10 text-red-400" />}
          </div>
          <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {winner === "innocents" ? "الأبرياء فازوا!" : "المافيوسو فاز!"}
          </h2>
          <p className={`text-sm ${winner === "innocents" ? "text-green-400" : "text-red-400"}`}>
            {winner === "innocents" ? "كشفتم المجرم بالأدلة والذكاء" : "المافيوسو أفلت من العدالة الثلاث جولات"}
          </p>
        </motion.div>

        {/* Mafioso reveal */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-4 rounded-2xl bg-red-950/20 border border-red-900/40">
          <p className="text-xs text-zinc-500 mb-2">المافيوسو الحقيقي كان:</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-900/50 border border-red-700/40 flex items-center justify-center">
              <Skull className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="font-black text-white text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>{mafiosoPlayer.name}</p>
              <p className="text-sm text-red-300/70">{mafiosoChar?.name} - {mafiosoChar?.profession}</p>
            </div>
          </div>
        </motion.div>

        {/* All player cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
          <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>كروت جميع اللاعبين</h3>
          {players.map((player) => {
            const char = caseData.characters.find(c => c.id === player.characterId);
            const elimRecord = eliminated.find(e => e.player.id === player.id);
            return (
              <div key={player.id} className={`p-3 rounded-2xl border flex items-center gap-3 ${
                player.isMafioso ? "bg-red-950/20 border-red-900/40" : "bg-card border-border"
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  player.isMafioso ? "bg-red-900/50" : "bg-zinc-800"
                }`}>
                  {player.isMafioso ? <Skull className="w-5 h-5 text-red-400" /> : <Shield className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{player.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      player.isMafioso ? "bg-red-950/50 text-red-400" : "bg-green-950/30 text-green-400"
                    }`}>{player.isMafioso ? "مافيوسو" : "بريء"}</span>
                    {elimRecord && (
                      <span className="text-xs text-zinc-600">خرج في جولة {elimRecord.round}</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">{char?.name}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* True story */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-2xl border border-amber-900/40 overflow-hidden">
          <button onClick={() => setShowTrueStory(!showTrueStory)}
            className="w-full p-4 flex items-center gap-3 bg-amber-950/20 hover:bg-amber-950/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-amber-900/40 flex items-center justify-center">
              <Eye className="w-4 h-4 text-amber-400" />
            </div>
            <span className="flex-1 text-right font-bold text-amber-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
              القصة الحقيقية الكاملة
            </span>
            {showTrueStory ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-amber-500" />}
          </button>
          <AnimatePresence>
            {showTrueStory && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="p-5 bg-card">
                  <p className="text-zinc-300 text-sm leading-relaxed">{caseData.trueStory}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 pb-8">
          <button onClick={onReplay}
            className="py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-sm transition-all"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            العب مرة ثانية
          </button>
          <button onClick={onNewCase}
            className="py-3 rounded-2xl bg-red-700 hover:bg-red-600 border border-red-600/40 text-white font-bold text-sm transition-all glow-red"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            قضية جديدة
          </button>
        </div>
      </div>
    </div>
  );
}
