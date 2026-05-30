import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Users, Skull } from "lucide-react";
import { CASES } from "@/data/cases";
import { CASES_5P, CASES_6P } from "@/data/allCases";

const MODES = [
  {
    count: "4",
    label: "٤ لاعبين",
    mafiosos: 1,
    innocents: 3,
    caseCount: CASES.length,
    description: "مافيوسو واحد يتخفى بين ٣ أبرياء",
    difficulty: "مبتدئ",
    diffBg: "bg-green-950/40 border-green-800/40 text-green-400",
    cardBg: "bg-red-950/25 border-red-800/40 hover:border-red-600/60",
    numColor: "text-red-400",
    glowColor: "rgba(185,28,28,0.25)",
    badgeBg: "bg-red-900/50 text-red-300 border-red-800/40",
    btnBg: "bg-red-700 hover:bg-red-600 border-red-600/40 shadow-red-900/40",
    skullColor: "text-red-500",
    skullBg: "bg-red-950/60 border-red-800/40",
  },
  {
    count: "5",
    label: "٥ لاعبين",
    mafiosos: 1,
    innocents: 4,
    caseCount: CASES_5P.length,
    description: "مافيوسو واحد يتخفى بين ٤ أبرياء",
    difficulty: "متوسط",
    diffBg: "bg-amber-950/40 border-amber-800/40 text-amber-400",
    cardBg: "bg-purple-950/25 border-purple-800/40 hover:border-purple-600/60",
    numColor: "text-purple-400",
    glowColor: "rgba(126,34,206,0.25)",
    badgeBg: "bg-purple-900/50 text-purple-300 border-purple-800/40",
    btnBg: "bg-purple-700 hover:bg-purple-600 border-purple-600/40 shadow-purple-900/40",
    skullColor: "text-purple-500",
    skullBg: "bg-purple-950/60 border-purple-800/40",
  },
  {
    count: "6",
    label: "٦ لاعبين",
    mafiosos: 2,
    innocents: 4,
    caseCount: CASES_6P.length,
    description: "مافيوسوَان يتعاونان بين ٤ أبرياء",
    difficulty: "متقدم",
    diffBg: "bg-blue-950/40 border-blue-800/40 text-blue-400",
    cardBg: "bg-blue-950/25 border-blue-800/40 hover:border-blue-600/60",
    numColor: "text-blue-400",
    glowColor: "rgba(29,78,216,0.25)",
    badgeBg: "bg-blue-900/50 text-blue-300 border-blue-800/40",
    btnBg: "bg-blue-700 hover:bg-blue-600 border-blue-600/40 shadow-blue-900/40",
    skullColor: "text-blue-500",
    skullBg: "bg-blue-950/60 border-blue-800/40",
  },
];

export default function PlayerCountSelect() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              كم لاعب؟
            </h1>
            <p className="text-xs text-zinc-500">اختر عدد اللاعبين لعرض القضايا المناسبة</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {MODES.map((mode, i) => (
          <motion.div
            key={mode.count}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <button
              onClick={() => setLocation(`/cases/${mode.count}`)}
              className={`w-full rounded-3xl border-2 p-5 text-right transition-all duration-200 cursor-pointer ${mode.cardBg}`}
              style={{ boxShadow: `0 0 30px ${mode.glowColor}` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${mode.skullBg}`}>
                  <Users className={`w-7 h-7 ${mode.skullColor}`} />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      className={`text-2xl font-black ${mode.numColor}`}
                      style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                      {mode.label}
                    </h2>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${mode.diffBg}`}
                      style={{ fontFamily: "'Cairo', sans-serif" }}>
                      {mode.difficulty}
                    </span>
                  </div>

                  <p className="text-zinc-300 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {mode.description}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: mode.mafiosos }).map((_, j) => (
                        <span key={j} className={`w-2.5 h-2.5 rounded-full ${mode.skullColor.replace("text-", "bg-")}`} />
                      ))}
                      {Array.from({ length: mode.innocents }).map((_, j) => (
                        <span key={j} className="w-2.5 h-2.5 rounded-full bg-zinc-500" />
                      ))}
                    </div>
                    <span className="text-zinc-500 text-xs">
                      {mode.mafiosos === 1 ? "مافيوسو واحد" : "مافيوسوَان"}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-center">
                  <div className={`text-3xl font-black ${mode.numColor}`} style={{ fontFamily: "'Cairo', sans-serif" }}>
                    {mode.caseCount}
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5">قضية</div>
                </div>
              </div>

              <div className={`mt-4 w-full py-2.5 rounded-xl font-bold text-sm text-white border transition-all text-center ${mode.btnBg}`}
                style={{ fontFamily: "'Cairo', sans-serif" }}>
                اختر قضية ←
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
