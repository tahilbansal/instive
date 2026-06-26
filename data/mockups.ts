// ─────────────────────────────────────────────────────────────────────────────
// Instive AI, mockup catalogue
//
// This is the ONLY file you edit to add a mockup to the /mockups showcase.
// See MOCKUPS.md at the project root for the step-by-step.
// ─────────────────────────────────────────────────────────────────────────────

export type Sidecar =
  | "Carrier Intelligence"
  | "Demand Forecasting"
  | "Client Reporting"
  | "Invoice Auditor"
  | "Labor Planning"
  | "Returns Intelligence"
  | "Dispatch & Crew Scheduling";

export type Mockup = {
  id: string;
  companyName: string;
  industry: string;
  sidecar: Sidecar;
  /** One sentence: the exact problem this mockup flags. Rendered in italics. */
  heroScenario: string;
  /** 3-4 specific, metric-backed benefits. */
  benefits: string[];
  tags: string[];
  /** Same-origin path to the live HTML mockup (Vercel rewrite → /clients_mockups/…). */
  mockupUrl: string;
  /** Optional screenshot in /public/previews/. */
  previewImage?: string;
  /** ISO date string. */
  addedDate: string;
};

/**
 * Per-sidecar accent colour + ordering, used for badges, pills and accents.
 * Keep the hex values in sync with `theme.extend.colors.sidecar` in tailwind.config.ts.
 */
export const SIDECAR_META: Record<
  Sidecar,
  { accent: string; description: string }
> = {
  "Carrier Intelligence": {
    accent: "#3b82f6",
    description: "Scores carriers and lanes before a slip reaches a client.",
  },
  "Demand Forecasting": {
    accent: "#8b5cf6",
    description: "Predicts demand and reorder timing across every SKU.",
  },
  "Client Reporting": {
    accent: "#06b6d4",
    description: "Builds every client report from one live source.",
  },
  "Invoice Auditor": {
    accent: "#f59e0b",
    description: "Audits every freight bill against contract, not a sample.",
  },
  "Labor Planning": {
    accent: "#10b981",
    description: "Sizes the crew from tomorrow's forecasted volume.",
  },
  "Returns Intelligence": {
    accent: "#f97316",
    description: "Suggests disposition for every return; your team confirms.",
  },
  "Dispatch & Crew Scheduling": {
    accent: "#ec4899",
    description: "Plans dispatch and field crews around live demand.",
  },
};

/** Ordered list of sidecars for the filter bar. */
export const SIDECARS: Sidecar[] = [
  "Carrier Intelligence",
  "Demand Forecasting",
  "Client Reporting",
  "Invoice Auditor",
  "Labor Planning",
  "Returns Intelligence",
  "Dispatch & Crew Scheduling",
];

export const mockups: Mockup[] = [
  {
    id: "airsea-invoice-auditor",
    companyName: "Air-Sea Forwarders",
    industry: "Freight Forwarding · Air & Ocean",
    sidecar: "Invoice Auditor",
    heroScenario:
      "Catches a chargeable-weight overstatement on a LAX air export, audited the same way as ocean demurrage past free-time.",
    benefits: [
      "Audits every air AWB and ocean BL against the quote, 2,910 invoices MTD across all 10 branches, not a sample",
      "Flags quoted-vs-billed gaps with the dim calc attached, 31 caught this month",
      "$96.2K recoverable month-to-date, dispute-ready",
      "One audit standard for air and ocean, every branch reporting 10 / 10",
    ],
    tags: ["invoice audit", "chargeable weight", "demurrage", "multi-branch"],
    mockupUrl: "/air-sea-forwarders",
    addedDate: "2025-06-17",
  },
  {
    id: "mrb-invoice-auditor",
    companyName: "MRB Logistics",
    industry: "Freight Brokerage · Truckload",
    sidecar: "Invoice Auditor",
    heroScenario:
      "Flags a reefer fuel surcharge billed above contract on a frozen lane, and drafts the dispute letter for you.",
    benefits: [
      "Reads every freight bill against contract, 1,284 audited MTD, 23 overcharges flagged",
      "Auto-drafts the dispute letter so recovery is a one-click send, 88% win rate",
      "Cut average days-to-recover from 42 to 19",
      "$312K recovered year-to-date",
    ],
    tags: ["invoice audit", "fuel surcharge", "dispute automation", "reefer"],
    mockupUrl: "/mrb",
    addedDate: "2025-06-17",
  },
  {
    id: "hessen-invoice-auditor",
    companyName: "Hessen Logistics",
    industry: "Cross-Border · Customs & Freight",
    sidecar: "Invoice Auditor",
    heroScenario:
      "Spots a duty rate on the pedimento that doesn't match the HS code on a Laredo → Monterrey entry.",
    benefits: [
      "Reconciles the freight invoice and pedimento together, 940 files MTD, no manual matching",
      "Flags duty / HS-code / freight mismatches, 17 caught this month",
      "$58.3K recoverable MTD, $284K recovered year-to-date",
      "62 files matched automatically per day, month-end surprises retired",
    ],
    tags: ["customs", "duty reconciliation", "HS codes", "cross-border"],
    mockupUrl: "/hessen-logistics",
    addedDate: "2025-06-17",
  },
  {
    id: "r2x-carrier-intelligence",
    companyName: "READY-2-XECUTE",
    industry: "3PL · Managed Transportation",
    sidecar: "Carrier Intelligence",
    heroScenario:
      "Flags Sunbelt Freight sliding on the new Tampa lanes 3-4 weeks before it becomes a client complaint.",
    benefits: [
      "Scores 68 carriers continuously, network on-time 93.8%",
      "Catches a sliding carrier 3-4 weeks before it touches a client SLA, 3 flagged early",
      "New lanes carry their own scorecard from day one (Tampa expansion watched closely)",
      "Recommends volume rebalancing before the complaint lands",
    ],
    tags: ["carrier scorecards", "early warning", "lane risk", "on-time"],
    mockupUrl: "/ready-2-xecute",
    addedDate: "2025-06-17",
  },
  {
    id: "vss-carrier-intelligence",
    companyName: "VSS Carriers",
    industry: "Trucking · High-Value Freight",
    sidecar: "Carrier Intelligence",
    heroScenario:
      "Catches an ETA slip on a medical-devices load while the receiver's detention clock is already running.",
    benefits: [
      "Watches 47 in-motion loads off the GPS feed, surfaces exceptions before the customer calls",
      "Flags ETA slips on time-sensitive freight (medical devices, Memphis → Dallas)",
      "Captures detention accessorials before they age out, $41.8K captured MTD",
      "Proactive customer notification, one tap to capture the charge",
    ],
    tags: ["live exceptions", "detention", "accessorials", "ETA tracking"],
    mockupUrl: "/vss-carriers",
    addedDate: "2025-06-17",
  },
  {
    id: "carter-client-reporting",
    companyName: "Carter Distribution",
    industry: "Distribution · Multi-Brand 3PL",
    sidecar: "Client Reporting",
    heroScenario:
      "Builds every client report automatically from the same live data the operation runs on, no manual pull.",
    benefits: [
      "Generates every client report automatically, no spreadsheet exports",
      "Live inventory health by client across 8,420 SKUs, all brands",
      "Network fill rate 98.4%, the same number the client sees",
      "Returns rolled into every report (312 this week)",
    ],
    tags: ["automated reporting", "client portal", "fill rate", "inventory"],
    mockupUrl: "/carter-distribution",
    addedDate: "2025-06-17",
  },
  {
    id: "exe-labor-planning",
    companyName: "EXE Logistics",
    industry: "Fulfillment · DTC 3PL",
    sidecar: "Labor Planning",
    heroScenario:
      "Staffs the afternoon surge from the very feed that fills client metrics, so cut-offs get met, not missed.",
    benefits: [
      "Sizes tomorrow's crew from the throughput forecast that fills today's client metrics, one source",
      "14,280 orders shipped today across 9 clients, all on the cut-off",
      "99.1% on-time ship rate; 9 / 9 client cut-offs met",
      "Afternoon surge staffed ahead, not after the miss",
    ],
    tags: ["staffing forecast", "throughput", "cut-off", "shift planning"],
    mockupUrl: "/exe-logistics",
    addedDate: "2025-06-17",
  },
  {
    id: "usmmg-labor-planning",
    companyName: "U.S. Multimodal Group",
    industry: "Intermodal · Rail Ramp",
    sidecar: "Labor Planning",
    heroScenario:
      "Sees tomorrow's inbound boxes spike 16% on the 6 AM Savannah rail wave and staffs the crew ahead of it.",
    benefits: [
      "Forecasts inbound box volume by facility 7 days out, 93.1% accuracy",
      "Flags surges before they hit, 5 staffed ahead this week (Savannah rail wave, 6 AM peak)",
      "Drives the crew plan straight from inbound volume",
      "Tomorrow's +16% morning spike covered before the shift starts",
    ],
    tags: ["inbound forecast", "rail wave", "surge staffing", "intermodal"],
    mockupUrl: "/usmmg",
    addedDate: "2025-06-17",
  },
  {
    id: "safeway-returns-intelligence",
    companyName: "Safeway Logistics",
    industry: "Reverse Logistics · Returns",
    sidecar: "Returns Intelligence",
    heroScenario:
      "Sorts a high-value healthcare return batch in seconds, your team confirms each disposition before anything moves.",
    benefits: [
      "Auto-suggests disposition for every return, 171 of 186 staged, your team confirms each",
      "62% back to sellable (▲9 pts); $113.7K recovered this week",
      "Processing time cut 50% vs. manual triage; restock lag down from 3.4 to 1.6 days",
      "Reads reasons, lot codes and condition, judgment stays with people (94% confirm rate)",
    ],
    tags: ["returns disposition", "restock", "value recovery", "human-in-loop"],
    mockupUrl: "/safeway-logistics",
    addedDate: "2025-06-17",
  },
  {
    id: "paris-brothers-demand-forecasting",
    companyName: "Paris Brothers",
    industry: "Food & Beverage · Temp-Controlled Distribution",
    sidecar: "Demand Forecasting",
    heroScenario:
      "Flags organic green coffee climbing toward its reorder point, it crosses in 6 days, ahead of the usual cycle.",
    benefits: [
      "Forecasts demand across 3,420 SKUs and every temp zone, 91.6% accuracy (▲3.1 pts)",
      "Flags climbers before they cross the reorder point, 7 this week",
      "Frees cooler space held by slow-movers (12% tied up today)",
      "Targets ~35% fewer stockouts and ~20% less overstock in 90 days",
    ],
    tags: ["demand forecast", "reorder point", "cold storage", "SKU velocity"],
    mockupUrl: "/paris-brothers",
    addedDate: "2025-06-17",
  },
];
