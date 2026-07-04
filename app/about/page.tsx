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

const BRAND_PILLARS = [
  { icon: "brain", word: "Intuitive instinct", body: "We read what your systems already know and sense what is about to go wrong, the way a seasoned operator would, at the scale of every shipment and SKU." },
  { icon: "bolt", word: "Active innovation", body: "Production AI engineered to your operation, not a demo that cannot run on Monday. New capability lands where your team already works." },
  { icon: "arrow", word: "Instant initiative", body: "The initiative to act before it costs you: drafted disputes, staffed surges, flagged exceptions, with a person in the loop where it matters." },
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

        {/* Brand definition */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>What Instive means</span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", color: "var(--text-primary)", maxWidth: 900, lineHeight: 1.12 }}>
                Driven by <span className="text-gradient">intuitive instinct</span>, powered by <span className="text-gradient">active innovation</span>, and executed with <span className="text-gradient">instant initiative</span>.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed" style={{ color: "var(--text-secondary)", maxWidth: 720 }}>
                The name is the product. Instive senses what is about to go wrong, engineers the intelligence to see it, and takes the initiative to act before it costs you.
              </p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {BRAND_PILLARS.map((p, i) => (
                <Reveal key={p.word} delay={i * 80} className="surface-card p-7">
                  <span style={{ width: 46, height: 46, borderRadius: 10, display: "grid", placeItems: "center", backgroundColor: "rgba(255,178,62,.14)", color: "var(--signal)" }}>
                    <Icon name={p.icon} size={22} />
                  </span>
                  <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--text-primary)" }}>{p.word}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p.body}</p>
                </Reveal>
              ))}
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
