import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import MediaFrame from "@/components/site/MediaFrame";
import TechStack from "@/components/site/TechStack";
import Solutions from "@/components/home/Solutions";
import Results from "@/components/home/Results";
import Faq from "@/components/home/Faq";
import { BookDemoButton } from "@/components/site/BookDemo";
import { mockups } from "@/data/mockups";
import {
  FUNCTIONS,
  FEATURES,
  PLATFORM,
  VISION,
  INDUSTRIES,
  PROCESS,
  CASE_STUDIES,
  TESTIMONIALS,
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

// ── 01 · Functions grid ──────────────────────────────────────────────────────
export function Functions() {
  return (
    <Section id="solutions">
      <SectionHead
        num="01"
        title="Intelligence for every part of the chain."
        sub="One operating brain across procurement, logistics, warehousing and distribution."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FUNCTIONS.map((f, i) => (
          <Reveal key={f.name} delay={(i % 3) * 70} className="h-full">
            <Link href={f.href} className="surface-card p-7 flex flex-col h-full" style={{ ["--accent" as any]: "var(--signal)", textDecoration: "none" }}>
              <span style={{ color: "var(--signal)" }}>
                <Icon name={f.icon} size={26} />
              </span>
              <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>
                {f.name}
              </h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                {f.line}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-semibold" style={{ color: "var(--signal)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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

// ── 02 · Feature rows (with imagery) ─────────────────────────────────────────
export function Features() {
  return (
    <Section id="features">
      <SectionHead
        num="02"
        title="What it looks like in the operation."
        sub="Not slideware. Working intelligence your team acts on every shift."
      />
      <div className="space-y-24">
        {FEATURES.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={f.id} className="grid gap-10 lg:gap-14 lg:grid-cols-2 lg:items-center">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: f.accent }}>
                  {f.eyebrow}
                </span>
                <h3
                  className="mt-4 mb-4"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.4vw, 34px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
                >
                  {f.title}
                </h3>
                <p className="text-[16px] leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                  {f.body}
                </p>
                <ul className="space-y-3">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: f.accent, flexShrink: 0, marginTop: 2 }}>
                        <Icon name="check" size={16} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className={`relative ${flip ? "lg:order-1" : ""}`}>
                <span className="glow-blob" style={{ width: 300, height: 300, background: f.accent, top: "8%", right: flip ? "auto" : "-6%", left: flip ? "-6%" : "auto", opacity: 0.3 }} />
                <MediaFrame
                  src={f.image}
                  alt={f.alt}
                  label={f.label}
                  variant={f.variant}
                  accent={f.accent}
                  width={1536}
                  height={f.image.endsWith(".jpg") ? 858 : 1024}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Reveal>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ── 03 · Platform (interactive AI stack) ─────────────────────────────────────
export function Platform() {
  return (
    <Section id="platform" bg="var(--bg-secondary)">
      <SectionHead num="03" title={PLATFORM.title} sub="Secure, scalable, and built to grow into the software your team logs into." />
      <Reveal>
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

// ── 04 · Solutions explorer ──────────────────────────────────────────────────
export function SolutionsSection() {
  return (
    <Section id="outcomes">
      <SectionHead
        num="04"
        title="Start from the problem, not the product."
        sub="Pick the outcome you need. See the current cost, what changes, and the number it moves."
      />
      <Solutions />
    </Section>
  );
}

// ── 05 · Industries ──────────────────────────────────────────────────────────
export function Industries() {
  return (
    <Section id="industries" bg="var(--bg-secondary)">
      <SectionHead num="05" title="Built for your operation." sub="The vocabulary is yours: lanes, AWBs, SKUs, crews. So is the signal we catch." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={(i % 3) * 70} className="h-full">
            <Link href={`/industries/${ind.slug}`} className="surface-card p-7 flex flex-col h-full" style={{ ["--accent" as any]: ind.accent, backgroundColor: "var(--bg-primary)", textDecoration: "none" }}>
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

// ── Vision (cinematic, image background) ─────────────────────────────────────
export function Vision() {
  return (
    <section id="vision" className="relative z-10 px-6 py-28 border-b overflow-hidden" style={{ borderColor: "var(--line)" }}>
      <Image src={VISION.image} alt={VISION.alt} fill sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(180deg, rgba(14,26,36,.78), rgba(14,26,36,.92))" }} />
      <div className="relative max-w-7xl mx-auto" style={{ zIndex: 2 }}>
        <Reveal className="max-w-3xl">
          <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>
            {VISION.eyebrow}
          </span>
          <h2
            className="mt-5"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 4.6vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "#F5F2EA" }}
          >
            {VISION.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: "#D8D3C7" }}>
            {VISION.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VISION.phases.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="glass p-7 rounded-tight" style={{ borderRadius: 12 }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] uppercase px-2.5 py-1 rounded-full" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: i === 0 ? "#5BD6A6" : "var(--signal)", backgroundColor: i === 0 ? "rgba(91,214,166,.14)" : "rgba(255,178,62,.14)" }}>
                  {p.tag}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#F5F2EA", letterSpacing: "-0.02em" }}>
                {p.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed" style={{ color: "#D8D3C7" }}>
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 06 · Results ─────────────────────────────────────────────────────────────
export function ResultsSection() {
  return (
    <Section id="results">
      <SectionHead num="06" title="The only metric that matters is yours." sub="Representative outcomes from Instive intelligence running in live operations." />
      <Reveal>
        <Results />
      </Reveal>
      <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
        <p className="text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          Ranges reflect live deployments. Your baseline sets the target.
        </p>
        <BookDemoButton source="results" className="btn-signal inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
          See the number for your operation
          <Icon name="arrow" size={14} />
        </BookDemoButton>
      </Reveal>
    </Section>
  );
}

// ── 07 · Process ─────────────────────────────────────────────────────────────
export function Process() {
  return (
    <Section id="process" bg="var(--bg-secondary)">
      <SectionHead num="07" title="From discovery to scale in four moves." sub="No big-bang rollout. We earn the next step by proving the last one." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((p, i) => (
          <Reveal key={p.step} delay={i * 80} className="p-6 rounded-tight border" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-primary)", borderRadius: 12 }}>
            <div className="flex items-center justify-between mb-6">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--line-strong)", letterSpacing: "-0.02em" }}>{p.step}</span>
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: "var(--signal)", backgroundColor: "rgba(255,178,62,.12)" }}>{p.tag}</span>
            </div>
            <h3 className="mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--text-primary)" }}>{p.title}</h3>
            <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 08 · Case studies ────────────────────────────────────────────────────────
export function CaseStudies() {
  return (
    <Section id="case-studies">
      <SectionHead num="08" title="Real operations. Real recovery." sub="Every case below is a live mockup, built on the client's own data. Open one and see it run." />
      <div className="grid gap-6 lg:grid-cols-3">
        {CASE_STUDIES.map((c, i) => (
          <Reveal as="article" key={c.company} delay={i * 80} className="surface-card flex flex-col overflow-hidden" style={{ ["--accent" as any]: c.accent }}>
            <div className="p-7 flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="px-3 py-1 rounded-full text-[11px] uppercase whitespace-nowrap" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em", color: c.accent, backgroundColor: `${c.accent}1a` }}>
                  {c.tag}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>{c.company}</h3>
              <p className="text-[12px] mt-1 mb-5" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{c.industry}</p>

              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-[10px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--hold)" }}>Before</span>
                  <p className="text-[14px] leading-relaxed mt-1" style={{ color: "var(--text-muted)" }}>{c.before}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--cleared)" }}>After</span>
                  <p className="text-[14px] leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>{c.after}</p>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t" style={{ borderColor: "var(--line)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 36, letterSpacing: "-0.03em", color: c.accent, lineHeight: 1 }}>{c.metricBig}</div>
                <div className="text-[13px] mt-1.5" style={{ color: "var(--text-secondary)" }}>{c.metricLabel}</div>
                <div className="text-[12px] mt-3" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{c.proof}</div>
              </div>
            </div>

            <Link
              href={c.href}
              className="flex items-center justify-between px-7 py-4 border-t transition-colors"
              style={{ borderColor: "var(--line)", color: c.accent, fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}
            >
              Open the live mockup
              <Icon name="arrow" size={14} />
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link href="/mockups" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
          See all {mockups.length} mockups
          <Icon name="arrow" size={14} />
        </Link>
      </Reveal>
    </Section>
  );
}

// ── 09 · Testimonials ────────────────────────────────────────────────────────
export function Testimonials() {
  return (
    <Section id="testimonials" bg="var(--bg-secondary)">
      <SectionHead num="09" title="In the operators' words." sub="Illustrative, drawn from the deployments above." />
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal as="article" key={t.role} delay={i * 80} className="surface-card p-7 flex flex-col" style={{ backgroundColor: "var(--bg-primary)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, lineHeight: 0.5, color: "var(--signal)" }}>&ldquo;</span>
            <p className="mt-4 text-[16px] leading-relaxed flex-1" style={{ color: "var(--text-primary)" }}>{t.quote}</p>
            <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--line)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{t.name}</div>
              <div className="text-[12px] mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{t.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ── 10 · FAQ ─────────────────────────────────────────────────────────────────
export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHead num="10" title="The questions operators actually ask." sub="Straight answers. The rest we cover on the call." />
      <Faq />
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
            Book a 30 minute review. Show us the one workflow that hurts, and we will come back with a
            working prototype on your data in days. No slideware, no commitment.
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
