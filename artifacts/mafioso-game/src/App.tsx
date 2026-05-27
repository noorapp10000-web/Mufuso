import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext, useContext } from "react";
import { useGameStore } from "./store/gameStore";
import Home from "./pages/Home";
import CaseSelection from "./pages/CaseSelection";
import PlayerSetup from "./pages/PlayerSetup";
import RoleReveal from "./pages/RoleReveal";
import GamePlay from "./pages/GamePlay";
import Voting from "./pages/Voting";
import Resolution from "./pages/Resolution";

const queryClient = new QueryClient();

type GameStoreType = ReturnType<typeof useGameStore>;
const GameContext = createContext<GameStoreType | null>(null);

export function useGame(): GameStoreType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameContext");
  return ctx;
}

function AppContent() {
  const store = useGameStore();
  const { state } = store;

  return (
    <GameContext.Provider value={store}>
      <div className="min-h-screen w-full bg-deep-burgundy" dir="rtl">
        {state.phase === "home" && <Home />}
        {state.phase === "case-selection" && <CaseSelection />}
        {state.phase === "player-setup" && <PlayerSetup />}
        {state.phase === "role-reveal" && <RoleReveal />}
        {state.phase === "gameplay" && <GamePlay />}
        {state.phase === "voting" && <Voting />}
        {state.phase === "resolution" && <Resolution />}
      </div>
    </GameContext.Provider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
