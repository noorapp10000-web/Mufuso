import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PlayerCountSelect from "@/pages/PlayerCountSelect";
import CaseSelection from "@/pages/CaseSelection";
import PlayerSetup from "@/pages/PlayerSetup";
import CardDraw from "@/pages/CardDraw";
import GamePlay from "@/pages/GamePlay";
import { GameProvider } from "@/context/GameContext";

const queryClient = new QueryClient();

async function hideSplash() {
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.isNativePlatform()) {
      const { SplashScreen } = await import("@capacitor/splash-screen");
      await SplashScreen.hide({ fadeOutDuration: 500 });
    }
  } catch {
    // Not running in Capacitor — ignore
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cases" component={PlayerCountSelect} />
      <Route path="/cases/:count" component={CaseSelection} />
      <Route path="/setup/:caseId" component={PlayerSetup} />
      <Route path="/draw/:caseId" component={CardDraw} />
      <Route path="/play/:caseId" component={GamePlay} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    hideSplash();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <GameProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </GameProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
