import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import Solutions from "@/components/home/Solutions";
import ProductShowcase from "@/components/home/ProductShowcase";
import TechStack from "@/components/site/TechStack";
import { IntegrationStrip } from "@/components/site/Integrations";
import { BookDemoButton } from "@/components/site/BookDemo";
import { mockups } from "@/data/mockups";
import {
  PILLARS,
  PROOF_STATS,
  PLATFORM,
  INDUSTRIES,
} from "@/lib/site";

// ── shared scaffold ──────────────────────────────────────────────────────────
function SectionHead({ num, title, sub }: { num?: string; title: string; sub: string }) {
  return (
    <Reveal className="flex items-baseline gap-4 flex-wrap mb-14">
      {num && (
        <span className="text-[13px]" style={{ fontFamily: "var(--font-mono)", color: "var(--signal)", letterSpacing: "0.05em" }}>
          {num}
        </span>
      )}
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(26px, 4vw, 40px)",
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          maxWidth: 640,
        }}
      >
        {title}
      </h2>
      <p className="text-[15px] md:ml-auto" style={{ color: "var(--text-muted)", maxWidth: 380 }}>
        {sub}
      </p>
    </Reveal>
  );
}

function Section({ id, children, bg }: { id?: string; children: React.ReactNode; bg?: string }) {
  return (
    <section id={id} className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)", backgroundColor: bg }}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

// ── Trust strip (marquee) ────────────────────────────────────────────────────
const VOCAB = [
  "Freight forwarding",
  "3PL and managed transport",
  "Distribution",
  "Cold chain",
  "Intermodal and rail",
  "Manufacturing",
  "Fulfillment",
  "Reverse logistics",
  "Customs and cross-border",
  "Last mile",
];

export function TrustStrip() {
  const row = [...VOCAB, ...VOCAB];
  return (
    <section className="relative z-10 px-6 py-10 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-[11px] uppercase mb-7" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--text-muted)" }}>
          Built for the operations that move physical goods
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track gap-3">
            {row.map((v, i) => (
              <span
                key={i}
                className="whitespace-nowrap px-4 py-2 rounded-tight border text-sm"
                style={{ borderColor: "var(--line)", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", backgroundColor: "var(--bg-secondary)" }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Product showcase (screenshot carousel) ───────────────────────────────────
export function ProductShowcaseSection() {
  return (
    <Section id="product">
      <SectionHead
        num="01"
        title="One workspace for your operations team."
        sub="Not slideware. The screens your team monitors, reviews and approves in every shift."
      />
      <Reveal>
        <ProductShowcase />
      </Reveal>
    </Section>
  );
}

// ── Proof bar (aggregate metrics) ────────────────────────────────────────────
export function ProofBar() {
  return (
    <section className="relative z-10 px-6 py-16 border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto">
        <Reveal className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {PROOF_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", letterSpacing: "-0.03em", color: "var(--signal)", lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="mt-2 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal className="mt-8 text-center text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
          Illustrative aggregates across active workflows
        </Reveal>
      </div>
    </section>
  );
}

// ── Pillars (what the workflow does) ─────────────────────────────────────────
export function Pillars() {
  return (
    <Section id="pillars">
      <SectionHead
        num="02"
        title="Automate your supply chain operations with specialized AI."
        sub="Four things the workspace does, end to end, across every workflow you run."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 4) * 70} className="h-full">
            <div className="surface-card p-7 flex flex-col h-full" style={{ ["--accent" as any]: "var(--signal)" }}>
              <span style={{ color: "var(--signal)" }}>
                <Icon name={p.icon} size={26} />
              </span>
              <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>
                {p.title}
              </h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── Platform (the AI stack / pipeline) ───────────────────────────────────────
export function Platform() {
  return (
    <Section id="platform" bg="var(--bg-secondary)">
      <SectionHead num="03" title={PLATFORM.title} sub="One governed pipeline behind every workflow, secure and built to scale with your operation." />
      <Reveal>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>
            {PLATFORM.eyebrow}
          </span>
        </div>
        <p className="mb-10 text-[16px] leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
          {PLATFORM.body}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <TechStack />
      </Reveal>
    </Section>
  );
}

// ── Solutions explorer (by problem) ──────────────────────────────────────────
export function SolutionsSection() {
  return (
    <Section id="outcomes">
      <SectionHead
        num="04"
        title="Built around the workflow that costs you most."
        sub="Pick the outcome you need. See the current cost, what changes, and the number it moves."
      />
      <Solutions />
    </Section>
  );
}

// ── Integrations (logo wall) ─────────────────────────────────────────────────
export function IntegrationsSection() {
  return (
    <Section id="integrations" bg="var(--bg-secondary)">
      <SectionHead
        num="05"
        title="Integrates with the systems you already use."
        sub="No rip and replace. We ride alongside your ERP, TMS and back-office tools."
      />
      <Reveal>
        <IntegrationStrip />
      </Reveal>
      <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
          Don&apos;t see yours? We connect to any system with an API.
        </p>
        <Link href="/integrations" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--signal)" }}>
          See all integrations
          <Icon name="arrow" size={14} />
        </Link>
      </Reveal>
    </Section>
  );
}

// ── 06 · Industries ──────────────────────────────────────────────────────────
export function Industries() {
  return (
    <Section id="industries">
      <SectionHead num="06" title="Built for your operation." sub="The vocabulary is yours: lanes, AWBs, SKUs, crews. So is the signal we catch." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={(i % 3) * 70} className="h-full">
            <Link href={`/industries/${ind.slug}`} className="surface-card p-7 flex flex-col h-full" style={{ ["--accent" as any]: ind.accent, textDecoration: "none" }}>
              <span style={{ color: ind.accent }}>
                <Icon name={ind.icon} size={26} />
              </span>
              <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>
                {ind.name}
              </h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                {ind.line}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-semibold" style={{ color: ind.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Explore
                <Icon name="arrow" size={13} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}




// ── Final CTA ────────────────────────────────────────────────────────────────
export function FinalCta() {
  return (
    <section className="radiant relative z-10 px-6 py-28">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="w-11 h-px" style={{ backgroundColor: "var(--signal)" }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>The next move</span>
            <span className="w-11 h-px" style={{ backgroundColor: "var(--signal)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 6vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1.02, color: "var(--text-primary)" }}>
            Start with the workflow
            <br />
            that costs you most.
          </h2>
          <p className="mt-6 text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Book a 30 minute review. Show us the one workflow that hurts, and we will come back with
            your data in the workspace, not a slide deck. No commitment.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <BookDemoButton source="home-final" className="btn-signal inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Book a demo
              <Icon name="arrow" size={16} />
            </BookDemoButton>
            <Link href="/services" className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
              Meet the agents
            </Link>
          </div>
          <p className="mt-8 text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
            Prototype in days. Pilot in weeks. Return in the first cycle.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
