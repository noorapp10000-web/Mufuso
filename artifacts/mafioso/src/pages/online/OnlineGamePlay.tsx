import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useOnline, SafePlayer, EliminatedRecord } from "@/context/OnlineContext";
import { useVoice } from "@/context/VoiceContext";
import { getCaseById } from "@/data/allCases";
import {
  ArrowRight, Timer, Vote, Users, Shield, Skull,
  ChevronDown, ChevronUp, CheckCircle, XCircle, Eye, Mic, MicOff,
} from "lucide-react";

const ROUND_LABELS = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة"];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function useCountdown(timerEnd?: number) {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!timerEnd) { setRemaining(0); return; }
    const update = () => {
      const left = Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000));
      setRemaining(left);
    };
    update();
    const id = setInterval(update, 500);
    return () => clearInterval(id);
  }, [timerEnd]);
  return remaining;
}

export default function OnlineGamePlay() {
  const [, setLocation] = useLocation();
  const {
    room, myPlayerId, myCard,
    startDiscuss, skipToVote, castVote, nextRound, playAgain, leaveRoom,
  } = useOnline();
  const { isMuted, mutedPlayers, isVoiceReady } = useVoice();

  const [expandedChar, setExpandedChar] = useState<string | null>(null);
  const [showTrueStory, setShowTrueStory] = useState(false);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [selectedPlayAgain, setSelectedPlayAgain] = useState<"same" | "new" | null>(null);
  const [showCaseList, setShowCaseList] = useState(false);

  const timeLeft = useCountdown(room?.gameState?.timerEnd);

  if (!room || !room.caseMeta || !room.gameState) return null;

  const gs = room.gameState;
  const caseData = getCaseById(room.caseMeta.id);
  if (!caseData) return null;

  const me = room.players.find(p => p.id === myPlayerId);
  const isHost = me?.isHost ?? false;
  const totalRounds = gs.totalRounds;
  const currentRound = gs.currentRound;
  const roundDurationSeconds = gs.roundDuration * 60;

  const activePlayers = room.players.filter(p => !p.isEliminated);
  const eliminatedInnocents = gs.eliminatedRecords
    .filter(e => !e.wasMafioso)
    .map(e => room.players.find(p => p.id === e.playerId))
    .filter((p): p is SafePlayer => !!p);

  const isFinalRound = currentRound === totalRounds;
  const voters: SafePlayer[] = isFinalRound ? eliminatedInnocents : activePlayers;
  const voteTargets: SafePlayer[] = activePlayers;

  const amVoter = voters.some(p => p.id === myPlayerId);
  const amActive = activePlayers.some(p => p.id === myPlayerId);
  const votesForMe = gs.votes.filter(v => v.voterId === myPlayerId)[0]?.targetId;

  function handleVote(targetId: string) {
    if (!amVoter) return;
    if (gs.phase !== "vote" && !(gs.phase === "tie_defense" && gs.defensePhase === "revote")) return;
    setMyVote(targetId);
    castVote(targetId);
  }

  function handlePlayAgain() {
    playAgain();
  }

  const timerPercent = roundDurationSeconds > 0 && timeLeft > 0
    ? (timeLeft / roundDurationSeconds) * 100
    : 0;
  const timerColor = timerPercent > 50 ? "bg-green-500" : timerPercent > 25 ? "bg-amber-500" : "bg-red-500";

  // ─── CASE INTRO (discuss phase, no timer yet) ─────────────────
  if (gs.phase === "discuss" && !gs.timerEnd) {
    return (
      <div className="min-h-screen" dir="rtl">
        <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <h1 className="text-lg font-black text-white flex-1 truncate" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {caseData.title}
            </h1>
            <span className="text-xs text-zinc-500">جولة {currentRound}/{totalRounds}</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Cover */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl overflow-hidden h-44">
            <img src={caseData.coverImage} alt={caseData.title} className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
            {caseData.characters.map(char => {
              const player = room.players.find(p => {
                const pi = room.caseMeta!.characters.findIndex(c => c.id === char.id);
                return false; // characters mapped server-side
              });
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
                        {myCard?.characterId === char.id && (
                          <span className="text-xs text-red-400 bg-red-950/30 px-2 py-0.5 rounded-full border border-red-900/30">أنت</span>
                        )}
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

          {/* Round overview */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className={`grid gap-3 text-center`} style={{ gridTemplateColumns: `repeat(${totalRounds}, minmax(0, 1fr))` }}>
              {Array.from({ length: totalRounds }, (_, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-xs font-black text-red-400">جولة {i + 1}</div>
                  <div className="text-xs text-zinc-500">{i === totalRounds - 1 ? "تصويت نهائي" : "دليل + تصويت"}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* My card reminder */}
          {myCard && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              className={`p-3 rounded-2xl border text-center ${
                myCard.isMafioso ? "bg-red-950/20 border-red-900/40" : "bg-zinc-900/40 border-zinc-800"
              }`}>
              <p className="text-xs" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {myCard.isMafioso
                  ? <span className="text-red-400 font-bold">🔴 أنت المافيوسو — أضلل الأبرياء</span>
                  : <span className="text-zinc-400">🟢 أنت بريء — اكشف المافيوسو</span>
                }
              </p>
            </motion.div>
          )}

          {/* Start button (host only) */}
          {isHost ? (
            <motion.button initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={startDiscuss}
              className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
              style={{ fontFamily: "'Cairo', sans-serif" }}>
              ابدأ الجولة الأولى
            </motion.button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="w-full py-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                في انتظار المضيف ليبدأ الجولة...
              </p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // ─── DISCUSS ──────────────────────────────────────────────────
  if (gs.phase === "discuss" && gs.timerEnd) {
    const currentClue = caseData.clues[currentRound - 1];
    const isLastRound = currentRound === totalRounds;

    return (
      <div className="min-h-screen" dir="rtl">
        <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-950/40 border border-red-900/40 rounded-xl px-3 py-2">
              <Timer className="w-4 h-4 text-red-400" />
              <span className={`font-black text-lg tabular-nums ${timeLeft <= 10 ? "text-red-400" : "text-white"}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div className={`h-full rounded-full transition-colors ${timerColor}`}
                style={{ width: `${timerPercent}%` }} animate={{ width: `${timerPercent}%` }} transition={{ duration: 0.5 }} />
            </div>
            <div className="text-xs font-bold text-zinc-400">جولة {currentRound}/{totalRounds}</div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {isLastRound ? "الجولة الأخيرة" : `الجولة ${ROUND_LABELS[currentRound - 1] ?? currentRound}`}
            </h2>
            <p className="text-zinc-500 text-sm">{isLastRound ? "كل الأدلة أمامكم. ناقشوا وصوّتوا." : "اقرؤوا الدليل، ناقشوا."}</p>
          </div>

          {/* Clues */}
          <div className="space-y-4">
            {(isLastRound ? caseData.clues : [currentClue]).map((clue, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-card border border-amber-900/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <span className="text-xs font-black text-amber-400">{isLastRound ? idx + 1 : currentRound}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">دليل الجولة {ROUND_LABELS[isLastRound ? idx : currentRound - 1] ?? (isLastRound ? idx + 1 : currentRound)}</span>
                </div>
                <h3 className="font-black text-white text-base mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{clue.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3">{clue.description}</p>
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                  <p className="text-xs text-amber-400/80 leading-relaxed"><span className="font-bold">ماذا يعني: </span>{clue.implication}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Players */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-3 flex items-center gap-2"><Users className="w-3 h-3" />اللاعبون المتبقون ({activePlayers.length})</p>
            <div className="flex flex-wrap gap-2">
              {activePlayers.map(p => (
                <div key={p.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${p.id === myPlayerId ? "bg-red-950/30 border border-red-900/30" : "bg-zinc-800"}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-xs font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{p.name}</span>
                  {isVoiceReady && (
                    (p.id === myPlayerId ? isMuted : mutedPlayers.has(p.id))
                      ? <MicOff className="w-3 h-3 text-zinc-600" />
                      : <Mic className="w-3 h-3 text-green-400" />
                  )}
                </div>
              ))}
              {gs.eliminatedRecords.map(e => (
                <div key={e.playerId} className="flex items-center gap-1.5 bg-zinc-800/40 px-3 py-1.5 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-700" />
                  <span className="text-xs text-zinc-500 line-through" style={{ fontFamily: "'Cairo', sans-serif" }}>{e.playerName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* My role reminder */}
          {myCard && (
            <div className={`p-3 rounded-2xl border text-center ${myCard.isMafioso ? "bg-red-950/20 border-red-900/40" : "bg-zinc-900/40 border-zinc-800"}`}>
              <p className="text-xs" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {myCard.isMafioso ? <span className="text-red-400 font-bold">أنت المافيوسو</span> : <span className="text-zinc-400">أنت بريء</span>}
              </p>
            </div>
          )}

          {/* Skip to vote (host) */}
          {isHost && (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={skipToVote}
              className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all border border-red-600/40 flex items-center justify-center gap-3"
              style={{ fontFamily: "'Cairo', sans-serif" }}>
              <Vote className="w-5 h-5" />
              انتقال للتصويت
            </motion.button>
          )}
          {!isHost && (
            <div className="text-center text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
              المضيف يتحكم في الانتقال للتصويت
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── VOTE ─────────────────────────────────────────────────────
  if (gs.phase === "vote" || (gs.phase === "tie_defense" && gs.defensePhase === "revote")) {
    const isRevote = gs.phase === "tie_defense" && gs.defensePhase === "revote";

    return (
      <div className="min-h-screen" dir="rtl">
        <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <Vote className="w-5 h-5 text-red-400" />
              <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {isRevote ? "إعادة التصويت" : `تصويت الجولة ${ROUND_LABELS[currentRound - 1] ?? currentRound}`}
              </h1>
            </div>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded-lg">
              {gs.votes.length}/{voters.length} صوّتوا
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {isFinalRound && !isRevote && (
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-center">
              <p className="text-xs text-amber-400 font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                الجولة الأخيرة: {eliminatedInnocents.map(p => p.name).join(" و ")} يصوّتون
              </p>
            </div>
          )}

          {isRevote && (
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-center">
              <p className="text-xs text-red-400 font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                تعادل! الآن إعادة التصويت
              </p>
            </div>
          )}

          {/* Voting targets */}
          {amVoter ? (
            <div className="space-y-3">
              <p className="text-sm text-zinc-400 text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
                صوّت على من تشك في أنه المافيوسو
              </p>
              <div className="space-y-2">
                {voteTargets.map(target => {
                  const char = caseData.characters.find(c => c.id === room.caseMeta!.characters.find(ch => ch.id === c.id)?.id);
                  const selected = gs.votes.find(v => v.voterId === myPlayerId)?.targetId === target.id;
                  return (
                    <motion.button key={target.id}
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      onClick={() => handleVote(target.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-right transition-all ${
                        selected
                          ? "bg-red-950/40 border-red-700/60"
                          : "bg-card border-border hover:border-red-700/30"
                      }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        selected ? "bg-red-700" : "bg-zinc-800"
                      }`}>
                        {selected ? <Skull className="w-5 h-5 text-white" /> : <span className="text-sm font-black text-zinc-400">{target.name[0]}</span>}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{target.name}</p>
                      </div>
                      {selected && <CheckCircle className="w-5 h-5 text-red-400 shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
              {gs.votes.find(v => v.voterId === myPlayerId) && (
                <p className="text-center text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  يمكنك تغيير صوتك. الانتقال تلقائي عند اكتمال التصويت.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {isFinalRound ? "أنت مشاهد في هذه الجولة" : "انتظر نتيجة التصويت"}
                </p>
              </div>
            </div>
          )}

          {/* Vote progress */}
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <p className="text-xs text-zinc-500 mb-3" style={{ fontFamily: "'Cairo', sans-serif" }}>
              حالة التصويت ({gs.votes.length}/{voters.length})
            </p>
            <div className="space-y-2">
              {voters.map(voter => {
                const voted = gs.votes.some(v => v.voterId === voter.id);
                return (
                  <div key={voter.id} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${voted ? "bg-green-500" : "bg-zinc-600"}`} />
                    <span className="text-xs text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>{voter.name}</span>
                    {voted && <span className="text-xs text-green-400 mr-auto">✓ صوّت</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── TIE DEFENSE ─────────────────────────────────────────────
  if (gs.phase === "tie_defense" && gs.defensePhase !== "revote") {
    const defendingId = gs.tiedPlayerIds[gs.defensePlayerIdx];
    const defending = room.players.find(p => p.id === defendingId);
    const amDefending = defendingId === myPlayerId;
    const totalDefenders = gs.tiedPlayerIds.length;
    const remaining = timeLeft;
    const defPercent = Math.max(0, (remaining / 60) * 100);

    return (
      <div className="min-h-screen flex flex-col" dir="rtl">
        <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-950/40 border border-amber-900/40 rounded-xl px-3 py-2">
              <Timer className="w-4 h-4 text-amber-400" />
              <span className={`font-black text-lg tabular-nums ${remaining <= 10 ? "text-red-400" : "text-amber-400"}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                {formatTime(remaining)}
              </span>
            </div>
            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${defPercent}%` }} />
            </div>
            <div className="text-xs font-bold text-zinc-400">{gs.defensePlayerIdx + 1}/{totalDefenders} دفاع</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-lg mx-auto w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-950/50 border-2 border-amber-700/50 flex items-center justify-center mx-auto">
              <span className="text-2xl font-black text-amber-400">{defending?.name[0]}</span>
            </div>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {defending?.name}
            </h2>
            <p className="text-amber-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {amDefending ? "دورك للدفاع عن نفسك — لديك ٦٠ ثانية" : "يدافع عن نفسه"}
            </p>
          </div>

          <div className="w-full p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-center">
            <p className="text-sm text-amber-400/80" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {amDefending
                ? "اقنع الجميع بأنك بريء! تحدث بصوت عالٍ..."
                : "استمع جيداً... هل يقول الحقيقة؟"
              }
            </p>
          </div>

          {gs.tiedPlayerIds.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {gs.tiedPlayerIds.map((id, idx) => {
                const p = room.players.find(pl => pl.id === id);
                return (
                  <div key={id} className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    idx === gs.defensePlayerIdx
                      ? "bg-amber-700 border-amber-600 text-white"
                      : idx < gs.defensePlayerIdx
                      ? "bg-zinc-800 border-zinc-700 text-zinc-500 line-through"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  }`} style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {p?.name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── ROUND RESULT ─────────────────────────────────────────────
  if (gs.phase === "round_result" && gs.roundResult && !gs.winner) {
    const result = gs.roundResult;
    const isMafioso = result.wasMafioso;
    const isLastResultBeforeGame = gs.currentRound >= totalRounds && !isMafioso;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10" dir="rtl">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8 max-w-md w-full">
          <div className="space-y-4">
            <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mx-auto ${
              isMafioso ? "bg-red-950/50 border-red-700/50" : "bg-zinc-900 border-zinc-700"
            }`}>
              {isMafioso ? <Skull className="w-10 h-10 text-red-500" /> : <Shield className="w-10 h-10 text-green-500" />}
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>تم طرد</h3>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{result.playerName}</h2>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
              isMafioso ? "bg-red-950/30 border-red-700/40 text-red-400" : "bg-zinc-900 border-zinc-700 text-green-400"
            }`}>
              {isMafioso ? <><Skull className="w-4 h-4" /><span className="font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>كان مافيوسو!</span></> : <><Shield className="w-4 h-4" /><span className="font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>كان بريئاً</span></>}
            </div>
          </div>

          {!isMafioso && currentRound < totalRounds && (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                المافيوسو لا يزال طليقاً. تستمر اللعبة...
              </p>
            </div>
          )}

          {/* Next round (host only, if no winner yet) */}
          {isHost ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={nextRound}
              className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all border border-red-600/40"
              style={{ fontFamily: "'Cairo', sans-serif" }}>
              الجولة {ROUND_LABELS[currentRound] ?? currentRound + 1} →
            </motion.button>
          ) : (
            <div className="w-full py-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>في انتظار المضيف للمتابعة...</p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // ─── GAME OVER ────────────────────────────────────────────────
  if (gs.phase === "game_over" || (gs.phase === "round_result" && gs.winner)) {
    const winner = gs.winner;
    const mafiosoIds = room.caseMeta.culpritIds;
    const mafiosoPlayers = room.players.filter(p => {
      // Find players who were mafiosos
      return gs.eliminatedRecords.some(e => e.playerId === p.id && e.wasMafioso) ||
             activePlayers.some(ap => ap.id === p.id && myCard?.isMafioso && ap.id === myPlayerId);
    });

    // We need to show who the mafioso characters were
    const mafiosoChars = caseData.characters.filter(c => mafiosoIds.includes(c.id));

    return (
      <div className="min-h-screen overflow-y-auto" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          {/* Winner banner */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4">
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto ${
              winner === "innocents"
                ? "bg-green-950/50 border-green-700/60 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                : "bg-red-950/50 border-red-700/60 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
            }`}>
              {winner === "innocents" ? <Shield className="w-12 h-12 text-green-400" /> : <Skull className="w-12 h-12 text-red-400" />}
            </div>
            <div>
              <h2 className={`text-4xl font-black ${winner === "innocents" ? "text-green-400" : "text-red-400"}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                {winner === "innocents" ? "الأبرياء فازوا!" : "المافيوسو فاز!"}
              </h2>
              <p className="text-zinc-400 text-sm mt-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {winner === "innocents" ? "تم كشف المجرم ✓" : "نجح المجرم في الإفلات"}
              </p>
            </div>
          </motion.div>

          {/* Mafioso reveal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="p-5 rounded-2xl bg-red-950/20 border border-red-900/40">
            <h3 className="text-sm font-bold text-red-400 mb-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {mafiosoChars.length > 1 ? "المافيوسو كانوا" : "المافيوسو كان"}
            </h3>
            <div className="space-y-3">
              {mafiosoChars.map(char => {
                const mafiosoPlayer = room.players.find(p => {
                  const rec = gs.eliminatedRecords.find(e => e.playerId === p.id && e.wasMafioso);
                  return rec !== undefined;
                });
                return (
                  <div key={char.id} className="flex items-center gap-3 p-3 rounded-xl bg-red-950/30">
                    <div className="w-10 h-10 rounded-xl bg-red-900/50 flex items-center justify-center shrink-0">
                      <Skull className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{char.name}</p>
                      <p className="text-xs text-zinc-500">{char.profession}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* True story */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="rounded-2xl bg-card border border-border overflow-hidden">
            <button onClick={() => setShowTrueStory(v => !v)}
              className="w-full flex items-center gap-3 p-4">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="flex-1 text-right font-bold text-amber-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>القصة الحقيقية</span>
              {showTrueStory ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </button>
            <AnimatePresence>
              {showTrueStory && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-5 text-sm text-zinc-300 leading-relaxed border-t border-border pt-4">
                    {caseData.trueStory}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Eliminations recap */}
          {gs.eliminatedRecords.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="space-y-2">
              <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>سجل الطرد</h3>
              {gs.eliminatedRecords.map((e, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    e.wasMafioso ? "bg-red-950/50 border border-red-900/30" : "bg-zinc-800"
                  }`}>
                    {e.wasMafioso ? <Skull className="w-4 h-4 text-red-400" /> : <Shield className="w-4 h-4 text-zinc-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{e.playerName}</p>
                    <p className="text-xs text-zinc-500">الجولة {e.round}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${e.wasMafioso ? "bg-red-950/40 text-red-400" : "bg-zinc-800 text-zinc-400"}`}
                    style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {e.wasMafioso ? "مافيوسو" : "بريء"}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Play again (host only) */}
          {isHost && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="space-y-3">
              <h3 className="text-sm font-bold text-zinc-400 text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
                العب مرة أخرى؟
              </h3>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handlePlayAgain}
                className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all border border-red-600/40"
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                العب قضية جديدة
              </motion.button>
              <button
                onClick={() => { leaveRoom(); }}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-bold text-zinc-400 text-sm transition-all border border-zinc-800"
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                مغادرة الغرفة
              </button>
            </motion.div>
          )}

          {!isHost && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="space-y-3">
              <div className="w-full py-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl text-center">
                <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>في انتظار المضيف...</p>
              </div>
              <button
                onClick={() => { leaveRoom(); }}
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-bold text-zinc-400 text-sm transition-all border border-zinc-800"
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                مغادرة الغرفة
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
