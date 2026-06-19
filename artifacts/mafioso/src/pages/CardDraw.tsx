import { useState } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getCaseById as getCase } from "@/data/allCases";
import { useGame } from "@/context/GameContext";
import { ArrowRight, Eye, EyeOff, Shield, Skull, Users } from "lucide-react";

export default function CardDraw() {
  const { caseId } = useParams<{ caseId: string }>();
  const [, setLocation] = useLocation();
  const { gameState } = useGame();
  const caseData = getCase(caseId!);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!caseData || gameState.players.length === 0) {
    setLocation("/cases");
    return null;
  }

  const currentPlayer = gameState.players[currentPlayerIndex];
  const character = caseData.characters.find(c => c.id === currentPlayer.characterId);

  const charImageSrc = character ? `/character-images/${caseId}_${character.id}.webp` : null;

  const handleFlipCard = () => {
    setCardFlipped(true);
    setCardVisible(true);
  };

  const handleHideAndNext = () => {
    setCardVisible(false);
    setCardFlipped(false);
    setImgError(false);
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6" dir="rtl">
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
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              سحب الكروت
            </h1>
            <span className="text-xs text-zinc-500">
              {currentPlayerIndex + 1} / {gameState.players.length}
            </span>
          </div>
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

            <div className="flip-card w-full mx-auto" style={{ height: "min(520px, calc(100svh - 220px))" }}>
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
                  <div className={`w-full h-full rounded-3xl border-2 shadow-2xl relative overflow-hidden ${
                    currentPlayer.isMafioso
                      ? "border-red-700/60 glow-red"
                      : "border-zinc-700/50"
                  }`}>

                    {/* Background: character image or fallback */}
                    {charImageSrc && !imgError ? (
                      <img
                        src={charImageSrc}
                        alt={character?.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className={`absolute inset-0 ${
                        currentPlayer.isMafioso
                          ? "bg-gradient-to-br from-red-950 via-zinc-900 to-black"
                          : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                      }`} />
                    )}

                    {/* Gradient overlays for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95" />
                    {currentPlayer.isMafioso && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent" />
                    )}

                    {/* Content over the image */}
                    <div className="relative z-10 w-full h-full flex flex-col">

                      {/* Top: role badge */}
                      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                          currentPlayer.isMafioso
                            ? "bg-red-950/70 border-red-700/60"
                            : "bg-black/50 border-zinc-600/60"
                        }`}>
                          {currentPlayer.isMafioso
                            ? <Skull className="w-4 h-4 text-red-400" />
                            : <Shield className="w-4 h-4 text-green-400" />
                          }
                          <span className={`text-xs font-black tracking-widest ${
                            currentPlayer.isMafioso ? "text-red-300" : "text-green-300"
                          }`} style={{ fontFamily: "'Cairo', sans-serif" }}>
                            {currentPlayer.isMafioso ? "مافيوسو — أنت المجرم" : "بريء — أنت في أمان"}
                          </span>
                        </div>
                      </div>

                      {/* Spacer to push content to bottom */}
                      <div className="flex-1" />

                      {/* Bottom: character info — scrollable */}
                      <div className="overflow-y-auto max-h-[60%] px-4 pb-2 space-y-2.5">
                        {character && (
                          <>
                            <div>
                              <p className="text-xs text-zinc-400 mb-0.5">شخصيتك</p>
                              <h3 className="text-2xl font-black text-white drop-shadow-lg" style={{ fontFamily: "'Cairo', sans-serif" }}>
                                {character.name}
                              </h3>
                              <p className="text-sm text-zinc-300 drop-shadow">{character.profession}</p>
                            </div>

                            <div className="p-3 rounded-xl bg-black/55 backdrop-blur-sm border border-white/10">
                              <p className="text-xs text-zinc-400 mb-1">خلفيتك</p>
                              <p className="text-xs text-zinc-200 leading-relaxed">
                                {character.background}
                              </p>
                            </div>

                            <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                              currentPlayer.isMafioso
                                ? "bg-red-950/60 border-red-700/50"
                                : "bg-black/55 border-white/10"
                            }`}>
                              <p className={`text-xs mb-1 ${
                                currentPlayer.isMafioso ? "text-red-400" : "text-zinc-400"
                              }`}>
                                {currentPlayer.isMafioso ? "مهمتك" : "دافعك"}
                              </p>
                              <p className="text-xs text-zinc-200 leading-relaxed">
                                {character.motive}
                              </p>
                            </div>

                            {currentPlayer.isMafioso && currentPlayer.mafiosoPartnerName && (
                              <div className="p-3 rounded-xl bg-red-950/70 backdrop-blur-sm border border-red-700/60">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Users className="w-3.5 h-3.5 text-red-400" />
                                  <p className="text-xs text-red-400 font-bold">شريكك المافيوسو</p>
                                </div>
                                <p className="text-base font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                                  {currentPlayer.mafiosoPartnerName}
                                </p>
                                <p className="text-xs text-red-300/70 mt-1">
                                  أنتما اثنان. لا تكشفوا بعضكم أمام الأبرياء.
                                </p>
                              </div>
                            )}

                            {currentPlayer.isMafioso && !currentPlayer.mafiosoPartnerName && (
                              <div className="p-3 rounded-xl bg-red-950/60 backdrop-blur-sm border border-red-900/50 text-center">
                                <p className="text-xs text-red-300 font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                                  لا تكشف نفسك. أضلل الأبرياء.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Hide button */}
                      <div className="p-4 shrink-0">
                        <button
                          onClick={handleHideAndNext}
                          className="w-full py-3 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-black/75 transition-colors text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/15"
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
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
