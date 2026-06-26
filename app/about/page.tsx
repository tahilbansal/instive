import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";

export const metadata: Metadata = {
  title: "About",
  description:
    "Instive AI is an engineering-led studio building production AI for supply chain, logistics and warehousing. Instinct paired with the initiative to act.",
};

const STATS = [
  { n: "2021", l: "Founded", accent: "var(--text-primary)" },
  { n: "40+", l: "Engineers and researchers", accent: "var(--cleared)" },
  { n: "27", l: "Production deployments", accent: "var(--cleared)" },
  { n: "99.9%", l: "Pipeline uptime", accent: "var(--signal)" },
];

const VALUES = [
  { icon: "bolt", title: "Production or nothing", body: "A demo that cannot run on Monday morning is not a deliverable. We build for the live environment from day one." },
  { icon: "chart", title: "Measure the friction", body: "Throughput, travel distance, accuracy, idle time. If we cannot move a number you already track, we have not earned the deployment." },
  { icon: "arrow", title: "Velocity, both ways", body: "Work moves while you sleep and momentum compounds overnight, so progress never waits for a single timezone." },
];

const STEPS = [
  { idx: "01", title: "Map the friction", body: "A working session against your real stack, ERP, TMS and WMS, to name where disorder costs you the most." },
  { idx: "02", title: "Prototype the win", body: "We scope the first capability and prove it against your data before a line of production code ships." },
  { idx: "03", title: "Deploy to the core", body: "Secure pipelines and optimization services go live inside your operation, integrated with the systems you already run." },
  { idx: "04", title: "Compound", body: "Models retrain, agents widen their mandate, and the system gets sharper every cycle, overnight, every night." },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="About Instive AI"
          title={
            <>
              We turn supply chain entropy into <span className="text-gradient">autonomous order.</span>
            </>
          }
          sub="An engineering-led studio building production AI for supply chain, logistics and warehousing. Not prototypes, systems that run every day, measured against the metrics your operation already lives by."
          crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          secondary={{ label: "See our work", href: "/case-studies" }}
        />

        {/* Stats */}
        <section className="relative z-10 px-6 py-16 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 70} className="surface-card p-7 text-center">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em", color: s.accent, lineHeight: 1 }}>{s.n}</div>
                <div className="mt-2 text-[13px]" style={{ color: "var(--text-muted)" }}>{s.l}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>Our story</span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: "var(--text-primary)", maxWidth: 720 }}>
                Built by engineers who have lived on the warehouse floor.
              </h2>
            </Reveal>
            <div className="grid gap-10 lg:grid-cols-2">
              <Reveal className="space-y-4 text-[16px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>Instive began with a simple frustration. The supply chain world runs on extraordinary scale, yet its software still asks people to absorb the chaos by hand: clipboards, cycle-count freezes, and routing decisions made on <span style={{ color: "var(--signal)", fontWeight: 600 }}>instinct</span> alone.</p>
                <p>We started as a small group of optimization and ML engineers who believed the friction was not inevitable. It was <strong style={{ color: "var(--text-primary)" }}>un-modelled</strong>. Given the right data and the right systems, disorder resolves into something deterministic.</p>
              </Reveal>
              <Reveal delay={120} className="space-y-4 text-[16px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p>Today we engineer production-grade systems, from vision reconciliation to predictive routing to autonomous procurement, and deploy them directly into the operational core of growing enterprises.</p>
                <p>We do not hand over prototypes. We give that instinct the <span style={{ color: "var(--signal)", fontWeight: 600 }}>initiative</span> to act: secure pipelines and services that run every day, measured against the metrics your operation already lives by. The long-term goal is bigger still, one intelligence layer any supply chain team can switch on.</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>What we believe</span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Principles that survive contact with the floor.
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 80} className="surface-card p-7" style={{ backgroundColor: "var(--bg-primary)" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 10, display: "grid", placeItems: "center", backgroundColor: "rgba(255,178,62,.14)", color: "var(--signal)" }}>
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>{v.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{v.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>How we work</span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                From blueprint to compounding autonomy.
              </h2>
            </Reveal>
            <div className="grid gap-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.idx} delay={i * 70} className="surface-card p-7 grid gap-5 sm:grid-cols-[64px_1fr] items-start">
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--line-strong)", letterSpacing: "-0.02em" }}>{s.idx}</div>
                  <div>
                    <h3 className="mb-1.5" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>{s.title}</h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand title="Let us automate the friction away." sub="Book a blueprint session and we will map the first autonomous win for your operation." secondary={{ label: "See the results", href: "/case-studies" }} />
      </main>
      <Footer />
    </>
  );
}
