import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { COUNTRIES, PILLARS } from "@/lib/mock-data";
import { useState } from "react";
import { Play, Loader2, Search, FileSearch, Brain } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/new-analysis")({
  head: () => ({ meta: [{ title: "New Analysis — RDTII" }] }),
  component: NewAnalysis,
});

function NewAnalysis() {
  const { t } = useI18n();
  const [country, setCountry] = useState("Kazakhstan");
  const [pillar, setPillar] = useState(PILLARS[0].id);
  const [running, setRunning] = useState(false);
  const navigate = useNavigate();

  const run = () => {
    setRunning(true);
    setTimeout(() => navigate({ to: "/review" }), 1600);
  };

  return (
    <AppLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("new.title")}</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-8">{t("new.sub")}</p>

        <div className="bg-card border border-border rounded-lg shadow-card p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">{t("new.country")}</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <p className="text-xs text-muted-foreground mt-1.5">{t("new.countryHint")}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">{t("new.pillar")}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <label
                  key={p.id}
                  className={`cursor-pointer border rounded-md px-4 py-3 text-sm transition-colors ${
                    pillar === p.id ? "border-primary bg-primary-soft text-primary" : "border-border hover:border-muted-foreground/40"
                  }`}
                >
                  <input type="radio" name="pillar" className="sr-only" checked={pillar === p.id} onChange={() => setPillar(p.id)} />
                  <span className="font-medium block">{p.label.split(" — ")[0]}</span>
                  <span className="text-xs text-muted-foreground">{p.label.split(" — ")[1]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{t("new.preview")}</div>
            <ol className="space-y-2 text-sm">
              {[
                { i: Search, t: t("new.s1"), note: "AI · ~2 min" },
                { i: FileSearch, t: t("new.s2"), note: "AI · ~5 min" },
                { i: Brain, t: t("new.s3"), note: "Researcher" },
              ].map((s, i) => (
                <li key={i} className="flex items-center gap-3 text-foreground">
                  <span className="h-7 w-7 rounded-md bg-secondary text-muted-foreground grid place-items-center">
                    <s.i className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1">{s.t}</span>
                  <span className="text-xs text-muted-foreground">{s.note}</span>
                </li>
              ))}
            </ol>
          </div>

          <button
            onClick={run}
            disabled={running}
            className="w-full inline-flex items-center justify-center gap-2 h-11 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
          >
            {running ? <><Loader2 className="h-4 w-4 animate-spin" /> {t("new.running")}</> : <><Play className="h-4 w-4" /> {t("new.run")}</>}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
