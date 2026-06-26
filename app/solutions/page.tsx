import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { SOLUTIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Start from the business problem. Eliminate manual invoice audits, catch carrier slips early, prevent stockouts, staff to tomorrow's volume, recover value from returns, and kill the manual client report.",
};

export default function SolutionsIndex() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Solutions"
          title={
            <>
              Start from the problem, <span className="text-gradient">not the product.</span>
            </>
          }
          sub="Every Instive solution targets one operational outcome you can measure. Pick the one that hurts most and we will prove it on your data."
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        />

        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 70} className="h-full">
                <Link href={`/solutions/${s.id}`} className="surface-card p-7 flex flex-col h-full" style={{ ["--accent" as any]: s.accent, textDecoration: "none" }}>
                  <div className="flex items-center justify-between">
                    <span style={{ width: 46, height: 46, borderRadius: 10, display: "grid", placeItems: "center", backgroundColor: `${s.accent}1a`, color: s.accent }}>
                      <Icon name={s.icon} size={22} />
                    </span>
                    <span className="text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", color: s.accent, letterSpacing: "0.05em" }}>
                      {s.domain}
                    </span>
                  </div>
                  <h2 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--text-primary)" }}>
                    {s.title}
                  </h2>
                  <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                    {s.short}
                  </p>
                  <div className="mt-5 pt-4 border-t flex flex-wrap gap-x-5 gap-y-2" style={{ borderColor: "var(--line)" }}>
                    {s.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        <b style={{ color: s.accent, fontFamily: "var(--font-display)" }}>{m.value}</b> {m.label}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand
          title="Not sure which to start with?"
          sub="Tell us the workflow that costs you most. We will point you at the fastest win and prove it in days."
          secondary={{ label: "Browse industries", href: "/industries" }}
        />
      </main>
      <Footer />
    </>
  );
}
