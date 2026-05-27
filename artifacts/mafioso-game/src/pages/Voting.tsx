import { useState } from "react";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { useGame } from "../App";

export default function Voting() {
  const { state, castVote, setAccused, confirmVerdict, setPhase } = useGame();
  const { players, selectedCase, votes } = state;
  const [myVoteIndex, setMyVoteIndex] = useState<number | null>(null);
  const [phase, setLocalPhase] = useState<"voting" | "defense" | "ready">("voting");

  if (!selectedCase) return null;

  const topVotedIndex =
    players.reduce(
      (max, p, i, arr) => ((votes[p.name] || 0) > (votes[arr[max].name] || 0) ? i : max),
      0
    );

  const handleVote = (index: number) => {
    if (myVoteIndex !== null) return;
    setMyVoteIndex(index);
    castVote(players[index].name);
  };

  const handleProceedToDefense = () => {
    setAccused(topVotedIndex);
    setLocalPhase("defense");
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col" dir="rtl">
      {/* Header */}
      <div
        className="px-4 pt-10 pb-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="gold-text text-xl font-bold" style={{ fontFamily: "Amiri, serif" }}>
              {phase === "voting" ? "مرحلة التصويت" : "الدفاع النهائي"}
            </h1>
            <p className="text-[#F5E6E8] text-opacity-50 text-xs" style={{ fontFamily: "Cairo, sans-serif" }}>
              {phase === "voting" ? "من تظن أنه المافيوسو؟" : "المتهم يدافع عن نفسه"}
            </p>
          </div>
          <div
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.3)",
              color: "#D4AF37",
              fontFamily: "Cairo, sans-serif",
            }}
          >
            {phase === "voting" ? "التصويت" : "الدفاع"}
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 pb-4 overflow-y-auto scroll-custom">
        {phase === "voting" && (
          <>
            {/* Instruction */}
            <div
              className="p-3 rounded-xl mb-5 text-center"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <p className="text-[#F5E6E8] text-opacity-70 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
                {myVoteIndex === null
                  ? "صوّت على من تعتقد أنه المافيوسو — مرر الهاتف لكل لاعب"
                  : `صوّتت على ${players[myVoteIndex].name} — مرر الهاتف للاعب التالي`}
              </p>
            </div>

            {/* Player cards for voting */}
            <div className="space-y-3 mb-6">
              {players.map((player, i) => {
                const voteCount = votes[player.name] || 0;
                const isVotedByMe = myVoteIndex === i;

                return (
                  <button
                    key={i}
                    data-testid={`button-vote-${i}`}
                    onClick={() => handleVote(i)}
                    className="w-full rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isVotedByMe
                        ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(184,134,11,0.15))"
                        : "linear-gradient(135deg, #3D0A12, #2D0A10)",
                      border: isVotedByMe
                        ? "2px solid #D4AF37"
                        : "1px solid rgba(212,175,55,0.3)",
                      boxShadow: isVotedByMe ? "0 0 20px rgba(212,175,55,0.2)" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3 p-4">
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                        style={{
                          background: isVotedByMe
                            ? "rgba(212,175,55,0.3)"
                            : "rgba(74,14,23,0.8)",
                          border: isVotedByMe
                            ? "2px solid #D4AF37"
                            : "1.5px solid rgba(212,175,55,0.3)",
                          color: "#D4AF37",
                          fontFamily: "Cairo, sans-serif",
                        }}
                      >
                        {player.name.charAt(0)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-right">
                        <p
                          className="font-bold text-base"
                          style={{ color: "#F5E6E8", fontFamily: "Cairo, sans-serif" }}
                        >
                          {player.name}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "rgba(212,175,55,0.7)", fontFamily: "Cairo, sans-serif" }}
                        >
                          {player.occupation}
                        </p>
                      </div>

                      {/* Vote indicator */}
                      <div className="flex items-center gap-2">
                        {voteCount > 0 && (
                          <div
                            className="px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{
                              background: "rgba(212,175,55,0.2)",
                              border: "1px solid rgba(212,175,55,0.4)",
                              color: "#D4AF37",
                              fontFamily: "Cairo, sans-serif",
                            }}
                          >
                            {voteCount}
                          </div>
                        )}
                        {isVotedByMe && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ background: "#D4AF37" }}
                          >
                            <Check size={14} className="text-[#120204]" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vote progress bar */}
                    {voteCount > 0 && totalVotes > 0 && (
                      <div className="px-4 pb-3">
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(212,175,55,0.1)" }}>
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(voteCount / totalVotes) * 100}%`,
                              background: "linear-gradient(90deg, #B8860B, #D4AF37)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Proceed button */}
            <button
              data-testid="button-proceed-defense"
              onClick={handleProceedToDefense}
              className="btn-gold w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              <AlertTriangle size={20} />
              عرض المتهم الأكثر أصواتاً للدفاع
            </button>
          </>
        )}

        {phase === "defense" && (
          <>
            {/* Accused player */}
            <div
              className="p-5 rounded-2xl mb-5 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(220,38,38,0.1), rgba(74,14,23,0.8))",
                border: "2px solid rgba(220,38,38,0.3)",
                boxShadow: "0 0 30px rgba(220,38,38,0.1)",
              }}
            >
              <p className="text-[#F5E6E8] text-opacity-60 text-xs mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>
                المتهم الرئيسي
              </p>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3"
                style={{
                  background: "rgba(220,38,38,0.2)",
                  border: "2px solid rgba(220,38,38,0.4)",
                  color: "#EF4444",
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {players[topVotedIndex].name.charAt(0)}
              </div>
              <p className="text-xl font-bold text-[#F5E6E8]" style={{ fontFamily: "Cairo, sans-serif" }}>
                {players[topVotedIndex].name}
              </p>
              <p className="text-[#D4AF37] text-sm mt-1" style={{ fontFamily: "Cairo, sans-serif" }}>
                {players[topVotedIndex].occupation}
              </p>
              <div
                className="mt-3 px-4 py-2 rounded-xl text-sm"
                style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}
              >
                <p className="text-[#F5E6E8] text-opacity-60 text-xs" style={{ fontFamily: "Cairo, sans-serif" }}>
                  حصل على {votes[players[topVotedIndex].name] || 0} أصوات
                </p>
              </div>
            </div>

            {/* Defense instructions */}
            <div
              className="p-4 rounded-xl mb-5"
              style={{ background: "rgba(74,14,23,0.6)", border: "1px solid rgba(212,175,55,0.2)" }}
            >
              <p className="text-[#D4AF37] text-sm font-bold mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>
                مرحلة الدفاع
              </p>
              <p className="text-[#F5E6E8] text-opacity-70 text-sm leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
                يجب على <strong style={{ color: "#F5E6E8" }}>{players[topVotedIndex].name}</strong> أن يشرح كيف أن مهنته
                كـ <strong style={{ color: "#D4AF37" }}>{players[topVotedIndex].occupation}</strong> تجعله بعيداً عن
                الجريمة. ثم يقرر الجميع معاً.
              </p>
            </div>

            {/* All clues recap */}
            <div className="mb-5">
              <p className="text-[#D4AF37] text-xs font-bold mb-2" style={{ fontFamily: "Cairo, sans-serif" }}>
                مراجعة الأدلة الثلاثة
              </p>
              {selectedCase.clues.map((clue, i) => (
                <div
                  key={i}
                  className="mb-2 p-3 rounded-xl"
                  style={{ background: "rgba(74,14,23,0.4)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ color: "rgba(212,175,55,0.7)", fontFamily: "Cairo, sans-serif" }}
                  >
                    الدليل {i + 1}
                  </p>
                  <p className="text-[#F5E6E8] text-opacity-70 text-sm" style={{ fontFamily: "Cairo, sans-serif" }}>
                    {clue}
                  </p>
                </div>
              ))}
            </div>

            {/* Confirm verdict */}
            <button
              data-testid="button-confirm-verdict"
              onClick={confirmVerdict}
              className="btn-gold w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              <ArrowLeft size={20} />
              كشف الحقيقة — النتيجة النهائية
            </button>
          </>
        )}
      </div>
    </div>
  );
}
