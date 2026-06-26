// ─────────────────────────────────────────────────────────────────────────────
// Instive AI — site content layer
//
// Single source of copy for the marketing site. Voice: operator first, specific,
// metric-backed, no hype. House rule: no em dashes anywhere in visible text.
// ─────────────────────────────────────────────────────────────────────────────

import { SIDECAR_META } from "@/data/mockups";

/** The one primary action across the whole site. */
export const BOOK_CALL =
  "mailto:contact@instiveai.com?subject=Book%20a%20demo%20with%20Instive%20AI&body=A%20bit%20about%20our%20operation%3A%0A%0ACompany%3A%0AIndustry%3A%0AThe%20workflow%20that%20costs%20us%20most%3A%0ASystems%20we%20run%20(ERP%2FTMS%2FWMS)%3A";

export const CONTACT_EMAIL = "contact@instiveai.com";

// ─── Brand definition ────────────────────────────────────────────────────────
export const BRAND = {
  parts: ["Instinct", "Initiative"],
  meaning: "Instinct, paired with the initiative to act.",
  body:
    "Instive AI reads what your systems already know, senses what is about to go wrong, and moves first. The instinct to see it coming. The initiative to act before it costs you.",
};

// ─── Solutions explorer (by business problem) ────────────────────────────────
export type Solution = {
  id: string;
  title: string;
  short: string;
  domain: string;
  accent: string;
  icon: string;
  agents: string[];
  problem: string;
  impact: string;
  solution: string;
  outcome: string;
  metrics: { value: string; label: string }[];
};

export const SOLUTIONS: Solution[] = [
  {
    id: "invoice-audits",
    title: "Eliminate manual invoice audits",
    short: "Audit every freight bill against contract and draft the dispute.",
    domain: "Billing and audit",
    accent: SIDECAR_META["Invoice Auditor"].accent,
    icon: "audit",
    agents: ["Audra"],
    problem:
      "Freight bills get spot-checked, not audited. A surcharge over contract or an overstated weight slips through because nobody has time to read all of them.",
    impact:
      "Recoverable dollars age out past the dispute window every month, and the leak stays invisible until year end.",
    solution:
      "An agent reads every bill against the contract and drafts the dispute, so recovery is a one tap send.",
    outcome:
      "65% less time on audits. Up to $96K recoverable in a single month. 88% dispute win rate.",
    metrics: [
      { value: "65%", label: "less time on audits" },
      { value: "$96K", label: "recoverable per month" },
      { value: "88%", label: "dispute win rate" },
    ],
  },
  {
    id: "carrier-slips",
    title: "Catch carrier slips before the client does",
    short: "Score every carrier and lane, and flag the slide weeks early.",
    domain: "Carrier and route",
    accent: SIDECAR_META["Carrier Intelligence"].accent,
    icon: "carrier",
    agents: ["Orla"],
    problem:
      "A carrier starts sliding on a new lane. You find out when the client complains, three weeks too late.",
    impact: "SLA penalties, lost renewals, and firefighting that pulls the team off everything else.",
    solution:
      "Every carrier and lane is scored continuously, so the slide is flagged early with a rebalancing plan attached.",
    outcome: "93.8% network on-time. Sliding carriers caught before they touch an SLA.",
    metrics: [
      { value: "93.8%", label: "network on-time" },
      { value: "3 to 4 wks", label: "earlier warning" },
    ],
  },
  {
    id: "stockouts",
    title: "Prevent stockouts and dead stock",
    short: "Forecast demand across every SKU and flag climbers in time.",
    domain: "Demand and inventory",
    accent: SIDECAR_META["Demand Forecasting"].accent,
    icon: "forecast",
    agents: ["Mira"],
    problem: "Reorders run on a fixed cycle. Fast climbers stock out while slow movers tie up the warehouse.",
    impact: "Lost sales on one end, working capital frozen on the other.",
    solution:
      "Demand is forecast across every SKU and zone, and climbers are flagged before they cross the reorder point.",
    outcome: "91.6% forecast accuracy. Around 24% fewer stockouts and 20% less overstock in 90 days.",
    metrics: [
      { value: "91.6%", label: "forecast accuracy" },
      { value: "~24%", label: "fewer stockouts" },
      { value: "~20%", label: "less overstock" },
    ],
  },
  {
    id: "labor",
    title: "Staff to tomorrow's volume",
    short: "Size the crew from the throughput forecast, ahead of the surge.",
    domain: "Warehouse and labor",
    accent: SIDECAR_META["Labor Planning"].accent,
    icon: "labor",
    agents: ["Tala"],
    problem: "Crews are sized off last week's gut feel. The afternoon surge hits and cut-offs get missed.",
    impact: "Overtime when it is slow, missed client cut-offs when it is busy.",
    solution:
      "Tomorrow's crew is sized from the same throughput forecast your client metrics already run on.",
    outcome: "99.1% on-time ship rate. Surges staffed ahead, not after the miss.",
    metrics: [
      { value: "99.1%", label: "on-time ship rate" },
      { value: "9 / 9", label: "client cut-offs met" },
    ],
  },
  {
    id: "returns",
    title: "Recover value from returns",
    short: "Read condition and lot, suggest disposition, your team confirms.",
    domain: "Reverse logistics",
    accent: SIDECAR_META["Returns Intelligence"].accent,
    icon: "returns",
    agents: ["Echo"],
    problem: "Returns pile up in a triage queue. By the time a person gets to a unit, the resale window is closing.",
    impact: "Sellable goods written off, restock lag measured in days.",
    solution:
      "Reason, lot code and condition are read automatically, disposition is suggested, and your team confirms each.",
    outcome: "62% back to sellable. Processing time cut in half. Restock lag from 3.4 days to 1.6.",
    metrics: [
      { value: "62%", label: "back to sellable" },
      { value: "50%", label: "faster triage" },
      { value: "1.6 days", label: "restock lag" },
    ],
  },
  {
    id: "reporting",
    title: "Kill the manual client report",
    short: "Build every client report from one live source, no exports.",
    domain: "Visibility and reporting",
    accent: SIDECAR_META["Client Reporting"].accent,
    icon: "report",
    agents: [],
    problem: "Every client report is a manual spreadsheet pull. The numbers are stale before they are sent.",
    impact: "Analyst hours burned weekly, and the client sees a different number than the floor.",
    solution: "Every report is built from the same live data the operation runs on.",
    outcome: "98.4% fill rate reported live. Zero manual exports. One number, floor to client.",
    metrics: [
      { value: "98.4%", label: "fill rate, live" },
      { value: "0", label: "manual exports" },
    ],
  },
];

export const solutionBySlug = (slug: string) => SOLUTIONS.find((s) => s.id === slug);

// ─── Industries ──────────────────────────────────────────────────────────────
export type Industry = {
  slug: string;
  name: string;
  line: string;
  headline: string;
  intro: string;
  pains: string[];
  solutionIds: string[];
  stat: { big: string; label: string };
  accent: string;
  icon: string;
  image: string;
  alt: string;
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    line: "Inbound parts, supplier performance and line demand, watched before a line goes idle.",
    headline: "Keep the line running.",
    intro:
      "Inbound parts, supplier performance and production demand, watched together, so a shortage or a slipping supplier never idles a line.",
    pains: [
      "A late inbound part stalls a whole production run",
      "Supplier performance only gets reviewed after a miss",
      "Demand swings hit the line before planning sees them",
      "Spend is scattered across suppliers with no live view",
    ],
    solutionIds: ["stockouts", "carrier-slips", "invoice-audits"],
    stat: { big: "99.2%", label: "forecast and on-time accuracy" },
    accent: "#FFB23E",
    icon: "factory",
    image: "/images/warehouse_demand_planning.jpg",
    alt: "Operator reviewing a demand forecast on the floor of a manufacturing facility",
  },
  {
    slug: "distribution",
    name: "Distribution",
    line: "Multi-brand inventory, fill rate and client reporting from one live source.",
    headline: "One source of truth, every brand.",
    intro:
      "Multi-brand inventory, fill rate and client reporting built from one live feed, so every client sees the same number the floor does.",
    pains: [
      "Client reports are pulled by hand every week",
      "Fill rate is known only after the fact",
      "Inventory health is buried across brands",
      "Returns get handled off to the side",
    ],
    solutionIds: ["reporting", "stockouts", "returns"],
    stat: { big: "98.4%", label: "fill rate reported live" },
    accent: "#06b6d4",
    icon: "boxes",
    image: "/images/logistics.jpg",
    alt: "Distribution yard at night with containers and light trails",
  },
  {
    slug: "retail",
    name: "Retail",
    line: "Demand by SKU and store, reorder timing, and value recovered from returns.",
    headline: "Stock what sells, recover what comes back.",
    intro:
      "Demand by SKU and store, reorder timing, and value recovered from returns, so shelves stay full and write-offs shrink.",
    pains: [
      "Stockouts on fast movers, overstock on slow ones",
      "Reorder timing is a guess",
      "Returns pile up and lose value",
      "No store-level demand signal",
    ],
    solutionIds: ["stockouts", "returns", "reporting"],
    stat: { big: "~24%", label: "fewer stockouts" },
    accent: "#f97316",
    icon: "store",
    image: "/images/warehouse_demand_planning.jpg",
    alt: "Warehouse demand planning display used for retail replenishment",
  },
  {
    slug: "logistics-providers",
    name: "Logistics providers",
    line: "Carrier scorecards, freight audits and live exception tracking across every lane.",
    headline: "Every lane scored, every bill audited.",
    intro:
      "Carrier scorecards, freight-bill audits and live exception tracking across every lane, so a slip is caught before it reaches a client.",
    pains: [
      "Carrier slips surface as client complaints",
      "Freight bills are spot-checked, not audited",
      "Exceptions are found too late to fix",
      "Detention and accessorials age out uncaptured",
    ],
    solutionIds: ["carrier-slips", "invoice-audits", "reporting"],
    stat: { big: "93.8%", label: "network on-time" },
    accent: "#3b82f6",
    icon: "truck",
    image: "/images/logistics.jpg",
    alt: "Container port at night with trucks tracing light trails through the yard",
  },
  {
    slug: "warehousing",
    name: "Warehousing and fulfillment",
    line: "Labor sized to tomorrow's volume, with cut-offs met instead of missed.",
    headline: "Staff to tomorrow, not last week.",
    intro:
      "Labor sized to forecasted volume and throughput that holds through the surge, so client cut-offs get met.",
    pains: [
      "Crews are sized off last week's gut feel",
      "The afternoon surge misses cut-offs",
      "Overtime piles up when it is slow",
      "Throughput dips go unnoticed until they cost a client",
    ],
    solutionIds: ["labor", "stockouts", "reporting"],
    stat: { big: "99.1%", label: "on-time ship rate" },
    accent: "#10b981",
    icon: "warehouse",
    image: "/images/warehouse_demand_planning.jpg",
    alt: "Fulfillment operator monitoring throughput on the warehouse floor",
  },
  {
    slug: "supply-chain-teams",
    name: "Supply chain teams",
    line: "One source of truth across procurement, transport and inventory.",
    headline: "See and act across the whole chain.",
    intro:
      "One control tower across procurement, transport and inventory, with an agent watching all three at once.",
    pains: [
      "Signals are scattered across systems",
      "There is no single view of risk",
      "Manual reporting eats the week",
      "Problems are found after they cost money",
    ],
    solutionIds: ["carrier-slips", "stockouts", "invoice-audits"],
    stat: { big: "2,000+", label: "exceptions caught monthly" },
    accent: "#8b5cf6",
    icon: "team",
    image: "/images/logistics.jpg",
    alt: "Global supply chain network seen across a port at night",
  },
];

export const industryBySlug = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);

// ─── Navigation ──────────────────────────────────────────────────────────────
export const SOLUTION_LINKS = SOLUTIONS.map((s) => ({
  label: s.title,
  sub: s.domain,
  href: `/solutions/${s.id}`,
  icon: s.icon,
  accent: s.accent,
}));

export const INDUSTRY_LINKS = INDUSTRIES.map((i) => ({
  label: i.name,
  sub: i.line,
  href: `/industries/${i.slug}`,
  icon: i.icon,
  accent: i.accent,
}));

export const RESOURCE_LINKS = [
  { label: "Case studies", sub: "Illustrative scenarios and recovery", href: "/case-studies", icon: "chart", accent: "#FFB23E" },
  { label: "Mockups showcase", sub: "See it built on a real operation's data shape", href: "/mockups", icon: "boxes", accent: "#5BD6A6" },
  { label: "FAQ and perspectives", sub: "Common questions and views from the floor", href: "/faq", icon: "report", accent: "#3b82f6" },
];

export type NavItem =
  | { label: string; href: string }
  | { label: string; menu: { label: string; sub: string; href: string; icon: string; accent: string }[]; cols?: number };

export const NAV_MENU: NavItem[] = [
  { label: "Solutions", menu: SOLUTION_LINKS, cols: 2 },
  { label: "Industries", menu: INDUSTRY_LINKS, cols: 2 },
  { label: "Resources", menu: RESOURCE_LINKS, cols: 1 },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Solutions",
    links: SOLUTIONS.map((s) => ({ label: s.title, href: `/solutions/${s.id}` })),
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Mockups", href: "/mockups" },
      { label: "Book a demo", href: BOOK_CALL },
    ],
  },
];

// ─── Functions grid ("AI solutions for ...") ─────────────────────────────────
export const FUNCTIONS: { name: string; line: string; icon: string; href: string }[] = [
  { name: "Procurement", line: "Faster sourcing, continuous supplier scoring, and spend visibility without the manual chase.", icon: "plug", href: "/solutions/invoice-audits" },
  { name: "Logistics", line: "Routes optimized continuously and exceptions caught before they reach the customer.", icon: "truck", href: "/solutions/carrier-slips" },
  { name: "Warehousing", line: "Crews sized to tomorrow's volume and throughput that holds through the surge.", icon: "warehouse", href: "/solutions/labor" },
  { name: "Distribution", line: "Live inventory health and client reporting built from one source, every brand.", icon: "boxes", href: "/solutions/reporting" },
  { name: "Manufacturing", line: "Inbound parts, supplier performance, and line demand watched before a line goes idle.", icon: "factory", href: "/industries/manufacturing" },
  { name: "Supply chain intelligence", line: "One control tower across every link, with an agent watching all of it at once.", icon: "chart", href: "/industries/supply-chain-teams" },
];

// ─── Image feature rows ──────────────────────────────────────────────────────
export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  alt: string;
  label: string;
  variant: "ui" | "photo" | "bare";
  accent: string;
  href: string;
};

export const FEATURES: Feature[] = [
  {
    id: "exceptions",
    eyebrow: "Exception management",
    title: "See every exception before it escalates.",
    body: "Delay, damage, and documentation risk surface the moment the data shifts, not when the customer calls. Every flag carries the reason and the recommended next move.",
    bullets: [
      "Delay, damage and documentation risk flagged early",
      "AI insight recommends the next action, with one tap to act",
      "One live view across every shipment and lane",
    ],
    image: "/images/Route_optimization_Instive.png",
    alt: "Exception management view: active exceptions, an at-risk shipment on a long-haul lane, and an AI insight flagging delay risk",
    label: "",
    variant: "bare",
    accent: "#FF6B5E",
    href: "/solutions/carrier-slips",
  },
  {
    id: "optimization",
    eyebrow: "Logistics optimization",
    title: "Optimize every route, automatically.",
    body: "Instive re-plans routes as conditions change, not once a quarter. It trims distance and fuel on every lane while holding service levels where they need to be.",
    bullets: [
      "Routes re-planned continuously as conditions change",
      "Cost, distance and fuel saved on every lane",
      "Lower emissions without lower service",
    ],
    image: "/images/Logistics_optimization_instive.png",
    alt: "Logistics optimization view showing an optimized route network with cost, distance, fuel and CO2 savings",
    label: "",
    variant: "bare",
    accent: "#5BD6A6",
    href: "/solutions/carrier-slips",
  },
  {
    id: "demand",
    eyebrow: "Demand planning",
    title: "Plan demand with confidence.",
    body: "Forecasts run across every SKU and zone, so a climbing item gets reordered before it stocks out and dead stock stops holding space hostage.",
    bullets: [
      "Demand forecast across every SKU and storage zone",
      "Reorder before the climb becomes a stockout",
      "Free the space that slow movers tie up",
    ],
    image: "/images/warehouse_demand_planning.jpg",
    alt: "Warehouse operator reviewing a holographic demand forecast display on the floor",
    label: "",
    variant: "bare",
    accent: "#FFB23E",
    href: "/solutions/stockouts",
  },
];

// ─── Platform (modern AI stack) — recreated as an interactive component ───────
export const PLATFORM = {
  eyebrow: "The platform",
  title: "Built on a modern AI stack.",
  body: "Your data flows from the systems you already run, through ingestion and a governed data platform, into models that forecast, optimize and detect. The output lands where your team works: dashboards, alerts, automation, and your existing tools.",
  stages: [
    {
      key: "sources",
      title: "Data sources",
      icon: "plug",
      items: [
        { t: "ERP", icon: "boxes" },
        { t: "WMS", icon: "warehouse" },
        { t: "TMS", icon: "truck" },
        { t: "IoT devices", icon: "bolt" },
        { t: "External APIs", icon: "plug" },
        { t: "Spreadsheets", icon: "report" },
      ],
      highlight: false,
    },
    {
      key: "ingestion",
      title: "Ingestion",
      icon: "bolt",
      items: [{ t: "Real-time stream" }, { t: "Batch loads" }, { t: "Schema mapping" }],
      highlight: false,
    },
    {
      key: "platform",
      title: "Data platform",
      icon: "database",
      items: [{ t: "Governed data lake" }, { t: "Unified model" }, { t: "Lineage" }],
      highlight: true,
    },
    {
      key: "ai",
      title: "AI and ML",
      icon: "brain",
      items: [{ t: "Forecasting" }, { t: "Optimization" }, { t: "Anomaly detection" }, { t: "NLP and GenAI" }],
      highlight: false,
    },
    {
      key: "apps",
      title: "Applications",
      icon: "report",
      items: [{ t: "Dashboards" }, { t: "Alerts" }, { t: "Automation" }, { t: "Integrations" }],
      highlight: false,
    },
  ] as { key: string; title: string; icon: string; items: { t: string; icon?: string }[]; highlight: boolean }[],
  governance: ["Role-based access", "Encryption in transit and at rest", "Full audit logs", "SOC 2, ISO 27001, GDPR"],
};

// ─── Vision (agency today, platform tomorrow) ────────────────────────────────
export const VISION = {
  eyebrow: "Where we are going",
  title: "From a partner that builds your AI to the platform your industry runs on.",
  body: "Today we design and deploy AI inside your operation, tuned to how you actually run. The direction is bigger: one intelligence layer that any supply chain team can switch on.",
  phases: [
    { tag: "Today", title: "Build", body: "Custom AI agents, designed around your data and deployed inside your operation in weeks." },
    { tag: "Next", title: "Connect", body: "Every agent feeding one control tower, so the whole operation sees and acts as one." },
    { tag: "Ahead", title: "Platform", body: "Self-serve intelligence any team can turn on, priced to the value it returns." },
  ],
  image: "/images/logistics.jpg",
  alt: "Container port at night with trucks tracing amber light trails through the yard",
};

// ─── Industries (legacy short list kept for home grid) ───────────────────────
// (Home grid + nav both read from INDUSTRIES above.)

// ─── Results band ────────────────────────────────────────────────────────────
// Industry-wide figures (not Instive's own) that frame the opportunity.
export type Stat = { value: number; prefix?: string; suffix?: string; label: string };
export const RESULTS: Stat[] = [
  { value: 30, suffix: "%", label: "of freight invoices carry billing errors" },
  { value: 1.8, prefix: "$", suffix: "T", label: "tied up globally in excess and out of stock inventory" },
  { value: 40, suffix: "%", label: "logistics cost reduction achievable with AI optimization" },
  { value: 8, suffix: "%", label: "of revenue lost on average to supply chain inefficiency" },
];

// ─── Process ─────────────────────────────────────────────────────────────────
export const PROCESS: { step: string; tag: string; title: string; body: string }[] = [
  { step: "01", tag: "30 MIN", title: "Discovery", body: "A short call. You show us the one workflow that costs you most. We listen for the signal you keep missing." },
  { step: "02", tag: "DAYS", title: "Working prototype", body: "We build on your actual data, so you see your operation with intelligence on top, not a generic demo." },
  { step: "03", tag: "WEEKS", title: "Pilot", body: "Live on one workflow, measured against your current baseline. The value shows up in the first cycle." },
  { step: "04", tag: "SCALE", title: "Roll out", body: "One standard across every site and lane, while your team keeps running the operation." },
];

// ─── Case studies ────────────────────────────────────────────────────────────
export type CaseStudy = {
  company: string;
  industry: string;
  tag: string;
  accent: string;
  before: string;
  after: string;
  metricBig: string;
  metricLabel: string;
  proof: string;
  href: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Air-Sea Forwarders",
    industry: "Freight forwarding, air and ocean",
    tag: "Billing audit",
    accent: SIDECAR_META["Invoice Auditor"].accent,
    before: "Air and ocean invoices were spot-checked branch by branch, and overcharges slipped through across all 10 offices.",
    after: "Every bill is now audited against the quote on one standard network wide, with disputes drafted automatically.",
    metricBig: "$96.2K",
    metricLabel: "recoverable, month to date",
    proof: "2,910 invoices audited this month. 10 of 10 branches on one standard.",
    href: "/air-sea-forwarders",
  },
  {
    company: "READY-2-XECUTE",
    industry: "3PL, managed transportation",
    tag: "Carrier control",
    accent: SIDECAR_META["Carrier Intelligence"].accent,
    before: "Carrier slips surfaced as client complaints, weeks after the service had already degraded.",
    after: "68 carriers are scored continuously, so a sliding carrier is flagged early with a rebalancing plan.",
    metricBig: "3 to 4 wks",
    metricLabel: "earlier warning on a sliding carrier",
    proof: "93.8% network on-time. 3 carriers caught before they touched an SLA.",
    href: "/ready-2-xecute",
  },
  {
    company: "Paris Brothers",
    industry: "Food and beverage, temperature controlled",
    tag: "Demand planning",
    accent: SIDECAR_META["Demand Forecasting"].accent,
    before: "Reorders ran on a fixed cycle. Fast climbers stocked out while slow movers tied up cooler space.",
    after: "Demand is forecast across 3,420 SKUs and every temperature zone, with climbers flagged before the reorder point.",
    metricBig: "91.6%",
    metricLabel: "forecast accuracy across 3,420 SKUs",
    proof: "Targeting around 24% fewer stockouts and 20% less overstock in 90 days.",
    href: "/paris-brothers",
  },
];

// ─── Perspectives (generic industry sentiment, not attributed to clients) ────
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote: "Most teams audit a fraction of their freight bills. The overcharges in the rest quietly age out every month. Reading all of them is exactly the work software should be doing.",
    name: "VP, Supply Chain",
    role: "Distribution",
  },
  {
    quote: "The expensive carrier problems are the ones you find out about from the customer. Catching the slide a few weeks earlier changes the whole conversation.",
    name: "Director of Operations",
    role: "3PL and managed transport",
  },
  {
    quote: "Forecasting on a fixed cycle means you are always a little early on the slow movers and a little late on the climbers. Closing that gap frees real working capital.",
    name: "Head of Planning",
    role: "Manufacturing",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Do you replace our ERP, TMS or WMS?",
    a: "No. Our agents ride alongside the systems you already run. They read the data those systems produce and act on it, so there is nothing to rip out and nothing to migrate.",
  },
  {
    q: "How does it connect to our systems?",
    a: "Through an API where one exists, across ERP, TMS, WMS and most logistics tools, or a flat file export if that is simpler. Read-only to start.",
  },
  {
    q: "What if the AI gets it wrong?",
    a: "Anything that moves money or inventory waits for your team to confirm. Every decision shows its reasoning in a full audit trail, so it is defensible with a client, a carrier or an auditor.",
  },
  {
    q: "How fast do we see value?",
    a: "A working prototype on your data in days, a live pilot on one workflow in weeks, and measurable return in the first cycle. Not a nine month transformation.",
  },
  {
    q: "Is our data secure?",
    a: "Your data stays in your environment where possible, with least-privilege access. We do not train shared models on it. The platform runs to SOC 2, ISO 27001 and GDPR.",
  },
  {
    q: "Why act now and not next year?",
    a: "The data already exists in your systems. The cost is the human hours nobody has to read it. Every month you wait is recoverable margin left on the table.",
  },
];

// ─── Named agents (the /services page) ───────────────────────────────────────
export type Agent = {
  name: string;
  domain: string;
  job: string;
  pain: string;
  outcome: string;
  accent: string;
  icon: string;
  href?: string;
};

export const AGENTS: Agent[] = [
  { name: "Mira", domain: "Demand and inventory", job: "Forecasts demand and reorder timing across every SKU and zone.", pain: "Catches climbers before they stock out and frees the space dead stock is holding.", outcome: "91.6% forecast accuracy. Around 24% fewer stockouts.", accent: SIDECAR_META["Demand Forecasting"].accent, icon: "forecast", href: "/paris-brothers" },
  { name: "Orla", domain: "Carrier and route control", job: "Scores every carrier and watches every lane for the slip before it reaches a customer.", pain: "Flags a sliding carrier 3 to 4 weeks before it becomes a client complaint.", outcome: "93.8% network on-time. Exceptions caught weeks early.", accent: SIDECAR_META["Carrier Intelligence"].accent, icon: "carrier", href: "/ready-2-xecute" },
  { name: "Audra", domain: "Freight billing audit", job: "Audits every freight bill against contract and drafts the dispute.", pain: "Stops surcharges and overstated weights from slipping past the dispute window.", outcome: "Up to $96K recoverable a month. 88% dispute win rate.", accent: SIDECAR_META["Invoice Auditor"].accent, icon: "audit", href: "/air-sea-forwarders" },
  { name: "Tala", domain: "Warehouse and labor", job: "Sizes tomorrow's crew from the volume forecast.", pain: "Staffs the surge ahead of it, so cut-offs are met instead of missed.", outcome: "99.1% on-time ship rate. Surges staffed ahead.", accent: SIDECAR_META["Labor Planning"].accent, icon: "labor", href: "/exe-logistics" },
  { name: "Sona", domain: "Procurement and supplier", job: "Speeds sourcing and scores supplier performance continuously.", pain: "Cuts approval cycle time and surfaces a slipping supplier before it bites.", outcome: "38% faster procurement approvals.", accent: "#06b6d4", icon: "plug" },
  { name: "Echo", domain: "Returns and reverse", job: "Suggests disposition for every return while your team confirms.", pain: "Gets sellable goods back on the shelf before the resale window closes.", outcome: "62% back to sellable. Processing time cut in half.", accent: SIDECAR_META["Returns Intelligence"].accent, icon: "returns", href: "/safeway-logistics" },
];

export const agentByName = (name: string) => AGENTS.find((a) => a.name === name);
