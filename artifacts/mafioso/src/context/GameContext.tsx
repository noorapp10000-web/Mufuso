import { createContext, useContext, useState, ReactNode } from "react";

export interface Player {
  id: string;
  name: string;
  isMafioso: boolean;
  characterId: string;
  characterName: string;
  hasRevealed: boolean;
  isEliminated: boolean;
  eliminatedInRound?: number;
  mafiosoPartnerName?: string;
}

export interface GameState {
  players: Player[];
  roundDuration: number; // in minutes
}

interface GameContextType {
  gameState: GameState;
  setPlayers: (players: Player[]) => void;
  setRoundDuration: (minutes: number) => void;
  resetGame: () => void;
}

const defaultGameState: GameState = {
  players: [],
  roundDuration: 3,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);

  const setPlayers = (players: Player[]) => {
    setGameState(prev => ({ ...prev, players }));
  };

  const setRoundDuration = (minutes: number) => {
    setGameState(prev => ({ ...prev, roundDuration: minutes }));
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  return (
    <GameContext.Provider value={{ gameState, setPlayers, setRoundDuration, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within GameProvider");
  return context;
}
