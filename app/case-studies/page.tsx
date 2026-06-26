import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { CASE_STUDIES } from "@/lib/site";
import { mockups } from "@/data/mockups";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Real operations, real recovery. Freight billing audits, carrier control and demand planning, each built on a client's own data and live to explore.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Case studies"
          title={
            <>
              Real operations. <span className="text-gradient">Real recovery.</span>
            </>
          }
          sub="Each study is a live mockup, built on the client's own data. Open one and watch the intelligence run."
          crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "Case studies" }]}
          secondary={{ label: `See all ${mockups.length} mockups`, href: "/mockups" }}
        />

        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.company} delay={i * 80} className="h-full">
                <div className="surface-card flex flex-col overflow-hidden h-full" style={{ ["--accent" as any]: c.accent }}>
                  <div className="p-7 flex-1 flex flex-col">
                    <span className="px-3 py-1 rounded-full text-[11px] uppercase self-start" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.05em", color: c.accent, backgroundColor: `${c.accent}1a` }}>
                      {c.tag}
                    </span>
                    <h2 className="mt-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>{c.company}</h2>
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
                  <Link href={c.href} className="flex items-center justify-between px-7 py-4 border-t" style={{ borderColor: "var(--line)", color: c.accent, fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Open the live mockup
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/mockups" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
              Explore all {mockups.length} mockups
              <Icon name="arrow" size={14} />
            </Link>
          </Reveal>
        </section>

        <CtaBand title="Your operation could be next." sub="Show us the workflow that costs you most and we will build a mockup on your data in 48 hours." secondary={{ label: "Browse solutions", href: "/solutions" }} />
      </main>
      <Footer />
    </>
  );
}
