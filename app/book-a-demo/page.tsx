import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Reveal from "@/components/site/Reveal";
import LeadForm from "@/components/site/LeadForm";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Book a demo",
  description:
    "Tell us the workflow that costs you most. We come back with a working prototype on your data — a 30 minute review, no slide deck.",
  path: "/book-a-demo",
});

const STEPS = [
  {
    n: "01",
    title: "You send the details",
    body: "Four fields and the workflow that hurts. Under a minute.",
  },
  {
    n: "02",
    title: "We call within one business day",
    body: "A 30 minute review at the time you picked. No deck, no discovery theatre.",
  },
  {
    n: "03",
    title: "You see it running on your data",
    body: "We come back with a working prototype of the capability, not an estimate.",
  },
];

const ASSURANCES = [
  "Your details stay with the engineering team. We never sell or share them.",
  "One call, then you decide. No drip campaign, no automated follow-up.",
  "Unsubscribe or ask us to delete your record at any time.",
];

export default function BookADemoPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <section className="radiant relative z-10 px-6 pt-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <nav
              className="mb-8 flex items-center gap-2 text-[12px]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
            >
              <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
              <span style={{ opacity: 0.5 }}>/</span>
              <span style={{ color: "var(--text-secondary)" }}>Book a demo</span>
            </nav>

            <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-start">
              {/* Pitch */}
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="live-dot status-pulse" />
                    <span
                      className="text-[12px] uppercase"
                      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}
                    >
                      30 minute review
                    </span>
                  </div>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(32px, 5vw, 54px)",
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                      lineHeight: 1.06,
                    }}
                  >
                    Show us the workflow that <span className="text-gradient">costs you most</span>.
                  </h1>
                  <p className="mt-6 text-[17px] leading-relaxed max-w-lg" style={{ color: "var(--text-secondary)" }}>
                    Tell us where the disorder is and we will come back with a working prototype
                    on your data. No slide deck, no discovery phase you have to pay for.
                  </p>
                </Reveal>

                <Reveal delay={90}>
                  <div className="mt-12 grid gap-7">
                    {STEPS.map((s) => (
                      <div key={s.n} className="flex gap-5">
                        <div
                          className="text-[12px] pt-1"
                          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--signal)", flexShrink: 0 }}
                        >
                          {s.n}
                        </div>
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 600,
                              fontSize: 17,
                              letterSpacing: "-0.01em",
                              color: "var(--text-primary)",
                            }}
                          >
                            {s.title}
                          </div>
                          <p className="mt-1.5 text-[14px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {s.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={140}>
                  <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
                    <div
                      className="text-[11px] uppercase mb-4"
                      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-muted)" }}
                    >
                      How we handle your details
                    </div>
                    <ul className="grid gap-3">
                      {ASSURANCES.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 3, flexShrink: 0 }}>
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {a}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-[13px]" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      Prefer email?{" "}
                      <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--signal)" }}>
                        {CONTACT_EMAIL}
                      </a>
                    </p>
                  </div>
                </Reveal>
              </div>

              {/* Form */}
              <Reveal delay={60}>
                <LeadForm />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
