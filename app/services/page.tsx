import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { BookDemoButton } from "@/components/site/BookDemo";
import { AGENTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI agents for supply chain operations",
  description:
    "Meet the Instive agents: specialist AI that rides alongside your stack to forecast demand, control carriers, audit freight bills, plan labor, source smarter, and recover returns.",
};

const HOW = [
  { icon: "plug", title: "Connect to your stack", body: "Each agent reads from your ERP, TMS, WMS or a flat file. Read-only to start. No migration." },
  { icon: "chart", title: "Watch continuously", body: "It scores, forecasts and audits every record, every shift, not a quarterly sample." },
  { icon: "human", title: "You stay in control", body: "Anything that moves money or inventory waits for a human to confirm, with a full audit trail." },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        {/* Header */}
        <section className="radiant relative z-10 px-6 pt-16 pb-20 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-7">
                <span className="w-11 h-px" style={{ backgroundColor: "var(--signal)" }} />
                <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>
                  The agents
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--text-primary)", maxWidth: 860 }}>
                Specialist AI for every <span className="text-gradient">link in the chain.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                Each Instive agent owns one job and does it relentlessly. They ride alongside the
                systems you already run, so you add intelligence without replacing a thing. Start with
                one. Add the rest as you grow.
              </p>
              <div className="mt-9">
                <BookDemoButton source="services-header" className="btn-signal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
                  Book a demo
                  <Icon name="arrow" size={15} />
                </BookDemoButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Agents grid */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((a, i) => (
              <Reveal as="article" key={a.name} delay={(i % 3) * 70} className="surface-card p-7 flex flex-col" style={{ ["--accent" as any]: a.accent }}>
                <div className="flex items-center gap-3.5">
                  <span style={{ width: 48, height: 48, borderRadius: 12, display: "grid", placeItems: "center", backgroundColor: `${a.accent}1a`, color: a.accent, flexShrink: 0 }}>
                    <Icon name={a.icon} size={24} />
                  </span>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--text-primary)", lineHeight: 1 }}>
                      {a.name}
                    </h2>
                    <div className="text-[12px] mt-1" style={{ fontFamily: "var(--font-mono)", color: a.accent, letterSpacing: "0.04em" }}>
                      {a.domain}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
                  {a.job}
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>
                  {a.pain}
                </p>

                <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
                  <div className="text-[10px] uppercase mb-1.5" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                    Outcome
                  </div>
                  <p className="text-[14px]" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                    {a.outcome}
                  </p>
                  {a.href ? (
                    <Link href={a.href} className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold" style={{ color: a.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      See it live
                      <Icon name="arrow" size={13} />
                    </Link>
                  ) : (
                    <BookDemoButton source="services-agent" className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold" style={{ color: a.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                      Scope it
                      <Icon name="arrow" size={13} />
                    </BookDemoButton>
                  )}
                </div>
              </Reveal>
            ))}

            {/* Custom agent card */}
            <Reveal as="article" delay={0} className="surface-card p-7 flex flex-col justify-center text-center" style={{ ["--accent" as any]: "var(--signal)", borderStyle: "dashed" }}>
              <span style={{ color: "var(--signal)", margin: "0 auto" }}>
                <Icon name="custom" size={30} />
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "var(--text-primary)" }}>
                A custom agent
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                If the signal you keep missing is specific to your operation, we build the agent that catches it, on your data shape.
              </p>
              <BookDemoButton source="services-custom" className="inline-flex items-center justify-center gap-1.5 mt-5 text-[13px] font-semibold" style={{ color: "var(--signal)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.04em", background: "none", border: "none", cursor: "pointer" }}>
                Tell us the problem
                <Icon name="arrow" size={13} />
              </BookDemoButton>
            </Reveal>
          </div>
        </section>

        {/* How they work */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                How every agent works.
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {HOW.map((h, i) => (
                <Reveal key={h.title} delay={i * 80} className="p-7 rounded-tight border" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-primary)", borderRadius: 12 }}>
                  <span style={{ color: "var(--signal)" }}>
                    <Icon name={h.icon} size={26} />
                  </span>
                  <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--text-primary)" }}>{h.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{h.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="radiant relative z-10 px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1.04 }}>
                Pick the agent. We will prove it on your data.
              </h2>
              <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                A 30 minute call, a working prototype in days, a pilot in weeks.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <BookDemoButton source="services-final" className="btn-signal inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
                  Book a demo
                  <Icon name="arrow" size={16} />
                </BookDemoButton>
                <Link href="/case-studies" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
                  See the results
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
