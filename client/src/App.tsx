import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Programs from "@/pages/programs";
import Subjects from "@/pages/subjects";
import Chapters from "@/pages/chapters";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programs/:programId" component={Programs} />
        <Route path="/programs/:programId/subjects/:subjectId" component={Subjects} />
        <Route path="/programs/:programId/subjects/:subjectId/chapters/:chapterId" component={Chapters} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
