import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Map, Compass, Users, Clock } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Ask a question",
    desc: "Epistemic foraging begins with structured intent. Define the scope of uncertainty."
  },
  {
    icon: Map,
    title: "Map the terrain",
    desc: "Discover what's known, unknown, and actively disputed in the knowledge graph."
  },
  {
    icon: Compass,
    title: "Choose a strategy",
    desc: "Deploy breadth scans, depth drills, contradiction hunts, or wisdom lenses."
  },
  {
    icon: Users,
    title: "Reason from multiple perspectives",
    desc: "Synthesize insights across scientific, policy, indigenous, and institutional viewpoints."
  },
  {
    icon: Clock,
    title: "Track your epistemic journey",
    desc: "Maintain a longitudinal memory of resolved versus unresolved questions over time."
  }
];

export function OnboardingModal() {
  const { hasSeenOnboarding, setHasSeenOnboarding } = useStore();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, [hasSeenOnboarding]);

  const handleClose = () => {
    setHasSeenOnboarding(true);
    setOpen(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((c) => c + 1);
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl bg-card">
        <DialogHeader className="px-2">
          <DialogTitle className="text-2xl font-serif tracking-tight text-primary">
            Welcome to Cognisee
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs uppercase tracking-wider pt-2 border-b border-border/50 pb-4">
            Epistemic Intelligence Environment
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-[220px] relative overflow-hidden py-6 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
              {(() => {
                const StepIcon = steps[currentStep].icon;
                return (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20 shadow-sm">
                    <StepIcon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                );
              })()}
              <h3 className="text-lg font-medium text-foreground mb-3 font-serif">
                {steps[currentStep].title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[80%]">
                {steps[currentStep].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <DialogFooter className="sm:justify-between items-center border-t border-border/50 pt-4 px-2">
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentStep ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleClose} className="text-muted-foreground hover:text-foreground">
              Skip
            </Button>
            <Button onClick={nextStep} className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase tracking-wider px-6">
              {currentStep === steps.length - 1 ? "Enter Control Room" : "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
