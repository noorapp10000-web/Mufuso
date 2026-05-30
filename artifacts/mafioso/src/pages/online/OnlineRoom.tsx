import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOnline } from "@/context/OnlineContext";
import { VoiceProvider, useVoice } from "@/context/VoiceContext";
import OnlineLobby from "./OnlineLobby";
import OnlineCardDraw from "./OnlineCardDraw";
import OnlineGamePlay from "./OnlineGamePlay";
import { Mic, MicOff, WifiOff } from "lucide-react";

function FloatingMicButton() {
  const { isMuted, toggleMute, isVoiceReady, voiceError } = useVoice();

  if (voiceError) {
    return (
      <div className="fixed bottom-6 left-4 z-50">
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-zinc-900/90 border border-zinc-700 backdrop-blur-sm">
          <WifiOff className="w-4 h-4 text-zinc-500" />
          <span className="text-xs text-zinc-500" style={{ fontFamily: "'Cairo', sans-serif" }}>
            لا يوجد ميكروفون
          </span>
        </div>
      </div>
    );
  }

  if (!isVoiceReady) return null;

  return (
    <div className="fixed bottom-6 left-4 z-50">
      <button
        onClick={toggleMute}
        className={`relative flex items-center justify-center w-12 h-12 rounded-2xl border-2 shadow-lg transition-all active:scale-95 ${
          isMuted
            ? "bg-zinc-900 border-zinc-600 text-zinc-400"
            : "bg-green-950/80 border-green-600/70 text-green-400"
        }`}
        aria-label={isMuted ? "فتح الميكروفون" : "كتم الميكروفون"}
      >
        {!isMuted && (
          <span className="absolute inset-0 rounded-2xl border-2 border-green-500/40 animate-ping" />
        )}
        {isMuted
          ? <MicOff className="w-5 h-5" />
          : <Mic className="w-5 h-5" />
        }
      </button>
      <p className="text-center text-[10px] mt-1 font-bold" style={{
        fontFamily: "'Cairo', sans-serif",
        color: isMuted ? "#71717a" : "#4ade80",
      }}>
        {isMuted ? "صامت" : "مفتوح"}
      </p>
    </div>
  );
}

function RoomContent() {
  const [, setLocation] = useLocation();
  const { room } = useOnline();

  useEffect(() => {
    if (!room) setLocation("/online");
  }, [room, setLocation]);

  if (!room) return null;

  return (
    <>
      {room.status === "waiting" && <OnlineLobby />}
      {room.status === "card_draw" && <OnlineCardDraw />}
      {(room.status === "playing" || room.status === "game_over") && <OnlineGamePlay />}
      <FloatingMicButton />
    </>
  );
}

export default function OnlineRoom() {
  return (
    <VoiceProvider>
      <RoomContent />
    </VoiceProvider>
  );
}
