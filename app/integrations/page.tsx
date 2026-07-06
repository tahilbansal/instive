import type { Metadata } from "next";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { IntegrationGrid } from "@/components/site/Integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Instive connects to the systems you already run: SAP, NetSuite, Dynamics, CargoWise, QuickBooks, Outlook, Gmail and more. No rip and replace. We connect to any system with an API.",
};

const CONNECT_POINTS = [
  {
    icon: "plug",
    title: "Read-only to start",
    body: "We connect through an API where one exists, across ERP, TMS, WMS and most logistics tools, or a flat file export if that is simpler.",
  },
  {
    icon: "shield",
    title: "No rip and replace",
    body: "Our agents ride alongside the systems you already run. There is nothing to migrate and nothing to tear out.",
  },
  {
    icon: "bolt",
    title: "Any system with an API",
    body: "Don't see yours on the wall? If it has an API or can drop a file, we can connect to it. Tell us what you run.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader
          eyebrow="Integrations"
          title={
            <>
              Integrates with the systems <span className="text-gradient">you already use.</span>
            </>
          }
          sub="Instive rides alongside your stack. We read the data your systems produce, act on it, and write back, without replacing a thing."
          crumbs={[{ label: "Home", href: "/" }, { label: "Integrations" }]}
        />

        <section className="relative z-10 px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <IntegrationGrid />
            </Reveal>

            <div className="grid gap-6 md:grid-cols-3 mt-20">
              {CONNECT_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 80} className="surface-card p-7 h-full" style={{ ["--accent" as any]: "var(--signal)" }}>
                  <span style={{ color: "var(--signal)" }}>
                    <Icon name={p.icon} size={24} />
                  </span>
                  <h3 className="mt-5 mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--text-primary)" }}>
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {p.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          title="Connect the tools you already run."
          sub="Tell us your stack. We will confirm the connectors and show your own data in the workspace."
          secondary={{ label: "Browse solutions", href: "/solutions" }}
        />
      </main>
      <Footer />
    </>
  );
}
