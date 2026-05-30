import {
  createContext, useContext, useState, useEffect,
  useCallback, useRef, ReactNode, RefObject,
} from "react";
import { io, Socket } from "socket.io-client";

// ─── Types (must match server) ────────────────────────────────────────────────

export interface SafePlayer {
  id: string;
  name: string;
  isHost: boolean;
  isConnected: boolean;
  cardConfirmed: boolean;
  isEliminated: boolean;
  eliminatedInRound?: number;
}

export interface CaseMeta {
  id: string;
  title: string;
  totalRounds: number;
  characters: { id: string; name: string }[];
  culpritIds: string[];
}

export type RoomStatus = "waiting" | "card_draw" | "playing" | "game_over";
export type GamePhase = "discuss" | "vote" | "tie_defense" | "round_result" | "game_over";
export type DefensePhase = "first" | "second" | "revote";

export interface VoteRecord { voterId: string; targetId: string }
export interface EliminatedRecord {
  playerId: string; playerName: string;
  round: number; wasMafioso: boolean;
}

export interface OnlineGameState {
  phase: GamePhase;
  currentRound: number;
  totalRounds: number;
  roundDuration: number;
  timerEnd?: number;
  votes: VoteRecord[];
  tiedPlayerIds: string[];
  defensePhase: DefensePhase;
  defensePlayerIdx: number;
  eliminatedRecords: EliminatedRecord[];
  roundResult?: EliminatedRecord;
  winner?: "innocents" | "mafioso";
}

export interface OnlineRoom {
  code: string;
  status: RoomStatus;
  roundDuration: number;
  caseMeta?: CaseMeta;
  players: SafePlayer[];
  gameState?: OnlineGameState;
}

export interface MyCard {
  characterId: string;
  characterName: string;
  isMafioso: boolean;
  mafiosoPartnerName?: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface OnlineContextType {
  connected: boolean;
  room: OnlineRoom | null;
  myPlayerId: string | null;
  myCard: MyCard | null;
  error: string | null;
  clearError: () => void;
  socketRef: RefObject<Socket | null>;

  createRoom: (playerName: string) => void;
  joinRoom: (code: string, playerName: string) => void;
  reconnectPlayer: (code: string, playerId: string) => void;
  selectCase: (caseMeta: CaseMeta) => void;
  setDuration: (duration: number) => void;
  startGame: () => void;
  confirmCard: () => void;
  startDiscuss: () => void;
  skipToVote: () => void;
  castVote: (targetId: string) => void;
  nextRound: () => void;
  playAgain: (caseMeta?: CaseMeta) => void;
  kickPlayer: (playerId: string) => void;
  leaveRoom: () => void;
}

const OnlineContext = createContext<OnlineContextType | undefined>(undefined);

// ─── Storage helpers ──────────────────────────────────────────────────────────

const STORAGE_KEY = "mafioso_online_session";

interface StoredSession { code: string; playerId: string }

function saveSession(code: string, playerId: string) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ code, playerId })); } catch { /* noop */ }
}

function loadSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function clearSession() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
}

// ─── Provider ─────────────────────────────────────────────────────────────────

// API_URL: empty string = same origin (works with Vite proxy in dev, and with deployed server in web)
// Set VITE_API_URL to your deployed server URL for APK builds
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export function OnlineProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState<OnlineRoom | null>(null);
  const [myPlayerId, setMyPlayerId] = useState<string | null>(null);
  const [myCard, setMyCard] = useState<MyCard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(API_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      // Try to reconnect to an existing session
      const session = loadSession();
      if (session) {
        socket.emit("reconnect_player", { code: session.code, playerId: session.playerId });
      }
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("room_created", ({ code, room: r, playerId }: { code: string; room: OnlineRoom; playerId: string }) => {
      setRoom(r);
      setMyPlayerId(playerId);
      saveSession(code, playerId);
      setError(null);
    });

    socket.on("room_joined", ({ room: r, playerId }: { room: OnlineRoom; playerId: string }) => {
      setRoom(r);
      setMyPlayerId(playerId);
      saveSession(r.code, playerId);
      setError(null);
    });

    socket.on("room_updated", ({ room: r }: { room: OnlineRoom }) => {
      setRoom(r);
    });

    socket.on("game_state_update", (gs: OnlineGameState) => {
      setRoom(prev => prev ? { ...prev, gameState: gs } : prev);
    });

    socket.on("your_card", (card: MyCard) => {
      setMyCard(card);
    });

    socket.on("room_error", ({ message }: { message: string }) => {
      setError(message);
    });

    socket.on("kicked", ({ message }: { message: string }) => {
      setError(message);
      setRoom(null);
      setMyPlayerId(null);
      setMyCard(null);
      clearSession();
    });

    return () => { socket.disconnect(); };
  }, []);

  const emit = useCallback((event: string, data?: unknown) => {
    socketRef.current?.emit(event, data);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const createRoom = useCallback((playerName: string) => {
    emit("create_room", { playerName });
  }, [emit]);

  const joinRoom = useCallback((code: string, playerName: string) => {
    emit("join_room", { code, playerName });
  }, [emit]);

  const reconnectPlayer = useCallback((code: string, playerId: string) => {
    emit("reconnect_player", { code, playerId });
  }, [emit]);

  const selectCase = useCallback((caseMeta: CaseMeta) => {
    emit("select_case", { caseMeta });
  }, [emit]);

  const setDuration = useCallback((duration: number) => {
    emit("set_duration", { duration });
  }, [emit]);

  const startGame = useCallback(() => {
    emit("start_game");
  }, [emit]);

  const confirmCard = useCallback(() => {
    emit("card_confirmed");
  }, [emit]);

  const startDiscuss = useCallback(() => {
    emit("start_discuss");
  }, [emit]);

  const skipToVote = useCallback(() => {
    emit("skip_to_vote");
  }, [emit]);

  const castVote = useCallback((targetId: string) => {
    emit("cast_vote", { targetId });
  }, [emit]);

  const nextRound = useCallback(() => {
    emit("next_round");
  }, [emit]);

  const playAgain = useCallback((caseMeta?: CaseMeta) => {
    setMyCard(null);
    emit("play_again", { caseMeta });
  }, [emit]);

  const kickPlayer = useCallback((playerId: string) => {
    emit("kick_player", { playerId });
  }, [emit]);

  const leaveRoom = useCallback(() => {
    emit("leave_room");
    setRoom(null);
    setMyPlayerId(null);
    setMyCard(null);
    clearSession();
  }, [emit]);

  return (
    <OnlineContext.Provider value={{
      connected, room, myPlayerId, myCard, error, clearError, socketRef,
      createRoom, joinRoom, reconnectPlayer,
      selectCase, setDuration, startGame,
      confirmCard, startDiscuss, skipToVote,
      castVote, nextRound, playAgain,
      kickPlayer, leaveRoom,
    }}>
      {children}
    </OnlineContext.Provider>
  );
}

export function useOnline() {
  const ctx = useContext(OnlineContext);
  if (!ctx) throw new Error("useOnline must be used within OnlineProvider");
  return ctx;
}
