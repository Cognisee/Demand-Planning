import { useState } from "react";
import { useLocation } from "wouter";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function Intent() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("supply and demand planning optimization for a cold start product launch");

  const refiners = [
    { id: "unknowns", label: "Unknowns / disputes" },
    { id: "assumptions", label: "Assumptions" },
    { id: "wrong", label: "What if wrong?" },
    { id: "perspectives", label: "Perspectives" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-8 pt-24 pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
          Phase 01 / Epistemic Intent
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">What do you need to know?</h1>
        <p className="text-lg text-muted-foreground">Define your epistemic inquiry to begin mapping the knowledge terrain.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-4 w-6 h-6 text-muted-foreground" />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-14 pr-4 py-4 text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[120px] resize-none"
            placeholder="Type your research question..."
          />
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">Guided Refiners</h3>
          <div className="grid grid-cols-2 gap-4">
            {refiners.map((refiner) => (
              <div key={refiner.id} className="flex items-center space-x-3 bg-background border border-border p-4 rounded-lg">
                <Checkbox id={refiner.id} defaultChecked />
                <label
                  htmlFor={refiner.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                >
                  {refiner.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-xs px-8 h-12"
            onClick={() => setLocation("/terrain")}
          >
            Map Knowledge Terrain
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
