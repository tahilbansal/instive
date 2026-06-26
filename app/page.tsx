import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import Hero from "@/components/home/Hero";
import {
  TrustStrip,
  Functions,
  Features,
  Platform,
  SolutionsSection,
  Industries,
  Vision,
  ResultsSection,
  Process,
  CaseStudies,
  Testimonials,
  FaqSection,
  FinalCta,
} from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Intelligence that optimizes every move",
  description:
    "Instive AI builds intelligent systems for supply chain, procurement, logistics, warehousing and distribution. We read what your operation already knows, sense what is about to go wrong, and act before it costs you.",
  openGraph: {
    title: "Instive AI · Intelligence that optimizes every move",
    description:
      "AI for modern supply chains. Optimize routes, catch exceptions early, forecast demand, and recover cost. Working prototype on your data in days.",
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
        <Functions />
        <Features />
        <Platform />
        <SolutionsSection />
        <Industries />
        <Vision />
        <ResultsSection />
        <Process />
        <CaseStudies />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
