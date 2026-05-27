import { Shield, Users, Crosshair } from "lucide-react";
import { useGame } from "../App";

export default function Home() {
  const { selectMode } = useGame();

  return (
    <div className="flex flex-col min-h-screen items-center justify-between px-5 pt-14 pb-10 bg-gradient-to-b from-[#120204] via-[#1E0509] to-[#120204]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/60 flex items-center justify-center shadow-lg shadow-gold/20">
          <Shield className="w-10 h-10 text-gold" strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-bold text-gold font-amiri tracking-wide">مافيوسو</h1>
        <p className="text-xs text-gold/50 font-cairo tracking-widest">القضية الغامضة</p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs mt-8">
        <button
          onClick={() => selectMode("pass-and-play")}
          className="w-full py-5 px-5 rounded-xl bg-[#4A0E17] border border-gold/30 hover:border-gold/70 hover:bg-[#5A1522] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-black/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-end gap-1">
              <span className="text-gold font-bold text-lg font-cairo">لعب جماعي</span>
              <span className="text-gold/50 text-xs font-cairo">٥ لاعبين — مناولة الهاتف</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <Users className="w-6 h-6 text-gold" strokeWidth={1.5} />
            </div>
          </div>
        </button>

        <button
          onClick={() => selectMode("solo-detective")}
          className="w-full py-5 px-5 rounded-xl bg-[#2D0A10] border border-gold/20 hover:border-gold/50 hover:bg-[#3A0C14] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-black/40"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-end gap-1">
              <span className="text-gold font-bold text-lg font-cairo">المحقق المنفرد</span>
              <span className="text-gold/50 text-xs font-cairo">أنت المافيوسو — تحدَّ نفسك</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
              <Crosshair className="w-6 h-6 text-gold" strokeWidth={1.5} />
            </div>
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs mt-6">
        <p className="text-gold/40 text-xs font-cairo text-center">كيف تلعب</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { num: "١", text: "المواطنون يعرفون نفس الكلمة والمافيوسو عنده كلمة مشابهة لها" },
            { num: "٢", text: "كل لاعب يقول كلمة واحدة إشارة — من يبدو مختلفاً؟" },
            { num: "٣", text: "صوّتوا على المافيوسو — إن خمّن كلمتكم يفوز هو" },
          ].map((step) => (
            <div
              key={step.num}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#1E0509] border border-gold/10"
            >
              <span className="text-gold font-bold text-lg font-amiri">{step.num}</span>
              <p className="text-gold/45 text-[10px] font-cairo text-center leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gold/20 text-xs font-cairo mt-5">مافيوسو — القضية الغامضة</p>
    </div>
  );
}
