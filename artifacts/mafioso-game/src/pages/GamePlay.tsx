import { useState, useEffect, useRef } from "react";
import { Clock, ChevronLeft } from "lucide-react";
import { useGame } from "../App";

function DiscussionTimer({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [remaining, setRemaining] = useState(seconds);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(ref.current!);
          onDone();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [onDone]);

  const pct = remaining / seconds;
  const strokeDash = 2 * Math.PI * 28;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="#350A22" strokeWidth="4" />
        <circle
          cx="32" cy="32" r="28" fill="none"
          stroke="#D4AF37" strokeWidth="4"
          strokeDasharray={strokeDash}
          strokeDashoffset={strokeDash * (1 - pct)}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
        <text x="32" y="36" textAnchor="middle" fill="#D4AF37" fontSize="14" fontFamily="Cairo">
          {remaining}
        </text>
      </svg>
      <p className="text-gold/50 text-xs font-cairo">وقت النقاش</p>
    </div>
  );
}

export default function GamePlay() {
  const { state, submitClue, advanceRound, goHome } = useGame();
  const { players, currentRound, currentCluePlayerIndex, clueSummaryMode, clues, selectedCase } = state;
  const [clueInput, setClueInput] = useState("");
  const [timerDone, setTimerDone] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const totalRounds = 3;

  const currentPlayer = players[currentCluePlayerIndex];
  const roundClues = clues[currentRound - 1] || [];

  const handleSubmit = () => {
    const word = clueInput.trim().replace(/\s+/g, "");
    if (!word) return;
    if (word.includes(" ")) {
      setShowConfirm(true);
      return;
    }
    submitClue(word);
    setClueInput("");
  };

  const handleConfirmSubmit = () => {
    submitClue(clueInput.trim());
    setClueInput("");
    setShowConfirm(false);
  };

  if (clueSummaryMode) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#130212] to-[#20051C] px-5 pt-12 pb-10">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goHome} className="p-2 rounded-lg bg-[#350A22] border border-gold/20">
            <ChevronLeft className="w-5 h-5 text-gold" strokeWidth={1.5} />
          </button>
          <h2 className="text-lg font-bold text-gold font-amiri">
            إشارات الجولة {arabicNum(currentRound)}
          </h2>
          <div className="w-9" />
        </div>

        <div className="flex gap-1 mb-6 justify-center">
          {Array.from({ length: totalRounds }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < currentRound ? "bg-gold w-8" : "bg-gold/20 w-5"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 mb-6">
          {roundClues.map((entry, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#350A22] border border-gold/15">
              <span className="text-gold text-xl font-bold font-amiri">{entry.clue}</span>
              <span className="text-gold/50 text-sm font-cairo">{players[entry.playerIndex]?.name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          {!timerDone ? (
            <DiscussionTimer seconds={60} onDone={() => setTimerDone(true)} />
          ) : (
            <p className="text-gold/50 text-sm font-cairo">انتهى وقت النقاش</p>
          )}
        </div>

        <div className="mt-auto">
          <button
            onClick={() => {
              setTimerDone(false);
              advanceRound();
            }}
            className="w-full py-4 rounded-xl bg-gold text-[#130212] font-bold text-lg font-cairo transition-all active:scale-[0.97] hover:bg-gold/90 shadow-lg shadow-gold/20"
          >
            {currentRound >= totalRounds ? "التصويت" : `الجولة ${arabicNum(currentRound + 1)}`}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#130212] to-[#20051C] px-5 pt-12 pb-10">
      <div className="flex items-center justify-between mb-5">
        <button onClick={goHome} className="p-2 rounded-lg bg-[#350A22] border border-gold/20">
          <ChevronLeft className="w-5 h-5 text-gold" strokeWidth={1.5} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-base font-bold text-gold font-amiri">
            الجولة {arabicNum(currentRound)} من {arabicNum(totalRounds)}
          </h2>
          <p className="text-gold/40 text-xs font-cairo">
            اللاعب {currentCluePlayerIndex + 1} من {players.length}
          </p>
        </div>
        <div className="flex items-center gap-1 text-gold/40 text-xs font-cairo">
          <Clock className="w-4 h-4" strokeWidth={1.5} />
        </div>
      </div>

      <div className="flex gap-1 mb-5 justify-center">
        {players.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i < currentCluePlayerIndex ? "bg-gold w-6" : i === currentCluePlayerIndex ? "bg-gold/80 w-8" : "bg-gold/20 w-4"
            }`}
          />
        ))}
      </div>

      {selectedCase && (
        <div className="mb-4 p-3 rounded-xl bg-[#1C0418] border border-gold/10">
          <p className="text-gold/35 text-[10px] font-cairo mb-1 text-center">القضية</p>
          <p className="text-gold/55 text-xs font-cairo text-center leading-relaxed">
            {selectedCase.crimeScene}
          </p>
        </div>
      )}

      {roundClues.length > 0 && (
        <div className="mb-4">
          <p className="text-gold/40 text-xs font-cairo mb-2">الإشارات حتى الآن</p>
          <div className="flex flex-wrap gap-2">
            {roundClues.map((entry, i) => (
              <div key={i} className="px-3 py-1.5 rounded-lg bg-[#350A22] border border-gold/15 flex gap-2 items-center">
                <span className="text-gold font-bold font-amiri text-base">{entry.clue}</span>
                <span className="text-gold/35 text-[10px] font-cairo">{players[entry.playerIndex]?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-3 flex-1 justify-center">
        <p className="text-gold/50 text-sm font-cairo">
          دور <span className="text-gold font-bold">{currentPlayer?.name}</span>
        </p>
        <p className="text-gold/35 text-xs font-cairo">قل كلمة واحدة فقط كإشارة على كلمتك السرية</p>

        <div className="w-full max-w-xs mt-2">
          <input
            type="text"
            value={clueInput}
            onChange={(e) => setClueInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="اكتب كلمتك..."
            maxLength={20}
            className="w-full bg-[#350A22] border-2 border-gold/30 rounded-xl py-4 px-5 text-gold text-xl font-amiri placeholder-gold/25 focus:outline-none focus:border-gold/60 text-center"
            dir="rtl"
            autoFocus
          />
        </div>

        {showConfirm && (
          <div className="w-full max-w-xs p-4 rounded-xl bg-[#5B0E2E] border border-gold/30 text-center">
            <p className="text-gold/70 text-sm font-cairo mb-3">الإشارة يجب أن تكون كلمة واحدة فقط. هل تريد الإرسال كما هو؟</p>
            <div className="flex gap-2">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 rounded-lg bg-[#350A22] text-gold/60 font-cairo text-sm border border-gold/15">
                تعديل
              </button>
              <button onClick={handleConfirmSubmit} className="flex-1 py-2 rounded-lg bg-gold text-[#130212] font-cairo text-sm font-bold">
                إرسال
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!clueInput.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg font-cairo transition-all active:scale-[0.97] mt-6
          ${clueInput.trim()
            ? "bg-gold text-[#130212] hover:bg-gold/90 shadow-lg shadow-gold/20"
            : "bg-[#350A22] text-gold/30 border border-gold/10 cursor-not-allowed"
          }`}
      >
        أرسل الإشارة
      </button>
    </div>
  );
}

function arabicNum(n: number): string {
  const nums = ["١", "٢", "٣", "٤", "٥"];
  return nums[n - 1] ?? String(n);
}
