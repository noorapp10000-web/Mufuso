import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getCase } from "@/data/cases";
import { useGame } from "@/context/GameContext";
import { ArrowRight, Eye, ChevronDown, ChevronUp, Lock, CheckCircle, XCircle, Skull, Shield, Users } from "lucide-react";

type GamePhase = "case_intro" | "clues" | "voting" | "result";

export default function GamePlay() {
  const { caseId } = useParams<{ caseId: string }>();
  const [, setLocation] = useLocation();
  const { gameState } = useGame();
  const caseData = getCase(caseId!);

  const [phase, setPhase] = useState<GamePhase>("case_intro");
  const [revealedClues, setRevealedClues] = useState<number[]>([]);
  const [expandedChar, setExpandedChar] = useState<string | null>(null);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<string | null>(null);
  const [showTrueStory, setShowTrueStory] = useState(false);
  const [innocentsWon, setInnocentsWon] = useState<boolean | null>(null);

  if (!caseData || gameState.players.length === 0) {
    setLocation("/cases");
    return null;
  }

  const mafiosoPlayer = gameState.players.find(p => p.isMafioso);
  const mafiosoCharacter = caseData.characters.find(c => c.id === mafiosoPlayer?.characterId);

  const handleRevealClue = (index: number) => {
    if (!revealedClues.includes(index)) {
      setRevealedClues([...revealedClues, index]);
    }
  };

  const handleEliminate = (playerId: string) => {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player) return;
    setEliminatedPlayer(playerId);
    setInnocentsWon(player.isMafioso);
    setPhase("result");
  };

  // --- Phase: Case Intro ---
  if (phase === "case_intro") {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => setLocation("/cases")} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-white flex-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {caseData.title}
            </h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Cover */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-2xl overflow-hidden h-48">
            <img src={caseData.coverImage} alt={caseData.title} className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-4 right-4 left-4">
              <span className="text-xs text-red-300 bg-red-950/70 px-2 py-1 rounded-lg border border-red-900/40">{caseData.category}</span>
              <h2 className="text-2xl font-black text-white mt-2" style={{ fontFamily: "'Cairo', sans-serif" }}>{caseData.title}</h2>
            </div>
          </motion.div>

          {/* Crime Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="text-sm font-bold text-red-400 mb-3" style={{ fontFamily: "'Cairo', sans-serif" }}>وصف الجريمة</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{caseData.crime}</p>
          </motion.div>

          {/* Characters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>المشتبه بهم</h3>
            {caseData.characters.map((char, i) => {
              const player = gameState.players.find(p => p.characterId === char.id);
              return (
                <div key={char.id} className="p-4 rounded-2xl bg-card border border-border">
                  <button
                    onClick={() => setExpandedChar(expandedChar === char.id ? null : char.id)}
                    className="w-full flex items-center gap-3 text-right"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0">
                      <span className="text-lg font-black text-zinc-400">{char.name[0]}</span>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{char.name}</span>
                        {player && <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{player.name}</span>}
                      </div>
                      <p className="text-xs text-zinc-500">{char.profession}</p>
                    </div>
                    {expandedChar === char.id ? <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {expandedChar === char.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden">
                        <div className="pt-3 mt-3 border-t border-border space-y-2">
                          <p className="text-xs text-zinc-400 leading-relaxed">{char.background}</p>
                          <div className="p-2 rounded-xl bg-amber-950/20 border border-amber-900/30">
                            <p className="text-xs text-amber-400/80"><span className="font-bold">الدافع:</span> {char.motive}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setPhase("clues")}
            className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            ابدأ الجولات وكشف الأدلة
          </motion.button>
        </div>
      </div>
    );
  }

  // --- Phase: Clues ---
  if (phase === "clues") {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => setPhase("case_intro")} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>الأدلة</h1>
              <p className="text-xs text-zinc-500">{revealedClues.length} / {caseData.clues.length} أدلة مكشوفة</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          {/* Clue cards */}
          {caseData.clues.map((clue, index) => {
            const revealed = revealedClues.includes(index);
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className={`rounded-2xl border overflow-hidden transition-all ${revealed ? "border-amber-900/40 bg-card" : "border-border bg-card"}`}>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${revealed ? "bg-amber-900/40" : "bg-zinc-800"}`}>
                      <span className="text-sm font-black text-zinc-300">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs font-bold ${revealed ? "text-amber-400" : "text-zinc-500"}`}>
                        الجولة {clue.round}
                      </span>
                      {revealed && <p className="font-bold text-white text-sm mt-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>{clue.title}</p>}
                    </div>
                    {revealed && <CheckCircle className="w-5 h-5 text-amber-500 shrink-0" />}
                  </div>

                  {revealed ? (
                    <div className="space-y-3">
                      <p className="text-zinc-300 text-sm leading-relaxed">{clue.description}</p>
                      <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
                        <p className="text-xs text-amber-400/80 leading-relaxed">
                          <span className="font-bold">ماذا يعني:</span> {clue.implication}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRevealClue(index)}
                      disabled={index > 0 && !revealedClues.includes(index - 1)}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                        index > 0 && !revealedClues.includes(index - 1)
                          ? "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
                          : "bg-amber-900/30 hover:bg-amber-900/50 text-amber-400 border border-amber-900/40"
                      }`}
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {index > 0 && !revealedClues.includes(index - 1)
                        ? <><Lock className="w-4 h-4" /> مقفول - اكشف الدليل السابق أولاً</>
                        : <><Eye className="w-4 h-4" /> اكشف الدليل</>
                      }
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}

          {/* Players summary */}
          <div className="p-4 rounded-2xl bg-card border border-border">
            <h3 className="text-sm font-bold text-zinc-400 mb-3 flex items-center gap-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <Users className="w-4 h-4" /> اللاعبون
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {gameState.players.map(player => (
                <div key={player.id} className="flex items-center gap-2 p-2 rounded-xl bg-zinc-800/40">
                  <div className="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center">
                    <span className="text-xs font-black text-zinc-300">{player.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{player.name}</p>
                    <p className="text-xs text-zinc-500">
                      {caseData.characters.find(c => c.id === player.characterId)?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vote button */}
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setPhase("voting")}
            className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
            style={{ fontFamily: "'Cairo', sans-serif" }}>
            الانتقال للتصويت
          </motion.button>
        </div>
      </div>
    );
  }

  // --- Phase: Voting ---
  if (phase === "voting") {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => setPhase("clues")} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white">
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>التصويت</h1>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-red-950/20 border border-red-900/30 text-center">
            <p className="text-red-400 font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
              اختر الشخص الذي تعتقد أنه المافيوسو
            </p>
            <p className="text-zinc-500 text-xs mt-1">الأغلبية تقرر من يُطرد</p>
          </motion.div>

          <div className="space-y-3">
            {gameState.players.map((player, index) => {
              const character = caseData.characters.find(c => c.id === player.characterId);
              return (
                <motion.div key={player.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-red-800/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0">
                      <span className="text-xl font-black text-zinc-300">{player.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{player.name}</p>
                      </div>
                      <p className="text-sm text-zinc-400">{character?.name}</p>
                      <p className="text-xs text-zinc-600">{character?.profession}</p>
                    </div>
                    <button
                      onClick={() => handleEliminate(player.id)}
                      className="px-4 py-2 bg-red-900/40 hover:bg-red-700 border border-red-800/50 hover:border-red-600 rounded-xl text-red-300 hover:text-white text-sm font-bold transition-all"
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      اتهام
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- Phase: Result ---
  if (phase === "result") {
    const eliminatedPlayerData = gameState.players.find(p => p.id === eliminatedPlayer);
    const eliminatedCharacter = caseData.characters.find(c => c.id === eliminatedPlayerData?.characterId);

    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          {/* Result banner */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-3xl text-center border-2 ${
              innocentsWon
                ? "bg-gradient-to-br from-green-950/50 to-zinc-900 border-green-700/50"
                : "bg-gradient-to-br from-red-950/50 to-zinc-900 border-red-700/50"
            }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              innocentsWon ? "bg-green-900/50 border-2 border-green-700" : "bg-red-900/50 border-2 border-red-700"
            }`}>
              {innocentsWon
                ? <Shield className="w-10 h-10 text-green-400" />
                : <Skull className="w-10 h-10 text-red-400" />
              }
            </div>
            <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {innocentsWon ? "الأبرياء فازوا!" : "المافيوسو فاز!"}
            </h2>
            <p className={`text-sm ${innocentsWon ? "text-green-400" : "text-red-400"}`}>
              {innocentsWon ? "كشفتم المجرم بالأدلة والذكاء" : "المافيوسو أفلت من العدالة"}
            </p>
          </motion.div>

          {/* Eliminated player */}
          {eliminatedPlayerData && eliminatedCharacter && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-card border border-border">
              <p className="text-xs text-zinc-500 mb-3">الشخص الذي طُرد</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <span className="text-xl font-black text-zinc-300">{eliminatedPlayerData.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>{eliminatedPlayerData.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      eliminatedPlayerData.isMafioso
                        ? "bg-red-950/50 text-red-400 border border-red-900/40"
                        : "bg-green-950/50 text-green-400 border border-green-900/40"
                    }`}>
                      {eliminatedPlayerData.isMafioso ? "مافيوسو" : "بريء"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{eliminatedCharacter.name}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* All cards reveal */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>كروت جميع اللاعبين</h3>
            {gameState.players.map((player) => {
              const char = caseData.characters.find(c => c.id === player.characterId);
              return (
                <div key={player.id} className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  player.isMafioso
                    ? "bg-red-950/20 border-red-900/40"
                    : "bg-card border-border"
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    player.isMafioso ? "bg-red-900/50" : "bg-zinc-800"
                  }`}>
                    {player.isMafioso
                      ? <Skull className="w-5 h-5 text-red-400" />
                      : <Shield className="w-5 h-5 text-green-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{player.name}</p>
                      <span className={`text-xs font-bold ${player.isMafioso ? "text-red-400" : "text-green-400"}`}>
                        {player.isMafioso ? "المافيوسو" : "بريء"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{char?.name} - {char?.profession}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* True Story */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-2xl border border-amber-900/40 overflow-hidden">
            <button
              onClick={() => setShowTrueStory(!showTrueStory)}
              className="w-full p-4 flex items-center gap-3 bg-amber-950/20 hover:bg-amber-950/30 transition-colors"
            >
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
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden">
                  <div className="p-5 bg-card">
                    <p className="text-zinc-300 text-sm leading-relaxed">{caseData.trueStory}</p>
                    <div className="mt-4 p-3 rounded-xl bg-red-950/20 border border-red-900/30">
                      <p className="text-xs text-red-400">
                        <span className="font-bold">المافيوسو الحقيقي:</span>{" "}
                        {mafiosoCharacter?.name} ({mafiosoPlayer?.name})
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 pb-8">
            <button
              onClick={() => setLocation(`/setup/${caseId}`)}
              className="py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-bold text-sm transition-all"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              العب مرة ثانية
            </button>
            <button
              onClick={() => setLocation("/cases")}
              className="py-3 rounded-2xl bg-red-700 hover:bg-red-600 border border-red-600/40 text-white font-bold text-sm transition-all glow-red"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              قضية جديدة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
