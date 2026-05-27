import { useState, useEffect, useRef } from "react";
import { Clock, ChevronLeft, FileText, X, Users } from "lucide-react";
import { useGame } from "../App";

function TimerDisplay({ onComplete }: { onComplete: () => void }) {
  const [seconds, setSeconds] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            onComplete();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleToggle = () => {
    if (seconds === 0) {
      setSeconds(60);
      setRunning(false);
    } else {
      setRunning((r) => !r);
    }
  };

  const progress = (seconds / 60) * 100;
  const isUrgent = seconds <= 15;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-28 h-28 cursor-pointer"
        onClick={handleToggle}
        data-testid="button-timer"
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="6" />
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={isUrgent ? "#EF4444" : "#D4AF37"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ animation: running && isUrgent ? "timerTick 1s ease-in-out infinite" : "none" }}
        >
          <span
            className="text-2xl font-bold tabular-nums"
            style={{ color: isUrgent ? "#EF4444" : "#D4AF37", fontFamily: "Cairo, sans-serif" }}
          >
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
          </span>
          <Clock size={12} className={isUrgent ? "text-red-400" : "text-[#D4AF37]"} style={{ opacity: 0.7 }} />
        </div>
      </div>
      <p
        className="text-xs"
        style={{
          color: running ? (isUrgent ? "#EF4444" : "#D4AF37") : "rgba(245,230,232,0.4)",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        {seconds === 0 ? "انتهى الوقت" : running ? "جارٍ العد — اضغط للإيقاف" : "اضغط للبدء"}
      </p>
    </div>
  );
}

export default function GamePlay() {
  const { state, advanceRound } = useGame();
  const [showClue, setShowClue] = useState(false);
  const [timerDone, setTimerDone] = useState(false);

  const { selectedCase, players, currentRound } = state;
  if (!selectedCase) return null;

  const clue = selectedCase.clues[currentRound - 1];

  const handleNextRound = () => {
    setShowClue(false);
    setTimerDone(false);
    advanceRound();
  };

  return (
    <div className="min-h-screen bg-deep-burgundy flex flex-col" dir="rtl">
      {/* Header */}
      <div
        className="px-4 pt-10 pb-4"
        style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="gold-text text-lg font-bold" style={{ fontFamily: "Amiri, serif" }}>
              {selectedCase.title}
            </h2>
            <p className="text-[#F5E6E8] text-opacity-50 text-xs" style={{ fontFamily: "Cairo, sans-serif" }}>
              الجولة {currentRound} من ٣
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((r) => (
              <div
                key={r}
                className="w-8 h-2 rounded-full transition-all"
                style={{
                  background:
                    r < currentRound
                      ? "#D4AF37"
                      : r === currentRound
                      ? "linear-gradient(90deg, #D4AF37, #FFDF00)"
                      : "rgba(212,175,55,0.2)",
                  boxShadow: r === currentRound ? "0 0 8px rgba(212,175,55,0.5)" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* Case description snippet */}
        <div
          className="p-3 rounded-xl text-xs leading-relaxed"
          style={{ background: "rgba(74,14,23,0.5)", border: "1px solid rgba(212,175,55,0.15)" }}
        >
          <p className="text-[#F5E6E8] text-opacity-60" style={{ fontFamily: "Cairo, sans-serif" }}>
            {selectedCase.crimeDescription.substring(0, 120)}...
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-custom px-4 pb-4">
        {/* Players grid */}
        <div className="mt-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-[#D4AF37]" />
            <p className="text-[#D4AF37] text-xs font-bold" style={{ fontFamily: "Cairo, sans-serif" }}>
              المشتبه بهم
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {players.map((player, i) => (
              <div
                key={i}
                data-testid={`card-player-${i}`}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold"
                  style={{
                    background: "linear-gradient(135deg, #4A0E17, #2D0A10)",
                    border: "1.5px solid rgba(212,175,55,0.5)",
                    color: "#D4AF37",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  {player.name.charAt(0)}
                </div>
                <p
                  className="text-center text-xs font-bold leading-none"
                  style={{ color: "#F5E6E8", fontFamily: "Cairo, sans-serif" }}
                >
                  {player.name}
                </p>
                <p
                  className="text-center leading-none"
                  style={{
                    color: "rgba(212,175,55,0.7)",
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "9px",
                  }}
                >
                  {player.occupation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timer section */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{
            background: "linear-gradient(135deg, #3D0A12, #2D0A10)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <p className="text-center text-[#F5E6E8] text-opacity-60 text-xs mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
            وقت النقاش
          </p>
          <TimerDisplay onComplete={() => setTimerDone(true)} />
        </div>

        {/* Clue button */}
        <button
          data-testid="button-reveal-clue"
          onClick={() => setShowClue(true)}
          className="btn-gold w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 mb-4"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <FileText size={20} />
          كشف الدليل — الجولة {currentRound}
        </button>

        {/* Next round / voting button */}
        <button
          data-testid="button-next-round"
          onClick={handleNextRound}
          className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-10 transition-all"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <ChevronLeft size={20} />
          {currentRound === 3 ? "الانتقال إلى التصويت" : `الجولة ${currentRound + 1}`}
        </button>
      </div>

      {/* Clue Modal */}
      {showClue && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-end justify-center z-50 px-4 pb-6" dir="rtl">
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #1A0508, #120204)",
              border: "2px solid #D4AF37",
              boxShadow: "0 0 60px rgba(212,175,55,0.4)",
            }}
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[#D4AF37] text-xs opacity-70 mb-0.5" style={{ fontFamily: "Cairo, sans-serif" }}>
                    دليل الجولة
                  </p>
                  <p className="gold-text text-2xl font-bold" style={{ fontFamily: "Amiri, serif" }}>
                    {currentRound === 1 ? "الأول" : currentRound === 2 ? "الثاني" : "الثالث"}
                  </p>
                </div>
                <button
                  onClick={() => setShowClue(false)}
                  className="w-9 h-9 rounded-full border border-[#D4AF37] border-opacity-40 flex items-center justify-center text-[#D4AF37]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Clue badge type */}
              <div
                className="inline-block px-3 py-1 rounded-full mb-4 text-xs"
                style={{
                  background: "rgba(212,175,55,0.15)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  color: "#D4AF37",
                  fontFamily: "Cairo, sans-serif",
                }}
              >
                {currentRound === 1 ? "خيط غامض وغير مباشر" : currentRound === 2 ? "دليل مضلل" : "تحليل دقيق"}
              </div>

              {/* Clue text */}
              <div
                className="p-4 rounded-xl"
                style={{ background: "rgba(74,14,23,0.6)", border: "1px solid rgba(212,175,55,0.2)" }}
              >
                <p
                  className="text-[#F5E6E8] text-base leading-relaxed"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {clue}
                </p>
              </div>

              <button
                data-testid="button-close-clue"
                onClick={() => setShowClue(false)}
                className="btn-gold w-full py-3 rounded-xl font-bold text-sm mt-4"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                فهمت — للنقاش
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
