"use client";

import { useMemo, useState } from "react";
import { Mockup } from "@/data/mockups";
import FilterBar, { FilterValue } from "./FilterBar";
import MockupCard from "./MockupCard";
import MockupModal from "./MockupModal";

export default function MockupGallery({ mockups }: { mockups: Mockup[] }) {
  const [active, setActive] = useState<FilterValue>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Mockup | null>(null);
  /** Key to force re-mount cards on filter change for entrance animation */
  const [filterKey, setFilterKey] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockups.filter((m) => {
      const matchesSidecar = active === "All" || m.sidecar === active;
      if (!matchesSidecar) return false;
      if (!q) return true;
      const haystack = [
        m.companyName,
        m.industry,
        m.sidecar,
        ...m.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [mockups, active, query]);

  const handleFilterChange = (value: FilterValue) => {
    setActive(value);
    setFilterKey((k) => k + 1); // re-trigger entrance animation
  };

  return (
    <div className="space-y-12">
      <FilterBar
        active={active}
        onSelect={handleFilterChange}
        query={query}
        onQuery={setQuery}
        shown={filtered.length}
        total={mockups.length}
      />

      {filtered.length > 0 ? (
        <div
          key={filterKey}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filtered.map((mockup, i) => (
            <MockupCard
              key={mockup.id}
              mockup={mockup}
              onPreview={setSelected}
              index={i}
            />
          ))}
        </div>
      ) : (
        <div
          className="glass-card py-20 px-8 text-center"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            style={{
              fontSize: 48,
              marginBottom: 16,
              opacity: 0.4,
            }}
          >
            ⟶
          </div>
          <p
            className="text-base font-display"
            style={{ color: "var(--text-muted)" }}
          >
            No mockups match that filter.
          </p>
          <p
            className="text-sm mt-2"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            Try clearing the search or selecting &ldquo;All&rdquo;.
          </p>
        </div>
      )}

      <MockupModal mockup={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
