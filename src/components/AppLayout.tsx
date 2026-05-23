import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FilePlus2, ClipboardCheck, Table2, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/new-analysis", label: "New Analysis", icon: FilePlus2 },
  { to: "/review", label: "Review", icon: ClipboardCheck },
  { to: "/results", label: "Results", icon: Table2 },
  { to: "/about", label: "How it works", icon: Info },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-sidebar">
        <div className="px-6 py-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-md bg-primary text-primary-foreground grid place-items-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-tight text-foreground">RDTII</div>
              <div className="text-[11px] text-muted-foreground">AI Evidence Tool</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item) => {
            const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-sidebar-border text-[11px] text-muted-foreground leading-relaxed">
          <div className="font-medium text-foreground">UN ESCAP</div>
          Regional Digital Trade Integration Index
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-5 md:px-8">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground font-medium">RDTII AI Evidence Tool</span>
            <span className="mx-2 text-border">/</span>
            {nav.find((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)))?.label ?? "Dashboard"}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-success bg-success-soft px-2 py-1 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> System operational
            </span>
            <div className="h-8 w-8 rounded-full bg-primary-soft text-primary grid place-items-center text-xs font-semibold">
              ML
            </div>
          </div>
        </header>
        <main className="flex-1 px-5 md:px-8 py-6 md:py-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
