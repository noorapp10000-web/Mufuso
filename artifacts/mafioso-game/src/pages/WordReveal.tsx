import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useGame } from "../App";

export default function WordReveal() {
  const { state, revealNextWord } = useGame();
  const { players, wordRevealIndex, selectedCase } = state;
  const [revealed, setRevealed] = useState(false);

  const currentPlayer = players[wordRevealIndex];
  const isLast = wordRevealIndex === players.length - 1;

  const handleReveal = () => setRevealed(true);
  const handleNext = () => {
    setRevealed(false);
    revealNextWord();
  };

  if (!currentPlayer || !selectedCase) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#130212] to-[#20051C] px-5 pt-12 pb-10">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="flex gap-1.5">
          {players.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < wordRevealIndex
                  ? "bg-gold w-6"
                  : i === wordRevealIndex
                  ? "bg-gold/80 w-8"
                  : "bg-gold/20 w-4"
              }`}
            />
          ))}
        </div>
        <p className="text-gold/50 text-xs font-cairo mt-1">
          اللاعب {wordRevealIndex + 1} من {players.length}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 flex-1 justify-center">
        <div className="text-center">
          <p className="text-gold/50 text-sm font-cairo mb-1">مرحباً</p>
          <h2 className="text-3xl font-bold text-gold font-amiri">{currentPlayer.name}</h2>
        </div>

        <div className="w-full max-w-xs">
          {!revealed ? (
            <button
              onClick={handleReveal}
              className="w-full py-16 rounded-2xl bg-[#350A22] border-2 border-gold/30 hover:border-gold/60 hover:bg-[#430B24] transition-all duration-200 active:scale-[0.97] flex flex-col items-center gap-4 shadow-xl shadow-black/40"
            >
              <Eye className="w-10 h-10 text-gold/60" strokeWidth={1.5} />
              <span className="text-gold/70 font-cairo text-base">اضغط لعرض كلمتك السرية</span>
              <span className="text-gold/30 font-cairo text-xs">تأكد أن أحداً لا ينظر</span>
            </button>
          ) : (
            <div className="w-full rounded-2xl bg-[#350A22] border-2 border-gold/50 p-6 flex flex-col items-center gap-5 shadow-xl shadow-black/40">
              <div className="w-full rounded-xl bg-[#1C0418] border border-gold/20 p-4">
                <p className="text-gold/40 text-xs font-cairo text-center mb-2">مشهد الجريمة</p>
                <p className="text-gold/70 text-sm font-cairo text-center leading-relaxed">
                  {selectedCase.crimeScene}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-gold/50 text-xs font-cairo">كلمتك السرية</p>
                <div className="px-8 py-4 rounded-xl bg-[#5B0E2E] border border-gold/40">
                  <span className="text-gold text-3xl font-bold font-amiri tracking-wide">
                    {currentPlayer.word}
                  </span>
                </div>
                {currentPlayer.isMafioso && (
                  <p className="text-[10px] font-cairo text-gold/30 mt-1">
                    أنت المافيوسو — كلمتك مشابهة لكلمة الآخرين، لكن ليست نفسها
                  </p>
                )}
              </div>

              <button
                onClick={() => setRevealed(false)}
                className="flex items-center gap-2 text-gold/40 text-xs font-cairo"
              >
                <EyeOff className="w-3 h-3" />
                إخفاء
              </button>
            </div>
          )}
        </div>

        {revealed && (
          <button
            onClick={handleNext}
            className="w-full max-w-xs py-4 rounded-xl bg-gold text-[#130212] font-bold text-lg font-cairo transition-all duration-200 active:scale-[0.97] hover:bg-gold/90 shadow-lg shadow-gold/20"
          >
            {isLast ? "ابدأ اللعبة" : `ناول الهاتف لـ ${players[wordRevealIndex + 1]?.name}`}
          </button>
        )}
      </div>

      <p className="text-center text-gold/25 text-xs font-cairo mt-6">
        احفظ كلمتك جيداً — لن تظهر مرة أخرى
      </p>
    </div>
  );
}
