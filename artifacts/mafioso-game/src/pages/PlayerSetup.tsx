import { useState } from "react";
import { ArrowRight, User, Plus, Minus } from "lucide-react";
import { useGame } from "../App";

const PLAYER_COUNT = 5;

export default function PlayerSetup() {
  const { goHome, setupPlayers } = useGame();
  const [names, setNames] = useState<string[]>(Array(PLAYER_COUNT).fill(""));

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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={goHome}
          className="p-2 rounded-lg bg-[#2D0A10] border border-gold/20 active:scale-95 transition-transform"
        >
          <ArrowRight className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </button>
        <h2 className="text-xl font-bold text-gold font-amiri">أسماء اللاعبين</h2>
      </div>

      <div className="flex flex-col gap-3 mb-2">
        {names.map((name, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4A0E17] border border-gold/30 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gold/70" strokeWidth={1.5} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`اللاعب ${arabicNum(i + 1)}`}
              maxLength={16}
              className="flex-1 bg-[#2D0A10] border border-gold/20 rounded-lg py-3 px-4 text-gold text-base font-cairo placeholder-gold/30 focus:outline-none focus:border-gold/50"
              dir="rtl"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-[#1A0508] border border-gold/10">
        <p className="text-gold/50 text-xs font-cairo leading-relaxed text-center">
          سيُعيَّن المافيوسو عشوائياً — لن يعرفه أحد من البداية
        </p>
      </div>

      <div className="mt-auto pt-8">
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-4 rounded-xl font-bold text-lg font-cairo transition-all duration-200 active:scale-[0.97]
            ${canStart
              ? "bg-gold text-[#120204] hover:bg-gold/90 shadow-lg shadow-gold/20"
              : "bg-[#2D0A10] text-gold/30 border border-gold/10 cursor-not-allowed"
            }`}
        >
          ابدأ التوزيع السري
        </button>
      </div>
    </div>
  );
}

function arabicNum(n: number): string {
  const nums = ["١", "٢", "٣", "٤", "٥"];
  return nums[n - 1] ?? String(n);
}
