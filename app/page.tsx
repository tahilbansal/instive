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
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
