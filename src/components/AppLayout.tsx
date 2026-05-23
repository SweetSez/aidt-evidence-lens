import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FilePlus2, ClipboardCheck, Table2, Info, ShieldCheck, Sun, Moon, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n, type Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import type { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  const path = location.pathname;
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();

  const nav = [
    { to: "/", label: t("nav.dashboard"), icon: LayoutDashboard },
    { to: "/new-analysis", label: t("nav.new"), icon: FilePlus2 },
    { to: "/review", label: t("nav.review"), icon: ClipboardCheck },
    { to: "/results", label: t("nav.results"), icon: Table2 },
    { to: "/about", label: t("nav.about"), icon: Info },
  ] as const;

  const current = nav.find((n) => (n.to === "/" ? path === "/" : path.startsWith(n.to)))?.label ?? t("nav.dashboard");

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
              <div className="text-[11px] text-muted-foreground">{t("brand.tag")}</div>
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
          <div className="font-medium text-foreground">{t("org.name")}</div>
          {t("org.sub")}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-5 md:px-8 gap-3">
          <div className="text-sm text-muted-foreground truncate">
            <span className="text-foreground font-medium">RDTII</span>
            <span className="mx-2 text-border">/</span>
            {current}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-medium text-success bg-success-soft px-2 py-1 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {t("system.ok")}
            </span>

            <div className="inline-flex items-center gap-1 bg-secondary rounded-md p-0.5 text-xs" role="group" aria-label={t("lang.label")}>
              <Languages className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
              {(["en", "ru", "zh"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "px-2 py-1 rounded font-medium uppercase transition-colors",
                    lang === l ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={toggle}
              aria-label={theme === "light" ? t("theme.dark") : t("theme.light")}
              title={theme === "light" ? t("theme.dark") : t("theme.light")}
              className="h-8 w-8 grid place-items-center rounded-md border border-border bg-card text-foreground hover:bg-secondary transition-colors"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

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
