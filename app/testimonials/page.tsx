import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import PageHeader from "@/components/site/PageHeader";
import CtaBand from "@/components/site/CtaBand";
import Reveal from "@/components/site/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Testimonials",
  description: "Client and pilot feedback on wholesale, accounting and freight automation.",
  path: "/testimonials",
});

const testimonials = [
  { name: "Sehajpal Singh", role: "Chief Operating Officer", company: "Capital Supplies", location: "Texas, USA", workflow: "Quotation automation · Odoo", type: "Implementation", quote: "What used to take us an hour or two now takes just 5–10 minutes. The integration with Odoo has made our quotation process much simpler and helps us handle more requests." },
  { name: "Anil", role: "Wholesale grocery store owner", company: "", location: "", workflow: "Sivo · Wholesale ordering", type: "Implementation", quote: "Sivo has made it much easier to manage our wholesale orders, track them and keep our inventory organized. Having everything in one place makes a big difference in our day-to-day work." },
  { name: "Javid", role: "", company: "A One Wholesale", location: "", workflow: "Order integration · QuickBooks", type: "Implementation", quote: "Connecting our orders with QuickBooks makes managing the business much simpler. It cuts down on repetitive entry and keeps our ordering and accounting connected." },
  { name: "Louis Satana", role: "", company: "", location: "", workflow: "Email to TMS", type: "Pilot", quote: "The email-to-TMS pilot addresses a very practical problem. There is real potential to save time and effort by reducing the manual work involved in transferring information from emails." },
  { name: "Vikram Sharma", role: "Chief Operating Officer", company: "Velocity Services", location: "", workflow: "Load tender · TMS · Rate confirmation", type: "Pilot", quote: "Connecting load tenders, TMS entry and carrier rate confirmations in a single workflow is a promising approach. It could free up our team to focus more on freight operations instead of repetitive administrative tasks." },
];

export default function TestimonialsPage() {
  return (
    <>
      <Nav />
      <main className="relative" style={{ backgroundColor: "var(--bg-primary)" }}>
        <PageHeader eyebrow="Testimonials" title={<>What people say <span className="text-gradient">about our work.</span></>} sub="Perspectives from wholesale businesses and logistics professionals on making everyday operations simpler." crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]} secondary={{ label: "See our work", href: "/case-studies" }} />
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <p className="mb-8 text-sm" style={{color:"var(--text-muted)"}}>Proposed testimonial wording based on engagement summaries; not verified direct quotes.</p>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t,i) => (
                <Reveal key={t.name} delay={i * 60} as="article" className={"surface-card p-7 sm:p-9 flex flex-col gap-5 " + (i === 0 ? "md:col-span-2" : "")}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-widest" style={{color:"var(--signal)"}}>{t.workflow}</span>
                    <span className="text-xs border rounded-full px-3 py-1" style={{borderColor:"var(--line)",color:"var(--text-secondary)"}}>{t.type}</span>
                  </div>
                  <span aria-hidden="true" className="text-5xl leading-none" style={{color:"var(--signal)"}}>“</span>
                  <p className={"leading-relaxed font-medium " + (i === 0 ? "text-2xl sm:text-3xl max-w-4xl" : "text-lg")} style={{color:"var(--text-primary)"}}>{t.quote}</p>
                  <div className="mt-auto pt-5 border-t" style={{borderColor:"var(--line)"}}>
                    <div>
                      <p className="font-semibold" style={{color:"var(--text-primary)"}}>{t.name}</p>
                      <p className="text-sm" style={{color:"var(--text-secondary)"}}>{[t.role,t.company].filter(Boolean).join(" · ")}</p>
                      {t.location && <p className="text-xs mt-1" style={{color:"var(--text-muted)"}}>{t.location}</p>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <CtaBand title="Let’s make your operations simpler." sub="Explore a pilot around your existing systems and a clearly defined business outcome." secondary={{label:"Explore integrations",href:"/integrations"}} />
      </main>
      <Footer />
    </>
  );
}
