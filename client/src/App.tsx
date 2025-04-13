import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "./hooks/use-auth";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import Projects from "@/pages/projects";
import BrandLibrary from "@/pages/brand-library";
import Messages from "@/pages/messages";
import OurStory from "@/pages/our-story";
import Settings from "@/pages/settings";
import Onboarding from "@/pages/onboarding";
import ProjectDetail from "@/pages/project-detail";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/" component={Dashboard} />
      <ProtectedRoute path="/projects" component={Projects} />
      <ProtectedRoute path="/projects/:id" component={ProjectDetail} />
      <ProtectedRoute path="/brand-library" component={BrandLibrary} />
      <ProtectedRoute path="/messages" component={Messages} />
      <ProtectedRoute path="/our-story" component={OurStory} />
      <ProtectedRoute path="/settings" component={Settings} />
      <ProtectedRoute path="/onboarding" component={Onboarding} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
