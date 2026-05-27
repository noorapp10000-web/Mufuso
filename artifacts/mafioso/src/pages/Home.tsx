import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center relative overflow-hidden" dir="rtl">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-900/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-950/15 rounded-full blur-3xl" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 z-10 px-6 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-red-800/50 shadow-2xl glow-red mx-auto mb-2">
            <img
              src="/case-images/logo.png"
              alt="Mafioso Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-red-950 to-black flex items-center justify-center">
                    <div class="text-red-500 text-5xl font-black font-sans">M</div>
                  </div>
                `;
              }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl font-black tracking-tight text-white glow-red-text"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            مافيوسو
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-amber-400/80 text-xl font-medium tracking-widest uppercase"
            style={{ letterSpacing: "0.3em" }}
          >
            MAFIOSO
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-zinc-400 text-base max-w-sm mx-auto leading-relaxed"
          >
            لعبة استنتاج اجتماعي. ٤ لاعبين. ٣ أبرياء. مجرم واحد مختبئ في وسطكم.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 w-full max-w-xs"
        >
          {[
            { value: "٣٠", label: "قضية" },
            { value: "٤", label: "لاعبين" },
            { value: "٣", label: "جولات" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="text-2xl font-black text-red-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onClick={() => setLocation("/cases")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-12 py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-xl text-white transition-all duration-300 pulse-glow shadow-2xl border border-red-600/50"
        >
          <span className="relative z-10">ابدأ اللعبة</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* How to play hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="text-zinc-600 text-sm flex items-center gap-2"
        >
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
          <span>اختر قضية، ادخل الأسماء، اكشف المافيوسو</span>
          <div className="w-1 h-1 rounded-full bg-zinc-600" />
        </motion.div>
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-red-900/40"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </motion.div>
    </div>
  );
}
