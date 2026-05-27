import { useState } from "react";
import { ArrowRight, Lock, Search } from "lucide-react";
import { useGame } from "../App";
import { CASES, Case } from "../data/cases";

export default function CaseSelection() {
  const { selectCase, goHome } = useGame();
  const [search, setSearch] = useState("");

  const filtered = CASES.filter((c) =>
    c.title.includes(search) || c.crimeDescription.includes(search)
  );

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col" dir="rtl">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-10 pb-4"
        style={{
          background: "linear-gradient(180deg, #120204 80%, transparent 100%)",
          borderBottom: "1px solid rgba(212,175,55,0.2)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            data-testid="button-back-home"
            onClick={goHome}
            className="w-9 h-9 rounded-full border border-[#D4AF37] border-opacity-40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-10 transition-all"
          >
            <ArrowRight size={18} />
          </button>
          <div>
            <h1 className="gold-text text-xl font-bold" style={{ fontFamily: "Amiri, serif" }}>
              اختر القضية
            </h1>
            <p className="text-[#F5E6E8] text-opacity-50 text-xs" style={{ fontFamily: "Cairo, sans-serif" }}>
              ٣٠ قضية غامضة — اكتشف الحقيقة
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37] opacity-60" />
          <input
            type="search"
            placeholder="ابحث عن قضية..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: "rgba(74,14,23,0.8)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#F5E6E8",
              fontFamily: "Cairo, sans-serif",
            }}
            data-testid="input-search-case"
          />
        </div>
      </div>

      {/* Cases Grid */}
      <div className="flex-1 px-4 pb-8 overflow-y-auto scroll-custom">
        <div className="grid grid-cols-2 gap-3 mt-4">
          {filtered.map((c) => (
            <CaseCard key={c.id} caseData={c} onSelect={() => selectCase(c)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#F5E6E8] text-opacity-40 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
              لا توجد نتائج
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseCard({ caseData, onSelect }: { caseData: Case; onSelect: () => void }) {
  const isLocked = !caseData.isUnlocked;

  return (
    <button
      data-testid={`card-case-${caseData.id}`}
      onClick={isLocked ? undefined : onSelect}
      className={`relative rounded-xl overflow-hidden text-right transition-all duration-300 ${
        isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
      }`}
      style={{
        background: "linear-gradient(135deg, #3D0A12 0%, #2D0A10 100%)",
        border: isLocked ? "1px solid rgba(212,175,55,0.2)" : "1px solid rgba(212,175,55,0.5)",
        boxShadow: isLocked
          ? "none"
          : "0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.1)",
      }}
    >
      {/* SVG Scene */}
      <div className="w-full aspect-square p-1 relative">
        <caseData.SvgScene />
        {isLocked && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg"
            style={{ background: "rgba(18,2,4,0.7)" }}
          >
            <Lock size={24} className="text-[#D4AF37] opacity-60" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-2.5 pb-2.5 pt-1">
        {/* Case number */}
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(212,175,55,0.15)",
              color: "#D4AF37",
              fontFamily: "Cairo, sans-serif",
              fontSize: "10px",
            }}
          >
            #{caseData.id}
          </span>
          {isLocked && (
            <span
              className="text-xs"
              style={{ color: "rgba(245,230,232,0.3)", fontFamily: "Cairo, sans-serif", fontSize: "9px" }}
            >
              مقفلة
            </span>
          )}
        </div>
        <p
          className="text-sm font-bold leading-tight"
          style={{
            color: isLocked ? "rgba(245,230,232,0.4)" : "#F5E6E8",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          {caseData.title}
        </p>
        <p
          className="text-xs mt-1 leading-relaxed line-clamp-2"
          style={{
            color: "rgba(245,230,232,0.45)",
            fontFamily: "Cairo, sans-serif",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {caseData.crimeDescription.substring(0, 60)}...
        </p>
      </div>

      {/* Bottom gold line for unlocked */}
      {!isLocked && (
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }}
        />
      )}
    </button>
  );
}
