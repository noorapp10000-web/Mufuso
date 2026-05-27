import { useState } from "react";
import { useGame } from "../App";

export default function Voting() {
  const { state, proceedToGuess } = useGame();
  const { players, clues, selectedCase } = state;
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [phase, setPhase] = useState<"voting" | "result">("voting");
  const [currentVoter, setCurrentVoter] = useState(0);
  const [selectedVote, setSelectedVote] = useState<number | null>(null);

  const totalRounds = clues.filter((r) => r.length > 0).length;
  const allClues = clues.flatMap((r) => r);

  const handleCastVote = () => {
    if (selectedVote === null) return;
    const name = players[selectedVote].name;
    setVotes((v) => ({ ...v, [name]: (v[name] || 0) + 1 }));
    setSelectedVote(null);
    if (currentVoter + 1 >= players.length) {
      setPhase("result");
    } else {
      setCurrentVoter((v) => v + 1);
    }
  };

  const accused = (() => {
    if (phase !== "result") return null;
    const entries = Object.entries(votes);
    if (!entries.length) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  })();

  const accusedIndex = accused ? players.findIndex((p) => p.name === accused) : -1;

  if (phase === "result") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
        <h2 className="text-2xl font-bold text-gold font-amiri text-center mb-2">نتيجة التصويت</h2>
        <p className="text-gold/50 text-xs font-cairo text-center mb-6">من حصل على أكثر الأصوات؟</p>

        <div className="flex flex-col gap-2 mb-6">
          {players
            .map((p) => ({ ...p, v: votes[p.name] || 0 }))
            .sort((a, b) => b.v - a.v)
            .map((p) => {
              const w = Math.max((p.v / players.length) * 100, 5);
              return (
                <div key={p.name} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${p.name === accused ? "bg-[#4A0E17] border-gold/60" : "bg-[#1A0508] border-gold/10"}`}>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-gold/40 text-xs font-cairo">{p.v} صوت</span>
                      <span className="text-gold font-bold font-cairo">{p.name}</span>
                    </div>
                    <div className="h-1.5 bg-[#2D0A10] rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${w}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {accused && (
          <div className="mb-6 p-4 rounded-xl bg-[#2D0A10] border border-gold/25 text-center">
            <p className="text-gold/50 text-sm font-cairo mb-1">المتهم</p>
            <p className="text-gold text-2xl font-bold font-amiri">{accused}</p>
          </div>
        )}

        <div className="mt-auto">
          <button
            onClick={() => proceedToGuess(accusedIndex >= 0 ? accusedIndex : 0)}
            className="w-full py-4 rounded-xl bg-gold text-[#120204] font-bold text-lg font-cairo transition-all active:scale-[0.97] hover:bg-gold/90 shadow-lg shadow-gold/20"
          >
            الكشف عن الحقيقة
          </button>
        </div>
      </div>
    );
  }

  const voter = players[currentVoter];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#120204] to-[#1E0509] px-5 pt-12 pb-10">
      <h2 className="text-2xl font-bold text-gold font-amiri text-center mb-1">التصويت</h2>
      <p className="text-gold/50 text-xs font-cairo text-center mb-5">
        اللاعب {currentVoter + 1} من {players.length}
      </p>

      {totalRounds > 0 && (
        <div className="mb-5 p-3 rounded-xl bg-[#1A0508] border border-gold/10">
          <p className="text-gold/35 text-[10px] font-cairo text-center mb-2">ملخص الإشارات</p>
          <div className="flex flex-col gap-1">
            {Array.from({ length: totalRounds }).map((_, rIdx) => {
              const rClues = clues[rIdx] || [];
              if (!rClues.length) return null;
              return (
                <div key={rIdx} className="flex flex-wrap gap-1.5 justify-end">
                  <span className="text-gold/30 text-[10px] font-cairo self-center">ج{rIdx + 1}:</span>
                  {rClues.map((e, i) => (
                    <span key={i} className="text-gold text-sm font-amiri font-bold">
                      {e.clue}
                      <span className="text-gold/30 text-[10px] font-cairo font-normal mr-0.5">({players[e.playerIndex]?.name})</span>
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4 text-center">
        <span className="text-gold/50 text-sm font-cairo">دور </span>
        <span className="text-gold font-bold font-amiri text-lg">{voter?.name}</span>
        <p className="text-gold/35 text-xs font-cairo mt-0.5">اختر من تظنه المافيوسو</p>
      </div>

      <div className="flex flex-col gap-2 mb-6">
        {players.map((p, i) => {
          if (p.name === voter?.name) return null;
          return (
            <button
              key={i}
              onClick={() => setSelectedVote(i)}
              className={`py-4 px-5 rounded-xl border font-bold font-cairo text-right transition-all active:scale-[0.98] ${
                selectedVote === i
                  ? "bg-[#4A0E17] border-gold text-gold shadow-lg shadow-gold/10"
                  : "bg-[#2D0A10] border-gold/20 text-gold/70 hover:border-gold/50"
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          onClick={handleCastVote}
          disabled={selectedVote === null}
          className={`w-full py-4 rounded-xl font-bold text-lg font-cairo transition-all active:scale-[0.97]
            ${selectedVote !== null
              ? "bg-gold text-[#120204] hover:bg-gold/90 shadow-lg shadow-gold/20"
              : "bg-[#2D0A10] text-gold/30 border border-gold/10 cursor-not-allowed"
            }`}
        >
          {currentVoter + 1 >= players.length ? "عرض النتائج" : "صوّت وناول الهاتف"}
        </button>
      </div>
    </div>
  );
}
