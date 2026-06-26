"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MediaFrame from "@/components/site/MediaFrame";
import { BookDemoButton } from "@/components/site/BookDemo";
import { HERO_STATS } from "@/lib/site";

const TICKER = [
  { tone: "#FF6B5E", text: "AWB-0934 LAX flagged: chargeable weight overstated, $4,210 recoverable" },
  { tone: "#FFB23E", text: "Lane TPA-04: carrier sliding, flagged three weeks early" },
  { tone: "#FFB23E", text: "SKU-44820 crosses reorder point in 6 days, ahead of cycle" },
  { tone: "#5BD6A6", text: "Savannah 06:00 wave +16% inbound, crew staffed ahead" },
  { tone: "#5BD6A6", text: "Return RET-1183 back to sellable, $1,940 recovered" },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % TICKER.length), 3200);
    return () => clearInterval(t);
  }, []);

  const tick = TICKER[i];
  const kw = { color: "var(--signal)", fontWeight: 600 };

  return (
    <section className="radiant relative z-10 px-6 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto pt-16 pb-20 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
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

          {/* stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "-0.02em", color: "var(--signal)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="mt-2 text-[12px] leading-snug" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.02em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — command center (rendered clean) */}
        <div className="relative">
          <span className="glow-blob" style={{ width: 360, height: 360, background: "var(--signal)", top: "-8%", right: "-4%", opacity: 0.28 }} />
          <MediaFrame
            src="/images/hero_image_sc.png"
            alt="Instive AI supply chain command center: on-time delivery, total shipments, exceptions, and AI insight with a live world map"
            label="instive.ai / command center"
            variant="ui"
            accent="#FFB23E"
            width={1536}
            height={1024}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* live ticker */}
          <div className="glass mt-3 flex items-center gap-3 px-4 py-3 rounded-tight overflow-hidden" style={{ borderRadius: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: tick.tone, flexShrink: 0 }} />
            <span key={i} className="console-row text-[13px] truncate" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              {tick.text}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
