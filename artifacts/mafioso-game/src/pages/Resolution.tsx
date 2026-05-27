import { Shield, RotateCcw, Home } from "lucide-react";
import { useGame } from "../App";

export default function Resolution() {
  const { state, resetGame, goHome } = useGame();
  const { players, selectedCase, winner, mafiusoGuess, accusedPlayerIndex } = state;

  const mafioso = players.find((p) => p.isMafioso);
  const accused = accusedPlayerIndex !== null ? players[accusedPlayerIndex] : null;
  const accusedWasMafioso = accused?.isMafioso ?? false;

  if (!selectedCase || !mafioso) return null;

  const citizensWon = winner === "citizens";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
      <div className="flex flex-col items-center gap-4 mb-8">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 shadow-xl
            ${citizensWon
              ? "bg-[#0A2A0A] border-emerald-400/60 shadow-emerald-400/20"
              : "bg-[#2A0A10] border-red-400/60 shadow-red-400/20"
            }`}
        >
          <Shield
            className={`w-10 h-10 ${citizensWon ? "text-emerald-400" : "text-red-400"}`}
            strokeWidth={1.5}
          />
        </div>
        <h2 className={`text-3xl font-bold font-amiri ${citizensWon ? "text-emerald-400" : "text-red-400"}`}>
          {citizensWon ? "المواطنون فازوا" : "المافيوسو فاز"}
        </h2>
        <p className="text-gold/50 text-sm font-cairo text-center">
          {citizensWon
            ? (mafiusoGuess
                ? `المافيوسو خمّن "${mafiusoGuess}" لكنها كانت خاطئة`
                : "كُشف المافيوسو وفشل في التخمين")
            : (mafiusoGuess
                ? `المافيوسو خمّن "${mafiusoGuess}" وكانت صحيحة`
                : accusedWasMafioso
                ? "المافيوسو تنازل عن فرصته"
                : "صوّتتم على الشخص الخطأ")}
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="p-4 rounded-xl bg-[#2D0A10] border border-gold/25">
          <p className="text-gold/40 text-xs font-cairo mb-3 text-center">القضية</p>
          <p className="text-gold font-bold font-amiri text-center text-lg mb-1">{selectedCase.title}</p>
          <p className="text-gold/55 text-xs font-cairo text-center leading-relaxed">{selectedCase.crimeScene}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-4 rounded-xl bg-[#1A0508] border border-gold/15 text-center">
            <p className="text-gold/40 text-xs font-cairo mb-2">كلمة المواطنين</p>
            <p className="text-gold text-2xl font-bold font-amiri">{selectedCase.citizensWord}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2A0A10] border border-gold/25 text-center">
            <p className="text-gold/40 text-xs font-cairo mb-2">كلمة المافيوسو</p>
            <p className="text-gold text-2xl font-bold font-amiri">{selectedCase.mafiusoWord}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#1A0508] border border-gold/15">
          <p className="text-gold/40 text-xs font-cairo mb-3 text-center">أدوار اللاعبين</p>
          <div className="flex flex-col gap-2">
            {players.map((p) => (
              <div key={p.name} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${p.isMafioso ? "bg-[#2D0A10] border-gold/30" : "bg-[#0A0A0A] border-gold/10"}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${p.isMafioso ? "bg-red-400" : "bg-emerald-400"}`} />
                  <span className="text-gold/50 text-xs font-cairo">{p.isMafioso ? "المافيوسو" : "مواطن"}</span>
                </div>
                <span className="text-gold font-bold font-cairo">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={resetGame}
          className="w-full py-4 rounded-xl bg-gold text-[#120204] font-bold text-lg font-cairo transition-all active:scale-[0.97] hover:bg-gold/90 shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2} />
          العب مرة أخرى
        </button>
        <button
          onClick={goHome}
          className="w-full py-3 rounded-xl border border-gold/20 text-gold/60 font-cairo text-base transition-all active:scale-[0.97] flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" strokeWidth={1.5} />
          الرئيسية
        </button>
      </div>
    </div>
  );
}
