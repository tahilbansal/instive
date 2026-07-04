"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/site/Icon";
import { solutionBySlug, type FlowStage, type Segment, type UseCase } from "@/lib/site";

// ─────────────────────────────────────────────────────────────────────────────
// UseCaseFlow — the "automation in action" scroller.
//
// A sticky pipeline diagram on the left morphs and re-animates as the reader
// scrolls the stacked use-case blocks on the right. Every stage of copy is
// always in the DOM (SEO-safe); the IntersectionObserver only toggles which
// use case is visually active. On mobile the sticky column is hidden and each
// block renders its own inline diagram. Honors prefers-reduced-motion via CSS.
// ─────────────────────────────────────────────────────────────────────────────

/** A single node card in the pipeline. */
function FlowNode({
  stage,
  step,
  final,
  animate,
  delay,
}: {
  stage: FlowStage;
  step?: string;
  final?: boolean;
  animate: boolean;
  delay: number;
}) {
  return (
    <div
      className={`flow-node ${animate ? "flow-node-animate" : ""}`}
      data-final={final ? "true" : undefined}
      data-tone={stage.tone}
      style={{ animationDelay: animate ? `${delay}ms` : undefined }}
    >
      <span className="flow-node-icon">
        <Icon name={stage.icon} size={20} />
      </span>
      <span className="flow-node-text">
        <span className="flow-node-label">{stage.label}</span>
        <span className="flow-node-sub">{stage.sub}</span>
      </span>
      {step && <span className="flow-node-step">{step}</span>}
    </div>
  );
}

/**
 * One pipeline for a single use case. Renders the linear spine, then — if the
 * use case forks — a two-column set of conditional branches. `animate` replays
 * the stagger when the diagram switches.
 */
function FlowDiagram({ uc, accent, animate = true }: { uc: UseCase; accent: string; animate?: boolean }) {
  const spineIsWhole = !uc.branches; // last spine node is the outcome only when there is no fork
  return (
    <div style={{ ["--accent" as any]: accent }}>
      {/* Spine */}
      {uc.flow.map((stage, i) => (
        <div key={stage.label}>
          <FlowNode
            stage={stage}
            step={String(i + 1).padStart(2, "0")}
            final={spineIsWhole && i === uc.flow.length - 1}
            animate={animate}
            delay={i * 110}
          />
          {i < uc.flow.length - 1 && (
            <div className="flow-pipe" aria-hidden="true">
              <span className="pip" />
            </div>
          )}
        </div>
      ))}

      {/* Fork */}
      {uc.branches && (
        <div className="flow-fork" data-branches={uc.branches.length}>
          {uc.branches.map((b, bi) => (
            <div key={b.condition} className="flow-branch" data-tone={b.tone}>
              <div className="flow-branch-drop" aria-hidden="true">
                <span className="pip" style={{ animationDelay: `${bi * 0.3}s` }} />
              </div>
              <span className="flow-branch-chip">
                <Icon name={b.tone === "positive" ? "check" : "bolt"} size={13} />
                {b.condition}
              </span>
              {b.stages.map((stage, si) => (
                <div key={stage.label}>
                  <FlowNode
                    stage={stage}
                    final={si === b.stages.length - 1}
                    animate={animate}
                    delay={(uc.flow.length + bi + si) * 110}
                  />
                  {si < b.stages.length - 1 && (
                    <div className="flow-pipe" aria-hidden="true">
                      <span className="pip" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UseCaseFlow({ segment }: { segment: Segment }) {
  const { useCases, accent, name } = segment;
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (nodes.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      // A thin band across the vertical center: the block crossing it wins.
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [useCases.length]);

  const activeUc = useCases[active];

  return (
    <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-11 h-px" style={{ backgroundColor: accent }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: accent }}>
              {name} automation in action
            </span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 3.8vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--text-primary)" }}>
            Follow the work as an agent runs it.
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Each workflow moves from the raw input your team lives in to a clean, confirmed result. Scroll to watch the flow for every use case.
          </p>
        </div>

        <div className="grid gap-x-14 lg:grid-cols-2">
          {/* Sticky diagram (desktop) */}
          <div className="hidden lg:block">
            <div style={{ position: "sticky", top: 100 }}>
              {/* Progress rail */}
              <div className="mb-6 flex items-center gap-3" role="tablist" aria-label={`${name} use cases`}>
                {useCases.map((uc, i) => (
                  <button
                    key={uc.id}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={uc.title}
                    onClick={() => {
                      blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                    className="flow-rail-dot"
                    data-active={i === active ? "true" : undefined}
                    style={{ ["--accent" as any]: accent }}
                  />
                ))}
                <span className="ml-2 text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {String(active + 1).padStart(2, "0")} / {String(useCases.length).padStart(2, "0")}
                </span>
              </div>

              <div className="surface-card p-7" style={{ ["--accent" as any]: accent }}>
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: accent }}>
                    Live flow
                  </div>
                  <div className="flex items-center gap-2 text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    <span className="live-dot" />
                    {activeUc.title}
                  </div>
                </div>
                {/* key forces the stagger to replay on every switch */}
                <FlowDiagram key={active} uc={activeUc} accent={accent} />
              </div>
            </div>
          </div>

          {/* Scrolling use-case blocks */}
          <div className="flex flex-col">
            {useCases.map((uc, i) => {
              const sol = uc.solutionId ? solutionBySlug(uc.solutionId) : undefined;
              return (
                <div
                  key={uc.id}
                  ref={(el) => {
                    blockRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="flow-block"
                >
                  <div
                    className="text-[13px] uppercase mb-4 transition-colors"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.14em",
                      color: i === active ? accent : "var(--text-muted)",
                    }}
                  >
                    Use case {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="mb-4"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-[16px] leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {uc.tagline}
                  </p>

                  {/* Inline diagram — mobile only (sticky column handles desktop) */}
                  <div className="lg:hidden mb-6 surface-card p-6" style={{ ["--accent" as any]: accent }}>
                    <FlowDiagram uc={uc} accent={accent} animate={false} />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <span className="text-[14px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      <b style={{ color: accent, fontFamily: "var(--font-display)", fontSize: 18 }}>{uc.metric.value}</b> {uc.metric.label}
                    </span>
                    {sol && (
                      <Link
                        href={`/solutions/${sol.id}`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold"
                        style={{ color: accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}
                      >
                        Explore the solution
                        <Icon name="arrow" size={13} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
