import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import {
  TrustStrip,
  ProductShowcaseSection,
  ProofBar,
  Pillars,
  Platform,
  SolutionsSection,
  IntegrationsSection,
  Industries,
  FinalCta,
} from "@/components/home/sections";

export const metadata: Metadata = pageMeta({
  title: "AI-powered process automation. Built for supply chain.",
  description:
    "AI-powered automation for supply chain operations. Automate document processing, invoice matching, order intake, and shipment tracking, without replacing the systems you already use.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <Hero />
        <TrustStrip />
        <ProductShowcaseSection />
        <ProofBar />
        <Pillars />
        <Platform />
        <SolutionsSection />
        <IntegrationsSection />
        <Industries />
        <section className="relative z-10 px-6 py-12 text-center" style={{borderTop:"1px solid var(--line)"}}>
          <h2 className="text-2xl font-semibold mb-3" style={{color:"var(--text-primary)"}}>Real workflows. Practical impact.</h2>
          <a href="/testimonials" className="font-semibold" style={{color:"var(--signal)"}}>Explore project stories and testimonials →</a>
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
