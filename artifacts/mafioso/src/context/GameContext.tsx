import { createContext, useContext, useState, ReactNode } from "react";

export interface Player {
  id: string;
  name: string;
  isMafioso: boolean;
  characterId: string;
  characterName: string;
  hasRevealed: boolean;
  isEliminated: boolean;
}

export interface GameState {
  players: Player[];
  currentRound: number;
  revealedClues: number[];
  eliminatedPlayers: string[];
  phase: "setup" | "draw" | "play" | "vote" | "reveal";
  winner: "innocents" | "mafioso" | null;
}

interface GameContextType {
  gameState: GameState;
  setPlayers: (players: Player[]) => void;
  advanceRound: () => void;
  revealClue: (clueIndex: number) => void;
  eliminatePlayer: (playerId: string) => void;
  setPhase: (phase: GameState["phase"]) => void;
  resetGame: () => void;
  setWinner: (winner: GameState["winner"]) => void;
}

const defaultGameState: GameState = {
  players: [],
  currentRound: 1,
  revealedClues: [],
  eliminatedPlayers: [],
  phase: "setup",
  winner: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  const setPlayers = (players: Player[]) => {
    setGameState(prev => ({ ...prev, players }));
  };

  const advanceRound = () => {
    setGameState(prev => ({ ...prev, currentRound: prev.currentRound + 1 }));
  };

  const revealClue = (clueIndex: number) => {
    setGameState(prev => ({
      ...prev,
      revealedClues: [...prev.revealedClues, clueIndex]
    }));
  };

  const eliminatePlayer = (playerId: string) => {
    setGameState(prev => ({
      ...prev,
      eliminatedPlayers: [...prev.eliminatedPlayers, playerId],
      players: prev.players.map(p =>
        p.id === playerId ? { ...p, isEliminated: true } : p
      )
    }));
  };

  const setPhase = (phase: GameState["phase"]) => {
    setGameState(prev => ({ ...prev, phase }));
  };

  const setWinner = (winner: GameState["winner"]) => {
    setGameState(prev => ({ ...prev, winner }));
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      setPlayers,
      advanceRound,
      revealClue,
      eliminatePlayer,
      setPhase,
      resetGame,
      setWinner
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
}
