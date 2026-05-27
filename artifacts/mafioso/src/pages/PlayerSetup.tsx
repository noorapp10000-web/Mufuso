import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { getCase } from "@/data/cases";
import { useGame, Player } from "@/context/GameContext";
import { ArrowRight, User, MapPin } from "lucide-react";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PlayerSetup() {
  const { caseId } = useParams<{ caseId: string }>();
  const [, setLocation] = useLocation();
  const { setPlayers } = useGame();
  const caseData = getCase(caseId!);
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState(["", "", "", ""]);

  if (!caseData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center" dir="rtl">
        <p className="text-zinc-400">القضية غير موجودة</p>
      </div>
    );
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    if (value.trim()) {
      const newErrors = [...errors];
      newErrors[index] = "";
      setErrors(newErrors);
    }
  };

  const handleStart = () => {
    const newErrors = playerNames.map(n => n.trim() ? "" : "أدخل اسم اللاعب");
    setErrors(newErrors);
    if (newErrors.some(e => e)) return;

    // Check for duplicate names
    const names = playerNames.map(n => n.trim().toLowerCase());
    const hasDuplicates = names.some((n, i) => names.indexOf(n) !== i);
    if (hasDuplicates) {
      setErrors(playerNames.map((n, i) => {
        const lower = n.trim().toLowerCase();
        return playerNames.some((other, j) => j !== i && other.trim().toLowerCase() === lower)
          ? "الاسم مكرر"
          : "";
      }));
      return;
    }

    // Randomly assign mafioso - pick one random index
    const mafiosoIndex = Math.floor(Math.random() * 4);

    // Shuffle characters for assignment
    const shuffledChars = shuffleArray(caseData.characters);

    const players: Player[] = playerNames.map((name, index) => ({
      id: `player_${index}`,
      name: name.trim(),
      isMafioso: index === mafiosoIndex,
      characterId: shuffledChars[index].id,
      characterName: shuffledChars[index].name,
      hasRevealed: false,
      isEliminated: false,
    }));

    setPlayers(players);
    setLocation(`/draw/${caseId}`);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/cases")}
            className="p-2 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black text-white truncate" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {caseData.title}
            </h1>
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {caseData.location}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Case preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden border border-border"
        >
          <div className="h-40 relative">
            <img
              src={caseData.coverImage}
              alt={caseData.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = "none";
                t.parentElement!.style.background = "linear-gradient(135deg, #1a0808 0%, #0d0d0d 100%)";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 left-4">
              <span className="inline-block px-3 py-1 bg-red-900/80 rounded-full text-xs text-red-300 border border-red-800/50 mb-2">
                {caseData.category}
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">
                {caseData.summary}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Player names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <h2 className="text-sm font-bold text-zinc-400 px-3" style={{ fontFamily: "'Cairo', sans-serif" }}>
              أسماء اللاعبين الأربعة
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.07 }}
              className="space-y-1"
            >
              <div className={`flex items-center gap-3 p-4 rounded-2xl border bg-card transition-all ${
                errors[index]
                  ? "border-red-600/50 bg-red-950/10"
                  : "border-border focus-within:border-red-700/60 focus-within:bg-white/2"
              }`}>
                <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-red-900/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-zinc-500 mb-1 block">
                    اللاعب {["الأول", "الثاني", "الثالث", "الرابع"][index]}
                  </label>
                  <input
                    type="text"
                    value={playerNames[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`اسم اللاعب ${["الأول", "الثاني", "الثالث", "الرابع"][index]}`}
                    className="w-full bg-transparent text-white placeholder-zinc-600 text-sm font-medium outline-none"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                    onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  />
                </div>
                {playerNames[index] && (
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                )}
              </div>
              {errors[index] && (
                <p className="text-xs text-red-400 pr-4">{errors[index]}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30"
        >
          <p className="text-sm text-amber-400/80 leading-relaxed text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
            سيختار النظام المافيوسو بشكل عشوائي. كل لاعب سيرى بطاقته سراً.
          </p>
        </motion.div>

        {/* Start button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={handleStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          توزيع الكروت
        </motion.button>
      </div>
    </div>
  );
}
