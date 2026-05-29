import { useState } from "react";
import { ArrowRight, Search, Users, Skull } from "lucide-react";
import { useGame } from "../App";
import { CASES, Case } from "../data/cases";

type Tab = 4 | 5;

export default function CaseSelection() {
  const { selectCase, goHome } = useGame();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>(4);

  const filtered = CASES.filter(
    (c) =>
      c.players === tab &&
      (c.title.includes(query) ||
        c.category.includes(query) ||
        c.crimeScene.includes(query))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#130212] to-[#20051C]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#130212]/96 backdrop-blur-sm px-5 pt-10 pb-3 border-b border-gold/10">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={goHome}
            className="p-2 rounded-lg bg-[#350A22] border border-gold/20 active:scale-95 transition-transform"
          >
            <ArrowRight className="w-5 h-5 text-gold" strokeWidth={1.5} />
          </button>
          <h2 className="text-xl font-bold text-gold font-amiri">اختر القضية</h2>
        </div>

        {/* Player Tabs */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setTab(4)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-cairo text-sm font-bold transition-all duration-200 active:scale-[0.97] border
              ${tab === 4
                ? "bg-gold text-[#130212] border-gold shadow-md shadow-gold/20"
                : "bg-[#350A22]/60 text-gold/50 border-gold/15 hover:border-gold/30"
              }`}
          >
            <Users className="w-4 h-4" strokeWidth={2} />
            ٤ لاعبين
            <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${tab === 4 ? "bg-[#130212]/20 text-[#130212]" : "bg-gold/10 text-gold/40"}`}>
              ٣٠
            </span>
          </button>
          <button
            onClick={() => setTab(5)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-cairo text-sm font-bold transition-all duration-200 active:scale-[0.97] border
              ${tab === 5
                ? "bg-gold text-[#130212] border-gold shadow-md shadow-gold/20"
                : "bg-[#350A22]/60 text-gold/50 border-gold/15 hover:border-gold/30"
              }`}
          >
            <Users className="w-4 h-4" strokeWidth={2} />
            ٥ لاعبين
            <span className={`text-[10px] rounded-full px-1.5 py-0.5 font-bold ${tab === 5 ? "bg-[#130212]/20 text-[#130212]" : "bg-gold/10 text-gold/40"}`}>
              ٣٠
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/40" strokeWidth={1.5} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث في القضايا..."
            className="w-full bg-[#350A22] border border-gold/20 rounded-lg py-2.5 pr-9 pl-3 text-gold text-sm font-cairo placeholder-gold/30 focus:outline-none focus:border-gold/50"
            dir="rtl"
          />
        </div>
      </div>

      {/* Cases List */}
      <div className="flex flex-col gap-4 px-4 py-4 pb-12">
        {filtered.map((c) => (
          <CaseCard key={c.id} c={c} onSelect={() => selectCase(c)} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gold/40 font-cairo mt-20 text-sm">لا توجد قضايا مطابقة</p>
        )}
      </div>
    </div>
  );
}

function CaseCard({ c, onSelect }: { c: Case; onSelect: () => void }) {
  const isHard = c.id <= 30;

  return (
    <button
      onClick={onSelect}
      className="w-full text-right rounded-2xl border border-gold/20 bg-[#1C0418] hover:border-gold/45 hover:bg-[#250620] transition-all duration-200 active:scale-[0.98] overflow-hidden shadow-lg shadow-black/30"
    >
      {/* Top row: SVG + header info */}
      <div className="flex items-stretch">
        {/* SVG Scene - larger */}
        <div className="w-28 flex-shrink-0 bg-[#130212] flex items-center justify-center p-2.5 border-l border-gold/10">
          <div className="w-full aspect-square">
            <c.SvgScene />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-3.5 flex flex-col justify-between gap-1.5 min-h-[112px]">
          {/* Badges row */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] font-cairo px-2 py-0.5 rounded-full border text-gold/60 border-gold/20 bg-gold/5">
              {c.category}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] font-cairo text-gold/50 bg-[#350A22] border border-gold/15 rounded-full px-2 py-0.5">
                <Users className="w-2.5 h-2.5" />
                {c.players}
              </span>
              <span className={`flex items-center gap-1 text-[10px] font-cairo rounded-full px-2 py-0.5 border font-bold
                ${isHard
                  ? "text-amber-400/80 border-amber-400/25 bg-amber-400/5"
                  : "text-red-400/80 border-red-400/25 bg-red-400/5"
                }`}>
                <Skull className="w-2.5 h-2.5" />
                {isHard ? "صعب" : "خارق"}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-cairo text-gold/25">#{c.id}</span>
            <p className="text-[16px] font-bold text-gold font-amiri leading-tight">{c.title}</p>
          </div>

          {/* Words preview */}
          <div className="flex gap-2">
            <span className="text-[10px] font-cairo text-gold/40 bg-[#130212] border border-gold/10 rounded px-2 py-0.5">
              الكلمة: <span className="text-gold/65 font-bold">{c.citizensWord}</span>
            </span>
            <span className="text-[10px] font-cairo text-gold/40 bg-[#130212] border border-gold/10 rounded px-2 py-0.5">
              المافيوسو: <span className="text-red-400/50 font-bold">???</span>
            </span>
          </div>
        </div>
      </div>

      {/* Crime Scene — full, no scrolling */}
      <div className="px-4 pt-3 pb-4 border-t border-gold/10 bg-[#130212]/50">
        <p className="text-[10px] font-cairo text-gold/35 mb-1.5 text-right">مشهد الجريمة</p>
        <p className="text-gold/65 text-xs font-cairo leading-relaxed text-right">
          {c.crimeScene}
        </p>
        <div className="mt-3 flex justify-start">
          <span className="text-[11px] font-cairo font-bold text-[#130212] bg-gold px-4 py-1.5 rounded-lg shadow-sm shadow-gold/20">
            العب الآن ←
          </span>
        </div>
      </div>
    </button>
  );
}
