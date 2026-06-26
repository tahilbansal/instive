"use client";

import { Sidecar, SIDECARS, SIDECAR_META } from "@/data/mockups";
import { useState } from "react";

export type FilterValue = "All" | Sidecar;

/** Returns the accent color for a given filter pill */
function getPillAccent(pill: FilterValue): string {
  if (pill === "All") return "#FFB23E"; // signal amber
  return SIDECAR_META[pill].accent;
}

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
  const [searchFocused, setSearchFocused] = useState(false);
  const pills: FilterValue[] = ["All", ...SIDECARS];

  return (
    <div className="space-y-8">
      {/* Pills — horizontally scrollable on mobile */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 lg:pb-0 lg:flex-wrap scrollbar-none">
        {pills.map((pill) => {
          const isActive = pill === active;
          const accent = getPillAccent(pill);

          return (
            <button
              key={pill}
              onClick={() => onSelect(pill)}
              className="filter-pill"
              data-active={isActive}
              style={{
                backgroundColor: isActive ? accent : undefined,
                borderColor: isActive ? "transparent" : undefined,
                color: isActive ? "#0E1A24" : undefined,
                boxShadow: isActive
                  ? `0 4px 20px -4px ${accent}55, 0 0 0 1px ${accent}33`
                  : undefined,
              }}
            >
              {/* Accent dot for inactive pills */}
              {!isActive && (
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: accent,
                    marginRight: 8,
                    opacity: 0.6,
                    verticalAlign: "middle",
                  }}
                />
              )}
              {pill}
            </button>
          );
        })}
      </div>

      {/* Search row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Search input */}
        <div className="flex-1 w-full relative">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
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
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search company, industry, tag…"
            className="w-full pl-11 pr-4 py-3 text-sm rounded-lg transition-all duration-200"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: `1px solid ${searchFocused ? "var(--signal)" : "var(--line-strong)"}`,
            }}
          />
        </div>

        {/* Result count */}
        <p
          className="text-xs font-mono uppercase tracking-wider flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {shown === total ? (
            <>All {total} mockups</>
          ) : (
            <>
              Showing{" "}
              <span style={{ color: "var(--signal)", fontWeight: 600 }}>{shown}</span>{" "}
              of {total}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
