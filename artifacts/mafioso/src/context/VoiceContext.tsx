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

// echoCancellation: true  → REQUIRED (not optional) — Android activates hardware AEC
// exactly like WhatsApp/native phone calls do.
// noiseSuppression + autoGainControl also required for call-quality audio.
const AUDIO_CONSTRAINTS: MediaStreamConstraints = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl:  true,
    channelCount:     1,
  },
  video: false,
};

// VAD config
const VAD_SILENCE_THRESHOLD = 0.015; // RMS below this = silent
const VAD_SILENCE_DELAY_MS  = 1500;  // mute after 1.5s of silence
const VAD_POLL_MS           = 80;    // check every 80ms

// ─── Types ────────────────────────────────────────────────────────────────────

interface PeerState {
  pc:          RTCPeerConnection;
  audio:       HTMLAudioElement;
  makingOffer: boolean;
}

interface VoiceContextType {
  isMuted:     boolean;
  isSpeaking:  boolean;       // true when VAD detects local voice
  toggleMute:  () => void;
  mutedPlayers: Set<string>;
  isVoiceReady: boolean;
  voiceError:   string | null;
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

  const [isMuted,      setIsMuted]      = useState(false);
  const [isSpeaking,   setIsSpeaking]   = useState(false);
  const [mutedPlayers, setMutedPlayers] = useState<Set<string>>(new Set());
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [voiceError,   setVoiceError]   = useState<string | null>(null);

  const localStreamRef  = useRef<MediaStream | null>(null);
  const peersRef        = useRef<Map<string, PeerState>>(new Map());
  const isMutedRef      = useRef(false);
  const initDoneRef     = useRef(false);
  const iceQueueRef     = useRef<Map<string, RTCIceCandidateInit[]>>(new Map());
  const pendingPlayRef  = useRef<HTMLAudioElement[]>([]);

  // VAD refs
  const vadCtxRef       = useRef<AudioContext | null>(null);
  const vadAnalyserRef  = useRef<AnalyserNode | null>(null);
  const vadTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const vadIntervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const silentSinceRef  = useRef<number | null>(null);
  const vadMutedRef     = useRef(false); // muted by VAD (not manual)

  // ── Unlock audio on first user gesture ──────────────────────────────────────
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

  // ── Play helper ─────────────────────────────────────────────────────────────
  function tryPlay(audio: HTMLAudioElement) {
    const p = audio.play();
    if (p !== undefined) {
      p.catch(() => { pendingPlayRef.current.push(audio); });
    }
  }

  // ── ICE queue drain ─────────────────────────────────────────────────────────
  async function drainIceQueue(fromPlayerId: string, pc: RTCPeerConnection) {
    const queued = iceQueueRef.current.get(fromPlayerId) ?? [];
    iceQueueRef.current.set(fromPlayerId, []);
    for (const c of queued) {
      try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch {}
    }
  }

  // ── Build peer connection ────────────────────────────────────────────────────
  const buildPeer = useCallback((targetPlayerId: string): PeerState => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Send local tracks to this peer
    localStreamRef.current?.getTracks().forEach(t => {
      pc.addTrack(t, localStreamRef.current!);
    });

    // Create a dedicated audio element for this remote peer
    // NEVER feed local stream into an audio element (that would echo back)
    const audio = new Audio();
    audio.autoplay = true;
    audio.volume   = 0.9; // slight headroom for 6 simultaneous speakers
    audio.muted    = false;
    audio.setAttribute("playsinline", "");

    pc.ontrack = ev => {
      const stream = ev.streams[0];
      if (audio.srcObject !== stream) {
        audio.srcObject = stream;
        tryPlay(audio);
      }
    };

    pc.onicecandidate = ev => {
      if (ev.candidate) {
        socketRef.current?.emit("webrtc_signal", {
          targetPlayerId,
          signal: { type: "ice", candidate: ev.candidate.toJSON() },
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.info(`[Voice] ICE ${targetPlayerId} →`, pc.iceConnectionState);
      if (pc.iceConnectionState === "failed") pc.restartIce();
    };

    return { pc, audio, makingOffer: false };
  }, [socketRef]);

  // ── Destroy a single peer cleanly ───────────────────────────────────────────
  function destroyPeer(pid: string) {
    const peer = peersRef.current.get(pid);
    if (!peer) return;
    peer.pc.close();
    peer.audio.pause();
    peer.audio.srcObject = null;
    // Remove from DOM if it was ever appended (safety net)
    peer.audio.remove();
    peersRef.current.delete(pid);
    iceQueueRef.current.delete(pid);
  }

  // ── VAD: Voice Activity Detection ───────────────────────────────────────────
  function startVAD(stream: MediaStream) {
    try {
      const ctx      = new AudioContext();
      const source   = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize       = 512;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      // Do NOT connect analyser → ctx.destination (avoid local playback)

      vadCtxRef.current     = ctx;
      vadAnalyserRef.current = analyser;

      const buf = new Float32Array(analyser.fftSize);

      vadIntervalRef.current = setInterval(() => {
        if (isMutedRef.current) {
          // Manual mute → don't fight VAD state
          if (vadMutedRef.current) {
            vadMutedRef.current = false;
          }
          setIsSpeaking(false);
          return;
        }

        analyser.getFloatTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
        const rms = Math.sqrt(sum / buf.length);

        if (rms > VAD_SILENCE_THRESHOLD) {
          // Voice detected
          silentSinceRef.current = null;
          if (vadTimerRef.current) {
            clearTimeout(vadTimerRef.current);
            vadTimerRef.current = null;
          }
          if (vadMutedRef.current) {
            // Unmute the track — voice is back
            stream.getAudioTracks().forEach(t => { t.enabled = true; });
            vadMutedRef.current = false;
          }
          setIsSpeaking(true);
        } else {
          // Silence
          setIsSpeaking(false);
          if (!vadMutedRef.current && silentSinceRef.current === null) {
            silentSinceRef.current = Date.now();
            vadTimerRef.current = setTimeout(() => {
              // Still silent after delay → mute the track to kill background noise
              stream.getAudioTracks().forEach(t => { t.enabled = false; });
              vadMutedRef.current = true;
            }, VAD_SILENCE_DELAY_MS);
          }
        }
      }, VAD_POLL_MS);
    } catch (err) {
      console.warn("[Voice] VAD init failed:", err);
    }
  }

  function stopVAD() {
    if (vadIntervalRef.current) { clearInterval(vadIntervalRef.current); vadIntervalRef.current = null; }
    if (vadTimerRef.current)    { clearTimeout(vadTimerRef.current);     vadTimerRef.current    = null; }
    vadCtxRef.current?.close().catch(() => {});
    vadCtxRef.current     = null;
    vadAnalyserRef.current = null;
    silentSinceRef.current = null;
    vadMutedRef.current    = false;
    setIsSpeaking(false);
  }

  // ── Init microphone ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!room || !myPlayerId || initDoneRef.current) return;
    initDoneRef.current = true;

    let cancelled = false;

    navigator.mediaDevices.getUserMedia(AUDIO_CONSTRAINTS)
      .then(stream => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        stream.getAudioTracks().forEach(t => { t.enabled = true; });
        localStreamRef.current = stream;
        setIsVoiceReady(true);
        setVoiceError(null);
        startVAD(stream);
      })
      .catch(err => {
        if (cancelled) return;
        console.warn("[Voice] getUserMedia failed:", err);
        setVoiceError("تعذّر الوصول إلى الميكروفون");
      });

    return () => { cancelled = true; };
  }, [!!room, myPlayerId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup on leave ────────────────────────────────────────────────────────
  useEffect(() => {
    if (room) return;
    stopVAD();
    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;
    for (const pid of [...peersRef.current.keys()]) destroyPeer(pid);
    pendingPlayRef.current = [];
    initDoneRef.current    = false;
    setIsVoiceReady(false);
    setMutedPlayers(new Set());
    setIsMuted(false);
    isMutedRef.current = false;
  }, [room]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Peer mesh management ────────────────────────────────────────────────────
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !room || !myPlayerId || !isVoiceReady) return;

    const activePlayers = room.players.filter(p => p.id !== myPlayerId && p.isConnected);
    const activeIds     = new Set(activePlayers.map(p => p.id));

    // Remove departed peers
    for (const pid of [...peersRef.current.keys()]) {
      if (!activeIds.has(pid)) destroyPeer(pid);
    }

    // Connect to new peers
    for (const player of activePlayers) {
      if (peersRef.current.has(player.id)) continue;

      const peer = buildPeer(player.id);
      peersRef.current.set(player.id, peer);
      iceQueueRef.current.set(player.id, []);

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
          .catch(err => { peer.makingOffer = false; console.warn("[Voice] offer failed:", err); });
      }
    }
  }, [room?.players, isVoiceReady, myPlayerId, socketRef, buildPeer]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Signal + mute event handling ────────────────────────────────────────────
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
      if (!peersRef.current.has(fromPlayerId)) {
        peersRef.current.set(fromPlayerId, buildPeer(fromPlayerId));
        iceQueueRef.current.set(fromPlayerId, []);
      }
      const { pc } = peersRef.current.get(fromPlayerId)!;

      try {
        if (signal.type === "offer" && signal.sdp) {
          const collision = peersRef.current.get(fromPlayerId)!.makingOffer ||
                            pc.signalingState !== "stable";
          const imPolite  = (myPlayerId ?? "") > fromPlayerId;
          if (!imPolite && collision) return;

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
            const q = iceQueueRef.current.get(fromPlayerId) ?? [];
            q.push(signal.candidate);
            iceQueueRef.current.set(fromPlayerId, q);
          }
        }
      } catch (err) {
        console.warn("[Voice] signal error:", err);
      }
    }

    function handleMute({ playerId, isMuted: muted }: { playerId: string; isMuted: boolean }) {
      setMutedPlayers(prev => {
        const next = new Set(prev);
        muted ? next.add(playerId) : next.delete(playerId);
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

  // ── Manual mute toggle ──────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    const stream = localStreamRef.current;
    if (!stream) return;
    const next = !isMutedRef.current;
    isMutedRef.current = next;
    // When manually unmuting: also clear any VAD mute so track re-enables
    if (!next && vadMutedRef.current) {
      vadMutedRef.current = false;
    }
    stream.getAudioTracks().forEach(t => { t.enabled = !next; });
    setIsMuted(next);
    socketRef.current?.emit("webrtc_mute", { isMuted: next });
  }, [socketRef]);

  return (
    <VoiceContext.Provider value={{
      isMuted, isSpeaking, toggleMute, mutedPlayers, isVoiceReady, voiceError,
    }}>
      {children}
    </VoiceContext.Provider>
  );
}
