import {
  createContext, useContext, useEffect, useRef,
  useState, useCallback, ReactNode,
} from "react";
import { useOnline } from "./OnlineContext";

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
  { urls: "stun:global.stun.twilio.com:3478" },
];

const AUDIO_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    // @ts-ignore — sampleRate not in all type defs but works in modern browsers
    sampleRate: 48000,
    channelCount: 1,
  },
  video: false,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface PeerState {
  pc: RTCPeerConnection;
  audio: HTMLAudioElement;
  makingOffer: boolean;
}

interface VoiceContextType {
  isMuted: boolean;
  toggleMute: () => void;
  mutedPlayers: Set<string>;
  isVoiceReady: boolean;
  voiceError: string | null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within VoiceProvider");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function VoiceProvider({ children }: { children: ReactNode }) {
  const { room, myPlayerId, connected, socketRef } = useOnline();

  const [isMuted, setIsMuted] = useState(false);
  const [mutedPlayers, setMutedPlayers] = useState<Set<string>>(new Set());
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef       = useRef<Map<string, PeerState>>(new Map());
  const isMutedRef     = useRef(false);
  const initDoneRef    = useRef(false);

  // Per-peer ICE queue — buffers candidates arriving before setRemoteDescription
  const iceQueueRef = useRef<Map<string, RTCIceCandidateInit[]>>(new Map());

  // Pending audio elements that couldn't autoplay — unlocked on next user touch
  const pendingPlayRef = useRef<HTMLAudioElement[]>([]);

  // ── Unlock audio on first user gesture (needed on Android WebView) ──────────
  useEffect(() => {
    function unlock() {
      pendingPlayRef.current.forEach(a => a.play().catch(() => {}));
      pendingPlayRef.current = [];
    }
    document.addEventListener("click",      unlock, { once: true });
    document.addEventListener("touchstart", unlock, { once: true });
    return () => {
      document.removeEventListener("click",      unlock);
      document.removeEventListener("touchstart", unlock);
    };
  }, []);

  // ── Helper: try to play audio, queue if blocked ───────────────────────────
  function tryPlay(audio: HTMLAudioElement) {
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => { pendingPlayRef.current.push(audio); });
    }
  }

  // ── Drain queued ICE candidates for a peer ───────────────────────────────
  async function drainIceQueue(fromPlayerId: string, pc: RTCPeerConnection) {
    const queued = iceQueueRef.current.get(fromPlayerId) ?? [];
    iceQueueRef.current.set(fromPlayerId, []);
    for (const c of queued) {
      try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch {}
    }
  }

  // ── Build an RTCPeerConnection for a remote player ────────────────────────
  const buildPeer = useCallback((targetPlayerId: string): PeerState => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Add local tracks
    localStreamRef.current?.getTracks().forEach(t => {
      pc.addTrack(t, localStreamRef.current!);
    });

    // Remote audio
    const audio = new Audio();
    audio.autoplay = true;
    audio.setAttribute("playsinline", ""); // Capacitor WebView — no fullscreen on iOS

    pc.ontrack = ev => {
      if (audio.srcObject !== ev.streams[0]) {
        audio.srcObject = ev.streams[0];
        tryPlay(audio);
      }
    };

    // ICE trickle
    pc.onicecandidate = ev => {
      if (ev.candidate) {
        socketRef.current?.emit("webrtc_signal", {
          targetPlayerId,
          signal: { type: "ice", candidate: ev.candidate.toJSON() },
        });
      }
    };

    // Log state changes for debugging
    pc.oniceconnectionstatechange = () => {
      console.info(`[Voice] ICE ${targetPlayerId} →`, pc.iceConnectionState);
      if (pc.iceConnectionState === "failed") {
        pc.restartIce();
      }
    };

    return { pc, audio, makingOffer: false };
  }, [socketRef]);

  // ── Init microphone when entering a room ──────────────────────────────────
  useEffect(() => {
    if (!room || !myPlayerId || initDoneRef.current) return;
    initDoneRef.current = true;

    let cancelled = false;

    navigator.mediaDevices.getUserMedia(AUDIO_CONSTRAINTS)
      .then(stream => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        // Start muted-off (enabled)
        stream.getAudioTracks().forEach(t => { t.enabled = true; });
        localStreamRef.current = stream;
        setIsVoiceReady(true);
        setVoiceError(null);
      })
      .catch(err => {
        if (cancelled) return;
        console.warn("[Voice] getUserMedia failed:", err);
        setVoiceError("تعذّر الوصول إلى الميكروفون");
      });

    return () => { cancelled = true; };
  }, [!!room, myPlayerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup when leaving room ─────────────────────────────────────────────
  useEffect(() => {
    if (room) return;
    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;
    peersRef.current.forEach(({ pc, audio }) => { pc.close(); audio.srcObject = null; });
    peersRef.current.clear();
    iceQueueRef.current.clear();
    pendingPlayRef.current = [];
    initDoneRef.current = false;
    setIsVoiceReady(false);
    setMutedPlayers(new Set());
    setIsMuted(false);
    isMutedRef.current = false;
  }, [room]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Manage peer mesh when players join / leave ────────────────────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !room || !myPlayerId || !isVoiceReady) return;

    const activePlayers = room.players.filter(p => p.id !== myPlayerId && p.isConnected);
    const activeIds     = new Set(activePlayers.map(p => p.id));

    // Remove departed peers
    for (const [pid, { pc, audio }] of peersRef.current) {
      if (!activeIds.has(pid)) {
        pc.close();
        audio.srcObject = null;
        peersRef.current.delete(pid);
        iceQueueRef.current.delete(pid);
      }
    }

    // Establish connections with new peers
    for (const player of activePlayers) {
      if (peersRef.current.has(player.id)) continue;

      const peer = buildPeer(player.id);
      peersRef.current.set(player.id, peer);
      iceQueueRef.current.set(player.id, []);

      // Tie-break: polite = higher ID waits; impolite = lower ID sends offer
      const imPolite = myPlayerId < player.id;
      if (imPolite) {
        peer.makingOffer = true;
        peer.pc
          .createOffer({ offerToReceiveAudio: true })
          .then(offer => peer.pc.setLocalDescription(offer))
          .then(() => {
            peer.makingOffer = false;
            socket.emit("webrtc_signal", {
              targetPlayerId: player.id,
              signal: { type: "offer", sdp: peer.pc.localDescription },
            });
          })
          .catch(err => {
            peer.makingOffer = false;
            console.warn("[Voice] createOffer failed:", err);
          });
      }
    }
  }, [room?.players, isVoiceReady, myPlayerId, socketRef, buildPeer]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Handle incoming signals + mute events ─────────────────────────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !myPlayerId) return;

    async function handleSignal({ fromPlayerId, signal }: {
      fromPlayerId: string;
      signal: {
        type: "offer" | "answer" | "ice";
        sdp?: RTCSessionDescriptionInit;
        candidate?: RTCIceCandidateInit;
      };
    }) {
      // Lazily create peer if we receive an offer before managing it ourselves
      if (!peersRef.current.has(fromPlayerId)) {
        peersRef.current.set(fromPlayerId, buildPeer(fromPlayerId));
        iceQueueRef.current.set(fromPlayerId, []);
      }
      const { pc } = peersRef.current.get(fromPlayerId)!;

      try {
        if (signal.type === "offer" && signal.sdp) {
          // Polite peer: always accept offer, rollback if needed
          const offerCollision =
            peersRef.current.get(fromPlayerId)!.makingOffer ||
            pc.signalingState !== "stable";

          const imPolite = (myPlayerId ?? "") > fromPlayerId;
          if (!imPolite && offerCollision) return; // impolite ignores colliding offer

          await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
          await drainIceQueue(fromPlayerId, pc);

          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socketRef.current?.emit("webrtc_signal", {
            targetPlayerId: fromPlayerId,
            signal: { type: "answer", sdp: pc.localDescription },
          });

        } else if (signal.type === "answer" && signal.sdp) {
          if (pc.signalingState === "have-local-offer") {
            await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            await drainIceQueue(fromPlayerId, pc);
          }

        } else if (signal.type === "ice" && signal.candidate) {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
          } else {
            // Buffer — remote description not set yet
            const q = iceQueueRef.current.get(fromPlayerId) ?? [];
            q.push(signal.candidate);
            iceQueueRef.current.set(fromPlayerId, q);
          }
        }
      } catch (err) {
        console.warn("[Voice] signal handling error:", err);
      }
    }

    function handleMute({ playerId, isMuted: muted }: { playerId: string; isMuted: boolean }) {
      setMutedPlayers(prev => {
        const next = new Set(prev);
        if (muted) next.add(playerId); else next.delete(playerId);
        return next;
      });
    }

    socket.on("webrtc_signal", handleSignal);
    socket.on("webrtc_mute",   handleMute);
    return () => {
      socket.off("webrtc_signal", handleSignal);
      socket.off("webrtc_mute",   handleMute);
    };
  }, [connected, myPlayerId, socketRef, buildPeer]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Toggle mute ───────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const next = !isMutedRef.current;
    isMutedRef.current = next;
    stream.getAudioTracks().forEach(t => { t.enabled = !next; });
    setIsMuted(next);
    socketRef.current?.emit("webrtc_mute", { isMuted: next });
  }, [socketRef]);

  return (
    <VoiceContext.Provider value={{ isMuted, toggleMute, mutedPlayers, isVoiceReady, voiceError }}>
      {children}
    </VoiceContext.Provider>
  );
}
