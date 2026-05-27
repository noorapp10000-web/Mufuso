import { useState } from "react";
import { ArrowRight, User, Check } from "lucide-react";
import { useGame } from "../App";

export default function PlayerSetup() {
  const { state, setupPlayers, goHome } = useGame();
  const [names, setNames] = useState(["", "", "", "", ""]);

  const allFilled = names.every((n) => n.trim().length > 0);

  const handleChange = (index: number, value: string) => {
    setNames((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleStart = () => {
    if (allFilled) {
      setupPlayers(names.map((n) => n.trim()));
    }
  };

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col" dir="rtl">
      {/* Header */}
      <div
        className="px-4 pt-10 pb-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <button
            data-testid="button-back"
            onClick={goHome}
            className="w-9 h-9 rounded-full border border-[#D4AF37] border-opacity-40 flex items-center justify-center text-[#D4AF37]"
          >
            <ArrowRight size={18} />
          </button>
          <div>
            <h1 className="gold-text text-xl font-bold" style={{ fontFamily: "Amiri, serif" }}>
              أسماء اللاعبين
            </h1>
            <p className="text-[#F5E6E8] text-opacity-50 text-xs" style={{ fontFamily: "Cairo, sans-serif" }}>
              {state.selectedCase?.title}
            </p>
          </div>
        </div>
      </div>

      {/* Case preview */}
      {state.selectedCase && (
        <div className="mx-4 mt-4 p-3 rounded-xl" style={{ background: "rgba(74,14,23,0.6)", border: "1px solid rgba(212,175,55,0.2)" }}>
          <p className="text-[#D4AF37] text-xs font-bold mb-1" style={{ fontFamily: "Cairo, sans-serif" }}>
            القضية المختارة
          </p>
          <p className="text-[#F5E6E8] text-sm leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
            {state.selectedCase.crimeDescription.substring(0, 100)}...
          </p>
        </div>
      )}

      {/* Player name inputs */}
      <div className="flex-1 px-4 pt-6 space-y-4">
        <p className="text-[#F5E6E8] text-opacity-60 text-sm text-center mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>
          أدخل أسماء الخمسة لاعبين
        </p>
        {names.map((name, index) => (
          <div key={index} className="relative">
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
              style={{
                background: "rgba(74,14,23,0.7)",
                border: name.trim() ? "1px solid rgba(212,175,55,0.6)" : "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                {name.trim() ? (
                  <Check size={14} className="text-[#D4AF37]" />
                ) : (
                  <User size={14} className="text-[#D4AF37] opacity-60" />
                )}
              </div>
              <div className="flex-1">
                <label className="text-[#D4AF37] text-xs opacity-70 block mb-0.5" style={{ fontFamily: "Cairo, sans-serif" }}>
                  اللاعب {index + 1}
                </label>
                <input
                  data-testid={`input-player-${index + 1}`}
                  type="text"
                  value={name}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder={`اسم اللاعب ${index + 1}`}
                  className="w-full bg-transparent outline-none text-sm"
                  style={{ color: "#F5E6E8", fontFamily: "Cairo, sans-serif" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div className="px-4 pb-8 pt-6">
        <button
          data-testid="button-start-game"
          onClick={handleStart}
          disabled={!allFilled}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            allFilled
              ? "btn-gold shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
              : "opacity-40 cursor-not-allowed"
          }`}
          style={{
            fontFamily: "Cairo, sans-serif",
            background: allFilled ? undefined : "rgba(74,14,23,0.5)",
            border: allFilled ? undefined : "1px solid rgba(212,175,55,0.2)",
            color: allFilled ? undefined : "#F5E6E8",
          }}
        >
          ابدأ الكشف عن الأدوار
        </button>
        <p className="text-center text-[#F5E6E8] text-opacity-40 text-xs mt-3" style={{ fontFamily: "Cairo, sans-serif" }}>
          كل لاعب سيرى دوره سراً على الشاشة
        </p>
      </div>
    </div>
  );
}
