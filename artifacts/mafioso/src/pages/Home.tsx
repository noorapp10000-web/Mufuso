import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CASES } from "@/data/cases";
import { CASES_5P, CASES_6P } from "@/data/allCases";
import { BookOpen, Users, Swords, Wifi, MonitorSmartphone } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();
  const totalCases = CASES.length + CASES_5P.length + CASES_6P.length;

  const stats = [
    { icon: BookOpen, value: String(totalCases), label: "قضية" },
    { icon: Users,    value: "٤-٦",              label: "لاعبين" },
    { icon: Swords,   value: "٣",                label: "جولات" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden overflow-y-auto" dir="rtl">

      {/* Fixed background decorations */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-0" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-950/20 rounded-full blur-3xl" />
      </div>
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent z-0" />
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent z-0" />

      {/* Main scrollable content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-6 py-10 text-center gap-8">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 w-full"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-red-700/25 blur-2xl scale-125" />
            <div
              className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-red-700/60 shadow-2xl relative mx-auto"
              style={{ boxShadow: "0 0 40px rgba(185,28,28,0.5), 0 0 80px rgba(185,28,28,0.2)" }}
            >
              <img
                src="/case-images/logo.webp"
                alt="Mafioso Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                  t.parentElement!.style.background = "linear-gradient(135deg, #450a0a 0%, #0d0d0d 100%)";
                  t.parentElement!.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;"><span style="color:#dc2626;font-size:3rem;font-weight:900">M</span></div>`;
                }}
              />
            </div>
          </motion.div>

          {/* Title */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl font-black tracking-tight text-white"
              style={{
                fontFamily: "'Cairo', sans-serif",
                textShadow: "0 0 30px rgba(220,38,38,0.6), 0 2px 8px rgba(0,0,0,0.8)"
              }}
            >
              مافيوسو
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-amber-400/90 text-sm font-medium tracking-[0.35em] uppercase"
            >
              MAFIOSO
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="w-20 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-zinc-300 text-sm max-w-xs mx-auto leading-relaxed"
              style={{ fontFamily: "'Cairo', sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
            >
              لعبة استنتاج اجتماعي. من ٤ لـ ٦ لاعبين. أبرياء ومجرمون مختبئون في وسطكم.
            </motion.p>
          </div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="grid grid-cols-3 gap-3 w-full max-w-xs"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.1, duration: 0.4 }}
                className="text-center p-3 rounded-2xl border backdrop-blur-sm bg-black/40 border-amber-900/30"
              >
                <stat.icon className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                <div
                  className="text-2xl font-black text-amber-400"
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 mt-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mode selection buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="w-full max-w-xs space-y-3"
          >
            {/* Offline — same device */}
            <motion.button
              onClick={() => setLocation("/cases")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full px-6 py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all duration-300 shadow-2xl border border-red-600/50 flex items-center justify-center gap-3"
              style={{
                fontFamily: "'Cairo', sans-serif",
                boxShadow: "0 0 30px rgba(185,28,28,0.45), 0 4px 20px rgba(0,0,0,0.6)"
              }}
            >
              <MonitorSmartphone className="w-5 h-5 shrink-0" />
              <span>لعب محلي</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            {/* Online — multiplayer */}
            <motion.button
              onClick={() => setLocation("/online")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative group w-full px-6 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-bold text-white text-lg transition-all duration-300 border border-zinc-700/60 flex items-center justify-center gap-3"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Wifi className="w-5 h-5 shrink-0 text-green-400" />
              <span>لعب أونلاين</span>
              <span className="absolute -top-2 -left-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                جديد
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="text-zinc-500 text-xs"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            محلي: نفس الجهاز · أونلاين: كل لاعب على جهازه
          </motion.p>
        </motion.div>

        {/* Bullet decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex justify-center gap-3"
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-700/50" />
          ))}
        </motion.div>

        {/* Credits box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="w-full max-w-xs"
        >
          <div
            className="rounded-2xl border border-red-900/30 bg-black/50 backdrop-blur-sm px-5 py-4 text-center space-y-2"
            style={{ boxShadow: "0 0 20px rgba(120,0,0,0.2)" }}
          >
            <p className="text-zinc-500 text-xs" style={{ fontFamily: "'Cairo', sans-serif" }}>
              تصميم وتطوير
            </p>
            <p
              className="text-red-400"
              style={{
                fontFamily: "'Amiri', serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textShadow: "0 0 12px rgba(220,38,38,0.4)"
              }}
            >
              سيف كامل
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
