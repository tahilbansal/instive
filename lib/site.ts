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

// ─── Customer segments (by who you are in the chain) ─────────────────────────
// A third way in, alongside Solutions (by problem) and Industries. Each segment
// carries the "automation in action" flows that power the scroll diagram.
export type FlowStage = { label: string; sub: string; icon: string; tone?: "warning" | "positive" };
/** A conditional path that forks off the end of the linear spine. */
export type FlowBranch = { condition: string; tone: "warning" | "positive"; stages: FlowStage[] };
export type UseCase = {
  id: string;
  title: string;
  tagline: string;
  /** The linear spine, input to extract to validate. */
  flow: FlowStage[];
  /** Optional fork after the spine (e.g. passed vs missing info). Expects 2 branches. */
  branches?: FlowBranch[];
  metric: { value: string; label: string };
  /** Cross-link to an existing /solutions/[id] where one fits. */
  solutionId?: string;
};
export type Segment = {
  slug: string;
  name: string;
  line: string;
  headline: string;
  intro: string;
  pains: string[];
  useCases: UseCase[];
  solutionIds: string[];
  stat: { big: string; label: string };
  accent: string;
  icon: string;
  image: string;
  alt: string;
};

export const SEGMENTS: Segment[] = [
  {
    slug: "freight-forwarders",
    name: "Freight forwarders",
    line: "Documents read and filed, carriers scored, client reports built from one live feed.",
    headline: "From quote to shipment, without the data entry.",
    intro:
      "Forwarding still runs on emails, PDFs and rekeying. Instive reads the documents, watches every carrier and lane, and builds the client report, so your team orchestrates the shipment instead of retyping it.",
    pains: [
      "Bookings, arrival notices and invoices are rekeyed by hand",
      "A slipping carrier surfaces as a client complaint, weeks late",
      "Every client report is a manual export that is stale on arrival",
      "Volume grows, so headcount has to grow with it",
    ],
    useCases: [
      {
        id: "quote-automation",
        title: "Quote automation",
        tagline:
          "An RFQ lands as an email or a spreadsheet. An agent reads the lanes and cargo, rates them against your tariffs, and drafts the quote ready to send.",
        flow: [
          { label: "RFQ arrives", sub: "Email, PDF or spreadsheet", icon: "doc" },
          { label: "Extract lanes and cargo", sub: "Origin, destination, weight, mode", icon: "brain" },
          { label: "Rate against tariffs", sub: "Your contracts and buy rates", icon: "chart" },
          { label: "Quote drafted", sub: "Ready to review and send", icon: "draft" },
        ],
        metric: { value: "Minutes", label: "from RFQ to a drafted quote" },
      },
      {
        id: "shipment-creation",
        title: "Shipment creation",
        tagline:
          "A booking confirmation is read into a shipment, validated against the booking, and created in your TMS with no rekeying.",
        flow: [
          { label: "Booking confirmation", sub: "From shipper or origin agent", icon: "doc" },
          { label: "Extract parties and cargo", sub: "Consignee, HS, weights, refs", icon: "brain" },
          { label: "Validate against booking", sub: "Mismatch and missing data caught", icon: "check" },
          { label: "Shipment created in TMS", sub: "Clean and structured", icon: "plug" },
        ],
        metric: { value: "100%", label: "of shipments created touchless" },
      },
      {
        id: "isf-compliance",
        title: "ISF filing and compliance workflows",
        tagline:
          "Documents are read, the data is extracted and validated, then the flow forks: a clean filing goes straight to ABI, and a gap routes to a person before anything files.",
        flow: [
          { label: "Documents arrive", sub: "ISF, commercial invoice, packing list", icon: "doc" },
          { label: "Extract the data", sub: "Parties, tariff, bond details", icon: "brain" },
          { label: "Validate the data", sub: "Against ISF and compliance rules", icon: "shield" },
        ],
        branches: [
          {
            condition: "Passed",
            tone: "positive",
            stages: [
              { label: "Submit into ABI", sub: "Filed with customs", icon: "plug" },
              { label: "Filed on time", sub: "Inside the window", icon: "check" },
            ],
          },
          {
            condition: "Missing info",
            tone: "warning",
            stages: [
              { label: "Alert raised", sub: "The exact gap, flagged", icon: "bolt", tone: "warning" },
              { label: "Human exception handling", sub: "A person resolves it", icon: "human" },
            ],
          },
        ],
        metric: { value: "On time", label: "ISF filings, gaps caught first" },
      },
      {
        id: "consolidations",
        title: "Consolidations and shipment management",
        tagline:
          "House shipments are grouped by port and sailing, built into a consolidation, and the master bill is drafted automatically.",
        flow: [
          { label: "House shipments in", sub: "Across shippers and lanes", icon: "layers" },
          { label: "Group by port and ETD", sub: "Same sailing, same box", icon: "boxes" },
          { label: "Build the consolidation", sub: "Weights and volumes rolled up", icon: "check" },
          { label: "Master bill drafted", sub: "Ready to review", icon: "draft" },
        ],
        metric: { value: "Auto", label: "consolidation build and MBL draft" },
      },
      {
        id: "document-processing",
        title: "Document processing",
        tagline:
          "Every inbound email and PDF is read, extracted, validated and posted to your TMS, so only the true edge cases reach a person.",
        flow: [
          { label: "Email and PDF arrive", sub: "Arrival notices, invoices, docs", icon: "doc" },
          { label: "AI extracts the fields", sub: "Parties, charges, references", icon: "brain" },
          { label: "Validate and post to TMS", sub: "Clean, structured, no rekeying", icon: "check" },
          { label: "Exception flagged", sub: "Only edge cases reach a person", icon: "bolt" },
        ],
        metric: { value: "2,000 hrs", label: "of data entry removed a month" },
      },
      {
        id: "operational-follow-ups",
        title: "Operational follow-ups",
        tagline:
          "Milestones are tracked across every shipment, a missing document or update is detected, and the follow-up is drafted and sent for you.",
        flow: [
          { label: "Milestones tracked", sub: "Across every shipment and lane", icon: "trail" },
          { label: "Missing doc or update", sub: "Detected the moment it is due", icon: "bolt" },
          { label: "Follow-up drafted", sub: "To the right party", icon: "draft" },
          { label: "Sent and logged", sub: "Nothing falls through", icon: "check" },
        ],
        metric: { value: "0", label: "follow-ups forgotten" },
        solutionId: "carrier-slips",
      },
    ],
    solutionIds: ["carrier-slips", "reporting", "invoice-audits"],
    stat: { big: "2,000+", label: "hours of document work removed a month" },
    accent: "#3b82f6",
    icon: "layers",
    image: "/images/logistics.jpg",
    alt: "Freight forwarding operation seen across a container port at night with light trails",
  },
  {
    slug: "customs-brokers",
    name: "Customs brokers",
    line: "Entry data extracted, classifications checked, freight and duty bills audited.",
    headline: "Keep trade moving, off the manual keyboard.",
    intro:
      "Brokerage keeps global trade moving, but too much of it still runs on rekeying commercial invoices and packing lists. Instive extracts the entry data, checks the classification, and audits the bill, with your broker confirming every filing.",
    pains: [
      "Commercial invoices and packing lists are keyed line by line",
      "Classification and compliance checks depend on who is on shift",
      "PSC risk is found after the entry is filed, not before",
      "Freight and duty overcharges age out uncaught",
    ],
    useCases: [
      {
        id: "customs-entry-creation",
        title: "Customs entry creation",
        tagline:
          "Commercial invoices and packing lists are read into line items with HS codes, validated against the tariff, and drafted into the entry for your broker to confirm.",
        flow: [
          { label: "Invoice and packing list", sub: "PDF, scan or email", icon: "doc" },
          { label: "Extract line items and HTS", sub: "Values, quantities, origins", icon: "brain" },
          { label: "Validate the classification", sub: "Against the tariff and rules", icon: "shield" },
          { label: "Draft the entry (7501)", sub: "Ready for review", icon: "draft" },
          { label: "Broker confirms", sub: "Nothing files without a person", icon: "human" },
        ],
        metric: { value: "70%", label: "less time to a filed entry" },
      },
      {
        id: "isf-filings",
        title: "ISF filings",
        tagline:
          "ISF data is assembled and validated, then the flow forks: a clean filing goes straight to ABI, and a gap routes to a person before anything files.",
        flow: [
          { label: "ISF data assembled", sub: "Across the shipment documents", icon: "layers" },
          { label: "Validate the data", sub: "Against ISF and compliance rules", icon: "shield" },
        ],
        branches: [
          {
            condition: "Passed",
            tone: "positive",
            stages: [
              { label: "Submit into ABI", sub: "Filed with customs", icon: "plug" },
              { label: "Filed on time", sub: "Inside the window", icon: "check" },
            ],
          },
          {
            condition: "Missing info",
            tone: "warning",
            stages: [
              { label: "Alert raised", sub: "The exact gap, flagged", icon: "bolt", tone: "warning" },
              { label: "Human exception handling", sub: "A person resolves it", icon: "human" },
            ],
          },
        ],
        metric: { value: "On time", label: "ISF filings, gaps caught first" },
      },
      {
        id: "customs-entry-audits",
        title: "Customs entry audits",
        tagline:
          "Filed entries are re-checked against the invoice and tariff, and any duty or classification error is flagged and drafted into a correction.",
        flow: [
          { label: "Filed entries", sub: "Every entry, not a sample", icon: "audit" },
          { label: "Recheck duty and HTS", sub: "Against invoice and tariff", icon: "check" },
          { label: "Flag the discrepancy", sub: "Over or under declared", icon: "bolt" },
          { label: "Correction drafted", sub: "Ready to review", icon: "draft" },
        ],
        metric: { value: "100%", label: "of entries re-audited" },
        solutionId: "invoice-audits",
      },
      {
        id: "post-summary-corrections",
        title: "Post Summary Corrections (PSC)",
        tagline:
          "An error found after filing is surfaced with its reason, the PSC is drafted with the corrected data, and it files back to customs.",
        flow: [
          { label: "Entry data reviewed", sub: "After the summary is filed", icon: "layers" },
          { label: "Detect the error", sub: "Duty, value, classification", icon: "bolt" },
          { label: "Draft the PSC", sub: "With the corrected data", icon: "draft" },
          { label: "File the correction", sub: "Back to customs", icon: "plug" },
        ],
        metric: { value: "Early", label: "PSC risk caught, not missed" },
      },
      {
        id: "duty-drawback",
        title: "Duty drawback claims",
        tagline:
          "Import and export records are matched for drawback eligibility, the claim is assembled, and the recoverable duty is surfaced.",
        flow: [
          { label: "Import and export records", sub: "Matched in one view", icon: "database" },
          { label: "Match for eligibility", sub: "Substitution and direct ID", icon: "check" },
          { label: "Assemble the claim", sub: "With supporting docs", icon: "draft" },
          { label: "Recover the duty", sub: "Money back on exports", icon: "arrow" },
        ],
        metric: { value: "Recovered", label: "duty that would age out" },
      },
    ],
    solutionIds: ["invoice-audits", "reporting", "carrier-slips"],
    stat: { big: "100%", label: "of entries rule-checked before filing" },
    accent: "#8b5cf6",
    icon: "shield",
    image: "/images/logistics.jpg",
    alt: "Customs and compliance documentation flowing through a global trade gateway at night",
  },
  {
    slug: "shippers-importers",
    name: "Shippers and importers",
    line: "POs consolidated, invoices validated and three-way matched, customs docs filed clean.",
    headline: "Every PO, invoice and filing, matched and clean.",
    intro:
      "Shippers and importers run on POs, invoices and customs paperwork that still move by hand. Instive consolidates the POs, validates and three-way matches every invoice, and files the customs documents, so exceptions are the only thing that reaches your team.",
    pains: [
      "POs are consolidated into shipments by hand",
      "Invoices are matched to POs and receipts line by line",
      "A billing error slips through because nobody reads them all",
      "Customs paperwork is rekeyed against a filing deadline",
    ],
    useCases: [
      {
        id: "po-consolidation",
        title: "PO consolidation",
        tagline:
          "Purchase orders are read, grouped by vendor and port, and consolidated into shipments with the booking drafted for you.",
        flow: [
          { label: "Purchase orders arrive", sub: "From your ERP or email", icon: "doc" },
          { label: "Group by vendor and port", sub: "Same origin, same window", icon: "layers" },
          { label: "Consolidate into a shipment", sub: "Quantities and cube rolled up", icon: "boxes" },
          { label: "Booking drafted", sub: "Ready to place", icon: "draft" },
        ],
        metric: { value: "Minutes", label: "to a consolidated booking" },
      },
      {
        id: "invoice-validation",
        title: "Invoice validation",
        tagline:
          "Every commercial and freight invoice is validated against the PO and contract, and any discrepancy is flagged and drafted for approval or dispute.",
        flow: [
          { label: "Commercial or freight invoice", sub: "Every line, every file", icon: "audit" },
          { label: "Validate vs PO and contract", sub: "Price, quantity, terms", icon: "check" },
          { label: "Flag the discrepancy", sub: "Over-bills and errors", icon: "bolt" },
          { label: "Approve or dispute", sub: "Drafted either way", icon: "draft" },
        ],
        metric: { value: "88%", label: "invoice dispute win rate" },
        solutionId: "invoice-audits",
      },
      {
        id: "three-way-matching",
        title: "Three-way matching",
        tagline:
          "The PO, the receipt and the invoice are matched together, then the flow forks: a clean match clears for payment, a mismatch holds and routes to a person.",
        flow: [
          { label: "PO, receipt and invoice", sub: "Pulled into one view", icon: "layers" },
          { label: "Match all three", sub: "Price, quantity, receipt", icon: "check" },
        ],
        branches: [
          {
            condition: "Matched",
            tone: "positive",
            stages: [{ label: "Cleared for payment", sub: "Straight through, no touch", icon: "arrow" }],
          },
          {
            condition: "Mismatch",
            tone: "warning",
            stages: [
              { label: "Held and flagged", sub: "With the exact variance", icon: "bolt", tone: "warning" },
              { label: "Human review", sub: "A person decides", icon: "human" },
            ],
          },
        ],
        metric: { value: "Touchless", label: "matching on clean invoices" },
      },
      {
        id: "shipment-container-reconciliation",
        title: "Shipment and container reconciliation",
        tagline:
          "Container and shipment documents are reconciled against the booking, and any short or over shipment is flagged and the records updated.",
        flow: [
          { label: "Container and shipment docs", sub: "Packing lists, manifests", icon: "boxes" },
          { label: "Reconcile against booking", sub: "Quantities and containers", icon: "check" },
          { label: "Flag short or over", sub: "Before it hits the books", icon: "bolt" },
          { label: "Records updated", sub: "Systems back in sync", icon: "database" },
        ],
        metric: { value: "On arrival", label: "reconciliation, not at month end" },
      },
      {
        id: "customs-documentation",
        title: "Customs documentation automation",
        tagline:
          "Trade documents are read, extracted and checked for compliance, then packaged filing-ready for your broker.",
        flow: [
          { label: "Trade documents arrive", sub: "Invoices, COs, certificates", icon: "doc" },
          { label: "Extract and classify", sub: "Line items and HS codes", icon: "brain" },
          { label: "Validate compliance", sub: "Against the rule sets", icon: "shield" },
          { label: "Packaged for the broker", sub: "Filing-ready", icon: "draft" },
        ],
        metric: { value: "Filing-ready", label: "in minutes, not hours" },
      },
      {
        id: "isf-compliance",
        title: "ISF filing and compliance workflows",
        tagline:
          "ISF documents are read, extracted and validated against the rules, then submitted, with any gap surfaced before it files.",
        flow: [
          { label: "Documents arrive", sub: "ISF and supporting docs", icon: "doc" },
          { label: "Extract the data", sub: "Parties, tariff, bond", icon: "brain" },
          { label: "Validate and submit", sub: "Gaps flagged first", icon: "plug" },
        ],
        metric: { value: "On time", label: "ISF filings" },
      },
    ],
    solutionIds: ["invoice-audits", "reporting", "stockouts"],
    stat: { big: "88%", label: "invoice dispute win rate" },
    accent: "#FFB23E",
    icon: "boxes",
    image: "/images/logistics.jpg",
    alt: "Importer reviewing purchase orders and invoices against a live shipment board",
  },
  {
    slug: "carriers",
    name: "Carriers",
    line: "Work orders, PODs and paperwork read and matched, from dispatch to delivery.",
    headline: "From dispatch to proof of delivery, hands off the keyboard.",
    intro:
      "Trucking, ocean, air or rail, carrier operations still run on rekeying work orders, chasing PODs and reconciling paperwork across systems. Instive reads every document, matches it to the load, and chases what is missing, so your team works exceptions instead of data entry.",
    pains: [
      "Work orders are rekeyed from email into the TMS",
      "PODs are chased by hand and matched one by one",
      "Rate cons, BOLs and invoices live in separate systems",
      "Missing paperwork surfaces at billing, not at delivery",
    ],
    useCases: [
      {
        id: "work-orders",
        title: "Work orders",
        tagline:
          "An inbound work order is read into loads and stops, validated against dispatch, and created in your TMS with no rekeying.",
        flow: [
          { label: "Work order arrives", sub: "Email, PDF or portal", icon: "doc" },
          { label: "Extract loads and stops", sub: "References, weights, times", icon: "brain" },
          { label: "Validate against dispatch", sub: "Equipment and availability", icon: "check" },
          { label: "Created in the TMS", sub: "Clean and structured", icon: "plug" },
        ],
        metric: { value: "Minutes", label: "to a created work order" },
      },
      {
        id: "pod-processing",
        title: "Proof of delivery (POD) processing",
        tagline:
          "PODs are read as they come in, the signature and any exception are captured, matched to the load, and the shipment is closed.",
        flow: [
          { label: "POD scanned or emailed", sub: "From the driver or dock", icon: "doc" },
          { label: "Capture signature and notes", sub: "Damage and exceptions read", icon: "brain" },
          { label: "Match to the load", sub: "No manual lookup", icon: "check" },
          { label: "Attached and closed", sub: "Ready to bill", icon: "check" },
        ],
        metric: { value: "Touchless", label: "POD capture and matching" },
      },
      {
        id: "carrier-paperwork",
        title: "Carrier paperwork processing",
        tagline:
          "Rate confirmations, BOLs and invoices are read, cross-checked against the load, and filed across your TMS, dispatch and fleet systems.",
        flow: [
          { label: "Rate con, BOL, invoice", sub: "Across every source", icon: "audit" },
          { label: "Extract and cross-check", sub: "One consistent record", icon: "brain" },
          { label: "Validate against the load", sub: "Rate, weight, references", icon: "shield" },
          { label: "Filed across systems", sub: "TMS, dispatch, fleet", icon: "plug" },
        ],
        metric: { value: "One pass", label: "across every document" },
      },
      {
        id: "operational-follow-ups",
        title: "Operational follow-ups",
        tagline:
          "Milestones are tracked across every shipment, a missing POD or update is detected, and the follow-up is drafted and sent for you.",
        flow: [
          { label: "Milestones tracked", sub: "Across every shipment", icon: "trail" },
          { label: "Missing POD or update", sub: "Detected the moment it is due", icon: "bolt" },
          { label: "Follow-up drafted", sub: "To the driver or customer", icon: "draft" },
          { label: "Sent and logged", sub: "Nothing falls through", icon: "check" },
        ],
        metric: { value: "0", label: "PODs left uncollected" },
        solutionId: "carrier-slips",
      },
      {
        id: "exception-handling",
        title: "Exception handling",
        tagline:
          "Every document and shipment is validated, then the flow forks: a clean one is processed automatically, a discrepancy is flagged for a person.",
        flow: [
          { label: "Documents and shipment data", sub: "Pulled into one view", icon: "layers" },
          { label: "Validate the record", sub: "Missing PODs, incomplete paperwork", icon: "shield" },
        ],
        branches: [
          {
            condition: "Clean",
            tone: "positive",
            stages: [{ label: "Auto-processed", sub: "Straight through", icon: "check" }],
          },
          {
            condition: "Discrepancy",
            tone: "warning",
            stages: [
              { label: "Exception flagged", sub: "With the reason", icon: "bolt", tone: "warning" },
              { label: "Human review", sub: "A person resolves it", icon: "human" },
            ],
          },
        ],
        metric: { value: "At delivery", label: "exceptions caught, not at billing" },
      },
    ],
    solutionIds: ["carrier-slips", "labor", "reporting"],
    stat: { big: "Touchless", label: "work orders, PODs and paperwork" },
    accent: "#5BD6A6",
    icon: "truck",
    image: "/images/logistics.jpg",
    alt: "Carrier fleet staged in a terminal yard at night with trucks tracing light trails",
  },
  {
    slug: "freight-brokers",
    name: "Freight brokers",
    line: "Carrier performance scored continuously, load and rate documents audited for margin.",
    headline: "Protect the margin on every load.",
    intro:
      "A broker lives on carrier reliability and on margin. Instive scores every carrier as tracking and tender data flows in, and audits every rate confirmation and invoice, so an underperformer or a margin leak is caught before it costs a customer.",
    pains: [
      "Carrier performance is a gut call until a load falls over",
      "Rate cons and invoices are reconciled by hand",
      "Margin leaks hide in accessorials nobody reads",
      "The bad carrier is found on the load that fails",
    ],
    useCases: [
      {
        id: "carrier-performance",
        title: "Carrier performance",
        tagline:
          "Tracking and tender data is scored into a live carrier ranking, so an underperformer is flagged early with a rebalancing plan before it touches a customer load.",
        flow: [
          { label: "Tracking and tender data", sub: "Acceptance, on-time, tracking", icon: "trail" },
          { label: "Score every carrier", sub: "One live ranking", icon: "chart" },
          { label: "Flag underperformers", sub: "Before the load falls over", icon: "bolt" },
          { label: "Rebalance the book", sub: "Move volume to the strong", icon: "carrier" },
        ],
        metric: { value: "3 to 4 wks", label: "earlier warning" },
        solutionId: "carrier-slips",
      },
      {
        id: "load-rate-auditing",
        title: "Load and rate auditing",
        tagline:
          "Rate confirmations and carrier invoices are matched against the agreed rate, and any margin leak is flagged and drafted into a dispute.",
        flow: [
          { label: "Rate cons and invoices", sub: "Every load, every file", icon: "audit" },
          { label: "Match to the agreed rate", sub: "Line haul and accessorials", icon: "check" },
          { label: "Flag the margin leak", sub: "Overbills and duplicates", icon: "bolt" },
          { label: "Draft the dispute", sub: "Recover before it ages out", icon: "draft" },
        ],
        metric: { value: "88%", label: "dispute win rate" },
        solutionId: "invoice-audits",
      },
      {
        id: "carrier-onboarding",
        title: "Carrier onboarding and compliance",
        tagline:
          "A carrier packet is read and its authority and insurance verified, then the flow forks: a valid carrier is onboarded, an expired one is flagged for review.",
        flow: [
          { label: "Carrier packet arrives", sub: "Authority, insurance, W-9", icon: "doc" },
          { label: "Verify authority and insurance", sub: "Against FMCSA and the docs", icon: "shield" },
        ],
        branches: [
          {
            condition: "Valid",
            tone: "positive",
            stages: [{ label: "Onboarded to the book", sub: "Ready to tender", icon: "check" }],
          },
          {
            condition: "Expired or missing",
            tone: "warning",
            stages: [
              { label: "Flagged, docs requested", sub: "The exact gap, chased", icon: "bolt", tone: "warning" },
              { label: "Human review", sub: "A person clears it", icon: "human" },
            ],
          },
        ],
        metric: { value: "Compliant", label: "carriers only in the book" },
      },
    ],
    solutionIds: ["carrier-slips", "invoice-audits", "reporting"],
    stat: { big: "3 to 4 wks", label: "earlier warning on a sliding carrier" },
    accent: "#06b6d4",
    icon: "carrier",
    image: "/images/logistics.jpg",
    alt: "Freight brokerage operation over a lit highway interchange with truck light trails",
  },
  {
    slug: "3pls",
    name: "Third-party logistics (3PLs)",
    line: "Inventory unified across every client, labor sized to volume, reporting built live.",
    headline: "One live view across every client.",
    intro:
      "A 3PL runs many clients on one floor, and each wants their own view. Instive unifies inventory across every WMS feed, sizes labor to tomorrow's volume, and builds each client's report from one source, so nobody waits on a manual export.",
    pains: [
      "Inventory health is buried across clients and WMS feeds",
      "Crews are sized off last week's gut feel",
      "Each client wants a report that is pulled by hand",
      "A throughput dip goes unnoticed until it costs a client",
    ],
    useCases: [
      {
        id: "receiving-automation",
        title: "Receiving and putaway",
        tagline:
          "An ASN or receipt is read, matched to the PO, its quantities validated, and the putaway task is created, so receiving does not stall on paperwork.",
        flow: [
          { label: "ASN or receipt arrives", sub: "Per client, any format", icon: "doc" },
          { label: "Extract and match to PO", sub: "SKUs, quantities, lots", icon: "brain" },
          { label: "Validate the quantities", sub: "Short and over flagged", icon: "check" },
          { label: "Putaway task created", sub: "Straight to the floor", icon: "plug" },
        ],
        metric: { value: "Touchless", label: "receiving on clean ASNs" },
      },
      {
        id: "inventory-visibility",
        title: "Inventory visibility",
        tagline:
          "Every client's WMS feed is unified into one live inventory picture, with fill rate and stock health surfaced per client and across the floor.",
        flow: [
          { label: "WMS feeds, every client", sub: "One floor, many systems", icon: "warehouse" },
          { label: "Unify the inventory", sub: "Normalized, per client", icon: "boxes" },
          { label: "Fill rate and health", sub: "Live, not month end", icon: "chart" },
          { label: "One live view", sub: "For the floor and the client", icon: "report" },
        ],
        metric: { value: "98.4%", label: "fill rate, reported live" },
      },
      {
        id: "labor-planning",
        title: "Labor planning",
        tagline:
          "Tomorrow's crew is sized from the throughput forecast, so the afternoon surge is staffed ahead and client cut-offs get met.",
        flow: [
          { label: "Throughput forecast", sub: "By client and shift", icon: "forecast" },
          { label: "Size tomorrow's crew", sub: "To the work ahead", icon: "labor" },
          { label: "Staff the surge", sub: "Before the cut-off, not after", icon: "check" },
          { label: "On-time ship", sub: "Every client, every cut-off", icon: "truck" },
        ],
        metric: { value: "99.1%", label: "on-time ship rate" },
        solutionId: "labor",
      },
      {
        id: "reporting",
        title: "Client reporting",
        tagline:
          "Each client's report is built from the same live data the floor runs on, so there are no exports and no arguments over whose number is right.",
        flow: [
          { label: "Live operations data", sub: "One governed source", icon: "database" },
          { label: "Per-client reports", sub: "On each client's format", icon: "report" },
          { label: "Zero manual exports", sub: "One number, floor to client", icon: "check" },
        ],
        metric: { value: "0", label: "manual exports" },
        solutionId: "reporting",
      },
    ],
    solutionIds: ["labor", "reporting", "stockouts"],
    stat: { big: "98.4%", label: "fill rate reported live across clients" },
    accent: "#10b981",
    icon: "warehouse",
    image: "/images/logistics.jpg",
    alt: "Third-party logistics warehouse floor serving multiple clients at night",
  },
];

export const segmentBySlug = (slug: string) => SEGMENTS.find((s) => s.slug === slug);

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

export const SEGMENT_LINKS = SEGMENTS.map((s) => ({
  label: s.name,
  sub: s.line,
  href: `/segments/${s.slug}`,
  icon: s.icon,
  accent: s.accent,
}));

export const RESOURCE_LINKS = [
  { label: "Case studies", sub: "Illustrative scenarios and recovery", href: "/case-studies", icon: "chart", accent: "#FFB23E" },
  { label: "Mockups showcase", sub: "See it built on a real operation's data shape", href: "/mockups", icon: "boxes", accent: "#5BD6A6" },
  { label: "FAQ and perspectives", sub: "Common questions and views from the floor", href: "/faq", icon: "report", accent: "#3b82f6" },
];

export type DropdownLink = { label: string; sub: string; href: string; icon: string; accent: string };
export type NavGroup = { title: string; links: DropdownLink[] };
export type NavItem =
  | { label: string; href: string }
  | { label: string; menu: DropdownLink[]; cols?: number }
  | { label: string; groups: NavGroup[] };

export const NAV_MENU: NavItem[] = [
  {
    label: "Solutions",
    groups: [
      { title: "By outcome", links: SOLUTION_LINKS },
      { title: "By customer", links: SEGMENT_LINKS },
    ],
  },
  { label: "Industries", menu: INDUSTRY_LINKS, cols: 2 },
  { label: "Integrations", href: "/integrations" },
  { label: "Resources", menu: RESOURCE_LINKS, cols: 1 },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Solutions",
    links: SOLUTIONS.map((s) => ({ label: s.title, href: `/solutions/${s.id}` })),
  },
  {
    title: "By customer",
    links: SEGMENTS.map((s) => ({ label: s.name, href: `/segments/${s.slug}` })),
  },
  {
    title: "Industries",
    links: INDUSTRIES.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Integrations", href: "/integrations" },
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

// ─── Product screenshots (the showcase carousel) ─────────────────────────────
// Polished mockups of the operations workspace. Labeled as illustrative until the
// live product is screenshot-ready.
export type ProductShot = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const PRODUCT_SHOTS: ProductShot[] = [
  {
    id: "instive-ops",
    eyebrow: "Unified workspace",
    title: "One workspace for your operations team.",
    body: "A single operations hub where documents, approvals, and insights live together so your team moves with the same signal.",
    image: "/images/instive_mockup.png",
    alt: "Instive operations workspace showing a dashboard with unified shipment, document and approval views.",
  },
  {
    id: "instive-document",
    eyebrow: "Document workflow",
    title: "Review and resolve freight docs in one place.",
    body: "The original document and extracted fields are shown side by side, with confidence scores and action prompts that keep the workflow moving.",
    image: "/images/instive_document_mockup.png",
    alt: "Instive document workflow mockup showing extracted freight data and approval actions.",
  },
  {
    id: "document-extract",
    eyebrow: "Invoice extraction",
    title: "Every invoice field captured with confidence.",
    body: "AI extracts line-item details and flags mismatches against the contract, so your team can approve faster and with fewer errors.",
    image: "/images/document_extract_mockup.png",
    alt: "Invoice extraction mockup showing AI-captured line items, validation checks, and confidence indicators.",
  },
];

// ─── Workflow pillars (what the product does) ────────────────────────────────
export const PILLARS: { icon: string; title: string; body: string }[] = [
  {
    icon: "doc",
    title: "Process documents",
    body: "AI reads invoices, POs, BOLs and arrival notices, extracts the data, validates it, and updates your systems, with no rekeying.",
  },
  {
    icon: "human",
    title: "Monitor and approve",
    body: "Your team handles the exceptions in one portal. One-tap approvals, SLA tracking and delegation, with a full audit trail.",
  },
  {
    icon: "chart",
    title: "See what matters",
    body: "Dashboards, KPIs and AI insights from every connected system, live, so a problem surfaces before it reaches a customer.",
  },
  {
    icon: "plug",
    title: "Connect your systems",
    body: "Works with the ERP, TMS and tools you already run. No rip and replace, and nothing to migrate.",
  },
];

// ─── Proof bar (aggregate traction, illustrative) ────────────────────────────
export const PROOF_STATS: { value: string; label: string }[] = [
  { value: "50,000+", label: "Documents processed" },
  { value: "2,000+", label: "Hours saved" },
  { value: "30+", label: "Workflows automated" },
  { value: "18s", label: "Avg. processing time" },
  { value: "72%", label: "Touchless rate" },
];

// ─── Integrations (the logo wall) ────────────────────────────────────────────
export type Integration = { name: string; wordmark: string; category: string };
export const INTEGRATION_GROUPS: { title: string; items: Integration[] }[] = [
  {
    title: "ERP",
    items: [
      { name: "SAP", wordmark: "SAP", category: "ERP" },
      { name: "NetSuite", wordmark: "NetSuite", category: "ERP" },
      { name: "Microsoft Dynamics", wordmark: "Dynamics 365", category: "ERP" },
      { name: "Odoo", wordmark: "Odoo", category: "ERP" },
    ],
  },
  {
    title: "TMS and freight",
    items: [
      { name: "CargoWise", wordmark: "CargoWise", category: "TMS" },
      { name: "Magaya", wordmark: "Magaya", category: "TMS" },
      { name: "project44", wordmark: "project44", category: "TMS" },
      { name: "Descartes", wordmark: "Descartes", category: "TMS" },
    ],
  },
  {
    title: "Accounting",
    items: [
      { name: "QuickBooks", wordmark: "QuickBooks", category: "Accounting" },
      { name: "Xero", wordmark: "Xero", category: "Accounting" },
      { name: "Sage", wordmark: "Sage", category: "Accounting" },
    ],
  },
  {
    title: "Email and files",
    items: [
      { name: "Outlook", wordmark: "Outlook", category: "Email" },
      { name: "Gmail", wordmark: "Gmail", category: "Email" },
      { name: "Excel", wordmark: "Excel", category: "Files" },
      { name: "SFTP", wordmark: "SFTP", category: "Files" },
    ],
  },
  {
    title: "Automation and data",
    items: [
      { name: "Zapier", wordmark: "Zapier", category: "Automation" },
      { name: "REST API", wordmark: "REST API", category: "Data" },
      { name: "Webhooks", wordmark: "Webhooks", category: "Data" },
    ],
  },
];

/** Flat list for the homepage strip. */
export const INTEGRATIONS: Integration[] = INTEGRATION_GROUPS.flatMap((g) => g.items);

// ─── Social links ────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/instive-ai", icon: "linkedin" },
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

// ─── Platform (modern AI stack) — the pipeline every workflow runs ───────────
export const PLATFORM = {
  eyebrow: "Under the workspace",
  title: "Built on a modern AI stack.",
  body: "Every workflow runs the same path. Your systems feed in, AI reads and structures the work, it is validated against your own rules, your team decides the exceptions, and the result is written back where you already work. One governed pipeline, not a black box.",
  stages: [
    {
      key: "connect",
      title: "Connect",
      icon: "plug",
      items: [
        { t: "ERP, TMS and WMS", icon: "boxes" },
        { t: "Email and PDFs", icon: "doc" },
        { t: "APIs and flat files", icon: "plug" },
      ],
      highlight: false,
    },
    {
      key: "read",
      title: "Read and extract",
      icon: "brain",
      items: [{ t: "Document understanding" }, { t: "Field-level extraction" }, { t: "Confidence scoring" }],
      highlight: true,
    },
    {
      key: "validate",
      title: "Validate",
      icon: "shield",
      items: [{ t: "Against contracts and POs" }, { t: "Business and compliance rules" }, { t: "Exceptions flagged with a reason" }],
      highlight: false,
    },
    {
      key: "decide",
      title: "Human in the loop",
      icon: "human",
      items: [{ t: "Straight-through when clean" }, { t: "Routed to a person when not" }, { t: "One-tap approve, edit or reject" }],
      highlight: false,
    },
    {
      key: "act",
      title: "Act and sync",
      icon: "arrow",
      items: [{ t: "Written back to your systems" }, { t: "Follow-ups drafted and sent" }, { t: "Full audit trail" }],
      highlight: false,
    },
  ] as { key: string; title: string; icon: string; items: { t: string; icon?: string }[]; highlight: boolean }[],
  governance: ["Role-based access", "Encryption in transit and at rest", "Full audit logs", "SOC 2 in progress"],
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
export const PROCESS: { step: string; title: string; body: string }[] = [
  { step: "01", title: "Discovery", body: "A short call. You show us the one workflow that costs you most. We listen for the signal you keep missing." },
  { step: "02", title: "Configure", body: "We configure your portal and connect your systems. You see your own operation, with intelligence on top, on day one." },
  { step: "03", title: "Pilot", body: "Live on one workflow, measured against your baseline. The value shows up in the first cycle." },
  { step: "04", title: "Scale", body: "Roll out across teams, sites and use cases, on one standard, while your team keeps running the operation." },
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
