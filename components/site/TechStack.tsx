"use client";

import { Fragment, useEffect, useState } from "react";
import Icon from "@/components/site/Icon";
import { PLATFORM } from "@/lib/site";

export default function TechStack() {
  const stages = PLATFORM.stages;
  const [auto, setAuto] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAuto((v) => (v + 1) % stages.length), 2200);
    return () => clearInterval(t);
  }, [stages.length]);

  const active = hovered ?? auto;

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-3 lg:gap-0">
        {stages.map((s, i) => {
          const core = s.highlight;
          const on = active === i || core;
          const teal = "#5BD6A6";
          return (
            <Fragment key={s.key}>
              <div
                className="stack-stage relative rounded-tight p-5 lg:flex-1"
                data-active={active === i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderRadius: 12,
                  border: `1px solid ${core ? teal : "var(--line)"}`,
                  background: core ? "rgba(91,214,166,0.06)" : "var(--bg-secondary)",
                  boxShadow: core ? "0 0 0 1px rgba(91,214,166,.35), 0 20px 50px -20px rgba(91,214,166,.4)" : undefined,
                }}
              >
                {core && (
                  <span
                    className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[9px] uppercase"
                    style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "#0E1A24", backgroundColor: teal, fontWeight: 700 }}
                  >
                    Core layer
                  </span>
                )}
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: core ? teal : "rgba(255,178,62,.14)",
                      color: core ? "#0E1A24" : "var(--signal)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name={s.icon} size={20} />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                      Layer {i + 1}
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", lineHeight: 1.1 }}>
                      {s.title}
                    </h3>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {s.items.map((it) => (
                    <li key={it.t} className="flex items-center gap-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
                      {it.icon ? (
                        <span style={{ color: on ? "var(--signal)" : "var(--text-muted)", flexShrink: 0 }}>
                          <Icon name={it.icon} size={14} />
                        </span>
                      ) : (
                        <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: on ? "var(--signal)" : "var(--text-muted)", flexShrink: 0 }} />
                      )}
                      {it.t}
                    </li>
                  ))}
                </ul>
              </div>

              {i < stages.length - 1 && (
                <div className="flex items-center justify-center lg:w-10 py-1 lg:py-0">
                  <div className="flow-connector hidden lg:block" style={{ ["--flow-dist" as any]: "40px" }}>
                    <span className="flow-dot" />
                  </div>
                  <span className="lg:hidden" style={{ color: "var(--signal)", transform: "rotate(90deg)" }}>
                    <Icon name="arrow" size={18} />
                  </span>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* governance bar */}
      <div className="mt-5 rounded-tight p-5" style={{ borderRadius: 12, border: "1px solid var(--line)", background: "var(--bg-secondary)" }}>
        <div className="flex items-center gap-2 mb-4 text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--cleared)" }}>
          <Icon name="shield" size={15} />
          Security and governance
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PLATFORM.governance.map((g) => (
            <span key={g} className="inline-flex items-center gap-2.5 px-4 py-3 rounded-tight text-[13px]" style={{ border: "1px solid var(--line)", color: "var(--text-secondary)", backgroundColor: "var(--bg-primary)", borderRadius: 10 }}>
              <span style={{ color: "var(--cleared)", flexShrink: 0 }}>
                <Icon name="shield" size={16} />
              </span>
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
