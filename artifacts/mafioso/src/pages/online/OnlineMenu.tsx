import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useOnline } from "@/context/OnlineContext";
import { ArrowRight, Plus, Users, Wifi, WifiOff, AlertCircle, X, Server } from "lucide-react";

type Tab = "create" | "join";

export default function OnlineMenu() {
  const [, setLocation] = useLocation();
  const { connected, room, createRoom, joinRoom, error, clearError } = useOnline();

  const [tab, setTab] = useState<Tab>("create");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectSeconds, setConnectSeconds] = useState(0);

  // Count seconds while not connected — helps user know the server is waking up
  useEffect(() => {
    if (connected) { setConnectSeconds(0); return; }
    const t = setInterval(() => setConnectSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [connected]);

  // Navigate to room once room is established (use effect — never call setLocation during render)
  useEffect(() => {
    if (room) setLocation("/online/room");
  }, [room, setLocation]);

  function handleCreate() {
    if (!playerName.trim()) return;
    setLoading(true);
    clearError();
    createRoom(playerName.trim());
    // Loading will stop when room is set (and we navigate away) or on error
    setTimeout(() => setLoading(false), 5000);
  }

  function handleJoin() {
    if (!playerName.trim() || !roomCode.trim()) return;
    setLoading(true);
    clearError();
    joinRoom(roomCode.trim(), playerName.trim());
    setTimeout(() => setLoading(false), 5000);
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              اللعب أونلاين
            </h1>
            <p className="text-xs text-zinc-500">العب مع أصدقائك عن بُعد</p>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold ${
            connected ? "bg-green-950/50 border border-green-900/40 text-green-400"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-500"
          }`}>
            {connected ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {connected ? "متصل" : "يتصل..."}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full px-4 py-6 space-y-6">
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-950/40 border border-red-900/50"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="flex-1 text-sm text-red-300" style={{ fontFamily: "'Cairo', sans-serif" }}>{error}</p>
              <button onClick={clearError} className="text-red-500 hover:text-red-300">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* How it works */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <h3 className="text-sm font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>كيف يعمل؟</h3>
          <div className="space-y-2 text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold shrink-0">١.</span>
              <span>المضيف ينشئ غرفة ويحصل على كود مكون من ٤ أحرف</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold shrink-0">٢.</span>
              <span>الأصدقاء يدخلون الكود من أجهزتهم</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold shrink-0">٣.</span>
              <span>كل شخص يرى بطاقته السرية على موبايله</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold shrink-0">٤.</span>
              <span>التصويت والجولات تتزامن على كل الأجهزة</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl bg-zinc-900 border border-zinc-800 p-1 gap-1">
          {(["create", "join"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); clearError(); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === t
                  ? "bg-red-700 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {t === "create" ? "إنشاء غرفة" : "دخول غرفة"}
            </button>
          ))}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === "create" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Player name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
                اسمك في اللعبة
              </label>
              <input
                type="text"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (tab === "create" ? handleCreate() : handleJoin())}
                placeholder="مثال: أحمد"
                maxLength={20}
                className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700/50 transition-all text-sm"
                style={{ fontFamily: "'Cairo', sans-serif" }}
                dir="rtl"
              />
            </div>

            {/* Room code (join only) */}
            {tab === "join" && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  كود الغرفة
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={e => setRoomCode(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && handleJoin()}
                  placeholder="مثال: A7B2"
                  maxLength={4}
                  className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700/50 transition-all text-center text-2xl font-black tracking-widest uppercase"
                  dir="ltr"
                />
              </div>
            )}

            {/* Action button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={tab === "create" ? handleCreate : handleJoin}
              disabled={!connected || loading || !playerName.trim() || (tab === "join" && roomCode.length < 4)}
              className="w-full py-4 bg-red-700 hover:bg-red-600 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-2xl font-bold text-white text-lg transition-all border border-red-600/40 disabled:border-zinc-700 flex items-center justify-center gap-3"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : tab === "create" ? (
                <><Plus className="w-5 h-5" /> إنشاء غرفة</>
              ) : (
                <><Users className="w-5 h-5" /> دخول الغرفة</>
              )}
            </motion.button>

            {!connected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <Server className="w-4 h-4 text-zinc-400 shrink-0" />
                  <p className="text-sm font-bold text-zinc-300" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    جاري تشغيل السيرفر...
                  </p>
                  {/* animated dots */}
                  <span className="flex gap-0.5">
                    {[0,1,2].map(i => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-zinc-500"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                </div>

                {connectSeconds > 5 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-zinc-500 leading-relaxed"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                  >
                    {connectSeconds < 20
                      ? "السيرفر بيصحى من النوم، استنى ثوانٍ..."
                      : connectSeconds < 45
                      ? `بيشتغل... (${connectSeconds}ث) — ممكن ياخد لحد دقيقة`
                      : "لو استنيت كتير تأكد من الاتصال بالإنترنت"
                    }
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
