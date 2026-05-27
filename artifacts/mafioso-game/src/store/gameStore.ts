import { useState, useCallback } from "react";
import { CASES, Case } from "../data/cases";

export type GameMode = "pass-and-play" | "solo-detective";
export type GamePhase =
  | "home"
  | "case-selection"
  | "player-setup"
  | "word-reveal"
  | "gameplay"
  | "voting"
  | "mafioso-guess"
  | "resolution";

export interface Player {
  name: string;
  word: string;
  isMafioso: boolean;
}

export interface ClueEntry {
  playerIndex: number;
  clue: string;
}

export interface GameState {
  phase: GamePhase;
  mode: GameMode | null;
  selectedCase: Case | null;
  players: Player[];
  wordRevealIndex: number;
  currentRound: number;
  currentCluePlayerIndex: number;
  clueSummaryMode: boolean;
  clues: ClueEntry[][];
  votes: Record<string, number>;
  accusedPlayerIndex: number | null;
  mafiusoGuess: string | null;
  winner: "citizens" | "mafioso" | null;
}

const INITIAL: GameState = {
  phase: "home",
  mode: null,
  selectedCase: null,
  players: [],
  wordRevealIndex: 0,
  currentRound: 1,
  currentCluePlayerIndex: 0,
  clueSummaryMode: false,
  clues: [[], [], []],
  votes: {},
  accusedPlayerIndex: null,
  mafiusoGuess: null,
  winner: null,
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useGameStore() {
  const [state, setState] = useState<GameState>({ ...INITIAL });

  const goHome = useCallback(() => setState({ ...INITIAL }), []);

  const selectMode = useCallback((mode: GameMode) => {
    setState((s) => ({ ...s, mode, phase: "case-selection" }));
  }, []);

  const selectCase = useCallback((c: Case) => {
    setState((s) => ({ ...s, selectedCase: c, phase: "player-setup" }));
  }, []);

  const setupPlayers = useCallback((names: string[]) => {
    setState((s) => {
      if (!s.selectedCase) return s;
      const indices = shuffleArray([0, 1, 2, 3, 4]);
      const mafiusoSlot = indices[0];
      const players: Player[] = names.map((name, i) => ({
        name,
        word: i === mafiusoSlot ? s.selectedCase!.mafiusoWord : s.selectedCase!.citizensWord,
        isMafioso: i === mafiusoSlot,
      }));
      return { ...s, players, wordRevealIndex: 0, phase: "word-reveal" };
    });
  }, []);

  const revealNextWord = useCallback(() => {
    setState((s) => {
      const next = s.wordRevealIndex + 1;
      if (next >= s.players.length) {
        return { ...s, phase: "gameplay", currentRound: 1, currentCluePlayerIndex: 0, clueSummaryMode: false };
      }
      return { ...s, wordRevealIndex: next };
    });
  }, []);

  const submitClue = useCallback((clue: string) => {
    setState((s) => {
      const newClues = s.clues.map((r) => [...r]) as ClueEntry[][];
      newClues[s.currentRound - 1] = [
        ...newClues[s.currentRound - 1],
        { playerIndex: s.currentCluePlayerIndex, clue },
      ];
      const nextPlayer = s.currentCluePlayerIndex + 1;
      if (nextPlayer >= s.players.length) {
        return { ...s, clues: newClues, clueSummaryMode: true, currentCluePlayerIndex: nextPlayer };
      }
      return { ...s, clues: newClues, currentCluePlayerIndex: nextPlayer };
    });
  }, []);

  const advanceRound = useCallback(() => {
    setState((s) => {
      if (s.currentRound >= 3) {
        return { ...s, phase: "voting" };
      }
      return { ...s, currentRound: s.currentRound + 1, currentCluePlayerIndex: 0, clueSummaryMode: false };
    });
  }, []);

  const castVote = useCallback((playerName: string) => {
    setState((s) => {
      const v = { ...s.votes };
      v[playerName] = (v[playerName] || 0) + 1;
      return { ...s, votes: v };
    });
  }, []);

  const proceedToGuess = useCallback((accusedIndex: number) => {
    setState((s) => ({ ...s, accusedPlayerIndex: accusedIndex, phase: "mafioso-guess" }));
  }, []);

  const submitMafiusoGuess = useCallback((guess: string) => {
    setState((s) => {
      if (!s.selectedCase || s.accusedPlayerIndex === null) return s;
      const accused = s.players[s.accusedPlayerIndex];
      if (!accused.isMafioso) {
        return { ...s, mafiusoGuess: guess, winner: "mafioso", phase: "resolution" };
      }
      const correct = guess.trim() === s.selectedCase.citizensWord.trim();
      return { ...s, mafiusoGuess: guess, winner: correct ? "mafioso" : "citizens", phase: "resolution" };
    });
  }, []);

  const skipMafiusoGuess = useCallback(() => {
    setState((s) => {
      if (s.accusedPlayerIndex === null) return s;
      const accused = s.players[s.accusedPlayerIndex];
      return { ...s, winner: accused.isMafioso ? "citizens" : "mafioso", phase: "resolution" };
    });
  }, []);

  const resetGame = useCallback(() => setState({ ...INITIAL }), []);
  const getCases = useCallback(() => CASES, []);

  return {
    state,
    goHome,
    selectMode,
    selectCase,
    setupPlayers,
    revealNextWord,
    submitClue,
    advanceRound,
    castVote,
    proceedToGuess,
    submitMafiusoGuess,
    skipMafiusoGuess,
    resetGame,
    getCases,
  };
}
