import { useState } from "react";
import { ArrowRight, Lock, Search } from "lucide-react";
import { useGame } from "../App";
import { CASES, Case } from "../data/cases";

export default function CaseSelection() {
  const { selectCase, goHome } = useGame();
  const [query, setQuery] = useState("");

  const filtered = CASES.filter(
    (c) =>
      c.title.includes(query) ||
      c.category.includes(query) ||
      c.citizensWord.includes(query) ||
      c.mafiusoWord.includes(query)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509]">
      <div className="sticky top-0 z-10 bg-[#120204]/95 backdrop-blur-sm px-5 pt-12 pb-4 border-b border-gold/10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goHome} className="p-2 rounded-lg bg-[#2D0A10] border border-gold/20 active:scale-95 transition-transform">
            <ArrowRight className="w-5 h-5 text-gold" strokeWidth={1.5} />
          </button>
          <h2 className="text-xl font-bold text-gold font-amiri">اختر القضية</h2>
        </div>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن قضية..."
            className="w-full bg-[#2D0A10] border border-gold/20 rounded-lg py-2.5 pr-9 pl-3 text-gold text-sm font-cairo placeholder-gold/30 focus:outline-none focus:border-gold/50"
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 pb-10">
        {filtered.map((c) => (
          <CaseCard key={c.id} c={c} onSelect={() => c.isUnlocked && selectCase(c)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gold/40 font-cairo mt-16 text-sm">لا توجد قضايا مطابقة</p>
        )}
      </div>
    </div>
  );
}

function CaseCard({ c, onSelect }: { c: Case; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      disabled={!c.isUnlocked}
      className={`w-full text-right rounded-xl border transition-all duration-200 active:scale-[0.98] overflow-hidden
        ${c.isUnlocked
          ? "bg-[#2D0A10] border-gold/25 hover:border-gold/60 hover:bg-[#380C14]"
          : "bg-[#1A0508]/60 border-gold/10 opacity-55"
        }`}
    >
      <div className="flex items-stretch">
        <div className="w-20 flex-shrink-0 bg-[#1A0508] flex items-center justify-center p-2">
          <c.SvgScene />
        </div>
        <div className="flex flex-col justify-between flex-1 p-3">
          <div className="flex items-start justify-between gap-2">
            <span className={`text-xs font-cairo px-2 py-0.5 rounded-full border ${c.isUnlocked ? "text-gold/70 border-gold/20 bg-gold/5" : "text-gold/30 border-gold/10"}`}>
              {c.category}
            </span>
            {!c.isUnlocked && (
              <Lock className="w-4 h-4 text-gold/30 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            )}
          </div>
          <p className={`text-base font-bold font-cairo mt-1.5 ${c.isUnlocked ? "text-gold" : "text-gold/40"}`}>
            {c.title}
          </p>
          {c.isUnlocked && (
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] font-cairo text-gold/40 bg-[#1A0508] border border-gold/10 rounded px-2 py-0.5">
                المواطنون: <span className="text-gold/60 font-bold">{c.citizensWord}</span>
              </span>
              <span className="text-[10px] font-cairo text-gold/40 bg-[#1A0508] border border-gold/10 rounded px-2 py-0.5">
                المافيوسو: <span className="text-gold/60 font-bold">???</span>
              </span>
            </div>
          )}
          {!c.isUnlocked && (
            <p className="text-gold/30 text-[10px] font-cairo mt-1">قضية مقفلة</p>
          )}
        </div>
      </div>
    </button>
  );
}
