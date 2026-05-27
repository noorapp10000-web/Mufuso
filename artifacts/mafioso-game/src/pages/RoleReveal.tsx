import { useState } from "react";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useGame } from "../App";

export default function RoleReveal() {
  const { state, revealNextPlayer } = useGame();
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = state.players[state.revealingPlayerIndex];
  if (!currentPlayer) return null;

  const handleReveal = () => setIsRevealed(true);
  const handleNext = () => {
    setIsRevealed(false);
    revealNextPlayer();
  };

  const isLastPlayer = state.revealingPlayerIndex === state.players.length - 1;

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col items-center justify-center px-4 py-8" dir="rtl">
      {/* Ornamental top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

      {/* Progress dots */}
      <div className="absolute top-10 flex gap-2">
        {state.players.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background:
                i < state.revealingPlayerIndex
                  ? "#D4AF37"
                  : i === state.revealingPlayerIndex
                  ? "#FFDF00"
                  : "rgba(212,175,55,0.2)",
              boxShadow: i === state.revealingPlayerIndex ? "0 0 8px rgba(255,223,0,0.6)" : "none",
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-sm">
        {/* Pass phone instruction */}
        <div
          className="text-center mb-6 px-4 py-3 rounded-xl"
          style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
        >
          <p className="text-[#D4AF37] text-sm font-bold" style={{ fontFamily: "Cairo, sans-serif" }}>
            مرر الهاتف
          </p>
          <p className="text-[#F5E6E8] text-opacity-60 text-xs mt-1" style={{ fontFamily: "Cairo, sans-serif" }}>
            هذا دور {currentPlayer.name} فقط
          </p>
        </div>

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #4A0E17 0%, #2D0A10 100%)",
            border: "2px solid rgba(212,175,55,0.6)",
            boxShadow: "0 0 40px rgba(212,175,55,0.2), inset 0 1px 0 rgba(212,175,55,0.15)",
          }}
        >
          {/* Top gold line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* Player name header */}
          <div className="px-6 pt-5 pb-3 text-center">
            <div
              className="inline-block px-4 py-1.5 rounded-full mb-2"
              style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <span className="text-[#D4AF37] text-sm font-bold" style={{ fontFamily: "Cairo, sans-serif" }}>
                {currentPlayer.name}
              </span>
            </div>
          </div>

          {/* Reveal area */}
          <div className="px-6 pb-6">
            {!isRevealed ? (
              /* Hidden state */
              <div className="text-center">
                <div
                  className="w-full h-48 rounded-xl flex flex-col items-center justify-center mb-4 cursor-pointer"
                  style={{
                    background: "rgba(18,2,4,0.8)",
                    border: "1px dashed rgba(212,175,55,0.3)",
                  }}
                  onClick={handleReveal}
                >
                  <EyeOff size={40} className="text-[#D4AF37] opacity-40 mb-3" />
                  <p className="text-[#F5E6E8] text-opacity-40 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
                    المحتوى مخفي
                  </p>
                </div>
                <button
                  data-testid="button-reveal"
                  onClick={handleReveal}
                  className="btn-gold w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  <Eye size={20} />
                  اكشف دورك سراً
                </button>
              </div>
            ) : (
              /* Revealed state */
              <div className="reveal-glow">
                {/* Role badge */}
                <div
                  className="text-center py-4 px-4 rounded-xl mb-4"
                  style={{
                    background: currentPlayer.isMafioso
                      ? "linear-gradient(135deg, rgba(220,38,38,0.2), rgba(153,27,27,0.3))"
                      : "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(184,134,11,0.2))",
                    border: currentPlayer.isMafioso
                      ? "1px solid rgba(220,38,38,0.4)"
                      : "1px solid rgba(212,175,55,0.4)",
                  }}
                >
                  <p
                    className="text-3xl font-bold mb-1"
                    style={{
                      color: currentPlayer.isMafioso ? "#EF4444" : "#D4AF37",
                      fontFamily: "Amiri, serif",
                      textShadow: currentPlayer.isMafioso
                        ? "0 0 20px rgba(220,38,38,0.5)"
                        : "0 0 20px rgba(212,175,55,0.5)",
                    }}
                  >
                    {currentPlayer.isMafioso ? "المافيوسو" : "مواطن بريء"}
                  </p>
                  <div
                    className="h-px my-2"
                    style={{
                      background: currentPlayer.isMafioso
                        ? "linear-gradient(90deg, transparent, rgba(220,38,38,0.5), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
                    }}
                  />
                  <p className="text-[#F5E6E8] text-opacity-70 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
                    مهنتك في هذه القضية
                  </p>
                  <p
                    className="text-xl font-bold mt-1"
                    style={{ color: "#F5E6E8", fontFamily: "Cairo, sans-serif" }}
                  >
                    {currentPlayer.occupation}
                  </p>
                </div>

                {/* Instruction */}
                <div
                  className="text-center p-3 rounded-xl mb-4"
                  style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <p className="text-[#F5E6E8] text-opacity-60 text-xs leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
                    {currentPlayer.isMafioso
                      ? "أنت المافيوسو — أخفِ هويتك خلف مهنتك واجعل الجميع يشك في غيرك"
                      : "أنت مواطن بريء — استخدم مهنتك لإثبات براءتك وكشف المافيوسو"}
                  </p>
                </div>

                <button
                  data-testid="button-next-player"
                  onClick={handleNext}
                  className="btn-gold w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  <ChevronLeft size={20} />
                  {isLastPlayer ? "ابدأ اللعبة" : `دور ${state.players[state.revealingPlayerIndex + 1]?.name}`}
                </button>
              </div>
            )}
          </div>

          {/* Bottom gold line */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </div>
  );
}
