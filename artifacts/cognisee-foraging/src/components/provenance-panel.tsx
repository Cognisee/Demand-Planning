import { useState } from "react";
import { ChevronUp, ChevronDown, Shield, User, MapPin, Scale, Clock, Database } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProvenancePanel() {
  const [expanded, setExpanded] = useState(false);
  const provenance = useStore((state) => state.provenance);

  if (!provenance) {
    return (
      <div className="fixed bottom-0 left-64 right-0 bg-card border-t border-border z-40 transition-all h-10 flex items-center px-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
          <Shield className="w-3 h-3" />
          Select a node or claim to view provenance
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-64 right-0 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40 transition-all duration-300",
        expanded ? "h-40" : "h-12"
      )}
    >
      <button 
        onClick={() => setExpanded(!expanded)}
        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-card border border-border rounded-full p-0.5 hover:bg-accent transition-colors shadow-sm"
      >
        {expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
      </button>

      <div className="h-12 flex items-center px-6 gap-6 overflow-hidden border-b border-border/50">
        <div className="flex items-center gap-2 shrink-0">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold font-mono tracking-wider uppercase text-foreground">Provenance</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-mono font-bold rounded">
            {provenance.sourceType}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-end gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3" />
            <span className="truncate max-w-[150px]">{provenance.contributorRole}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span>{provenance.timestamp}</span>
          </div>
        </div>
      </div>

      <div className={cn("px-6 py-4 grid grid-cols-4 gap-6 opacity-0 transition-opacity", expanded && "opacity-100")}>
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-1">Context of Capture</div>
          <div className="text-sm flex items-start gap-2">
            <Database className="w-4 h-4 mt-0.5 text-muted-foreground" />
            <span className="text-foreground">{provenance.context}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-1">Jurisdiction</div>
          <div className="text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{provenance.jurisdiction}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-1">Rights / Consent</div>
          <div className="text-sm flex items-center gap-2">
            <Scale className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{provenance.rights}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono mb-1">Verification Status</div>
          <div className="text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-foreground">Cryptographically Signed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
