import { mockups, SIDECARS, SIDECAR_META } from "@/data/mockups";
import MockupGallery from "@/components/MockupGallery";
import SectionCTA from "@/components/SectionCTA";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import { BookDemoButton } from "@/components/site/BookDemo";

export const metadata = {
  title: "See Instive AI in your world",
  description:
    "Every mockup was built for a real logistics company, showing exactly what their operations look like with an AI layer on top. No generic demos.",
};

export default function MockupsPage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>

      {/* Hero section */}
      <section
        className="relative px-6"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="max-w-7xl mx-auto pt-20 pb-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
         <div className="space-y-10">
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
              Each mockup is built around a real logistics operation's data
              shape, showing exactly what an AI layer looks like on top. No
              generic demos, and deployable in weeks.
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
            <BookDemoButton
              source="mockups-hero"
              className="btn-signal inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold"
              style={{ borderRadius: 8 }}
            >
              Request yours
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BookDemoButton>
          </div>
         </div>

          {/* Right: live catalogue panel */}
          <div className="relative">
            <span className="glow-blob" style={{ width: 360, height: 320, background: "var(--signal)", top: "0%", right: "-6%", opacity: 0.2 }} />
            <div className="glass rounded-tight p-6" style={{ borderRadius: 16 }}>
              <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: "var(--line)" }}>
                <span className="flex items-center gap-2 text-[11px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-secondary)" }}>
                  <span className="live-dot status-pulse" />
                  Catalogue · live
                </span>
                <span className="text-[11px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                  {mockups.length} builds
                </span>
              </div>
              <ul className="space-y-1">
                {SIDECARS.map((s) => {
                  const count = mockups.filter((m) => m.sidecar === s).length;
                  const accent = SIDECAR_META[s].accent;
                  return (
                    <li key={s} className="flex items-center gap-3 py-2.5 px-2 rounded-tight" style={{ borderRadius: 8 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: accent, boxShadow: `0 0 0 3px ${accent}22`, flexShrink: 0 }} />
                      <span className="flex-1 text-[14px]" style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                        {s}
                      </span>
                      <span className="text-[12px] px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-mono)", color: count ? accent : "var(--text-muted)", backgroundColor: count ? `${accent}1a` : "transparent" }}>
                        {count || "soon"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
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
      </main>
      <Footer />
    </>
  );
}
