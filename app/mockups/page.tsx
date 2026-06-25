import Link from "next/link";
import { mockups } from "@/data/mockups";
import MockupGallery from "@/components/MockupGallery";
import SectionCTA from "@/components/SectionCTA";
import ThemeToggle from "@/components/ThemeToggle";

const MAILTO = "mailto:tahil@instiveai.com?subject=Mockup Request";

export const metadata = {
  title: "See Instive AI in your world — Mockups",
  description:
    "Every mockup was built for a real logistics company, showing exactly what their operations look like with an AI layer on top. No generic demos.",
};

export default function MockupsPage() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Navigation bar */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          backgroundColor: "rgba(14, 26, 36, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "var(--line)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            style={{ color: "var(--text-primary)", textDecoration: "none" }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: "var(--signal)",
                color: "#0E1A24",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              i
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Instive<span style={{ color: "var(--signal)" }}>.ai</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero section */}
      <section
        className="relative px-6"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="max-w-7xl mx-auto pt-24 pb-20 space-y-12">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span
              className="flex-shrink-0 w-12 h-px"
              style={{ backgroundColor: "var(--signal)" }}
            />
            <span
              className="text-xs font-mono font-semibold uppercase"
              style={{
                color: "var(--signal)",
                letterSpacing: "0.18em",
              }}
            >
              Showcase · AI Mockups
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-7">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 76px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
            >
              See Instive AI
              <br />
              <span style={{ color: "var(--signal)" }}>in your world.</span>
            </h1>

            <p
              className="text-lg leading-relaxed max-w-3xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Every mockup below was built for a real logistics company —
              showing exactly what their operations would look like with an AI
              layer on top. No generic demos. Built for them, deployable in
              weeks.
            </p>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-10"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <div>
              Mockups
              <span
                style={{
                  display: "block",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textTransform: "none",
                  marginTop: 4,
                }}
              >
                {mockups.length}
              </span>
            </div>
            <div>
              Categories
              <span
                style={{
                  display: "block",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textTransform: "none",
                  marginTop: 4,
                }}
              >
                7
              </span>
            </div>
            <div>
              Build time
              <span
                style={{
                  display: "block",
                  color: "var(--signal)",
                  fontFamily: "var(--font-display)",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  textTransform: "none",
                  marginTop: 4,
                }}
              >
                48h
              </span>
            </div>
          </div>

          {/* CTA button */}
          <div>
            <a
              href={MAILTO}
              className="btn-signal inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
              style={{ borderRadius: 8 }}
            >
              Request yours
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          className="max-w-7xl mx-auto"
          style={{
            height: 1,
            background: "linear-gradient(90deg, var(--signal), var(--line), transparent)",
          }}
        />
      </section>

      {/* Gallery section */}
      <section
        className="relative px-6 py-20"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <MockupGallery mockups={mockups} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative px-6 pb-24" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="max-w-7xl mx-auto">
          <SectionCTA />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--line)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  backgroundColor: "var(--signal)",
                  color: "#0E1A24",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                i
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--text-primary)",
                }}
              >
                Instive<span style={{ color: "var(--signal)" }}>.ai</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Intelligence in motion. Autonomous agents for supply chain,
              logistics, and warehousing.
            </p>
          </div>

          <p
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            © {new Date().getFullYear()} Instive AI
          </p>
        </div>
      </footer>
    </main>
  );
}
