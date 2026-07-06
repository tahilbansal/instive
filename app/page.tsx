import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "AI-powered process automation. Built for supply chain.",
  description:
    "AI-powered automation for supply chain operations. Automate document processing, invoice matching, order intake, and shipment tracking, without replacing the systems you already use.",
  openGraph: {
    title: "Instive AI · AI-powered process automation for supply chain",
    description:
      "Automate freight operations, procurement, and back-office workflows. Your team monitors, approves, and acts through one intelligent operations workspace.",
    type: "website",
  },
};

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
