import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import MediaFrame from "@/components/site/MediaFrame";
import { INDUSTRIES, industryBySlug, solutionBySlug } from "@/lib/site";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const ind = industryBySlug(params.slug);
  if (!ind) return { title: "Industry" };
  return { title: ind.name, description: ind.intro };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const ind = industryBySlug(params.slug);
  if (!ind) notFound();

  const solutions = ind.solutionIds.map(solutionBySlug).filter(Boolean);

  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow={`Industries / ${ind.name}`}
          accent={ind.accent}
          title={ind.headline}
          sub={ind.intro}
          crumbs={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: ind.name }]}
          secondary={{ label: "All industries", href: "/industries" }}
        />

        {/* Image + stat */}
        <section className="relative z-10 px-6 py-20 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <Reveal className="relative">
              <span className="glow-blob" style={{ width: 320, height: 320, background: ind.accent, top: "8%", left: "-5%", opacity: 0.3 }} />
              <MediaFrame src={ind.image} alt={ind.alt} label={ind.name} variant="photo" accent={ind.accent} width={1376} height={774} sizes="(max-width: 1024px) 100vw, 60vw" />
            </Reveal>
            <Reveal delay={120}>
              <div className="surface-card p-8" style={{ ["--accent" as any]: ind.accent }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px, 6vw, 60px)", letterSpacing: "-0.03em", color: ind.accent, lineHeight: 1 }}>
                  {ind.stat.big}
                </div>
                <div className="mt-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>{ind.stat.label}</div>
                <p className="mt-6 pt-6 border-t text-[14px] leading-relaxed" style={{ borderColor: "var(--line)", color: "var(--text-muted)" }}>
                  Representative of Instive deployments in {ind.name.toLowerCase()}. Your baseline sets the target.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

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
              {ind.pains.map((p, i) => (
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

        {/* Solutions that apply */}
        <section className="relative z-10 px-6 py-24" >
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: ind.accent }}>
                What we deploy
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                Solutions for {ind.name.toLowerCase()}.
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

        <CtaBand title={`Bring intelligence to ${ind.name.toLowerCase()}.`} sub="A 30 minute call, a working prototype on your data in days, a pilot in weeks." secondary={{ label: "See the results", href: "/case-studies" }} />
      </main>
      <Footer />
    </>
  );
}
