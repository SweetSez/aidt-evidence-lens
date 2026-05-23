import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { COUNTRIES, PILLARS } from "@/lib/mock-data";
import { useState } from "react";
import { Play, Loader2, Search, FileSearch, Brain } from "lucide-react";

export const Route = createFileRoute("/new-analysis")({
  head: () => ({ meta: [{ title: "New Analysis — RDTII" }] }),
  component: NewAnalysis,
});

function NewAnalysis() {
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
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">New Analysis</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-8">
          Configure an AI evidence extraction run. The system will retrieve, parse, and map relevant legal provisions for human review.
        </p>

        <div className="bg-card border border-border rounded-lg shadow-card p-6 space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <p className="text-xs text-muted-foreground mt-1.5">Jurisdiction whose legal corpus will be searched.</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Pillar</label>
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
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Pipeline preview</div>
            <ol className="space-y-2 text-sm">
              {[
                { i: Search, t: "Search & shortlist legal documents", note: "AI · ~2 min" },
                { i: FileSearch, t: "Extract & map provisions to indicators", note: "AI · ~5 min" },
                { i: Brain, t: "Queue for human review", note: "Researcher" },
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
            {running ? <><Loader2 className="h-4 w-4 animate-spin" /> Running pipeline…</> : <><Play className="h-4 w-4" /> Run Analysis</>}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
