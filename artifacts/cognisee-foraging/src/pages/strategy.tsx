import { useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { ArrowRight, ScanLine, ArrowDownToLine, GitCompareArrows, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const strategies = [
  {
    id: "breadth",
    title: "Breadth Scan",
    description: "Cast wide to survey the full epistemic terrain. Prioritizes identifying unknown unknowns and mapping the perimeter of the problem space.",
    icon: ScanLine,
  },
  {
    id: "depth",
    title: "Depth Drill",
    description: "Go deep on a single high-uncertainty node. Prioritizes resolving specific disputes and validating core assumptions.",
    icon: ArrowDownToLine,
  },
  {
    id: "contradiction",
    title: "Contradiction Hunt",
    description: "Seek and surface opposing evidence. Prioritizes stress-testing hypotheses by actively looking for disconfirming data.",
    icon: GitCompareArrows,
  },
  {
    id: "wisdom",
    title: "Wisdom Lens",
    description: "Filter for hard-won experiential knowledge. Prioritizes tacit knowledge, historical analogues, and institutional memory over empirical datasets.",
    icon: Eye,
  }
];

export default function Strategy() {
  const [, setLocation] = useLocation();
  const { strategy, setStrategy } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(strategy);

  const handleInitiate = () => {
    if (selectedId) {
      setStrategy(selectedId);
      setLocation("/reasoning");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 pt-24 pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
          Phase 03 / Foraging Strategy
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">Choose Your Approach</h1>
        <p className="text-lg text-muted-foreground">Select how the cognitive engine should traverse the knowledge terrain.</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-12">
        {strategies.map((strat) => {
          const isSelected = selectedId === strat.id;
          const Icon = strat.icon;
          return (
            <button
              key={strat.id}
              onClick={() => setSelectedId(strat.id)}
              className={cn(
                "text-left p-6 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                isSelected 
                  ? "bg-card border-primary shadow-md ring-1 ring-primary/20" 
                  : "bg-card/50 border-border hover:border-primary/50 hover:bg-card"
              )}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full -mr-8 -mt-8" />
              )}
              <div className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-primary"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-3">{strat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{strat.description}</p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          size="lg" 
          disabled={!selectedId}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-xs px-8 h-12 transition-all disabled:opacity-50"
          onClick={handleInitiate}
        >
          Initiate Epistemic Foraging
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
