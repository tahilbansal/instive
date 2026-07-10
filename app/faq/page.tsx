import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Faq from "@/components/home/Faq";
import { TESTIMONIALS } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "FAQ and perspectives",
  description:
    "Common questions about deploying AI in supply chain operations, plus representative perspectives from the floor on where the value is.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Resources"
          title={
            <>
              Questions, answered. <span className="text-gradient">Perspectives from the floor.</span>
            </>
          }
          sub="The questions operators ask before bringing AI into the operation, and the views we hear most across the industry."
          crumbs={[{ label: "Home", href: "/" }, { label: "Resources" }, { label: "FAQ and perspectives" }]}
          secondary={{ label: "See case studies", href: "/case-studies" }}
        />

        {/* Perspectives */}
        <section className="relative z-10 px-6 py-24 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>
                Perspectives from the floor
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)", maxWidth: 640 }}>
                What operators tell us.
              </h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <Reveal as="article" key={t.role} delay={i * 80} className="surface-card p-7 flex flex-col">
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 40, lineHeight: 0.5, color: "var(--signal)" }}>&ldquo;</span>
                  <p className="mt-4 text-[16px] leading-relaxed flex-1" style={{ color: "var(--text-primary)" }}>{t.quote}</p>
                  <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--line)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{t.name}</div>
                    <div className="text-[12px] mt-0.5" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{t.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-6">
              <p className="text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                Representative perspectives from supply chain operators, not attributed to specific clients.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative z-10 px-6 py-24" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-12">
              <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>
                FAQ
              </span>
              <h2 className="mt-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(24px, 3.6vw, 36px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
                The questions operators actually ask.
              </h2>
            </Reveal>
            <Faq />
          </div>
        </section>

        <CtaBand title="Still have a question?" sub="Tell us the workflow that costs you most. We will answer it with a working prototype on your data." secondary={{ label: "Browse solutions", href: "/solutions" }} />
      </main>
      <Footer />
    </>
  );
}
