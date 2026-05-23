export type ProvisionStatus = "pending" | "approved" | "rejected";

export interface Provision {
  id: string;
  country: string;
  pillar: "Pillar 6" | "Pillar 7";
  indicator: string;
  indicatorTitle: string;
  confidence: number;
  lawTitle: string;
  article: string;
  quote: string;
  scope: "Horizontal" | "Sectoral";
  score: 0 | 0.5 | 1.0;
  trigger: string;
  status: ProvisionStatus;
  url: string;
  lastUpdate: string;
  impact: string;
}

export const COUNTRIES = [
  "Kazakhstan",
  "Vietnam",
  "Singapore",
  "Indonesia",
  "Malaysia",
  "Thailand",
  "Philippines",
  "Bangladesh",
];

export const PILLARS = [
  { id: "p6", label: "Pillar 6 — Cross-border data flows" },
  { id: "p7", label: "Pillar 7 — Data protection" },
];

export const provisions: Provision[] = [
  {
    id: "p-001",
    country: "Kazakhstan",
    pillar: "Pillar 6",
    indicator: "Pillar 6.3",
    indicatorTitle: "Infrastructure",
    confidence: 91,
    lawTitle: "Law on Personal Data and its Protection",
    article: "Article 12",
    quote:
      "Cross-border transfer of personal data to the territories of foreign states shall be carried out only if those states ensure the protection of personal data.",
    scope: "Horizontal",
    score: 1.0,
    trigger: "cross-border transfer · adequate protection",
    status: "pending",
    url: "https://adilet.zan.kz/eng/docs/Z1300000094",
    lastUpdate: "2024-03-12",
    impact: "Restrictive — adequacy required",
  },
  {
    id: "p-002",
    country: "Kazakhstan",
    pillar: "Pillar 6",
    indicator: "Pillar 6.1",
    indicatorTitle: "Localization",
    confidence: 87,
    lawTitle: "Law on Personal Data and its Protection",
    article: "Article 12-1",
    quote:
      "The owner and (or) operator shall ensure storage of personal data of citizens of the Republic of Kazakhstan within the territory of the Republic.",
    scope: "Horizontal",
    score: 1.0,
    trigger: "data localization · storage requirement",
    status: "pending",
    url: "https://adilet.zan.kz/eng/docs/Z1300000094",
    lastUpdate: "2024-03-12",
    impact: "Localization mandate",
  },
  {
    id: "p-003",
    country: "Vietnam",
    pillar: "Pillar 7",
    indicator: "Pillar 7.2",
    indicatorTitle: "Consent & Rights",
    confidence: 94,
    lawTitle: "Decree 13/2023/ND-CP on Personal Data Protection",
    article: "Article 11",
    quote:
      "The data subject's consent is valid only when the data subject voluntarily and clearly knows the type of personal data to be processed, the purpose of processing, and the parties allowed to process such data.",
    scope: "Horizontal",
    score: 1.0,
    trigger: "informed consent · processing purpose",
    status: "approved",
    url: "https://english.luatvietnam.vn",
    lastUpdate: "2024-01-08",
    impact: "Strong consent regime",
  },
  {
    id: "p-004",
    country: "Vietnam",
    pillar: "Pillar 6",
    indicator: "Pillar 6.2",
    indicatorTitle: "Transfer Conditions",
    confidence: 82,
    lawTitle: "Decree 53/2022/ND-CP",
    article: "Article 26",
    quote:
      "Enterprises providing services on telecommunications networks shall store data of users in Vietnam for a period prescribed by the Government.",
    scope: "Sectoral",
    score: 0.5,
    trigger: "telecom storage · user data",
    status: "pending",
    url: "https://english.luatvietnam.vn",
    lastUpdate: "2024-02-19",
    impact: "Sectoral storage requirement",
  },
  {
    id: "p-005",
    country: "Singapore",
    pillar: "Pillar 7",
    indicator: "Pillar 7.1",
    indicatorTitle: "Scope & Definitions",
    confidence: 96,
    lawTitle: "Personal Data Protection Act 2012",
    article: "Section 13",
    quote:
      "An organisation shall not collect, use or disclose personal data about an individual unless the individual gives, or is deemed to have given, his consent.",
    scope: "Horizontal",
    score: 1.0,
    trigger: "consent baseline · collection",
    status: "approved",
    url: "https://sso.agc.gov.sg/Act/PDPA2012",
    lastUpdate: "2024-04-02",
    impact: "Comprehensive PDPA framework",
  },
  {
    id: "p-006",
    country: "Singapore",
    pillar: "Pillar 6",
    indicator: "Pillar 6.4",
    indicatorTitle: "Accountability",
    confidence: 89,
    lawTitle: "Personal Data Protection Act 2012",
    article: "Section 26",
    quote:
      "An organisation shall not transfer any personal data to a country or territory outside Singapore except in accordance with requirements prescribed under this Act.",
    scope: "Horizontal",
    score: 1.0,
    trigger: "transfer · prescribed conditions",
    status: "approved",
    url: "https://sso.agc.gov.sg/Act/PDPA2012",
    lastUpdate: "2024-04-02",
    impact: "Conditional transfer regime",
  },
  {
    id: "p-007",
    country: "Indonesia",
    pillar: "Pillar 7",
    indicator: "Pillar 7.3",
    indicatorTitle: "Enforcement",
    confidence: 78,
    lawTitle: "Law No. 27 of 2022 on Personal Data Protection",
    article: "Article 57",
    quote:
      "Personal Data Controllers and Processors that violate provisions of this Law shall be subject to administrative sanctions in the form of written warnings, temporary suspension, or administrative fines.",
    scope: "Horizontal",
    score: 0.5,
    trigger: "administrative sanctions · enforcement",
    status: "rejected",
    url: "https://peraturan.bpk.go.id",
    lastUpdate: "2024-01-30",
    impact: "Tiered sanctions framework",
  },
  {
    id: "p-008",
    country: "Kazakhstan",
    pillar: "Pillar 7",
    indicator: "Pillar 7.4",
    indicatorTitle: "Authority",
    confidence: 73,
    lawTitle: "Law on Personal Data and its Protection",
    article: "Article 27",
    quote:
      "The authorized body for the protection of personal data exercises state control and supervision in the field of personal data protection.",
    scope: "Horizontal",
    score: 0.5,
    trigger: "supervisory authority",
    status: "pending",
    url: "https://adilet.zan.kz/eng/docs/Z1300000094",
    lastUpdate: "2024-03-12",
    impact: "DPA established",
  },
];

export const recentActivity = [
  { who: "Maria L.", action: "approved", what: "PDPA §13 — Singapore", when: "2h ago" },
  { who: "Tomás R.", action: "ran analysis on", what: "Vietnam · Pillar 6", when: "5h ago" },
  { who: "Aigerim S.", action: "rejected", what: "UU 27/2022 §57 — Indonesia", when: "1d ago" },
  { who: "James W.", action: "exported", what: "Q1 results (CSV)", when: "2d ago" },
];
