import { useState, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CASES } from "@/data/cases";
import { CASES_5P, CASES_6P } from "@/data/allCases";
import { ArrowRight, MapPin, AlertCircle, Shuffle, X } from "lucide-react";

const categoryColors: Record<string, string> = {
  "جريمة قتل":     "text-red-400 bg-red-950/40 border-red-900/40",
  "سرقة":           "text-amber-400 bg-amber-950/40 border-amber-900/40",
  "تخريب":          "text-orange-400 bg-orange-950/40 border-orange-900/40",
  "تسميم":          "text-green-400 bg-green-950/40 border-green-900/40",
  "احتيال":         "text-blue-400 bg-blue-950/40 border-blue-900/40",
  "اختلاس":         "text-purple-400 bg-purple-950/40 border-purple-900/40",
  "ابتزاز":         "text-pink-400 bg-pink-950/40 border-pink-900/40",
  "تزوير":          "text-yellow-400 bg-yellow-950/40 border-yellow-900/40",
  "جريمة إلكترونية":"text-cyan-400 bg-cyan-950/40 border-cyan-900/40",
  "جريمة منظمة":    "text-rose-400 bg-rose-950/40 border-rose-900/40",
  "جريمة مالية":    "text-indigo-400 bg-indigo-950/40 border-indigo-900/40",
  "احتيال مالي":    "text-indigo-400 bg-indigo-950/40 border-indigo-900/40",
  "اختطاف":         "text-teal-400 bg-teal-950/40 border-teal-900/40",
  "تجسس":           "text-violet-400 bg-violet-950/40 border-violet-900/40",
  "تهريب":          "text-lime-400 bg-lime-950/40 border-lime-900/40",
};

const categoryFilterColors: Record<string, string> = {
  "جريمة قتل":     "border-red-700/70 bg-red-900/30 text-red-300",
  "سرقة":           "border-amber-700/70 bg-amber-900/30 text-amber-300",
  "تخريب":          "border-orange-700/70 bg-orange-900/30 text-orange-300",
  "تسميم":          "border-green-700/70 bg-green-900/30 text-green-300",
  "احتيال":         "border-blue-700/70 bg-blue-900/30 text-blue-300",
  "اختلاس":         "border-purple-700/70 bg-purple-900/30 text-purple-300",
  "ابتزاز":         "border-pink-700/70 bg-pink-900/30 text-pink-300",
  "تزوير":          "border-yellow-700/70 bg-yellow-900/30 text-yellow-300",
  "جريمة إلكترونية":"border-cyan-700/70 bg-cyan-900/30 text-cyan-300",
  "جريمة منظمة":    "border-rose-700/70 bg-rose-900/30 text-rose-300",
  "جريمة مالية":    "border-indigo-700/70 bg-indigo-900/30 text-indigo-300",
  "احتيال مالي":    "border-indigo-700/70 bg-indigo-900/30 text-indigo-300",
  "اختطاف":         "border-teal-700/70 bg-teal-900/30 text-teal-300",
  "تجسس":           "border-violet-700/70 bg-violet-900/30 text-violet-300",
  "تهريب":          "border-lime-700/70 bg-lime-900/30 text-lime-300",
};

const COUNT_CONFIG: Record<string, { cases: typeof CASES; label: string; randomBtnClass: string }> = {
  "4": {
    cases: CASES,
    label: "٤ لاعبين",
    randomBtnClass: "bg-red-900/40 hover:bg-red-800/50 border-red-800/50 hover:border-red-600/60 text-red-300",
  },
  "5": {
    cases: CASES_5P as typeof CASES,
    label: "٥ لاعبين",
    randomBtnClass: "bg-purple-900/40 hover:bg-purple-800/50 border-purple-800/50 hover:border-purple-600/60 text-purple-300",
  },
  "6": {
    cases: CASES_6P as typeof CASES,
    label: "٦ لاعبين",
    randomBtnClass: "bg-blue-900/40 hover:bg-blue-800/50 border-blue-800/50 hover:border-blue-600/60 text-blue-300",
  },
};

type AnyCase = (typeof CASES)[0];

function CaseCard({ caseItem, index }: { caseItem: AnyCase; index: number }) {
  const [, setLocation] = useLocation();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      onClick={() => setLocation(`/setup/${caseItem.id}`)}
      className="group cursor-pointer card-hover"
    >
      <div className="bg-card border border-card-border rounded-2xl overflow-hidden hover:border-red-800/50 transition-colors">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
          <img
            src={caseItem.coverImage}
            alt={caseItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement!;
              parent.classList.add("flex", "items-center", "justify-center");
              parent.innerHTML = `<div class="text-center p-3"><div class="text-3xl font-black text-red-800/30" style="font-family: Cairo, sans-serif">${index + 1}</div></div>`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-2 right-2 bg-black/60 rounded-lg px-2 py-0.5 text-xs font-bold text-zinc-300 border border-white/10">
            #{String(index + 1).padStart(2, "0")}
          </div>
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-bold text-sm text-white leading-snug line-clamp-2 group-hover:text-red-300 transition-colors" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {caseItem.title}
          </h3>
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColors[caseItem.category] || "text-zinc-400 bg-zinc-900 border-zinc-800"}`}>
            <AlertCircle className="w-2.5 h-2.5" />
            {caseItem.category}
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="line-clamp-1">{caseItem.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseSelection() {
  const [, setLocation] = useLocation();
  const { count } = useParams<{ count: string }>();
  const config = COUNT_CONFIG[count ?? "4"] ?? COUNT_CONFIG["4"];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [randomFlash, setRandomFlash] = useState(false);

  const allCases = config.cases as AnyCase[];

  const categories = useMemo(() => {
    const cats = new Set(allCases.map((c) => c.category));
    return Array.from(cats).sort();
  }, [allCases]);

  const filteredCases = useMemo(() => {
    if (!selectedCategory) return allCases;
    return allCases.filter((c) => c.category === selectedCategory);
  }, [allCases, selectedCategory]);

  function handleRandom() {
    if (filteredCases.length === 0) return;
    setRandomFlash(true);
    setTimeout(() => setRandomFlash(false), 600);
    const pick = filteredCases[Math.floor(Math.random() * filteredCases.length)];
    setTimeout(() => setLocation(`/setup/${pick.id}`), 300);
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-3 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/cases")}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                اختر القضية
              </h1>
              <p className="text-xs text-zinc-500">
                {config.label} · {allCases.length} قضية متاحة
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              animate={randomFlash ? { scale: [1, 1.12, 1] } : {}}
              onClick={handleRandom}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-bold ${config.randomBtnClass}`}
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              <Shuffle className="w-4 h-4" />
              عشوائي
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-4 pb-0">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              selectedCategory === null
                ? "bg-zinc-700 border-zinc-500 text-white"
                : "bg-zinc-900/60 border-zinc-700/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
            }`}
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            الكل
            <span className="text-xs opacity-60">({allCases.length})</span>
          </button>

          {categories.map((cat) => {
            const count2 = allCases.filter((c) => c.category === cat).length;
            const isActive = selectedCategory === cat;
            const activeStyle = categoryFilterColors[cat] || "border-zinc-600 bg-zinc-800/50 text-zinc-300";
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isActive ? null : cat)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isActive
                    ? activeStyle
                    : "bg-zinc-900/60 border-zinc-700/40 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                {cat}
                <span className="opacity-60">({count2})</span>
                {isActive && <X className="w-3 h-3 opacity-70" />}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.p
              key={selectedCategory}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-zinc-500 mt-2 mb-0"
            >
              {filteredCases.length} قضية في "{selectedCategory}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory ?? "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {filteredCases.map((caseItem, index) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCases.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-zinc-600"
          >
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
              مفيش قضايا في هذه الفئة
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
