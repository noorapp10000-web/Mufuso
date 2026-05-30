import {
  createContext, useContext, useEffect, useRef,
  useState, useCallback, ReactNode,
} from "react";
import { useOnline } from "./OnlineContext";

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
];

const AUDIO_CONSTRAINTS: MediaTrackConstraints = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  sampleRate: 48000,
  channelCount: 1,
};

interface PeerEntry {
  pc: RTCPeerConnection;
  audio: HTMLAudioElement;
}

interface VoiceContextType {
  isMuted: boolean;
  toggleMute: () => void;
  mutedPlayers: Set<string>;
  isVoiceReady: boolean;
  voiceError: string | null;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const { room, myPlayerId, connected, socketRef } = useOnline();

  const [isMuted, setIsMuted] = useState(false);
  const [mutedPlayers, setMutedPlayers] = useState<Set<string>>(new Set());
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Map<string, PeerEntry>>(new Map());
  const isMutedRef = useRef(false);
  const initDoneRef = useRef(false);

  // ── Init mic when joining a room ──────────────────────────────────
  useEffect(() => {
    if (!room || !myPlayerId || initDoneRef.current) return;
    initDoneRef.current = true;

    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ audio: AUDIO_CONSTRAINTS, video: false })
      .then(stream => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        localStreamRef.current = stream;
        setIsVoiceReady(true);
        setVoiceError(null);
      })
      .catch(err => {
        if (cancelled) return;
        console.warn("[Voice] mic init failed:", err);
        setVoiceError("تعذّر الوصول إلى الميكروفون");
      });

    return () => { cancelled = true; };
  }, [!!room, myPlayerId]);

  // ── Cleanup when leaving room ─────────────────────────────────────
  useEffect(() => {
    if (room) return;
    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;
    peersRef.current.forEach(({ pc, audio }) => {
      pc.close();
      audio.srcObject = null;
    });
    peersRef.current.clear();
    initDoneRef.current = false;
    setIsVoiceReady(false);
    setMutedPlayers(new Set());
    setIsMuted(false);
    isMutedRef.current = false;
  }, [room]);

  // ── Create RTCPeerConnection for a player ─────────────────────────
  const createPeer = useCallback((targetPlayerId: string): PeerEntry => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const audio = new Audio();
    audio.autoplay = true;

    localStreamRef.current?.getTracks().forEach(track => {
      pc.addTrack(track, localStreamRef.current!);
    });

    pc.ontrack = event => {
      audio.srcObject = event.streams[0];
      audio.play().catch(() => {});
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        socketRef.current?.emit("webrtc_signal", {
          targetPlayerId,
          signal: { type: "ice", candidate: event.candidate.toJSON() },
        });
      }
    };

    return { pc, audio };
  }, [socketRef]);

  // ── Manage peer connections when players join/leave ───────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !room || !myPlayerId || !isVoiceReady) return;

    const activePlayers = room.players.filter(
      p => p.id !== myPlayerId && p.isConnected
    );
    const activeIds = new Set(activePlayers.map(p => p.id));

    // Remove gone peers
    for (const [pid, entry] of peersRef.current) {
      if (!activeIds.has(pid)) {
        entry.pc.close();
        entry.audio.srcObject = null;
        peersRef.current.delete(pid);
      }
    }

    // Add new peers (tie-break: lower playerId creates the offer)
    for (const player of activePlayers) {
      if (peersRef.current.has(player.id)) continue;

      const peer = createPeer(player.id);
      peersRef.current.set(player.id, peer);

      if (myPlayerId < player.id) {
        peer.pc
          .createOffer({ offerToReceiveAudio: true })
          .then(offer => peer.pc.setLocalDescription(offer).then(() => offer))
          .then(() => {
            socket.emit("webrtc_signal", {
              targetPlayerId: player.id,
              signal: { type: "offer", sdp: peer.pc.localDescription },
            });
          })
          .catch(err => console.warn("[Voice] offer error:", err));
      }
    }
  }, [room?.players, isVoiceReady, myPlayerId, socketRef, createPeer]);

  // ── Incoming WebRTC signals + mute status ─────────────────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !myPlayerId) return;

    async function handleSignal({
      fromPlayerId,
      signal,
    }: {
      fromPlayerId: string;
      signal: {
        type: "offer" | "answer" | "ice";
        sdp?: RTCSessionDescriptionInit;
        candidate?: RTCIceCandidateInit;
      };
    }) {
      if (!localStreamRef.current) return;

      let peer = peersRef.current.get(fromPlayerId);
      if (!peer) {
        peer = createPeer(fromPlayerId);
        peersRef.current.set(fromPlayerId, peer);
      }

      const { pc } = peer;

      try {
        if (signal.type === "offer" && signal.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socketRef.current?.emit("webrtc_signal", {
            targetPlayerId: fromPlayerId,
            signal: { type: "answer", sdp: pc.localDescription },
          });
        } else if (signal.type === "answer" && signal.sdp) {
          if (pc.signalingState !== "stable") {
            await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          }
        } else if (signal.type === "ice" && signal.candidate) {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
          }
        }
      } catch (err) {
        console.warn("[Voice] signal error:", err);
      }
    }

    function handleMuteStatus({
      playerId,
      isMuted: muted,
    }: {
      playerId: string;
      isMuted: boolean;
    }) {
      setMutedPlayers(prev => {
        const next = new Set(prev);
        if (muted) next.add(playerId);
        else next.delete(playerId);
        return next;
      });
    }

    socket.on("webrtc_signal", handleSignal);
    socket.on("webrtc_mute", handleMuteStatus);
    return () => {
      socket.off("webrtc_signal", handleSignal);
      socket.off("webrtc_mute", handleMuteStatus);
    };
  }, [connected, myPlayerId, socketRef, createPeer]);

  // ── Toggle mute ───────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const newMuted = !isMutedRef.current;
    isMutedRef.current = newMuted;
    stream.getAudioTracks().forEach(t => { t.enabled = !newMuted; });
    setIsMuted(newMuted);
    socketRef.current?.emit("webrtc_mute", { isMuted: newMuted });
  }, [socketRef]);

  return (
    <VoiceContext.Provider
      value={{ isMuted, toggleMute, mutedPlayers, isVoiceReady, voiceError }}
    >
      {children}
    </VoiceContext.Provider>
  );
}
