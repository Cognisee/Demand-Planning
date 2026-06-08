import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import { OnboardingModal } from "@/components/onboarding-modal";
import NotFound from "@/pages/not-found";

import Intent from "@/pages/intent";
import Terrain from "@/pages/terrain";
import Strategy from "@/pages/strategy";
import Reasoning from "@/pages/reasoning";
import Decision from "@/pages/decision";
import Memory from "@/pages/memory";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Intent} />
      <Route path="/terrain" component={Terrain} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/reasoning" component={Reasoning} />
      <Route path="/decision" component={Decision} />
      <Route path="/memory" component={Memory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
          <OnboardingModal />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
