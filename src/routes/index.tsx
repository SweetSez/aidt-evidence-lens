import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { provisions, recentActivity, COUNTRIES } from "@/lib/mock-data";
import { ArrowRight, FileText, CheckCircle2, Clock, Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — RDTII AI Evidence Tool" },
      { name: "description", content: "Overview of AI-extracted legal provisions and review progress for digital trade policy analysis." },
    ],
  }),
  component: Dashboard,
});

function Stat({ label, value, sub, icon: Icon, tone }: { label: string; value: string; sub: string; icon: any; tone: "primary" | "success" | "warning" }) {
  const toneMap = {
    primary: "bg-primary-soft text-primary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
  } as const;
  return (
    <div className="bg-card border border-border rounded-lg p-5 shadow-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className={`h-8 w-8 rounded-md grid place-items-center ${toneMap[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function Dashboard() {
  const { t } = useI18n();
  const total = provisions.length;
  const approved = provisions.filter((p) => p.status === "approved").length;
  const pending = provisions.filter((p) => p.status === "pending").length;
  const countriesActive = new Set(provisions.map((p) => p.country)).size;

  return (
    <AppLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("dash.title")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("dash.sub")}</p>
        </div>
        <Link
          to="/new-analysis"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t("dash.new")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat label={t("dash.found")} value={String(total)} sub={t("dash.foundSub", { n: countriesActive })} icon={FileText} tone="primary" />
        <Stat label={t("dash.approved")} value={String(approved)} sub={t("dash.approvedSub")} icon={CheckCircle2} tone="success" />
        <Stat label={t("dash.pending")} value={String(pending)} sub={t("dash.pendingSub")} icon={Clock} tone="warning" />
        <Stat label={t("dash.countries")} value={`${countriesActive} / ${COUNTRIES.length}`} sub={t("dash.countriesSub")} icon={Globe2} tone="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <section className="lg:col-span-2 bg-card border border-border rounded-lg shadow-card">
          <header className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">{t("dash.active")}</h2>
            <Link to="/review" className="text-xs text-primary font-medium hover:underline">{t("dash.openReview")}</Link>
          </header>
          <div className="divide-y divide-border">
            {[...new Set(provisions.map((p) => p.country))].map((country) => {
              const items = provisions.filter((p) => p.country === country);
              const a = items.filter((i) => i.status === "approved").length;
              const r = items.filter((i) => i.status === "rejected").length;
              const p = items.filter((i) => i.status === "pending").length;
              const pct = Math.round(((a + r) / items.length) * 100);
              return (
                <div key={country} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2 gap-3 flex-wrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{country}</div>
                      <div className="text-xs text-muted-foreground">
                        {items.length} {t("dash.provisions")} · {[...new Set(items.map((i) => i.pillar))].join(", ")}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground tabular-nums">
                      <span className="text-success font-medium">{a} {t("dash.aApproved")}</span> ·{" "}
                      <span className="text-destructive font-medium">{r} {t("dash.aRejected")}</span> ·{" "}
                      <span className="text-warning font-medium">{p} {t("dash.aPending")}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg shadow-card">
          <header className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">{t("dash.recent")}</h2>
          </header>
          <ul className="divide-y divide-border">
            {recentActivity.map((a, i) => (
              <li key={i} className="px-5 py-3 text-sm">
                <div className="text-foreground">
                  <span className="font-medium">{a.who}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="text-foreground">{a.what}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{a.when}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppLayout>
  );
}
