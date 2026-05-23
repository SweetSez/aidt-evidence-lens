import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Search, FileSearch, UserCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How it works — RDTII" },
      { name: "description", content: "How the RDTII AI Evidence Tool combines automated retrieval, mapping, and human review." },
    ],
  }),
  component: About,
});

const steps = [
  {
    n: 1,
    icon: Search,
    title: "Search & shortlist",
    split: "AI 100%",
    body: "The system queries official legal databases and gazettes, retrieves candidate documents, and shortlists those most likely to contain provisions relevant to the selected pillar.",
  },
  {
    n: 2,
    icon: FileSearch,
    title: "Extract & map",
    split: "AI 100%",
    body: "Large language models extract individual provisions, classify scope (horizontal vs sectoral), score severity (0 / 0.5 / 1.0), and map each provision to the appropriate RDTII indicator with a confidence estimate.",
  },
  {
    n: 3,
    icon: UserCheck,
    title: "Human review",
    split: "Human 20%",
    body: "Researchers approve or reject AI mappings in the review interface. Only validated provisions enter the published results dataset, ensuring institutional rigor.",
  },
];

function About() {
  return (
    <AppLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">How it works</h1>
        <p className="text-sm text-muted-foreground mt-2 mb-10 max-w-2xl leading-relaxed">
          The RDTII AI Evidence Tool is an open-source pipeline that automates legal evidence extraction for the
          Regional Digital Trade Integration Index. It combines automated retrieval and mapping with mandatory
          human validation by domain researchers.
        </p>

        <ol className="space-y-4">
          {steps.map((s) => (
            <li key={s.n} className="bg-card border border-border rounded-lg shadow-card p-6 flex gap-5">
              <div className="shrink-0">
                <div className="h-12 w-12 rounded-md bg-primary text-primary-foreground grid place-items-center">
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="text-xs font-mono text-muted-foreground">STEP {s.n}</span>
                  <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
                  <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded bg-primary-soft text-primary">{s.split}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {[
            { k: "Open source", v: "Auditable code; methodology published alongside results." },
            { k: "Human-in-the-loop", v: "Every published provision is reviewed by a domain researcher." },
            { k: "Reproducible", v: "Inputs, prompts, and outputs are versioned for each analysis run." },
          ].map((c) => (
            <div key={c.k} className="border border-border rounded-lg p-4 bg-card">
              <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">{c.k}</div>
              <div className="text-muted-foreground leading-relaxed">{c.v}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
