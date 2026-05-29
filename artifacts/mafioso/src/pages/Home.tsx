import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" dir="rtl">

      {/* Street background image */}
      <div className="absolute inset-0">
        <img
          src="/bg_street_3.webp"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay layers for readability */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        {/* Red tint overlay */}
        <div className="absolute inset-0 bg-red-950/20" />
      </div>

      {/* Glow accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-950/20 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-8 z-10 px-6 text-center"
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
            لعبة استنتاج اجتماعي. ٤ أو ٥ لاعبين. أبرياء ومجرم واحد مختبئ في وسطكم.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="grid grid-cols-3 gap-3 w-full max-w-xs"
        >
          {[
            { value: "٦٠", label: "قضية" },
            { value: "٤-٥", label: "لاعبين" },
            { value: "٣", label: "جولات" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-2xl bg-black/40 border border-white/[0.10] backdrop-blur-sm">
              <div className="text-2xl font-black text-red-400" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-zinc-400 mt-0.5" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          onClick={() => setLocation("/cases")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative group px-14 py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-xl text-white transition-all duration-300 shadow-2xl border border-red-600/50"
          style={{
            fontFamily: "'Cairo', sans-serif",
            boxShadow: "0 0 30px rgba(185,28,28,0.45), 0 4px 20px rgba(0,0,0,0.6)"
          }}
        >
          <span className="relative z-10">ابدأ اللعبة</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.5 }}
          className="text-zinc-500 text-xs"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          اختر قضية · ادخل الأسماء · اكشف المافيوسو
        </motion.p>
      </motion.div>

      {/* Bullet decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-3"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-700/50" />
        ))}
      </motion.div>
    </div>
  );
}
