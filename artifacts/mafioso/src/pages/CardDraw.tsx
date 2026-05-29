import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getCase } from "@/data/cases";
import { useGame } from "@/context/GameContext";
import { ArrowRight, Eye, EyeOff, Shield, Skull } from "lucide-react";

export default function CardDraw() {
  const { caseId } = useParams<{ caseId: string }>();
  const [, setLocation] = useLocation();
  const { gameState } = useGame();
  const caseData = getCase(caseId!);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [allDone, setAllDone] = useState(false);

  if (!caseData || gameState.players.length === 0) {
    setLocation("/cases");
    return null;
  }

  const currentPlayer = gameState.players[currentPlayerIndex];
  const character = caseData.characters.find(c => c.id === currentPlayer.characterId);

  const handleFlipCard = () => {
    setCardFlipped(true);
    setCardVisible(true);
  };

  const handleHideAndNext = () => {
    setCardVisible(false);
    setCardFlipped(false);
    setTimeout(() => {
      if (currentPlayerIndex < gameState.players.length - 1) {
        setCurrentPlayerIndex(prev => prev + 1);
      } else {
        setAllDone(true);
      }
    }, 400);
  };

  if (allDone) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md w-full"
        >
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-full bg-red-950/50 border-2 border-red-700/50 flex items-center justify-center mx-auto glow-red">
              <Skull className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              الجميع عرف دوره
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              المافيوسو يعرف نفسه. الأبرياء لا يعرفون من المافيوسو.
              <br />
              الآن تبدأ اللعبة.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30">
            <p className="text-amber-400/80 text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
              تذكير: لا أحد يكشف بطاقته للآخرين
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setLocation(`/play/${caseId}`)}
            className="w-full py-4 bg-red-700 hover:bg-red-600 rounded-2xl font-bold text-white text-lg transition-all glow-red border border-red-600/40"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            ابدأ التحقيق
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              سحب الكروت
            </h1>
            <span className="text-xs text-zinc-500">
              {currentPlayerIndex + 1} / {gameState.players.length}
            </span>
          </div>
          {/* Progress */}
          <div className="flex gap-1.5">
            {gameState.players.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                  i < currentPlayerIndex ? "bg-green-600" :
                  i === currentPlayerIndex ? "bg-red-600" :
                  "bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full">
        {/* Player name prompt */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayerIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
          >
            <div className="text-center space-y-2">
              <p className="text-zinc-400 text-sm">دور</p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {currentPlayer.name}
              </h2>
              <p className="text-zinc-500 text-sm">اضغط على البطاقة لرؤية دورك سراً</p>
            </div>

            {/* Card */}
            <div className="flip-card w-full mx-auto" style={{ minHeight: "520px" }}>
              <div className={`flip-card-inner w-full h-full ${cardFlipped ? "flipped" : ""}`}>
                {/* Card Back */}
                <div
                  className="flip-card-front absolute inset-0 cursor-pointer"
                  onClick={!cardFlipped ? handleFlipCard : undefined}
                >
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-zinc-900 via-red-950/30 to-zinc-900 border-2 border-red-900/40 flex flex-col items-center justify-center gap-4 hover:border-red-700/60 transition-colors glow-red shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-900/50 flex items-center justify-center">
                      <EyeOff className="w-8 h-8 text-red-500/60" />
                    </div>
                    <div className="text-center px-6">
                      <p className="text-zinc-400 text-sm font-medium">اضغط لكشف بطاقتك</p>
                      <p className="text-zinc-600 text-xs mt-1">تأكد أن الآخرين لا يرون</p>
                    </div>
                    {/* Card pattern */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-5">
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-12 gap-1 p-4">
                        {[...Array(96)].map((_, i) => (
                          <div key={i} className="bg-red-500 rounded-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Front */}
                <div className="flip-card-back absolute inset-0">
                  <div className={`w-full h-full rounded-3xl border-2 shadow-2xl flex flex-col overflow-hidden ${
                    currentPlayer.isMafioso
                      ? "bg-gradient-to-br from-red-950 via-zinc-900 to-black border-red-700/60 glow-red"
                      : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-zinc-700/50"
                  }`}>
                    {/* Top badge */}
                    <div className={`px-6 pt-6 pb-4 flex items-center gap-3 border-b ${
                      currentPlayer.isMafioso ? "border-red-900/40" : "border-zinc-700/40"
                    }`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        currentPlayer.isMafioso
                          ? "bg-red-900/60 border border-red-700/50"
                          : "bg-zinc-800 border border-zinc-700/50"
                      }`}>
                        {currentPlayer.isMafioso
                          ? <Skull className="w-6 h-6 text-red-400" />
                          : <Shield className="w-6 h-6 text-green-400" />
                        }
                      </div>
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-widest ${
                          currentPlayer.isMafioso ? "text-red-400" : "text-green-400"
                        }`}>
                          {currentPlayer.isMafioso ? "مافيوسو" : "بريء"}
                        </div>
                        <div className="text-white font-black text-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
                          {currentPlayer.isMafioso ? "أنت المجرم" : "أنت بريء"}
                        </div>
                      </div>
                    </div>

                    {/* Character info */}
                    {character && (
                      <div className="flex-1 p-6 space-y-4">
                        <div>
                          <p className="text-xs text-zinc-500 mb-1">شخصيتك</p>
                          <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                            {character.name}
                          </h3>
                          <p className="text-sm text-zinc-400">{character.profession}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-white/3 border border-white/8">
                          <p className="text-xs text-zinc-500 mb-1.5">خلفيتك</p>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {character.background}
                          </p>
                        </div>

                        <div className={`p-3 rounded-xl border ${
                          currentPlayer.isMafioso
                            ? "bg-red-950/30 border-red-900/40"
                            : "bg-zinc-800/50 border-zinc-700/40"
                        }`}>
                          <p className={`text-xs mb-1.5 ${
                            currentPlayer.isMafioso ? "text-red-400" : "text-zinc-500"
                          }`}>
                            {currentPlayer.isMafioso ? "مهمتك" : "دافعك"}
                          </p>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {character.motive}
                          </p>
                        </div>

                        {currentPlayer.isMafioso && (
                          <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30">
                            <p className="text-xs text-red-400 font-bold text-center" style={{ fontFamily: "'Cairo', sans-serif" }}>
                              لا تكشف نفسك. أضلل الأبرياء.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hide button */}
                    <div className="p-4 border-t border-white/8">
                      <button
                        onClick={handleHideAndNext}
                        className="w-full py-3 rounded-xl bg-white/8 hover:bg-white/12 transition-colors text-white font-bold text-sm flex items-center justify-center gap-2"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                      >
                        <Eye className="w-4 h-4" />
                        قرأت وفهمت، أخفِ البطاقة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
