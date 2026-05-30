import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOnline } from "@/context/OnlineContext";
import OnlineLobby from "./OnlineLobby";
import OnlineCardDraw from "./OnlineCardDraw";
import OnlineGamePlay from "./OnlineGamePlay";

export default function OnlineRoom() {
  const [, setLocation] = useLocation();
  const { room } = useOnline();

  useEffect(() => {
    if (!room) {
      setLocation("/online");
    }
  }, [room, setLocation]);

  if (!room) return null;

  if (room.status === "waiting") return <OnlineLobby />;
  if (room.status === "card_draw") return <OnlineCardDraw />;
  if (room.status === "playing" || room.status === "game_over") return <OnlineGamePlay />;

  return null;
}
