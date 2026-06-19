import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnline } from "@/context/OnlineContext";
import { getCaseById } from "@/data/allCases";
import { Eye, EyeOff, Shield, Skull, Users, Check } from "lucide-react";

export default function OnlineCardDraw() {
  const { room, myPlayerId, myCard, confirmCard } = useOnline();

  const [cardFlipped, setCardFlipped] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!room || !myCard) return (
    <div className="min-h-screen flex items-center justify-center" dir="rtl">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>جاري تحميل بطاقتك...</p>
      </div>
    </div>
  );

  const me = room.players.find(p => p.id === myPlayerId);
  const caseData = room.caseMeta ? getCaseById(room.caseMeta.id) : null;
  const character = caseData?.characters.find(c => c.id === myCard.characterId);
  const confirmedCount = room.players.filter(p => p.cardConfirmed).length;
  const totalCount = room.players.filter(p => p.isConnected).length;

  function handleConfirm() {
    setConfirmed(true);
    confirmCard();
  }

  if (confirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-sm w-full"
        >
          <div className="w-16 h-16 rounded-full bg-green-950/50 border-2 border-green-700/50 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
              فهمت دورك!
            </h2>
            <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
              في انتظار بقية اللاعبين...
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex justify-between text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
              <span>أكدوا بطاقاتهم</span>
              <span>{confirmedCount} / {totalCount}</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <motion.div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(confirmedCount / totalCount) * 100}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {room.players.filter(p => p.isConnected).map(p => (
                <div
                  key={p.id}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-xs ${
                    p.cardConfirmed
                      ? "bg-green-950/30 border border-green-900/40 text-green-400"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-500"
                  }`}
                  style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                  {p.cardConfirmed && <Check className="w-3 h-3" />}
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {confirmedCount === totalCount && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm font-bold"
              style={{ fontFamily: "'Cairo', sans-serif" }}
            >
              الجميع جاهز! تبدأ اللعبة الآن...
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-black/70 backdrop-blur-md border-b border-white/10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
            بطاقتك السرية
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Users className="w-3.5 h-3.5" />
            <span style={{ fontFamily: "'Cairo', sans-serif" }}>{confirmedCount}/{totalCount} أكدوا</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-6"
          >
            {/* Player name */}
            <div className="text-center space-y-1">
              <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                بطاقتك يا
              </p>
              <h2 className="text-4xl font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                {me?.name ?? ""}
              </h2>
              {!cardFlipped && (
                <p className="text-zinc-500 text-sm" style={{ fontFamily: "'Cairo', sans-serif" }}>
                  تأكد أن الآخرين لا يرون شاشتك، ثم اضغط على البطاقة
                </p>
              )}
            </div>

            {/* Card */}
            <div className="flip-card w-full mx-auto" style={{ height: "min(480px, calc(100svh - 240px))" }}>
              <div className={`flip-card-inner w-full h-full ${cardFlipped ? "flipped" : ""}`}>
                {/* Card Back */}
                <div
                  className="flip-card-front absolute inset-0 cursor-pointer"
                  onClick={!cardFlipped ? () => setCardFlipped(true) : undefined}
                >
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-zinc-900 via-red-950/30 to-zinc-900 border-2 border-red-900/40 flex flex-col items-center justify-center gap-4 hover:border-red-700/60 transition-colors glow-red shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-900/50 flex items-center justify-center">
                      <EyeOff className="w-8 h-8 text-red-500/60" />
                    </div>
                    <div className="text-center px-6">
                      <p className="text-zinc-400 text-sm font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        اضغط لكشف بطاقتك
                      </p>
                      <p className="text-zinc-600 text-xs mt-1" style={{ fontFamily: "'Cairo', sans-serif" }}>
                        سرّي — لا أحد يرى إلا أنت
                      </p>
                    </div>
                    {/* Grid decoration */}
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
                    myCard.isMafioso
                      ? "border-red-700/60 glow-red"
                      : "border-zinc-700/50"
                  }`}>

                    {/* Background: character image or fallback */}
                    {character && room?.caseMeta ? (
                      <img
                        src={`/character-images/${room.caseMeta.id}_${character.id}.webp`}
                        alt={character.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : null}

                    {/* Fallback bg always present underneath */}
                    <div className={`absolute inset-0 -z-10 ${
                      myCard.isMafioso
                        ? "bg-gradient-to-br from-red-950 via-zinc-900 to-black"
                        : "bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
                    }`} />

                    {/* Gradient overlays for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95" />
                    {myCard.isMafioso && (
                      <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-transparent to-transparent" />
                    )}

                    {/* Content over the image */}
                    <div className="relative z-10 w-full h-full flex flex-col">

                      {/* Top: role badge */}
                      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border ${
                          myCard.isMafioso
                            ? "bg-red-950/70 border-red-700/60"
                            : "bg-black/50 border-zinc-600/60"
                        }`}>
                          {myCard.isMafioso
                            ? <Skull className="w-4 h-4 text-red-400" />
                            : <Shield className="w-4 h-4 text-green-400" />
                          }
                          <span className={`text-xs font-black tracking-widest ${
                            myCard.isMafioso ? "text-red-300" : "text-green-300"
                          }`} style={{ fontFamily: "'Cairo', sans-serif" }}>
                            {myCard.isMafioso ? "مافيوسو — أنت المجرم" : "بريء — أنت في أمان"}
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
                              <p className="text-xs text-zinc-200 leading-relaxed">{character.background}</p>
                            </div>

                            <div className={`p-3 rounded-xl backdrop-blur-sm border ${
                              myCard.isMafioso
                                ? "bg-red-950/60 border-red-700/50"
                                : "bg-black/55 border-white/10"
                            }`}>
                              <p className={`text-xs mb-1 ${myCard.isMafioso ? "text-red-400" : "text-zinc-400"}`}>
                                {myCard.isMafioso ? "مهمتك" : "دافعك"}
                              </p>
                              <p className="text-xs text-zinc-200 leading-relaxed">{character.motive}</p>
                            </div>

                            {myCard.isMafioso && myCard.mafiosoPartnerName && (
                              <div className="p-3 rounded-xl bg-red-950/70 backdrop-blur-sm border border-red-700/60">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Users className="w-3.5 h-3.5 text-red-400" />
                                  <p className="text-xs text-red-400 font-bold">شريكك المافيوسو</p>
                                </div>
                                <p className="text-base font-black text-white" style={{ fontFamily: "'Cairo', sans-serif" }}>
                                  {myCard.mafiosoPartnerName}
                                </p>
                                <p className="text-xs text-red-300/70 mt-1">لا تكشفوا بعضكم أمام الأبرياء</p>
                              </div>
                            )}

                            {myCard.isMafioso && !myCard.mafiosoPartnerName && (
                              <div className="p-3 rounded-xl bg-red-950/60 backdrop-blur-sm border border-red-900/50 text-center">
                                <p className="text-xs text-red-300 font-bold" style={{ fontFamily: "'Cairo', sans-serif" }}>
                                  لا تكشف نفسك. أضلل الأبرياء.
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Confirm button */}
                      <div className="p-4 shrink-0">
                        <button
                          onClick={handleConfirm}
                          className="w-full py-3 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-black/75 transition-colors text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/15"
                          style={{ fontFamily: "'Cairo', sans-serif" }}
                        >
                          <Eye className="w-4 h-4" />
                          قرأت وفهمت
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
