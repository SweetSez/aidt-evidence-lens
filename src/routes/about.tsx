import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Search, FileSearch, UserCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How it works — RDTII" },
      { name: "description", content: "How the RDTII AI Evidence Tool combines automated retrieval, mapping, and human review." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useI18n();
  const steps = [
    { n: 1, icon: Search, title: t("about.s1.t"), split: "AI 100%", body: t("about.s1.b") },
    { n: 2, icon: FileSearch, title: t("about.s2.t"), split: "AI 100%", body: t("about.s2.b") },
    { n: 3, icon: UserCheck, title: t("about.s3.t"), split: "Human 20%", body: t("about.s3.b") },
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{t("about.title")}</h1>
        <p className="text-sm text-muted-foreground mt-2 mb-10 max-w-2xl leading-relaxed">{t("about.intro")}</p>

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
                  <span className="text-xs font-mono text-muted-foreground">{t("about.step")} {s.n}</span>
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
            { k: t("about.k1"), v: t("about.v1") },
            { k: t("about.k2"), v: t("about.v2") },
            { k: t("about.k3"), v: t("about.v3") },
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
