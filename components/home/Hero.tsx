import Link from "next/link";
import { BookDemoButton } from "@/components/site/BookDemo";

const kw = { color: "var(--signal)", fontWeight: 600 };

export default function Hero() {
  return (
    <section className="radiant relative z-10 px-6 border-b overflow-hidden" style={{ borderColor: "var(--line)" }}>
      <span className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto pt-16 pb-20 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center" style={{ zIndex: 1 }}>
        {/* Left — message */}
        <div>
          <div className="flex items-center gap-3 mb-7">
            <span className="w-11 h-px" style={{ backgroundColor: "var(--signal)" }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>
              AI for modern supply chains
            </span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(40px, 6.6vw, 78px)", lineHeight: 0.98, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
            Intelligence that
            <br />
            optimizes <span className="text-gradient">every move.</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Instive AI builds intelligent systems that transform how supply chain, procurement,
            logistics, warehousing and distribution run. We read what your operation already knows,
            move on <span style={kw}>instinct</span>, and take the <span style={kw}>initiative</span>{" "}
            before a small signal becomes a costly miss.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <BookDemoButton source="hero" className="btn-signal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Book a demo
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BookDemoButton>
            <Link href="/solutions" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
              Explore solutions
            </Link>
          </div>
        </div>

        {/* Right — command center, borderless and blended */}
        <div className="relative">
          <span className="glow-blob" style={{ width: 420, height: 360, background: "var(--signal)", top: "-2%", right: "-6%", opacity: 0.22 }} />
          <div className="blend-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
