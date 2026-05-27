import { useState, useCallback } from "react";
import { CASES, Case } from "../data/cases";

export type GameMode = "pass-and-play" | "solo-detective";
export type GamePhase =
  | "home"
  | "case-selection"
  | "player-setup"
  | "role-reveal"
  | "gameplay"
  | "voting"
  | "resolution";

export interface Player {
  name: string;
  occupation: string;
  isMafioso: boolean;
  roleRevealed: boolean;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode | null;
  selectedCase: Case | null;
  players: Player[];
  currentRound: number;
  revealingPlayerIndex: number;
  votes: Record<string, number>;
  accusedPlayerIndex: number | null;
  timerRunning: boolean;
}

const INITIAL_STATE: GameState = {
  phase: "home",
  mode: null,
  selectedCase: null,
  players: [],
  currentRound: 1,
  revealingPlayerIndex: 0,
  votes: {},
  accusedPlayerIndex: null,
  timerRunning: false,
};

export function createInitialGameState(): GameState {
  return { ...INITIAL_STATE };
}

export function assignRoles(playerNames: string[], selectedCase: Case): Player[] {
  const shuffledOccupations = [...selectedCase.occupations];
  for (let i = shuffledOccupations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOccupations[i], shuffledOccupations[j]] = [shuffledOccupations[j], shuffledOccupations[i]];
  }

  const mafieusoOccupation = shuffledOccupations[0];
  const realCulpritOccupation = selectedCase.occupations[selectedCase.culpritIndex];

  const players: Player[] = playerNames.map((name, index) => ({
    name,
    occupation: shuffledOccupations[index],
    isMafioso: shuffledOccupations[index] === realCulpritOccupation,
    roleRevealed: false,
  }));

  return players;
}

export function assignSoloRoles(selectedCase: Case): Player[] {
  const aiNames = ["كريم", "سارة", "مصطفى", "نور"];
  const shuffledOccupations = [...selectedCase.occupations];
  for (let i = shuffledOccupations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOccupations[i], shuffledOccupations[j]] = [shuffledOccupations[j], shuffledOccupations[i]];
  }
  const realCulpritOccupation = selectedCase.occupations[selectedCase.culpritIndex];
  return aiNames.map((name, index) => ({
    name,
    occupation: shuffledOccupations[index],
    isMafioso: shuffledOccupations[index] === realCulpritOccupation,
    roleRevealed: true,
  }));
}

export function useGameStore() {
  const [state, setState] = useState<GameState>(createInitialGameState());

  const setPhase = useCallback((phase: GamePhase) => {
    setState((s) => ({ ...s, phase }));
  }, []);

  const selectMode = useCallback((mode: GameMode) => {
    setState((s) => ({ ...s, mode, phase: "case-selection" }));
  }, []);

  const selectCase = useCallback((c: Case) => {
    setState((s) => ({ ...s, selectedCase: c, phase: "player-setup" }));
  }, []);

  const setupPlayers = useCallback((names: string[]) => {
    setState((s) => {
      if (!s.selectedCase) return s;
      const players = assignRoles(names, s.selectedCase);
      return {
        ...s,
        players,
        revealingPlayerIndex: 0,
        phase: "role-reveal",
      };
    });
  }, []);

  const setupSoloPlayers = useCallback(() => {
    setState((s) => {
      if (!s.selectedCase) return s;
      const aiPlayers = assignSoloRoles(s.selectedCase);
      return {
        ...s,
        players: aiPlayers,
        phase: "gameplay",
        currentRound: 1,
      };
    });
  }, []);

  const revealNextPlayer = useCallback(() => {
    setState((s) => {
      const nextIndex = s.revealingPlayerIndex + 1;
      if (nextIndex >= s.players.length) {
        return { ...s, phase: "gameplay", currentRound: 1, revealingPlayerIndex: 0 };
      }
      return { ...s, revealingPlayerIndex: nextIndex };
    });
  }, []);

  const advanceRound = useCallback(() => {
    setState((s) => {
      if (s.currentRound >= 3) {
        return { ...s, phase: "voting" };
      }
      return { ...s, currentRound: s.currentRound + 1 };
    });
  }, []);

  const castVote = useCallback((playerName: string) => {
    setState((s) => {
      const newVotes = { ...s.votes };
      newVotes[playerName] = (newVotes[playerName] || 0) + 1;
      return { ...s, votes: newVotes };
    });
  }, []);

  const setAccused = useCallback((index: number) => {
    setState((s) => ({ ...s, accusedPlayerIndex: index }));
  }, []);

  const confirmVerdict = useCallback(() => {
    setState((s) => ({ ...s, phase: "resolution" }));
  }, []);

  const resetGame = useCallback(() => {
    setState(createInitialGameState());
  }, []);

  const goHome = useCallback(() => {
    setState(createInitialGameState());
  }, []);

  const getCases = useCallback(() => CASES, []);

  return {
    state,
    setPhase,
    selectMode,
    selectCase,
    setupPlayers,
    setupSoloPlayers,
    revealNextPlayer,
    advanceRound,
    castVote,
    setAccused,
    confirmVerdict,
    resetGame,
    goHome,
    getCases,
  };
}
