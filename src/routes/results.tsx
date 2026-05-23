import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { provisions } from "@/lib/mock-data";
import { Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "Results — RDTII" }] }),
  component: Results,
});

function exportCsv(rows: typeof provisions) {
  const headers = ["Country", "Law Title", "Last Update", "URL", "Scope", "Indicator", "Provision", "Impact", "Score"];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((r) => [r.country, r.lawTitle, r.lastUpdate, r.url, r.scope, `${r.indicator} ${r.indicatorTitle}`, r.quote, r.impact, r.score].map((v) => escape(String(v))).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rdtii-results.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function Results() {
  const approved = provisions.filter((p) => p.status === "approved");

  return (
    <AppLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Validated results</h1>
          <p className="text-sm text-muted-foreground mt-1">{approved.length} approved provisions ready for export.</p>
        </div>
        <button
          onClick={() => exportCsv(approved)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Country</th>
                <th className="px-4 py-3 font-semibold">Law Title</th>
                <th className="px-4 py-3 font-semibold">Updated</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Scope</th>
                <th className="px-4 py-3 font-semibold">Indicator</th>
                <th className="px-4 py-3 font-semibold">Provision</th>
                <th className="px-4 py-3 font-semibold">Impact</th>
                <th className="px-4 py-3 font-semibold text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {approved.map((r) => (
                <tr key={r.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{r.country}</td>
                  <td className="px-4 py-3 text-foreground">{r.lawTitle} <span className="text-muted-foreground">· {r.article}</span></td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums whitespace-nowrap">{r.lastUpdate}</td>
                  <td className="px-4 py-3">
                    <a href={r.url} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-xs">
                      Open <ExternalLink className="h-3 w-3" />
                    </a>
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.scope}</td>
                  <td className="px-4 py-3 text-foreground whitespace-nowrap">{r.indicator}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-md">
                    <span className="line-clamp-2 italic">"{r.quote}"</span>
                  </td>
                  <td className="px-4 py-3 text-foreground">{r.impact}</td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold text-foreground">{r.score.toFixed(1)}</td>
                </tr>
              ))}
              {approved.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-muted-foreground">No approved provisions yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
