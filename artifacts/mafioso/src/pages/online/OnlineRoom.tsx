import { useEffect } from "react";
import { useLocation } from "wouter";
import { useOnline } from "@/context/OnlineContext";
import OnlineLobby from "./OnlineLobby";
import OnlineCardDraw from "./OnlineCardDraw";
import OnlineGamePlay from "./OnlineGamePlay";

function RoomContent() {
  const [, setLocation] = useLocation();
  const { room, reconnecting } = useOnline();

  useEffect(() => {
    if (!room && !reconnecting) setLocation("/online");
  }, [room, reconnecting, setLocation]);

  if (!room) return null;

  return (
    <>
      {room.status === "waiting" && <OnlineLobby />}
      {room.status === "card_draw" && <OnlineCardDraw />}
      {(room.status === "playing" || room.status === "game_over") && <OnlineGamePlay />}
    </>
  );
}

export default function OnlineRoom() {
  return <RoomContent />;
}
