import { INTEGRATIONS, INTEGRATION_GROUPS, type Integration } from "@/lib/site";

/** A single monochrome wordmark badge — the logo-wall unit. */
export function IntegrationBadge({ item }: { item: Integration }) {
  return (
    <div
      className="integration-badge flex items-center justify-center px-4 py-5 rounded-tight border"
      style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-primary)", borderRadius: 12 }}
      title={item.name}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "-0.01em",
          color: "var(--text-secondary)",
          whiteSpace: "nowrap",
        }}
      >
        {item.wordmark}
      </span>
    </div>
  );
}

/** Flat responsive strip for the homepage section. */
export function IntegrationStrip() {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {INTEGRATIONS.map((item) => (
        <IntegrationBadge key={item.name} item={item} />
      ))}
    </div>
  );
}

/** Grouped grid for the dedicated /integrations page. */
export function IntegrationGrid() {
  return (
    <div className="space-y-12">
      {INTEGRATION_GROUPS.map((g) => (
        <div key={g.title}>
          <div
            className="text-[11px] uppercase mb-5"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-muted)" }}
          >
            {g.title}
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {g.items.map((item) => (
              <IntegrationBadge key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
