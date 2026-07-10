import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Instive AI is an engineering-led studio building production AI for supply chain, logistics and warehousing. Instinct paired with the initiative to act.",
  path: "/about",
});

const TRIAD = [
  { n: "01", word: "Instinct", line: "We sense what is about to go wrong." },
  { n: "02", word: "Innovation", line: "Production AI, built to how you run." },
  { n: "03", word: "Initiative", line: "We move first, before it costs you." },
];

const VALUES = [
  { icon: "bolt", title: "Production or nothing", body: "If it cannot run on Monday morning, it is not a deliverable." },
  { icon: "chart", title: "Measure the friction", body: "If we cannot move a number you already track, we have not earned it." },
  { icon: "arrow", title: "Velocity, both ways", body: "Work moves while you sleep. Momentum compounds overnight." },
];

const STEPS = [
  { idx: "01", title: "Map the friction", body: "A working session on your real stack, to find where disorder costs most." },
  { idx: "02", title: "Prototype the win", body: "We prove the first capability on your data before production code ships." },
  { idx: "03", title: "Deploy to the core", body: "Secure services go live inside your operation, wired to the systems you run." },
  { idx: "04", title: "Compound", body: "Models retrain and agents widen their mandate, sharper every cycle." },
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
          sub="An engineering-led studio building production AI for supply chain. Not prototypes, systems that run every day."
          crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
          secondary={{ label: "See our work", href: "/case-studies" }}
        />

        {/* The name */}
        <section className="relative z-10 px-6 py-28 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>The name</span>
              <h2 className="mt-6" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(30px, 5vw, 52px)", letterSpacing: "-0.03em", color: "var(--text-primary)", lineHeight: 1.08 }}>
                Instinct, paired with the <span className="text-gradient">initiative to act</span>.
              </h2>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto mt-20 grid gap-14 sm:grid-cols-3">
            {TRIAD.map((t, i) => (
              <Reveal key={t.word} delay={i * 90} className="text-center">
                <div className="text-[12px]" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--signal)" }}>{t.n}</div>
                <div className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(26px, 3vw, 32px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{t.word}</div>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{t.line}</p>
              </Reveal>
            ))}
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
