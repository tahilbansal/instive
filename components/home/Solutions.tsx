"use client";

import { useState } from "react";
import { SOLUTIONS } from "@/lib/site";
import { BookDemoButton } from "@/components/site/BookDemo";

export default function Solutions() {
  const [active, setActive] = useState(0);
  const s = SOLUTIONS[active];
  const accent = s.accent;

  const panel: { tag: string; body: string }[] = [
    { tag: "The problem", body: s.problem },
    { tag: "Operational impact", body: s.impact },
    { tag: "What Instive does", body: s.solution },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      {/* problem list */}
      <div className="flex flex-col gap-2">
        {SOLUTIONS.map((sol, i) => {
          const on = i === active;
          return (
            <button
              key={sol.id}
              onClick={() => setActive(i)}
              className="text-left px-5 py-4 rounded-tight border transition-all"
              style={{
                borderColor: on ? accent : "var(--line)",
                backgroundColor: on ? "var(--bg-secondary)" : "transparent",
                color: on ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                borderRadius: 10,
              }}
            >
              <span className="flex items-center gap-3">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    flexShrink: 0,
                    backgroundColor: on ? accent : "var(--text-muted)",
                    boxShadow: on ? `0 0 0 4px ${accent}22` : "none",
                  }}
                />
                {sol.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div
        className="rounded-tight border p-7 sm:p-9 flex flex-col"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--line-strong)", borderRadius: 12 }}
      >
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 30px)",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            {s.title}
          </h3>
          <span
            className="px-3 py-1.5 rounded-full text-[11px] uppercase whitespace-nowrap"
            style={{
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.06em",
              color: accent,
              backgroundColor: `${accent}1a`,
            }}
          >
            {s.domain}
          </span>
        </div>

        <div className="space-y-5 flex-1">
          {panel.map((p) => (
            <div key={p.tag}>
              <div
                className="text-[11px] uppercase mb-1.5"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}
              >
                {p.tag}
              </div>
              <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* outcome */}
        <div className="mt-7 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
          <div
            className="text-[11px] uppercase mb-2 flex items-center gap-2"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: accent }}
          >
            <span style={{ width: 14, height: 1, backgroundColor: accent }} />
            Measurable outcome
          </div>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {s.outcome}
          </p>
          <BookDemoButton
            source="solutions-explorer"
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold transition-colors"
            style={{ color: accent, fontFamily: "var(--font-display)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Scope this for our operation
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </BookDemoButton>
        </div>
      </div>
    </div>
  );
}
