import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { INDUSTRIES } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Industries",
  description:
    "AI built for how your operation actually runs: manufacturing, distribution, retail, logistics providers, warehousing and supply chain teams.",
  path: "/industries",
});

export default function IndustriesIndex() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Industries"
          title={
            <>
              Built for <span className="text-gradient">your operation.</span>
            </>
          }
          sub="The vocabulary is yours: lanes, AWBs, SKUs, crews. So is the signal we catch. Pick your world and see what changes."
          crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        />

        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 3) * 70} className="h-full">
                <Link href={`/industries/${ind.slug}`} className="surface-card overflow-hidden flex flex-col h-full" style={{ ["--accent" as any]: ind.accent, textDecoration: "none" }}>
                  <div className="media-photo relative" style={{ aspectRatio: "16 / 9" }}>
                    <Image src={ind.image} alt={ind.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    <span className="media-grade" />
                    <span className="absolute top-3 left-3" style={{ width: 38, height: 38, borderRadius: 9, display: "grid", placeItems: "center", backgroundColor: `${ind.accent}cc`, color: "#0E1A24", zIndex: 3 }}>
                      <Icon name={ind.icon} size={20} />
                    </span>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h2 className="mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--text-primary)" }}>
                      {ind.name}
                    </h2>
                    <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                      {ind.line}
                    </p>
                    <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                      <span className="text-[13px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        <b style={{ color: ind.accent, fontFamily: "var(--font-display)" }}>{ind.stat.big}</b> {ind.stat.label}
                      </span>
                      <Icon name="arrow" size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand title="See it in your world." sub="Tell us your industry and the workflow that costs you most. We will build a prototype on your data." secondary={{ label: "Browse solutions", href: "/solutions" }} />
      </main>
      <Footer />
    </>
  );
}
