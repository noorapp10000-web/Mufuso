import { Server as SocketServer } from "socket.io";
import type { Server as HttpServer } from "http";
import { logger } from "../lib/logger";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CharMeta { id: string; name: string }

interface CaseMeta {
  id: string;
  title: string;
  totalRounds: number;
  characters: CharMeta[];
  culpritIds: string[]; // always array
}

interface RoomPlayer {
  id: string;
  socketId: string;
  name: string;
  isHost: boolean;
  isConnected: boolean;
  cardConfirmed: boolean;
  // private — only sent to owner
  characterId?: string;
  characterName?: string;
  isMafioso?: boolean;
  mafiosoPartnerName?: string;
  // public
  isEliminated?: boolean;
  eliminatedInRound?: number;
}

type RoomStatus = "waiting" | "card_draw" | "playing" | "game_over";
type GamePhase = "discuss" | "vote" | "tie_defense" | "round_result" | "game_over";
type DefensePhase = "first" | "second" | "revote";

interface VoteRecord { voterId: string; targetId: string }
interface EliminatedRecord {
  playerId: string;
  playerName: string;
  round: number;
  wasMafioso: boolean;
}

interface GameState {
  phase: GamePhase;
  currentRound: number;
  totalRounds: number;
  roundDuration: number; // minutes
  timerEnd?: number;     // unix ms — set when discussion timer is running
  votes: VoteRecord[];
  tiedPlayerIds: string[];
  defensePhase: DefensePhase;
  defensePlayerIdx: number;
  eliminatedRecords: EliminatedRecord[];
  roundResult?: EliminatedRecord;
  winner?: "innocents" | "mafioso";
}

interface Room {
  code: string;
  status: RoomStatus;
  players: RoomPlayer[];
  caseMeta?: CaseMeta;
  roundDuration: number;
  gameState?: GameState;
  timerHandle?: ReturnType<typeof setTimeout>;
  lastActivity: number;
}

// ─── In-memory store ─────────────────────────────────────────────────────────

const rooms = new Map<string, Room>();

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return rooms.has(code) ? generateCode() : code;
}

function generatePlayerId(): string {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Safe room data — strips all private player fields */
function safeRoom(room: Room) {
  return {
    code: room.code,
    status: room.status,
    roundDuration: room.roundDuration,
    caseMeta: room.caseMeta,
    players: room.players.map(p => ({
      id: p.id,
      name: p.name,
      isHost: p.isHost,
      isConnected: p.isConnected,
      cardConfirmed: p.cardConfirmed,
      isEliminated: p.isEliminated ?? false,
      eliminatedInRound: p.eliminatedInRound,
    })),
    gameState: room.gameState
      ? {
          phase: room.gameState.phase,
          currentRound: room.gameState.currentRound,
          totalRounds: room.gameState.totalRounds,
          roundDuration: room.gameState.roundDuration,
          timerEnd: room.gameState.timerEnd,
          votes: room.gameState.votes,
          tiedPlayerIds: room.gameState.tiedPlayerIds,
          defensePhase: room.gameState.defensePhase,
          defensePlayerIdx: room.gameState.defensePlayerIdx,
          eliminatedRecords: room.gameState.eliminatedRecords,
          roundResult: room.gameState.roundResult,
          winner: room.gameState.winner,
        }
      : undefined,
  };
}

function migrateHost(room: Room) {
  if (room.players.some(p => p.isHost && p.isConnected)) return;
  const next = room.players.find(p => p.isConnected);
  if (next) { next.isHost = true; logger.info({ code: room.code, newHost: next.name }, "Host migrated"); }
}

function cancelTimer(room: Room) {
  if (room.timerHandle) { clearTimeout(room.timerHandle); room.timerHandle = undefined; }
}

// Remove rooms inactive for > 3 hours
setInterval(() => {
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  for (const [code, room] of rooms) {
    if (room.lastActivity < cutoff) { cancelTimer(room); rooms.delete(code); }
  }
}, 30 * 60 * 1000);

// ─── Game Logic ───────────────────────────────────────────────────────────────

function activePlayers(room: Room): RoomPlayer[] {
  return room.players.filter(p => !p.isEliminated);
}

function tallyVotes(gs: GameState): Map<string, number> {
  const m = new Map<string, number>();
  for (const v of gs.votes) m.set(v.targetId, (m.get(v.targetId) ?? 0) + 1);
  return m;
}

function processVotes(room: Room, io: SocketServer) {
  const gs = room.gameState!;
  const tally = tallyVotes(gs);
  const maxCount = Math.max(...tally.values(), 0);
  const topIds = [...tally.entries()].filter(([, c]) => c === maxCount).map(([id]) => id);
  const active = activePlayers(room);
  const topPlayers = active.filter(p => topIds.includes(p.id));

  if (topPlayers.length > 1 && gs.phase === "vote") {
    // Tie — start defense
    gs.tiedPlayerIds = topPlayers.map(p => p.id);
    gs.defensePhase = "first";
    gs.defensePlayerIdx = 0;
    gs.votes = [];
    gs.phase = "tie_defense";
    gs.timerEnd = Date.now() + 60_000;
    io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
    scheduleDefenseTimer(room, io, 0);
  } else if (topPlayers.length > 1 && gs.defensePhase === "revote") {
    // Still tied after revote — random pick
    const pick = topPlayers[Math.floor(Math.random() * topPlayers.length)];
    eliminatePlayer(room, io, pick);
  } else {
    eliminatePlayer(room, io, topPlayers[0]);
  }
}

function scheduleDefenseTimer(room: Room, io: SocketServer, idx: number) {
  cancelTimer(room);
  room.timerHandle = setTimeout(() => {
    const gs = room.gameState;
    if (!gs || gs.phase !== "tie_defense") return;
    const next = idx + 1;
    if (next < gs.tiedPlayerIds.length) {
      gs.defensePlayerIdx = next;
      gs.defensePhase = next === 1 ? "second" : "first";
      gs.timerEnd = Date.now() + 60_000;
      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
      scheduleDefenseTimer(room, io, next);
    } else {
      gs.defensePhase = "revote";
      gs.votes = [];
      gs.timerEnd = undefined;
      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
    }
  }, 60_000);
}

function eliminatePlayer(room: Room, io: SocketServer, player: RoomPlayer) {
  const gs = room.gameState!;
  cancelTimer(room);

  player.isEliminated = true;
  player.eliminatedInRound = gs.currentRound;

  const record: EliminatedRecord = {
    playerId: player.id,
    playerName: player.name,
    round: gs.currentRound,
    wasMafioso: !!player.isMafioso,
  };

  gs.eliminatedRecords.push(record);
  gs.roundResult = record;
  gs.votes = [];
  gs.tiedPlayerIds = [];
  gs.timerEnd = undefined;

  const remainingActive = activePlayers(room);
  const remainingMafiosos = remainingActive.filter(p => p.isMafioso);

  if (player.isMafioso && remainingMafiosos.length === 0) {
    gs.winner = "innocents";
    gs.phase = "game_over";
    room.status = "game_over";
  } else if (!player.isMafioso && gs.currentRound === gs.totalRounds) {
    gs.winner = "mafioso";
    gs.phase = "game_over";
    room.status = "game_over";
  } else {
    gs.phase = "round_result";
  }

  io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
  io.to(room.code).emit("room_updated", { room: safeRoom(room) });
}

// ─── Socket Setup ─────────────────────────────────────────────────────────────

export function setupSocket(httpServer: HttpServer) {
  const io = new SocketServer(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ["websocket", "polling"],
  });

  io.on("connection", socket => {
    logger.info({ sid: socket.id }, "socket connected");

    let myRoomCode: string | null = null;
    let myPlayerId: string | null = null;

    function getRoom() { return myRoomCode ? rooms.get(myRoomCode) ?? null : null; }
    function getMe(room: Room) { return room.players.find(p => p.id === myPlayerId) ?? null; }

    // ── CREATE ROOM ──────────────────────────────────────────────
    socket.on("create_room", ({ playerName }: { playerName: string }) => {
      const name = playerName?.trim();
      if (!name) return socket.emit("room_error", { message: "أدخل اسمك أولاً" });

      const code = generateCode();
      const playerId = generatePlayerId();

      const room: Room = {
        code,
        status: "waiting",
        players: [{
          id: playerId, socketId: socket.id, name, isHost: true,
          isConnected: true, cardConfirmed: false,
        }],
        roundDuration: 3,
        lastActivity: Date.now(),
      };

      rooms.set(code, room);
      socket.join(code);
      myRoomCode = code;
      myPlayerId = playerId;

      socket.emit("room_created", { code, room: safeRoom(room), playerId });
      logger.info({ code, name }, "room created");
    });

    // ── JOIN ROOM ────────────────────────────────────────────────
    socket.on("join_room", ({ code, playerName }: { code: string; playerName: string }) => {
      const upperCode = code?.trim().toUpperCase();
      const name = playerName?.trim();
      if (!name) return socket.emit("room_error", { message: "أدخل اسمك أولاً" });

      const room = rooms.get(upperCode);
      if (!room) return socket.emit("room_error", { message: "كود الغرفة غير صحيح" });
      if (room.status !== "waiting") return socket.emit("room_error", { message: "اللعبة بدأت بالفعل" });
      if (room.players.length >= 6) return socket.emit("room_error", { message: "الغرفة ممتلئة (٦ لاعبين)" });
      if (room.players.some(p => p.name.toLowerCase() === name.toLowerCase()))
        return socket.emit("room_error", { message: "هذا الاسم مستخدم — اختر اسماً آخر" });

      const playerId = generatePlayerId();
      room.players.push({ id: playerId, socketId: socket.id, name, isHost: false, isConnected: true, cardConfirmed: false });
      room.lastActivity = Date.now();

      socket.join(upperCode);
      myRoomCode = upperCode;
      myPlayerId = playerId;

      socket.emit("room_joined", { room: safeRoom(room), playerId });
      socket.to(upperCode).emit("room_updated", { room: safeRoom(room) });
      logger.info({ code: upperCode, name }, "player joined");
    });

    // ── RECONNECT ────────────────────────────────────────────────
    socket.on("reconnect_player", ({ code, playerId }: { code: string; playerId: string }) => {
      const upperCode = code?.trim().toUpperCase();
      const room = rooms.get(upperCode);
      if (!room) return socket.emit("room_error", { message: "الغرفة غير موجودة أو انتهت" });

      const player = room.players.find(p => p.id === playerId);
      if (!player) return socket.emit("room_error", { message: "لاعب غير موجود في هذه الغرفة" });

      player.socketId = socket.id;
      player.isConnected = true;
      room.lastActivity = Date.now();
      socket.join(upperCode);
      myRoomCode = upperCode;
      myPlayerId = playerId;

      socket.emit("room_joined", { room: safeRoom(room), playerId });

      // Re-send private card if game in progress
      if ((room.status === "card_draw" || room.status === "playing" || room.status === "game_over") && player.characterId) {
        socket.emit("your_card", {
          characterId: player.characterId,
          characterName: player.characterName,
          isMafioso: player.isMafioso,
          mafiosoPartnerName: player.mafiosoPartnerName,
        });
      }

      socket.to(upperCode).emit("room_updated", { room: safeRoom(room) });
      logger.info({ code: upperCode, playerId }, "player reconnected");
    });

    // ── SELECT CASE (host) ───────────────────────────────────────
    socket.on("select_case", ({ caseMeta }: { caseMeta: CaseMeta }) => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      if (room.status !== "waiting") return;

      room.caseMeta = caseMeta;
      room.lastActivity = Date.now();
      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
    });

    // ── SET DURATION (host) ──────────────────────────────────────
    socket.on("set_duration", ({ duration }: { duration: number }) => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      room.roundDuration = Math.max(1, Math.min(10, duration));
      room.lastActivity = Date.now();
      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
    });

    // ── START GAME (host) ────────────────────────────────────────
    socket.on("start_game", () => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      if (room.status !== "waiting") return;

      const cm = room.caseMeta;
      if (!cm) return socket.emit("room_error", { message: "اختر قضية أولاً" });

      const connectedPlayers = room.players.filter(p => p.isConnected);
      if (connectedPlayers.length < 4)
        return socket.emit("room_error", { message: "يلزم ٤ لاعبين على الأقل" });
      if (connectedPlayers.length !== cm.characters.length)
        return socket.emit("room_error", { message: `هذه القضية لـ ${cm.characters.length} لاعبين — عدد اللاعبين الحالي: ${connectedPlayers.length}` });

      // Assign shuffled characters
      const shuffled = shuffle(cm.characters);
      connectedPlayers.forEach((p, i) => {
        p.characterId = shuffled[i].id;
        p.characterName = shuffled[i].name;
        p.isMafioso = cm.culpritIds.includes(shuffled[i].id);
        p.cardConfirmed = false;
        p.isEliminated = false;
        p.eliminatedInRound = undefined;
        p.mafiosoPartnerName = undefined;
      });

      // Set partner names for multi-mafioso games
      if (cm.culpritIds.length > 1) {
        const mafiosos = connectedPlayers.filter(p => p.isMafioso);
        mafiosos.forEach(mp => {
          mp.mafiosoPartnerName = mafiosos.find(o => o.id !== mp.id)?.name;
        });
      }

      room.status = "card_draw";
      room.gameState = {
        phase: "discuss",
        currentRound: 1,
        totalRounds: cm.totalRounds,
        roundDuration: room.roundDuration,
        votes: [],
        tiedPlayerIds: [],
        defensePhase: "first",
        defensePlayerIdx: 0,
        eliminatedRecords: [],
      };
      room.lastActivity = Date.now();

      // Send private card to each player
      connectedPlayers.forEach(p => {
        io.to(p.socketId).emit("your_card", {
          characterId: p.characterId,
          characterName: p.characterName,
          isMafioso: p.isMafioso,
          mafiosoPartnerName: p.mafiosoPartnerName,
        });
      });

      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
      logger.info({ code: room.code, players: connectedPlayers.length }, "game started");
    });

    // ── CARD CONFIRMED ────────────────────────────────────────────
    socket.on("card_confirmed", () => {
      const room = getRoom(); if (!room) return;
      if (room.status !== "card_draw") return;
      const me = getMe(room); if (!me) return;

      me.cardConfirmed = true;
      room.lastActivity = Date.now();

      const active = room.players.filter(p => p.isConnected && !p.isEliminated);
      const allConfirmed = active.every(p => p.cardConfirmed);

      io.to(room.code).emit("room_updated", { room: safeRoom(room) });

      if (allConfirmed) {
        // Everyone saw their card → move to playing (case intro shown, waiting for host to start discuss)
        room.status = "playing";
        io.to(room.code).emit("room_updated", { room: safeRoom(room) });
        io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
        logger.info({ code: room.code }, "all cards confirmed, playing");
      }
    });

    // ── START DISCUSS (host) ─────────────────────────────────────
    socket.on("start_discuss", () => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      const gs = room.gameState; if (!gs) return;
      if (gs.phase !== "discuss") return;

      cancelTimer(room);
      const durationMs = gs.roundDuration * 60_000;
      gs.timerEnd = Date.now() + durationMs;
      room.lastActivity = Date.now();

      // Auto-advance to vote when timer expires
      room.timerHandle = setTimeout(() => {
        const g = room.gameState;
        if (!g || g.phase !== "discuss") return;
        g.phase = "vote";
        g.timerEnd = undefined;
        g.votes = [];
        io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
        logger.info({ code: room.code, round: g.currentRound }, "timer expired → vote");
      }, durationMs);

      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
    });

    // ── SKIP TO VOTE (host) ───────────────────────────────────────
    socket.on("skip_to_vote", () => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      const gs = room.gameState; if (!gs) return;
      if (gs.phase !== "discuss") return;

      cancelTimer(room);
      gs.phase = "vote";
      gs.timerEnd = undefined;
      gs.votes = [];
      room.lastActivity = Date.now();
      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
    });

    // ── CAST VOTE ─────────────────────────────────────────────────
    socket.on("cast_vote", ({ targetId }: { targetId: string }) => {
      const room = getRoom(); if (!room) return;
      const gs = room.gameState; if (!gs) return;
      const me = getMe(room); if (!me) return;

      const inVotePhase = gs.phase === "vote" || (gs.phase === "tie_defense" && gs.defensePhase === "revote");
      if (!inVotePhase) return;

      const active = activePlayers(room);
      const isFinalRound = gs.currentRound === gs.totalRounds;
      const eliminatedInnocents = gs.eliminatedRecords
        .filter(e => !e.wasMafioso)
        .map(e => room.players.find(p => p.id === e.playerId))
        .filter((p): p is RoomPlayer => !!p);

      const voters = isFinalRound ? eliminatedInnocents : active;
      if (!voters.some(p => p.id === myPlayerId)) return; // not a voter
      if (!active.some(p => p.id === targetId)) return; // invalid target

      // Update this player's vote
      gs.votes = gs.votes.filter(v => v.voterId !== myPlayerId);
      gs.votes.push({ voterId: myPlayerId!, targetId });
      room.lastActivity = Date.now();

      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);

      // Check if all votes are in
      if (gs.votes.length >= voters.length) {
        processVotes(room, io);
      }
    });

    // ── NEXT ROUND (host) ─────────────────────────────────────────
    socket.on("next_round", () => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      const gs = room.gameState; if (!gs) return;
      if (gs.phase !== "round_result") return;
      if (gs.winner) return; // game ended

      const next = gs.currentRound + 1;
      if (next > gs.totalRounds) return;

      gs.currentRound = next;
      gs.phase = "discuss";
      gs.timerEnd = undefined;
      gs.votes = [];
      gs.tiedPlayerIds = [];
      gs.roundResult = undefined;
      room.lastActivity = Date.now();

      io.to(room.code).emit("game_state_update", safeRoom(room).gameState);
      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
    });

    // ── PLAY AGAIN (host) ─────────────────────────────────────────
    socket.on("play_again", ({ caseMeta }: { caseMeta?: CaseMeta }) => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      if (room.status !== "game_over") return;

      cancelTimer(room);
      room.status = "waiting";
      room.gameState = undefined;
      if (caseMeta) room.caseMeta = caseMeta;
      room.lastActivity = Date.now();

      // Reset player states
      room.players.forEach(p => {
        p.characterId = undefined; p.characterName = undefined;
        p.isMafioso = undefined; p.mafiosoPartnerName = undefined;
        p.isEliminated = false; p.eliminatedInRound = undefined;
        p.cardConfirmed = false;
      });

      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
      logger.info({ code: room.code }, "play again");
    });

    // ── KICK PLAYER (host) ────────────────────────────────────────
    socket.on("kick_player", ({ playerId }: { playerId: string }) => {
      const room = getRoom(); if (!room) return;
      const me = getMe(room); if (!me?.isHost) return;
      if (room.status !== "waiting") return;
      if (playerId === myPlayerId) return;

      const target = room.players.find(p => p.id === playerId);
      if (!target) return;

      room.players = room.players.filter(p => p.id !== playerId);
      room.lastActivity = Date.now();

      // Notify kicked player
      io.to(target.socketId).emit("kicked", { message: "تم إخراجك من الغرفة من قِبَل المضيف" });

      io.to(room.code).emit("room_updated", { room: safeRoom(room) });
    });

    // ── WEBRTC SIGNALING ────────────────────────────────────────────
    socket.on("webrtc_signal", ({ targetPlayerId, signal }: { targetPlayerId: string; signal: unknown }) => {
      const room = getRoom(); if (!room) return;
      const target = room.players.find(p => p.id === targetPlayerId);
      if (!target) return;
      io.to(target.socketId).emit("webrtc_signal", { fromPlayerId: myPlayerId, signal });
    });

    socket.on("webrtc_mute", ({ isMuted }: { isMuted: boolean }) => {
      const room = getRoom(); if (!room) return;
      socket.to(room.code).emit("webrtc_mute", { playerId: myPlayerId, isMuted });
    });

    socket.on("webrtc_speaking", ({ isSpeaking }: { isSpeaking: boolean }) => {
      const room = getRoom(); if (!room) return;
      socket.to(room.code).emit("webrtc_speaking", { playerId: myPlayerId, isSpeaking });
    });

    // ── LEAVE ROOM ─────────────────────────────────────────────────
    socket.on("leave_room", () => {
      handleLeave();
      myRoomCode = null;
      myPlayerId = null;
    });

    // ── DISCONNECT ─────────────────────────────────────────────────
    socket.on("disconnect", () => {
      logger.info({ sid: socket.id }, "socket disconnected");
      if (!myRoomCode || !myPlayerId) return;
      const room = rooms.get(myRoomCode);
      if (!room) return;
      const me = room.players.find(p => p.id === myPlayerId);
      if (me) {
        me.isConnected = false;
        migrateHost(room);
        socket.to(myRoomCode).emit("room_updated", { room: safeRoom(room) });

        // If room in waiting status and this was the host who left, or all disconnected
        if (room.players.every(p => !p.isConnected)) {
          setTimeout(() => {
            const r = rooms.get(myRoomCode!);
            if (r && r.players.every(p => !p.isConnected)) {
              cancelTimer(r); rooms.delete(myRoomCode!);
              logger.info({ code: myRoomCode }, "empty room deleted");
            }
          }, 10 * 60 * 1000); // 10 min grace
        }
      }
    });

    // ── HELPERS ─────────────────────────────────────────────────────
    function handleLeave() {
      if (!myRoomCode || !myPlayerId) return;
      const room = rooms.get(myRoomCode); if (!room) return;
      const wasHost = room.players.find(p => p.id === myPlayerId)?.isHost;

      room.players = room.players.filter(p => p.id !== myPlayerId);
      socket.leave(myRoomCode);

      if (room.players.length === 0) {
        cancelTimer(room); rooms.delete(myRoomCode);
        return;
      }
      if (wasHost) migrateHost(room);
      room.lastActivity = Date.now();
      io.to(myRoomCode).emit("room_updated", { room: safeRoom(room) });
    }
  });

  return io;
}
