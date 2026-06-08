import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const options = [
  {
    id: "a",
    title: "Delay launch 6 weeks for demand signal validation",
    risk: "High Market Share Risk",
    uncertainty: 20,
    impact: 60,
    cost: 85,
    tradeoffs: [
      { label: "Speed to Market", value: 20, color: "bg-[hsl(var(--chart-3))]" },
      { label: "Inventory Risk", value: 85, color: "bg-[hsl(var(--chart-1))]" },
      { label: "Capital Efficiency", value: 40, color: "bg-[hsl(var(--chart-2))]" },
    ]
  },
  {
    id: "b",
    title: "Launch with scenario-based inventory buffers",
    risk: "High Capital Risk",
    uncertainty: 65,
    impact: 80,
    cost: 40,
    tradeoffs: [
      { label: "Speed to Market", value: 90, color: "bg-[hsl(var(--chart-1))]" },
      { label: "Inventory Risk", value: 30, color: "bg-[hsl(var(--chart-3))]" },
      { label: "Capital Efficiency", value: 50, color: "bg-[hsl(var(--chart-2))]" },
    ]
  },
  {
    id: "c",
    title: "Partner with analogous market actor for signal sharing",
    risk: "Medium IP Risk",
    uncertainty: 40,
    impact: 50,
    cost: 70,
    tradeoffs: [
      { label: "Speed to Market", value: 60, color: "bg-[hsl(var(--chart-2))]" },
      { label: "Inventory Risk", value: 70, color: "bg-[hsl(var(--chart-1))]" },
      { label: "Capital Efficiency", value: 80, color: "bg-[hsl(var(--chart-1))]" },
    ]
  }
];

export default function Decision() {
  const [selectedId, setSelectedId] = useState<string>("b");

  return (
    <div className="max-w-5xl mx-auto px-8 pt-24 pb-32">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded mb-4">
          Phase 05 / Decision Surface
        </div>
        <h1 className="text-4xl font-serif text-foreground mb-4">Navigate Trade-offs</h1>
        <p className="text-lg text-muted-foreground">Select an intervention based on the synthesized epistemic terrain.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <div 
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              className={cn(
                "border rounded-xl p-6 cursor-pointer transition-all duration-300",
                isSelected 
                  ? "bg-card border-primary shadow-md ring-1 ring-primary/20" 
                  : "bg-card/50 border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-foreground mb-2">{opt.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-mono uppercase tracking-wider rounded">
                        {opt.risk}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-[hsl(var(--chart-2))]">
                        <AlertCircle className="w-3 h-3" />
                        Uncertainty Index: {opt.uncertainty}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pl-10">
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Trade-off Profile</div>
                <div className="space-y-3">
                  {opt.tradeoffs.map((tradeoff, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-32 text-xs text-foreground">{tradeoff.label}</div>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", tradeoff.color)} 
                          style={{ width: `${tradeoff.value}%` }} 
                        />
                      </div>
                      <div className="w-8 text-right text-xs font-mono text-muted-foreground">{tradeoff.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <h3 className="text-lg font-serif text-foreground mb-2">Epistemic Reversal Conditions</h3>
        <p className="text-sm text-muted-foreground mb-6">What specific new information would cause you to change this decision?</p>
        <Textarea 
          placeholder="E.g., If the EU grants a 6-month compliance grace period for tracing..."
          className="min-h-[120px] bg-background border-border resize-none mb-6"
        />
        <div className="flex justify-end">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-xs px-8"
          >
            Commit Decision to Memory
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
