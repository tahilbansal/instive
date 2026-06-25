import Link from "next/link";
import { mockups } from "@/data/mockups";
import MockupGallery from "@/components/MockupGallery";
import SectionCTA from "@/components/SectionCTA";

const MAILTO = "mailto:tahil@instiveai.com?subject=Mockup Request";

export const metadata = {
  title: "See Instive AI in your world — Mockups",
  description:
    "Every mockup was built for a real logistics company, showing exactly what their operations look like with an AI layer on top. No generic demos.",
};

export default function MockupsPage() {
  return (
    <main className="min-h-screen bg-ink">
      {/* Minimal top bar */}
      <header className="border-b border-hairline">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-white/90 hover:text-white"
          >
            Instive AI
          </Link>
          <a
            href={MAILTO}
            className="text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            Request yours →
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {/* Hero */}
        <section className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            See Instive AI in your world
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Every mockup below was built for a real logistics company — showing
            exactly what their operations would look like with an AI layer on
            top. No generic demos. Built for them, deployable in weeks.
          </p>
          <a
            href={MAILTO}
            className="mt-8 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
          >
            Request yours →
          </a>
        </section>

        {/* Filter + grid + modal */}
        <div className="mt-14">
          <MockupGallery mockups={mockups} />
        </div>

        {/* Bottom CTA */}
        <SectionCTA />
      </div>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-white/35">
          © {new Date().getFullYear()} Instive AI · Intelligence in motion for
          supply chain & logistics.
        </div>
      </footer>
    </main>
  );
}
