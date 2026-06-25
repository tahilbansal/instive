import { Sidecar, SIDECAR_META, SIDECARS } from "@/data/mockups";
import { hexToRgba } from "@/lib/colors";

export type FilterValue = "All" | Sidecar;

export default function FilterBar({
  active,
  onSelect,
  query,
  onQuery,
  shown,
  total,
}: {
  active: FilterValue;
  onSelect: (value: FilterValue) => void;
  query: string;
  onQuery: (value: string) => void;
  shown: number;
  total: number;
}) {
  const pills: FilterValue[] = ["All", ...SIDECARS];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Sidecar pills */}
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => {
            const isActive = pill === active;
            const accent = pill === "All" ? "#e7e7ee" : SIDECAR_META[pill].accent;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => onSelect(pill)}
                className="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors"
                style={
                  isActive
                    ? {
                        color: pill === "All" ? "#0a0a0f" : accent,
                        backgroundColor:
                          pill === "All" ? accent : hexToRgba(accent, 0.15),
                        borderColor:
                          pill === "All" ? accent : hexToRgba(accent, 0.5),
                      }
                    : {
                        color: "rgba(231,231,238,0.7)",
                        backgroundColor: "transparent",
                        borderColor: "rgba(255,255,255,0.12)",
                      }
                }
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
            aria-hidden="true"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
            <path
              d="M14 14l4 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search company, industry, tag…"
            aria-label="Search mockups"
            className="w-full rounded-lg border border-hairline bg-ink-surface py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-white/25 focus:outline-none"
          />
        </div>
      </div>

      <p className="text-xs font-medium uppercase tracking-wide text-white/40">
        Showing {shown} of {total} mockups
      </p>
    </div>
  );
}
