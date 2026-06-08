import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Network, GitPullRequest, Search, LineChart, History } from "lucide-react";

export function Sidebar() {
  const [location, setLocation] = useLocation();

  const links = [
    { href: "/", label: "Epistemic Intent", icon: Search },
    { href: "/terrain", label: "Knowledge Terrain", icon: Network },
    { href: "/strategy", label: "Foraging Strategy", icon: GitPullRequest },
    { href: "/reasoning", label: "Reasoning Paths", icon: LayoutDashboard },
    { href: "/decision", label: "Decision Surface", icon: LineChart },
    { href: "/memory", label: "Epistemic Memory", icon: History },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <h1 className="font-serif text-lg font-semibold tracking-tight text-primary">Cognisee</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-mono uppercase text-muted-foreground mb-4 px-2 tracking-wider">
          Control Room Navigation
        </div>
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          return (
            <button
              key={link.href}
              onClick={() => setLocation(link.href)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-left",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
              {link.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground font-mono">Status: Secure</div>
        <div className="text-xs text-muted-foreground font-mono">Uplink: Active</div>
      </div>
    </aside>
  );
}
