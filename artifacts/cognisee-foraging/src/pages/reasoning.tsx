import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Fingerprint, Activity, BookOpen, AlertTriangle, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const perspectives = [
  {
    id: "scientific",
    title: "Scientific / Technical",
    icon: Activity,
    color: "bg-[hsl(var(--chart-1))]",
    textColor: "text-[hsl(var(--chart-1))]",
    confidence: 85,
    steps: [
      {
        id: "s1",
        claim: "Historical demand analogues show 14-day lag in supply signals.",
        evidence: [{ id: "e1", label: "Dataset 4B", type: "Empirical Data" }],
        assumptions: [],
      },
      {
        id: "s2",
        claim: "Inventory buffer of 15% is required for 99% SLA.",
        evidence: [{ id: "e2", label: "Monte Carlo Sim", type: "Model Output" }],
        assumptions: [{ id: "a1", label: "Normal distribution holds" }],
      }
    ],
    openQuestions: "Does recent macro volatility invalidate normal distribution assumption?"
  },
  {
    id: "policy",
    title: "Policy / Institutional",
    icon: BookOpen,
    color: "bg-[hsl(var(--chart-2))]",
    textColor: "text-[hsl(var(--chart-2))]",
    confidence: 60,
    steps: [
      {
        id: "p1",
        claim: "New EU regulations require origin tracing on all cold-start items.",
        evidence: [{ id: "e3", label: "Directive 2023/11", type: "Gov Policy" }],
        assumptions: [],
      },
      {
        id: "p2",
        claim: "Tracing compliance adds 5 days to lead time.",
        evidence: [],
        assumptions: [{ id: "a2", label: "Suppliers cannot parallelize tracing" }],
      }
    ],
    openQuestions: "Can we establish reciprocal data agreements to bypass tracing?"
  },
  {
    id: "indigenous",
    title: "Experiential / Tacit",
    icon: Fingerprint,
    color: "bg-[hsl(var(--chart-5))]",
    textColor: "text-[hsl(var(--chart-5))]",
    confidence: 75,
    steps: [
      {
        id: "i1",
        claim: "Last 3 cold starts failed due to regional distributor bottlenecks, not raw demand.",
        evidence: [{ id: "e4", label: "Post-mortem interviews", type: "Tacit Knowledge" }],
        assumptions: [],
      },
      {
        id: "i2",
        claim: "Distributors require physical samples before committing shelf space.",
        evidence: [{ id: "e5", label: "Sales rep feedback", type: "Field Observation" }],
        assumptions: [{ id: "a3", label: "Digital twins are insufficient" }],
      }
    ],
    openQuestions: "Who holds the critical relationships at the regional level?"
  },
  {
    id: "systems",
    title: "Systems / Ecological",
    icon: ShieldAlert,
    color: "bg-[hsl(var(--chart-3))]",
    textColor: "text-[hsl(var(--chart-3))]",
    confidence: 40,
    steps: [
      {
        id: "sys1",
        claim: "Upstream raw material extraction is highly vulnerable to current climate patterns.",
        evidence: [{ id: "e6", label: "Climate risk index", type: "External Report" }],
        assumptions: [],
      },
      {
        id: "sys2",
        claim: "A single node failure in Tier 3 causes cascading delays.",
        evidence: [],
        assumptions: [{ id: "a4", label: "Tier 3 lacks redundancy" }, { id: "a5", label: "Inventory pooling fails" }],
      }
    ],
    openQuestions: "Where are the hidden fragility points in Tier 2 and Tier 3?"
  }
];

export default function Reasoning() {
  const { strategy, setProvenance } = useStore();
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [challengedAssumptions, setChallengedAssumptions] = useState<Record<string, boolean>>({});
  const [merged, setMerged] = useState(false);

  const toggleStep = (id: string) => {
    setExpandedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const challengeAssumption = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChallengedAssumptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEvidenceClick = (evidence: any) => {
    setProvenance({
      sourceType: evidence.type,
      contributorRole: "Subject Matter Expert",
      context: "Cross-functional working group",
      jurisdiction: "N/A",
      rights: "Commercial Confidential",
      timestamp: "Captured: Oct 14, 2023"
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-16 pb-32">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs uppercase tracking-wider font-mono font-bold rounded">
              Phase 04 / Reasoning
            </div>
            {strategy && (
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs uppercase tracking-wider font-mono font-bold rounded border border-primary/20">
                Active Strategy: {strategy.replace("-", " ").toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Multi-Perspective Synthesis</h1>
          <p className="text-muted-foreground">Compare reasoning chains across epistemic agents.</p>
        </div>
        <Button 
          onClick={() => setMerged(!merged)}
          className={cn(
            "font-mono uppercase tracking-wider text-xs transition-all",
            merged ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90 text-primary-foreground"
          )}
        >
          {merged ? "Unmerge Paths" : "Merge Paths"}
          <ArrowDown className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        {perspectives.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-border bg-card/50 relative">
                <div className="absolute bottom-0 left-0 h-1 bg-muted w-full">
                  <div className={cn("h-full", p.color)} style={{ width: `${p.confidence}%` }} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn("w-4 h-4", p.textColor)} />
                  <h3 className="font-serif font-medium text-foreground">{p.title}</h3>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Confidence Band: {p.confidence}%
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {p.steps.map((step, idx) => (
                  <div key={step.id} className="relative pl-6 pb-2">
                    {/* Timeline line */}
                    {idx < p.steps.length - 1 && (
                      <div className="absolute top-6 left-[11px] bottom-[-16px] w-[2px] bg-border" />
                    )}
                    <div className="absolute top-1 left-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-mono font-bold text-muted-foreground z-10">
                      {idx + 1}
                    </div>

                    <div 
                      className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
                      onClick={() => toggleStep(step.id)}
                    >
                      <p className="text-sm text-foreground leading-relaxed">{step.claim}</p>
                      
                      {(expandedSteps[step.id] || step.evidence.length > 0 || step.assumptions.length > 0) && (
                        <div className="mt-3 pt-3 border-t border-border space-y-3">
                          {step.evidence.length > 0 && (
                            <div>
                              <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1.5">Evidence</div>
                              <div className="flex flex-wrap gap-1.5">
                                {step.evidence.map(e => (
                                  <button
                                    key={e.id}
                                    onClick={(ev) => { ev.stopPropagation(); handleEvidenceClick(e); }}
                                    className="px-2 py-1 bg-secondary/5 text-secondary border border-secondary/20 rounded text-[10px] font-mono uppercase tracking-wider hover:bg-secondary/10 transition-colors"
                                  >
                                    {e.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {step.assumptions.length > 0 && (
                            <div>
                              <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1.5 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-[hsl(var(--chart-2))]" />
                                Assumptions
                              </div>
                              <div className="space-y-1.5">
                                {step.assumptions.map(a => {
                                  const isChallenged = challengedAssumptions[a.id];
                                  return (
                                    <div key={a.id} className="flex items-center justify-between bg-muted/30 p-1.5 rounded border border-border/50">
                                      <span className={cn("text-xs", isChallenged ? "line-through text-muted-foreground" : "text-foreground")}>
                                        {a.label}
                                      </span>
                                      <button 
                                        onClick={(e) => challengeAssumption(a.id, e)}
                                        className={cn(
                                          "text-[10px] px-2 py-0.5 rounded transition-colors font-mono uppercase tracking-wider",
                                          isChallenged 
                                            ? "bg-destructive text-destructive-foreground" 
                                            : "bg-[hsl(var(--chart-2))]/20 text-[hsl(var(--chart-2))] hover:bg-[hsl(var(--chart-2))]/30"
                                        )}
                                      >
                                        {isChallenged ? "Challenged" : "Challenge"}
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-muted/10">
                <div className="text-[10px] font-mono uppercase text-muted-foreground mb-2">Open Epistemic Gap</div>
                <p className="text-sm italic text-muted-foreground">{p.openQuestions}</p>
              </div>
            </div>
          );
        })}
      </div>

      {merged && (
        <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-serif text-secondary mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Synthesized Insight
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="text-xs font-mono uppercase text-secondary/70 mb-2">Core Consensus</div>
              <p className="text-sm leading-relaxed text-foreground">
                All models agree that lead times will exceed 6 weeks and normal distributor networks will bottleneck due to physical sample requirements.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[hsl(var(--chart-3))] mb-2">Critical Friction</div>
              <p className="text-sm leading-relaxed text-foreground">
                EU tracing compliance (Policy) fundamentally conflicts with current Tier 3 supply capabilities (Systems). The assumed 15% buffer is insufficient if tracing is enforced.
              </p>
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-muted-foreground mb-2">Epistemic Action</div>
              <p className="text-sm leading-relaxed text-foreground">
                Before launch, we must either secure a data reciprocity agreement to bypass physical tracing, or rebuild the Tier 3 supply model to account for a 21-day delay.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
