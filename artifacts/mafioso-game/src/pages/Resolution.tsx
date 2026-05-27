import { Shield, AlertTriangle, RotateCcw, Home } from "lucide-react";
import { useGame } from "../App";

export default function Resolution() {
  const { state, resetGame, goHome } = useGame();
  const { players, selectedCase, accusedPlayerIndex } = state;

  if (!selectedCase || players.length === 0) return null;

  const mafiusoPlayer = players.find((p) => p.isMafioso);
  const accused = accusedPlayerIndex !== null ? players[accusedPlayerIndex] : null;
  const citizensWon = accused?.isMafioso ?? false;

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col" dir="rtl">
      {/* Decorative top */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="flex-1 px-4 pt-8 pb-6 overflow-y-auto scroll-custom">
        {/* Result banner */}
        <div
          className="rounded-2xl overflow-hidden mb-6 text-center"
          style={{
            background: citizensWon
              ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))"
              : "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(153,27,27,0.1))",
            border: citizensWon ? "2px solid rgba(34,197,94,0.4)" : "2px solid rgba(220,38,38,0.4)",
            boxShadow: citizensWon
              ? "0 0 40px rgba(34,197,94,0.15)"
              : "0 0 40px rgba(220,38,38,0.15)",
          }}
        >
          <div className="px-6 py-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{
                background: citizensWon ? "rgba(34,197,94,0.2)" : "rgba(220,38,38,0.2)",
                border: citizensWon ? "2px solid rgba(34,197,94,0.4)" : "2px solid rgba(220,38,38,0.4)",
              }}
            >
              {citizensWon ? (
                <Shield size={28} className="text-green-400" />
              ) : (
                <AlertTriangle size={28} className="text-red-400" />
              )}
            </div>
            <p
              className="text-3xl font-bold mb-1"
              style={{
                color: citizensWon ? "#4ADE80" : "#F87171",
                fontFamily: "Amiri, serif",
                textShadow: citizensWon
                  ? "0 0 20px rgba(74,222,128,0.4)"
                  : "0 0 20px rgba(248,113,113,0.4)",
              }}
            >
              {citizensWon ? "المواطنون يفوزون" : "المافيوسو يفوز"}
            </p>
            <p className="text-[#F5E6E8] text-opacity-60 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
              {citizensWon
                ? "نجح الفريق في كشف المافيوسو"
                : "نجح المافيوسو في الإفلات من العدالة"}
            </p>
          </div>
        </div>

        {/* Mafioso reveal */}
        <div
          className="rounded-2xl overflow-hidden mb-5"
          style={{
            background: "linear-gradient(135deg, #4A0E17, #2D0A10)",
            border: "2px solid rgba(212,175,55,0.5)",
            boxShadow: "0 0 30px rgba(212,175,55,0.15)",
          }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="px-5 py-4">
            <p className="text-[#D4AF37] text-xs font-bold mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
              هوية المافيوسو الحقيقية
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{
                  background: "rgba(212,175,55,0.2)",
                  border: "2px solid #D4AF37",
                  color: "#D4AF37",
                  fontFamily: "Cairo, sans-serif",
                  boxShadow: "0 0 20px rgba(212,175,55,0.3)",
                }}
              >
                {mafiusoPlayer?.name.charAt(0)}
              </div>
              <div>
                <p
                  className="text-xl font-bold"
                  style={{ color: "#F5E6E8", fontFamily: "Cairo, sans-serif" }}
                >
                  {mafiusoPlayer?.name}
                </p>
                <p className="text-sm" style={{ color: "rgba(212,175,55,0.8)", fontFamily: "Cairo, sans-serif" }}>
                  {mafiusoPlayer?.occupation}
                </p>
                <div
                  className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs"
                  style={{
                    background: "rgba(220,38,38,0.2)",
                    border: "1px solid rgba(220,38,38,0.4)",
                    color: "#F87171",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  المافيوسو
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All players roles */}
        <div className="mb-5">
          <p className="text-[#D4AF37] text-xs font-bold mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
            هويات جميع اللاعبين
          </p>
          <div className="space-y-2">
            {players.map((player, i) => (
              <div
                key={i}
                data-testid={`row-player-result-${i}`}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{
                  background: player.isMafioso
                    ? "rgba(220,38,38,0.1)"
                    : "rgba(74,14,23,0.5)",
                  border: player.isMafioso
                    ? "1px solid rgba(220,38,38,0.3)"
                    : "1px solid rgba(212,175,55,0.15)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: player.isMafioso ? "rgba(220,38,38,0.2)" : "rgba(212,175,55,0.1)",
                    border: player.isMafioso
                      ? "1.5px solid rgba(220,38,38,0.4)"
                      : "1.5px solid rgba(212,175,55,0.3)",
                    color: player.isMafioso ? "#F87171" : "#D4AF37",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  {player.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#F5E6E8]" style={{ fontFamily: "Cairo, sans-serif" }}>
                    {player.name}
                  </p>
                  <p className="text-xs" style={{ color: "rgba(212,175,55,0.7)", fontFamily: "Cairo, sans-serif" }}>
                    {player.occupation}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    background: player.isMafioso ? "rgba(220,38,38,0.2)" : "rgba(34,197,94,0.15)",
                    border: player.isMafioso
                      ? "1px solid rgba(220,38,38,0.3)"
                      : "1px solid rgba(34,197,94,0.3)",
                    color: player.isMafioso ? "#F87171" : "#4ADE80",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  {player.isMafioso ? "مافيوسو" : "بريء"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How the crime happened */}
        <div
          className="rounded-2xl overflow-hidden mb-6"
          style={{
            background: "linear-gradient(135deg, #3D0A12, #2D0A10)",
            border: "1px solid rgba(212,175,55,0.4)",
          }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="px-5 py-4">
            <p
              className="gold-text text-lg font-bold mb-3"
              style={{ fontFamily: "Amiri, serif" }}
            >
              كيف حدثت الجريمة؟
            </p>
            <div
              className="p-4 rounded-xl"
              style={{ background: "rgba(18,2,4,0.6)", border: "1px solid rgba(212,175,55,0.15)" }}
            >
              <p
                className="text-[#F5E6E8] text-opacity-80 text-sm leading-relaxed"
                style={{ fontFamily: "Cairo, sans-serif" }}
                data-testid="text-solution"
              >
                {selectedCase.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            data-testid="button-play-again"
            onClick={resetGame}
            className="btn-gold w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            <RotateCcw size={20} />
            العب مرة أخرى
          </button>
          <button
            data-testid="button-home"
            onClick={goHome}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border border-[#D4AF37] border-opacity-50 text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-10 transition-all"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            <Home size={20} />
            الصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
