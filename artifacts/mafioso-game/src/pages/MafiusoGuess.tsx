import { useState } from "react";
import { useGame } from "../App";

export default function MafiusoGuess() {
  const { state, submitMafiusoGuess, skipMafiusoGuess } = useGame();
  const { players, accusedPlayerIndex, selectedCase } = state;
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);

  const accused = accusedPlayerIndex !== null ? players[accusedPlayerIndex] : null;
  const isMafioso = accused?.isMafioso ?? false;

  if (!accused || !selectedCase) return null;

  if (!revealed) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-[#4A0E17] border-2 border-gold/50 flex items-center justify-center shadow-lg shadow-gold/10">
            <span className="text-gold text-2xl font-amiri font-bold">؟</span>
          </div>
          <h2 className="text-2xl font-bold text-gold font-amiri text-center">الحكم على المتهم</h2>
          <p className="text-gold/50 text-sm font-cairo text-center">
            المجموعة اتفقت على اتهام{" "}
            <span className="text-gold font-bold">{accused.name}</span>
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <div className="w-full max-w-xs p-5 rounded-2xl bg-[#2D0A10] border border-gold/25 text-center">
            <p className="text-gold/50 text-sm font-cairo mb-3">
              {isMafioso
                ? "المتهم هو المافيوسو فعلاً! يحق له فرصة أخيرة لتخمين كلمة المواطنين. إن أصاب — يفوز!"
                : "المتهم ليس المافيوسو... لكن دعوه يحاول تخمين كلمة المواطنين لإخفاء ذلك."}
            </p>
            <p className="text-gold/35 text-xs font-cairo">ناول الهاتف لـ {accused.name}</p>
          </div>

          <button
            onClick={() => setRevealed(true)}
            className="w-full max-w-xs py-5 rounded-xl bg-[#4A0E17] border border-gold/40 hover:border-gold/70 hover:bg-[#5A1522] text-gold font-bold text-lg font-cairo transition-all active:scale-[0.97]"
          >
            أنا {accused.name} — ابدأ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
      <div className="flex flex-col items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold text-gold font-amiri text-center">فرصة أخيرة</h2>
        <p className="text-gold/50 text-sm font-cairo text-center">
          ما هي كلمة المواطنين السرية المتعلقة بهذه القضية؟
        </p>
      </div>

      <div className="mb-5 p-4 rounded-xl bg-[#1A0508] border border-gold/10">
        <p className="text-gold/35 text-[10px] font-cairo text-center mb-1.5">مشهد الجريمة</p>
        <p className="text-gold/55 text-sm font-cairo text-center leading-relaxed">
          {selectedCase.crimeScene}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 flex-1 justify-center">
        <p className="text-gold/50 text-sm font-cairo">خمّن الكلمة</p>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && guess.trim() && submitMafiusoGuess(guess.trim())}
          placeholder="اكتب تخمينك..."
          maxLength={20}
          className="w-full max-w-xs bg-[#2D0A10] border-2 border-gold/30 rounded-xl py-4 px-5 text-gold text-2xl font-amiri placeholder-gold/25 focus:outline-none focus:border-gold/60 text-center"
          dir="rtl"
          autoFocus
        />
        <p className="text-gold/25 text-xs font-cairo">الكلمة مرتبطة بمشهد الجريمة</p>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={() => submitMafiusoGuess(guess.trim())}
          disabled={!guess.trim()}
          className={`w-full py-4 rounded-xl font-bold text-lg font-cairo transition-all active:scale-[0.97]
            ${guess.trim()
              ? "bg-gold text-[#120204] hover:bg-gold/90 shadow-lg shadow-gold/20"
              : "bg-[#2D0A10] text-gold/30 border border-gold/10 cursor-not-allowed"
            }`}
        >
          أكد التخمين
        </button>
        <button
          onClick={skipMafiusoGuess}
          className="w-full py-3 rounded-xl border border-gold/15 text-gold/40 font-cairo text-sm transition-all active:scale-[0.97]"
        >
          أتنازل — أرِ النتيجة
        </button>
      </div>
    </div>
  );
}
