import { useState } from "react";
import { ArrowRight, User } from "lucide-react";
import { useGame } from "../App";

export default function PlayerSetup() {
  const { goHome, setupPlayers, state } = useGame();
  const playerCount = state.selectedCase?.players ?? 4;
  const [names, setNames] = useState<string[]>(Array(playerCount).fill(""));

  const updateName = (i: number, val: string) => {
    setNames((prev) => {
      const n = [...prev];
      n[i] = val;
      return n;
    });
  };

  const canStart = names.every((n) => n.trim().length > 0);

  const handleStart = () => {
    if (canStart) setupPlayers(names.map((n) => n.trim()));
  };

  const arabicOrdinals = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس"];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#130212] to-[#20051C] px-5 pt-12 pb-10">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={goHome}
          className="p-2 rounded-lg bg-[#350A22] border border-gold/20 active:scale-95 transition-transform"
        >
          <ArrowRight className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gold font-amiri">أسماء اللاعبين</h2>
          <p className="text-gold/40 text-xs font-cairo">{playerCount} لاعبين لهذه القضية</p>
        </div>
      </div>

      <div className="mb-4 px-4 py-3 rounded-xl bg-[#5B0E2E]/30 border border-gold/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
          <span className="text-gold text-xs font-bold font-cairo">{playerCount}</span>
        </div>
        <p className="text-gold/60 text-xs font-cairo leading-relaxed">
          سيُعيَّن <span className="text-gold font-bold">المافيوسو</span> عشوائياً بشكل سري — لن يعرفه أحد من البداية
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {names.map((name, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5B0E2E] border border-gold/30 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(i, e.target.value)}
                placeholder={`اللاعب ${arabicOrdinals[i] ?? (i + 1)}`}
                maxLength={16}
                className="w-full bg-[#350A22] border border-gold/20 rounded-xl py-3.5 px-4 text-gold text-base font-cairo placeholder-gold/30 focus:outline-none focus:border-gold/50 transition-colors"
                dir="rtl"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-4 rounded-xl font-bold text-lg font-cairo transition-all duration-200 active:scale-[0.97]
            ${canStart
              ? "bg-gold text-[#130212] hover:bg-gold/90 shadow-lg shadow-gold/20"
              : "bg-[#350A22] text-gold/30 border border-gold/10 cursor-not-allowed"
            }`}
        >
          ابدأ التوزيع السري
        </button>
      </div>
    </div>
  );
}
