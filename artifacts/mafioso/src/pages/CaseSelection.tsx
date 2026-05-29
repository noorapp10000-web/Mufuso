import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CASES } from "@/data/cases";
import { CASES_5P } from "@/data/allCases";
import { ArrowRight, MapPin, AlertCircle, Users } from "lucide-react";

const categoryColors: Record<string, string> = {
  "جريمة قتل": "text-red-400 bg-red-950/40 border-red-900/40",
  "سرقة": "text-amber-400 bg-amber-950/40 border-amber-900/40",
  "تخريب": "text-orange-400 bg-orange-950/40 border-orange-900/40",
  "تسميم": "text-green-400 bg-green-950/40 border-green-900/40",
  "احتيال": "text-blue-400 bg-blue-950/40 border-blue-900/40",
  "اختلاس": "text-purple-400 bg-purple-950/40 border-purple-900/40",
  "ابتزاز": "text-pink-400 bg-pink-950/40 border-pink-900/40",
  "تزوير": "text-yellow-400 bg-yellow-950/40 border-yellow-900/40",
  "جريمة إلكترونية": "text-cyan-400 bg-cyan-950/40 border-cyan-900/40",
  "جريمة منظمة": "text-rose-400 bg-rose-950/40 border-rose-900/40",
  "احتيال مالي": "text-indigo-400 bg-indigo-950/40 border-indigo-900/40",
  "اختطاف": "text-teal-400 bg-teal-950/40 border-teal-900/40",
};

function CaseCard({ caseItem, index }: { caseItem: (typeof CASES)[0]; index: number }) {
  const [, setLocation] = useLocation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
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

type Tab = "4" | "5";

export default function CaseSelection() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("4");

  const activeCases = activeTab === "4" ? CASES : CASES_5P;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-0 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation("/")}
              className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                اختر القضية
              </h1>
              <p className="text-xs text-zinc-500">
                {CASES.length + CASES_5P.length} قضية متاحة
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 relative">
            {([
              { key: "4" as Tab, label: "٤ لاعبين", count: CASES.length, color: "red" },
              { key: "5" as Tab, label: "٥ لاعبين", count: CASES_5P.length, color: "purple" },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-3 text-sm font-bold transition-colors rounded-t-xl ${
                  activeTab === tab.key
                    ? tab.color === "red"
                      ? "text-red-400"
                      : "text-purple-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={{ fontFamily: "'Cairo', sans-serif" }}
              >
                <Users className="w-3.5 h-3.5" />
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  activeTab === tab.key
                    ? tab.color === "red"
                      ? "bg-red-950/60 text-red-400 border border-red-900/40"
                      : "bg-purple-950/60 text-purple-400 border border-purple-900/40"
                    : "bg-zinc-800/60 text-zinc-500 border border-zinc-700/40"
                }`}>
                  {tab.count}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                      tab.color === "red" ? "bg-red-500" : "bg-purple-500"
                    }`}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {activeCases.map((caseItem, index) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
