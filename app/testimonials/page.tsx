import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Testimonials & project stories",
  description: "Explore wholesale, ERP, accounting and freight automation projects and pilots.",
  path: "/testimonials",
});

const projects = [
  { title: "Quote to Odoo", sector: "Wholesale · ERP", body: "Automating quotation processing inside an existing Odoo workflow.", result: "1–2 hours → 5–10 minutes", detail: "Reported quotation processing time.", status: "Implementation" },
  { title: "Sivo wholesale ordering", sector: "Wholesale · Order management", body: "A simpler way for a wholesale grocery business to manage orders, track their progress and organize inventory.", result: "One connected workflow", detail: "Ordering, tracking and inventory.", status: "Implementation" },
  { title: "Orders to QuickBooks", sector: "Wholesale · Accounting", body: "An order integration connecting wholesale operations to QuickBooks, designed to reduce duplicate data entry.", result: "Connected order data", detail: "Order management and accounting integration.", status: "Implementation" },
  { title: "Email to TMS", sector: "Freight · Logistics", body: "A pilot connecting incoming email to a transportation management system, targeting less manual work and faster processing.", result: "Less manual entry", detail: "Pilot objective; results not yet confirmed.", status: "Pilot in development" },
  { title: "Load tender to rate confirmation", sector: "Freight · Carrier operations", body: "A pilot to capture load tenders, enter them into the TMS and send rate confirmations to carriers.", result: "Tender → TMS → carrier", detail: "Pilot objective; results not yet confirmed.", status: "Pilot in development" },
];

export default function TestimonialsPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader eyebrow="Project stories & testimonials" title={<>Real workflows. <span className="text-gradient">Practical impact.</span></>} sub="From wholesale order management to freight operations, explore the work behind our approach to automation." crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} secondary={{ label: "See our work", href: "/case-studies" }} />
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-3" style={{color:"var(--text-primary)"}}>Project highlights</h2>
            <p className="mb-10" style={{color:"var(--text-secondary)"}}>Implementation summaries and pilot objectives. Attributed client feedback will appear here once approved.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p,i) => (
                <Reveal key={p.title} delay={i * 60} className={"surface-card p-8 flex flex-col gap-4 " + (i === 0 ? "md:col-span-2" : "")}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-widest" style={{color:"var(--signal)"}}>{p.sector}</span>
                    <span className="text-xs border rounded-full px-3 py-1" style={{borderColor:"var(--line)",color:"var(--text-secondary)"}}>{p.status}</span>
                  </div>
                  <h3 className="text-2xl font-semibold" style={{color:"var(--text-primary)"}}>{p.title}</h3>
                  <p className="leading-relaxed" style={{color:"var(--text-secondary)"}}>{p.body}</p>
                  <div className="mt-auto pt-4 border-t" style={{borderColor:"var(--line)"}}>
                    <p className="text-2xl font-semibold" style={{color:"var(--signal)"}}>{p.result}</p>
                    <p className="text-sm mt-1" style={{color:"var(--text-muted)"}}>{p.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <CtaBand title="What could we automate for you?" sub="Explore a pilot around your existing systems and a clearly defined business outcome." secondary={{label:"Explore integrations",href:"/integrations"}} />
      </main>
      <Footer />
    </>
  );
}
