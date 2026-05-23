import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { provisions as initial, type Provision } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Check, X, ExternalLink, Filter } from "lucide-react";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review — RDTII" }] }),
  component: Review,
});

function Review() {
  const [items, setItems] = useState<Provision[]>(initial);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const counts = useMemo(() => ({
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,
    pending: items.filter((i) => i.status === "pending").length,
  }), [items]);

  const visible = items.filter((i) => filter === "all" || i.status === filter);

  const setStatus = (id: string, status: Provision["status"]) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  return (
    <AppLayout>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Review interface</h1>
          <p className="text-sm text-muted-foreground mt-1">Validate AI-extracted provisions. Each decision is logged and exportable.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card p-4 mb-5 flex flex-wrap items-center gap-3 sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success-soft text-success font-medium">
            <Check className="h-3.5 w-3.5" /> {counts.approved} approved
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-destructive-soft text-destructive font-medium">
            <X className="h-3.5 w-3.5" /> {counts.rejected} rejected
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warning-soft text-warning font-medium">
            {counts.pending} pending
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1 bg-secondary rounded-md p-1 text-xs">
          <Filter className="h-3.5 w-3.5 text-muted-foreground ml-2 mr-1" />
          {(["pending", "approved", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded capitalize font-medium transition-colors ${
                filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {visible.length === 0 && (
          <div className="text-center py-16 text-sm text-muted-foreground bg-card border border-border rounded-lg">
            No provisions match this filter.
          </div>
        )}
        {visible.map((p) => (
          <ProvisionCard key={p.id} p={p} onApprove={() => setStatus(p.id, "approved")} onReject={() => setStatus(p.id, "rejected")} />
        ))}
      </div>
    </AppLayout>
  );
}

function ProvisionCard({ p, onApprove, onReject }: { p: Provision; onApprove: () => void; onReject: () => void }) {
  const conf = p.confidence;
  const confTone = conf >= 90 ? "success" : conf >= 80 ? "primary" : "warning";
  const confClass = {
    success: "bg-success-soft text-success",
    primary: "bg-primary-soft text-primary",
    warning: "bg-warning-soft text-warning",
  }[confTone];

  return (
    <article className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex flex-wrap items-center gap-2 border-b border-border">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary-soft text-primary text-xs font-semibold">
          {p.indicator} — {p.indicatorTitle}
        </span>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-md ${confClass} text-xs font-semibold`}>
          {conf}% confident
        </span>
        <span className="text-xs text-muted-foreground">· {p.country}</span>
        <div className="flex-1" />
        {p.status !== "pending" && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
            p.status === "approved" ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive"
          }`}>
            {p.status}
          </span>
        )}
      </div>

      <div className="px-5 py-4">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-foreground leading-snug">
            {p.lawTitle} <span className="text-muted-foreground font-normal">· {p.article}</span>
          </h3>
          <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline inline-flex items-center gap-1 shrink-0">
            Source <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <blockquote className="border-l-4 border-primary bg-primary-soft/40 pl-4 pr-3 py-3 italic text-sm text-foreground leading-relaxed rounded-r">
          "{p.quote}"
        </blockquote>

        <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Meta label="Scope" value={p.scope} />
          <Meta label="Score" value={p.score.toFixed(1)} />
          <Meta label="Pillar" value={p.pillar} />
          <Meta label="Trigger" value={p.trigger} mono />
        </dl>
      </div>

      <div className="px-5 py-3 border-t border-border bg-secondary/30 flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={onReject}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-sm font-medium border border-destructive/30 text-destructive bg-card hover:bg-destructive-soft transition-colors"
        >
          <X className="h-4 w-4" /> Reject
        </button>
        <button
          onClick={onApprove}
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md text-sm font-medium bg-success text-success-foreground hover:bg-success/90 transition-colors"
        >
          <Check className="h-4 w-4" /> Approve
        </button>
      </div>
    </article>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={`mt-0.5 text-foreground ${mono ? "font-mono text-[11px]" : ""}`}>{value}</dd>
    </div>
  );
}
