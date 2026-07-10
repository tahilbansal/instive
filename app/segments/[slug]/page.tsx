import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import UseCaseFlow from "@/components/site/UseCaseFlow";
import { SEGMENTS, segmentBySlug, solutionBySlug } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const seg = segmentBySlug(params.slug);
  if (!seg) return { title: "Segment" };
  return pageMeta({
    title: seg.name,
    description: seg.intro,
    path: `/segments/${seg.slug}`,
  });
}

export default function SegmentPage({ params }: { params: { slug: string } }) {
  const seg = segmentBySlug(params.slug);
  if (!seg) notFound();

  const solutions = seg.solutionIds.map(solutionBySlug).filter(Boolean);

  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Solutions by customer"
          accent={seg.accent}
          title={seg.headline}
          sub={seg.intro}
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: seg.name }]}
          secondary={{ label: "All customer segments", href: "/segments" }}
        />

        {/* Pains */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--hold)" }}>
                Where it hurts
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                The friction we hear about most.
              </h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {seg.pains.map((p, i) => (
                <Reveal key={p} delay={(i % 2) * 70} className="flex gap-4 p-6 rounded-tight border" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-primary)", borderRadius: 12 }}>
                  <span style={{ color: "var(--hold)", flexShrink: 0, marginTop: 2 }}>
                    <Icon name="bolt" size={20} />
                  </span>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The flow scroller — automation in action */}
        <UseCaseFlow segment={seg} />

        {/* Solutions that apply */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: seg.accent }}>
                What we deploy
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Solutions for {seg.name.toLowerCase()}.
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {solutions.map((s, i) => (
                <Reveal key={s!.id} delay={i * 70} className="h-full">
                  <Link href={`/solutions/${s!.id}`} className="surface-card p-6 flex flex-col h-full" style={{ ["--accent" as any]: s!.accent, textDecoration: "none" }}>
                    <span style={{ color: s!.accent }}>
                      <Icon name={s!.icon} size={24} />
                    </span>
                    <h3 className="mt-4 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--text-primary)" }}>
                      {s!.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{s!.short}</p>
                    <span className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-semibold" style={{ color: s!.accent, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Explore
                      <Icon name="arrow" size={13} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand title={`Automate the work for ${seg.name.toLowerCase()}.`} sub="A 30 minute call, a working prototype on your data in days, a pilot in weeks." secondary={{ label: "See the results", href: "/case-studies" }} />
      </main>
      <Footer />
    </>
  );
}
