import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { SEGMENTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions by customer segment",
  description:
    "AI built for your role in the chain: freight forwarders, customs brokers, shippers and importers, carriers, freight brokers and 3PLs. See the workflows we automate for each.",
};

export default function SegmentsIndex() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Solutions by customer"
          title={
            <>
              Built for <span className="text-gradient">who you are.</span>
            </>
          }
          sub="A freight forwarder, a customs broker and a carrier each recognize the work differently. Pick your role and watch the exact workflows we automate for it."
          crumbs={[{ label: "Home", href: "/" }, { label: "Solutions", href: "/solutions" }, { label: "By customer" }]}
          secondary={{ label: "Solutions by outcome", href: "/solutions" }}
        />

        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SEGMENTS.map((seg, i) => (
              <Reveal key={seg.slug} delay={(i % 3) * 70} className="h-full">
                <Link href={`/segments/${seg.slug}`} className="surface-card overflow-hidden flex flex-col h-full" style={{ ["--accent" as any]: seg.accent, textDecoration: "none" }}>
                  <div className="media-photo relative" style={{ aspectRatio: "16 / 9" }}>
                    <Image src={seg.image} alt={seg.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" style={{ objectFit: "cover" }} />
                    <span className="media-grade" />
                    <span className="absolute top-3 left-3" style={{ width: 38, height: 38, borderRadius: 9, display: "grid", placeItems: "center", backgroundColor: `${seg.accent}cc`, color: "#0E1A24", zIndex: 3 }}>
                      <Icon name={seg.icon} size={20} />
                    </span>
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h2 className="mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "var(--text-primary)" }}>
                      {seg.name}
                    </h2>
                    <p className="text-[15px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                      {seg.line}
                    </p>
                    <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--line)" }}>
                      <span className="text-[13px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        <b style={{ color: seg.accent, fontFamily: "var(--font-display)" }}>{seg.stat.big}</b> {seg.stat.label}
                      </span>
                      <Icon name="arrow" size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBand
          title="See your workflows, automated."
          sub="Tell us your role and the workflow that costs you most. We will build a prototype on your data in days."
          secondary={{ label: "Browse solutions by outcome", href: "/solutions" }}
        />
      </main>
      <Footer />
    </>
  );
}
