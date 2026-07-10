import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { SOLUTIONS, solutionBySlug, agentByName, CASE_STUDIES } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = solutionBySlug(params.slug);
  if (!s) return { title: "Solution" };
  return pageMeta({
    title: s.title,
    description: s.short,
    path: `/solutions/${s.id}`,
  });
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = solutionBySlug(params.slug);
  if (!s) notFound();

  const steps = [
    { tag: "The problem", body: s.problem, color: "var(--hold)" },
    { tag: "Operational impact", body: s.impact, color: "var(--hold)" },
    { tag: "What Instive does", body: s.solution, color: s.accent },
  ];
  const agents = s.agents.map(agentByName).filter(Boolean);
  const related = SOLUTIONS.filter((x) => x.id !== s.id).slice(0, 3);
  const caseMatch = CASE_STUDIES.find((c) => c.accent === s.accent);

  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow={s.domain}
          accent={s.accent}
          title={s.title}
          sub={s.short}
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: s.title }]}
          secondary={{ label: "All solutions", href: "/solutions" }}
        />

        {/* Problem to action */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3">
            {steps.map((st, i) => (
              <Reveal key={st.tag} delay={i * 80} className="surface-card p-7" style={{ ["--accent" as any]: s.accent }}>
                <div className="text-[11px] uppercase mb-3" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: st.color }}>
                  {st.tag}
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {st.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="relative z-10 px-6 py-20 border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-10 text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em", color: s.accent }}>
              Measurable outcome
            </Reveal>
            <div className="grid gap-10 sm:grid-cols-3">
              {s.metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 80}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em", color: s.accent, lineHeight: 1 }}>
                    {m.value}
                  </div>
                  <div className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                    {m.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Powered by + case study */}
        {(agents.length > 0 || caseMatch) && (
          <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
            <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2">
              {agents.length > 0 && (
                <Reveal>
                  <div className="text-[12px] uppercase mb-5" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
                    Powered by
                  </div>
                  <div className="flex flex-col gap-4">
                    {agents.map((a) => (
                      <Link key={a!.name} href={a!.href ?? "/services"} className="surface-card p-6 flex items-center gap-4" style={{ ["--accent" as any]: a!.accent, textDecoration: "none" }}>
                        <span style={{ width: 48, height: 48, borderRadius: 12, display: "grid", placeItems: "center", backgroundColor: `${a!.accent}1a`, color: a!.accent, flexShrink: 0 }}>
                          <Icon name={a!.icon} size={24} />
                        </span>
                        <div className="flex-1">
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>{a!.name}</div>
                          <div className="text-[14px]" style={{ color: "var(--text-secondary)" }}>{a!.job}</div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold whitespace-nowrap" style={{ color: a!.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {a!.href ? "See it live" : "Meet the agent"}
                          <Icon name="arrow" size={13} />
                        </span>
                      </Link>
                    ))}
                  </div>
                </Reveal>
              )}

              {caseMatch && (
                <Reveal delay={120}>
                  <div className="text-[12px] uppercase mb-5" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em", color: "var(--text-muted)" }}>
                    Proof in the field
                  </div>
                  <div className="surface-card p-7" style={{ ["--accent" as any]: caseMatch.accent }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>{caseMatch.company}</div>
                    <div className="text-[12px] mt-1 mb-4" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{caseMatch.industry}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, color: caseMatch.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>{caseMatch.metricBig}</div>
                    <div className="text-[14px] mt-1.5 mb-4" style={{ color: "var(--text-secondary)" }}>{caseMatch.metricLabel}</div>
                    <Link href={caseMatch.href} className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: caseMatch.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Open the live mockup
                      <Icon name="arrow" size={13} />
                    </Link>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* Related solutions */}
        <section className="relative z-10 px-6 py-24" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-10">
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(22px, 3.4vw, 32px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Related solutions
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 70} className="h-full">
                  <Link href={`/solutions/${r.id}`} className="surface-card p-6 flex flex-col h-full" style={{ ["--accent" as any]: r.accent, textDecoration: "none" }}>
                    <span style={{ color: r.accent }}>
                      <Icon name={r.icon} size={24} />
                    </span>
                    <h3 className="mt-4 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--text-primary)" }}>
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{r.short}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand title={`Put ${s.domain.toLowerCase()} on autopilot.`} sub="A 30 minute call, a working prototype on your data in days, a pilot in weeks." secondary={{ label: "See the results", href: "/case-studies" }} />
      </main>
      <Footer />
    </>
  );
}
