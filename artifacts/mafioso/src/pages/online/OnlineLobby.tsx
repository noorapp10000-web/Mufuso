import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useOnline, CaseMeta } from "@/context/OnlineContext";
import { useVoice } from "@/context/VoiceContext";
import { ALL_CASES } from "@/data/allCases";
import { ArrowRight, Copy, Check, Users, Play, Settings2, Minus, Plus, AlertCircle, X, UserX, ChevronDown, ChevronUp, Mic, MicOff } from "lucide-react";

export default function OnlineLobby() {
  const [, setLocation] = useLocation();
  const {
    room, myPlayerId, error, clearError,
    selectCase, setDuration, startGame, kickPlayer, leaveRoom,
  } = useOnline();
  const { isMuted, isSpeaking, mutedPlayers, speakingPlayers, isVoiceReady } = useVoice();

  const [codeCopied, setCodeCopied] = useState(false);
  const [showCaseList, setShowCaseList] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!room) return null;

  const me = room.players.find(p => p.id === myPlayerId);
  const isHost = me?.isHost ?? false;
  const connectedCount = room.players.filter(p => p.isConnected).length;

  // Show all cases — host can pre-select before all players arrive
  const eligibleCases = ALL_CASES;

  function handleCopyCode() {
    navigator.clipboard.writeText(room!.code).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    });
  }

  function handleSelectCase(caseMeta: CaseMeta) {
    selectCase(caseMeta);
    setShowCaseList(false);
  }

  function handleStart() {
    setLoading(true);
    startGame();
    setTimeout(() => setLoading(false), 5000);
  }

  function handleLeave() {
    leaveRoom();
    setLocation("/online");
  }

  const canStart = isHost
    && !!room.caseMeta
    && connectedCount >= 4
    && connectedCount === (room.caseMeta?.characters.length ?? 0);

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={handleLeave}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              غرفة الانتظار
            </h1>
            <p className="text-xs text-zinc-500">{isHost ? "أنت المضيف" : "انتظر المضيف"}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Users className="w-3.5 h-3.5" />
            <span>{connectedCount}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-5 overflow-y-auto pb-32">
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-red-950/40 border border-red-900/50"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="flex-1 text-sm text-red-300" style={{ fontFamily: "'Cairo', sans-serif" }}>{error}</p>
              <button onClick={clearError}><X className="w-4 h-4 text-red-500" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room Code */}
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 text-center space-y-3">
          <p className="text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>كود الغرفة</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-black text-white tracking-widest" style={{ fontFamily: "monospace" }}>
              {room.code}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              {codeCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
            </button>
          </div>
          <p className="text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
            أرسل هذا الكود لأصدقائك ليدخلوا الغرفة
          </p>
        </div>

        {/* Players */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
              اللاعبون ({room.players.length}/6)
            </h3>
          </div>
          <div className="divide-y divide-zinc-800/50">
            {room.players.map(player => (
              <div key={player.id} className="px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-950/50 border border-red-900/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-red-400">{player.name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {player.name}
                    </span>
                    {player.id === myPlayerId && (
                      <span className="text-xs text-zinc-500">(أنت)</span>
                    )}
                    {player.isHost && (
                      <span className="text-xs bg-amber-900/30 text-amber-400 border border-amber-900/30 px-1.5 py-0.5 rounded-full">
                        مضيف
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isVoiceReady && (() => {
                    const playerMuted   = player.id === myPlayerId ? isMuted   : mutedPlayers.has(player.id);
                    const playerSpeaking = player.id === myPlayerId ? isSpeaking : speakingPlayers.has(player.id);
                    if (playerMuted) {
                      return <MicOff className="w-3.5 h-3.5 text-zinc-600" />;
                    }
                    if (playerSpeaking) {
                      return (
                        <span className="relative flex items-center justify-center w-3.5 h-3.5">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-60 animate-ping" />
                          <span className="relative inline-flex w-2 h-2 rounded-full bg-green-400" />
                        </span>
                      );
                    }
                    return <Mic className="w-3.5 h-3.5 text-zinc-500" />;
                  })()}
                  <div className={`w-2 h-2 rounded-full ${player.isConnected ? "bg-green-500" : "bg-red-600"}`} />
                  {isHost && player.id !== myPlayerId && (
                    <button
                      onClick={() => kickPlayer(player.id)}
                      className="p-1 rounded-lg hover:bg-red-950/50 transition-colors text-zinc-600 hover:text-red-400"
                      title="إخراج"
                    >
                      <UserX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 4 - room.players.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="px-4 py-3 flex items-center gap-3 opacity-30">
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                  <span className="text-xs text-zinc-600">+</span>
                </div>
                <span className="text-sm text-zinc-600" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  في انتظار لاعب...
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Case Selection (host only) */}
        {isHost && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
              اختيار القضية
            </h3>

            {/* Selected case */}
            {room.caseMeta ? (
              <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 mb-1">القضية المختارة</p>
                    <h4 className="font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {room.caseMeta.title}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {room.caseMeta.characters.length} لاعبين · {room.caseMeta.totalRounds} جولات
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCaseList(v => !v)}
                    className="text-xs text-red-400 hover:text-red-300 font-bold shrink-0 flex items-center gap-1"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    تغيير
                    {showCaseList ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCaseList(v => !v)}
                className="w-full p-4 rounded-2xl border border-dashed border-zinc-700 text-zinc-500 hover:border-red-700 hover:text-red-400 transition-all flex items-center justify-center gap-2 text-sm"
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Plus className="w-4 h-4" />
                اختر قضية
              </button>
            )}

            {/* Case list */}
            <AnimatePresence>
              {showCaseList && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {eligibleCases.length === 0 ? (
                    <p className="text-center text-sm text-zinc-500 py-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
                      لا توجد قضايا متاحة
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {eligibleCases.map(c => {
                        const cm: CaseMeta = {
                          id: c.id,
                          title: c.title,
                          totalRounds: c.clues.length,
                          characters: c.characters.map(ch => ({ id: ch.id, name: ch.name })),
                          culpritIds: "culpritIds" in c ? (c as any).culpritIds : [(c as any).culpritId],
                        };
                        return (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCase(cm)}
                            className={`w-full text-right p-3 rounded-xl border transition-all ${
                              room.caseMeta?.id === c.id
                                ? "bg-red-950/30 border-red-700/50 text-white"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-red-700/30 hover:bg-red-950/10"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-bold text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>{c.title}</p>
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                                c.characters.length === connectedCount
                                  ? "bg-green-900/60 text-green-400 border border-green-800"
                                  : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                              }`}>
                                {c.characters.length} لاعبين
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-0.5">{c.category}</p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Duration */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <Settings2 className="w-4 h-4 text-zinc-500 shrink-0" />
                <span className="flex-1 text-sm font-bold text-zinc-300" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  مدة كل جولة
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDuration(Math.max(1, room.roundDuration - 1))}
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5 text-zinc-300" />
                  </button>
                  <span className="text-sm font-black text-white w-12 text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {room.roundDuration} د
                  </span>
                  <button
                    onClick={() => setDuration(Math.min(10, room.roundDuration + 1))}
                    className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-zinc-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Case info (non-host) */}
        {!isHost && room.caseMeta && (
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-xs text-zinc-500 mb-1">القضية المختارة</p>
            <h4 className="font-bold text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {room.caseMeta.title}
            </h4>
            <p className="text-xs text-zinc-500 mt-1">
              {room.caseMeta.characters.length} لاعبين · {room.caseMeta.totalRounds} جولات · {room.roundDuration} دقيقة/جولة
            </p>
          </div>
        )}

        {!isHost && !room.caseMeta && (
          <div className="text-center text-sm text-zinc-500 py-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
            في انتظار المضيف لاختيار القضية...
          </div>
        )}

        {/* Player count mismatch warning */}
        {isHost && room.caseMeta && connectedCount !== room.caseMeta.characters.length && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-950/20 border border-amber-900/30">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
              هذه القضية تحتاج {room.caseMeta.characters.length} لاعبين بالضبط، لديك الآن {connectedCount}
            </p>
          </div>
        )}
      </div>

      {/* Bottom start button */}
      {isHost && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-lg mx-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={!canStart || loading}
              className="w-full py-4 bg-red-700 hover:bg-red-600 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-2xl font-bold text-white text-lg transition-all border border-red-600/40 disabled:border-zinc-700 flex items-center justify-center gap-3"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Play className="w-5 h-5" /> ابدأ اللعبة</>
              )}
            </motion.button>
            {!canStart && !loading && (
              <p className="text-center text-xs text-zinc-600 mt-2" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {!room.caseMeta ? "اختر قضية أولاً" : connectedCount < 4 ? "يلزم ٤ لاعبين على الأقل" : "عدد اللاعبين لا يناسب القضية المختارة"}
              </p>
            )}
          </div>
        </div>
      )}

      {!isHost && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="max-w-lg mx-auto">
            <div className="w-full py-4 bg-zinc-900/80 border border-zinc-800 rounded-2xl text-center">
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                في انتظار المضيف ليبدأ اللعبة...
              </p>
              <div className="flex justify-center gap-1 mt-2">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
