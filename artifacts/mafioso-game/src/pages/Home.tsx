import { useState } from "react";
import { Users, User, BookOpen, X, Shield, Eye, Clock } from "lucide-react";
import { useGame } from "../App";

export default function Home() {
  const { selectMode } = useGame();
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-8 bg-deep-burgundy relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
        <div className="absolute top-20 left-4 w-16 h-16 border border-[#D4AF37] opacity-10 rotate-45" />
        <div className="absolute top-28 left-8 w-8 h-8 border border-[#D4AF37] opacity-15 rotate-45" />
        <div className="absolute top-20 right-4 w-16 h-16 border border-[#D4AF37] opacity-10 rotate-45" />
        <div className="absolute top-28 right-8 w-8 h-8 border border-[#D4AF37] opacity-15 rotate-45" />
        <div className="absolute bottom-32 left-4 w-12 h-12 border border-[#D4AF37] opacity-10 rotate-45" />
        <div className="absolute bottom-32 right-4 w-12 h-12 border border-[#D4AF37] opacity-10 rotate-45" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, #D4AF37 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top section */}
      <div className="w-full flex justify-end pt-2">
        <button
          data-testid="button-rules"
          onClick={() => setShowRules(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37] border-opacity-50 text-[#D4AF37] text-sm hover:bg-[#D4AF37] hover:bg-opacity-10 transition-all"
        >
          <BookOpen size={16} />
          <span>قواعد اللعبة</span>
        </button>
      </div>

      {/* Logo / Title section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 relative z-10">
        {/* Decorative top ornament */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-3 h-3 border border-[#D4AF37] rotate-45" />
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
          <div className="w-3 h-3 border border-[#D4AF37] rotate-45" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Game icon */}
        <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(212,175,55,0.3)] bg-[#1A0508]">
          <div className="w-20 h-20 rounded-full border border-[#D4AF37] border-opacity-40 flex items-center justify-center">
            <Eye size={36} className="text-[#D4AF37]" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1
            className="gold-text font-serif text-4xl font-bold leading-tight tracking-wide"
            style={{ fontFamily: "Amiri, serif" }}
            data-testid="text-title"
          >
            مافيوسو
          </h1>
          <div className="flex items-center gap-2 justify-center">
            <div className="h-px w-8 bg-[#D4AF37] opacity-50" />
            <p className="text-[#F5E6E8] text-opacity-80 text-sm tracking-widest font-light" style={{ fontFamily: "Cairo, sans-serif" }}>
              القضية الغامضة
            </p>
            <div className="h-px w-8 bg-[#D4AF37] opacity-50" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[#F5E6E8] text-opacity-60 text-sm max-w-xs leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
          لعبة الاستنتاج الاجتماعي — اكشف الغموض، حدد المافيوسو
        </p>

        {/* Bottom ornament */}
        <div className="flex items-center gap-3 mt-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rotate-45" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>

      {/* Buttons section */}
      <div className="w-full max-w-sm space-y-4 relative z-10 pb-4">
        {/* Pass & Play button */}
        <button
          data-testid="button-pass-play"
          onClick={() => selectMode("pass-and-play")}
          className="btn-gold w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg font-bold shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <Users size={22} />
          <span>اللعب الجماعي</span>
          <span className="text-xs opacity-70 font-normal">(Pass & Play)</span>
        </button>

        {/* Solo Detective button */}
        <button
          data-testid="button-solo"
          onClick={() => selectMode("solo-detective")}
          className="w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-lg font-bold border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-10 transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          <User size={22} />
          <span>طور المحقق المنفرد</span>
          <span className="text-xs opacity-70 font-normal">(Solo)</span>
        </button>

        {/* Game info */}
        <div className="flex justify-center gap-6 pt-2">
          <div className="flex items-center gap-1.5 text-[#F5E6E8] text-opacity-50 text-xs">
            <Users size={12} className="text-[#D4AF37] opacity-70" />
            <span>٥ لاعبين</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F5E6E8] text-opacity-50 text-xs">
            <Clock size={12} className="text-[#D4AF37] opacity-70" />
            <span>٣ جولات</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F5E6E8] text-opacity-50 text-xs">
            <Shield size={12} className="text-[#D4AF37] opacity-70" />
            <span>٣٠ قضية</span>
          </div>
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-end justify-center z-50 px-4 pb-4" dir="rtl">
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #1A0508 0%, #120204 100%)",
              border: "2px solid #D4AF37",
              boxShadow: "0 0 40px rgba(212,175,55,0.3)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(212,175,55,0.3)" }}
            >
              <h2 className="gold-text text-xl font-bold" style={{ fontFamily: "Amiri, serif" }}>
                قواعد اللعبة
              </h2>
              <button
                onClick={() => setShowRules(false)}
                className="w-8 h-8 rounded-full border border-[#D4AF37] border-opacity-50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:bg-opacity-20 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto scroll-custom">
              {[
                {
                  icon: Users,
                  title: "المجموعة",
                  text: "٥ لاعبين: ٤ مواطنون أبرياء + مافيوسو واحد مخفي. كل لاعب يحصل على مهنة يومية تتعلق بالقضية.",
                },
                {
                  icon: Eye,
                  title: "الجولات الثلاث",
                  text: "في كل جولة يُكشف دليل جديد. الأول: خيط خفي. الثاني: مضلل. الثالث: تحليلي عميق.",
                },
                {
                  icon: Clock,
                  title: "النقاش والتصويت",
                  text: "بعد كل دليل ٦٠ ثانية للنقاش. في نهاية الجولة الثالثة يصوت الجميع على المشتبه به.",
                },
                {
                  icon: Shield,
                  title: "الفوز والخسارة",
                  text: "إذا صوت الجميع على المافيوسو: المواطنون يفوزون. إذا نجا المافيوسو من التصويت: يفوز المافيوسو.",
                },
              ].map((rule, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
                  >
                    <rule.icon size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-[#D4AF37] text-sm font-bold mb-1" style={{ fontFamily: "Cairo, sans-serif" }}>
                      {rule.title}
                    </p>
                    <p className="text-[#F5E6E8] text-opacity-75 text-sm leading-relaxed" style={{ fontFamily: "Cairo, sans-serif" }}>
                      {rule.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(212,175,55,0.2)" }}>
              <button
                onClick={() => setShowRules(false)}
                className="btn-gold w-full py-3 rounded-xl font-bold text-sm"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                فهمت — لنبدأ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
