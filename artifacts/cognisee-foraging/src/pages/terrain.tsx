import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { ZoomIn, ZoomOut, Maximize, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const nodes = [
  { id: 1, label: "Demand signals historically lagged", type: "known", x: 30, y: 30 },
  { id: 2, label: "Cold start demand inherently uncertain", type: "known", x: 50, y: 20 },
  { id: 3, label: "Supply chain lead times > 6 wks", type: "known", x: 70, y: 35 },
  { id: 4, label: "Market analogues exist", type: "hypothesized", x: 20, y: 60 },
  { id: 5, label: "Consumer behavior models disputed", type: "disputed", x: 50, y: 55 },
  { id: 6, label: "Competitor response timeframe", type: "unknown", x: 80, y: 65 },
  { id: 7, label: "Price elasticity at launch", type: "hypothesized", x: 35, y: 80 },
  { id: 8, label: "Inventory holding costs", type: "known", x: 65, y: 85 },
];

const connections = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 2, target: 5 },
  { source: 4, target: 2 },
  { source: 4, target: 7 },
  { source: 5, target: 7 },
  { source: 3, target: 8 },
  { source: 5, target: 6 },
];

export default function Terrain() {
  const setProvenance = useStore((state) => state.setProvenance);
  const [timeState, setTimeState] = useState(1);

  const getNodeColor = (type: string) => {
    switch (type) {
      case "known": return "bg-[hsl(var(--chart-1))]"; // Teal
      case "hypothesized": return "bg-[hsl(var(--chart-2))] border-2 border-dashed border-[hsl(var(--chart-2))] bg-transparent"; // Amber
      case "disputed": return "bg-[hsl(var(--chart-3))]"; // Red (striped via CSS)
      case "unknown": return "border-2 border-[hsl(var(--chart-4))] bg-transparent"; // Gray hollow
      default: return "bg-gray-500";
    }
  };

  const handleNodeClick = (node: any) => {
    setProvenance({
      sourceType: node.type === "known" ? "Empirical Data" : node.type === "hypothesized" ? "Expert Inference" : "Contested Claim",
      contributorRole: "Lead Analyst",
      context: "Q3 Strategic Review",
      jurisdiction: "Global",
      rights: "Internal Restricted",
      timestamp: "Captured: Oct 12, 2023"
    });
  };

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className="flex-1 relative bg-[#F4F1EA]/50 overflow-hidden">
        <div className="absolute top-6 left-6 z-10 bg-card/90 backdrop-blur-sm border border-border p-4 rounded-lg shadow-sm">
          <div className="text-xs uppercase font-mono tracking-wider font-bold mb-3 text-foreground">Epistemic Legend</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div> Known</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full border border-dashed border-[hsl(var(--chart-2))]"></div> Hypothesized</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))] opacity-80" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" }}></div> Disputed</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-3 h-3 rounded-full border border-[hsl(var(--chart-4))]"></div> Unknown</div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><ZoomIn className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><ZoomOut className="w-4 h-4" /></Button>
          <Button variant="outline" size="icon" className="bg-card shadow-sm"><Maximize className="w-4 h-4" /></Button>
        </div>

        {/* Mock Canvas */}
        <div className="absolute inset-0 p-12">
          <div className="w-full h-full relative">
            {/* Draw connections first */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn, i) => {
                const s = nodes.find(n => n.id === conn.source);
                const t = nodes.find(n => n.id === conn.target);
                if (!s || !t) return null;
                // Only show some connections based on timeState
                if (timeState === 0 && i > 3) return null;
                
                return (
                  <line 
                    key={i}
                    x1={`${s.x}%`} y1={`${s.y}%`}
                    x2={`${t.x}%`} y2={`${t.y}%`}
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeDasharray={t.type === "hypothesized" ? "4 4" : "none"}
                  />
                );
              })}
            </svg>

            {/* Draw nodes */}
            {nodes.map((node) => {
              if (timeState === 0 && node.id > 5) return null;
              
              return (
                <div 
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className={`w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-transform group-hover:scale-110 ${getNodeColor(node.type)}`}
                       style={node.type === 'disputed' ? { backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)" } : {}}
                  >
                    {node.type === "unknown" && <div className="w-1 h-1 rounded-full bg-[hsl(var(--chart-4))]" />}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 text-center">
                    <span className="text-[10px] font-medium leading-tight bg-card/80 backdrop-blur px-2 py-1 rounded shadow-sm border border-border inline-block">
                      {node.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l border-border bg-card p-6 flex flex-col gap-8 shrink-0 overflow-y-auto">
        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Confidence Distribution</h3>
          <div className="flex h-3 rounded-full overflow-hidden mb-2">
            <div className="bg-[hsl(var(--chart-1))] w-[40%]" title="Known"></div>
            <div className="bg-[hsl(var(--chart-2))] w-[30%]" title="Hypothesized"></div>
            <div className="bg-[hsl(var(--chart-3))] w-[15%]" title="Disputed"></div>
            <div className="bg-[hsl(var(--chart-4))] w-[15%]" title="Unknown"></div>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>High</span>
            <span>Low</span>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Critical Missing Data</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-foreground bg-background p-3 rounded-md border border-border">
              <Target className="w-4 h-4 text-[hsl(var(--chart-4))] shrink-0 mt-0.5" />
              <span>Competitor response timeframe (competitor X launch schedule)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-foreground bg-background p-3 rounded-md border border-border">
              <Target className="w-4 h-4 text-[hsl(var(--chart-4))] shrink-0 mt-0.5" />
              <span>Consumer price elasticity in current macro environment</span>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <h3 className="text-xs uppercase font-mono tracking-wider font-bold mb-4">Temporal Evolution</h3>
          <div className="px-2">
            <input 
              type="range" 
              min="0" max="2" 
              step="1"
              value={timeState}
              onChange={(e) => setTimeState(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
              <span>T-2 (Initial)</span>
              <span>T-1</span>
              <span>T-0 (Now)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
