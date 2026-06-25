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

  return (
    <div>
      <FilterBar
        active={active}
        onSelect={setActive}
        query={query}
        onQuery={setQuery}
        shown={filtered.length}
        total={mockups.length}
      />

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((mockup) => (
            <MockupCard
              key={mockup.id}
              mockup={mockup}
              onPreview={setSelected}
            />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-xl border border-hairline bg-ink-surface py-16 text-center text-sm text-white/50">
          No mockups match that filter yet. Try clearing the search or another
          category.
        </div>
      )}

      <MockupModal mockup={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
