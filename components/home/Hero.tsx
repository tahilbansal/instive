"use client";

import Link from "next/link";
import { BookDemoButton } from "@/components/site/BookDemo";
import { useRef, useState } from "react";

const kw = { color: "var(--signal)", fontWeight: 600 };

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const openFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if ((v as any).webkitRequestFullscreen) {
      (v as any).webkitRequestFullscreen();
    }
  };

  return (
    <section className="radiant relative z-10 px-6 border-b overflow-hidden" style={{ borderColor: "var(--line)" }}>
      <span className="hero-grid" aria-hidden="true" />
      <div className="relative max-w-[1440px] mx-auto pt-16 pb-20 grid gap-8 lg:grid-cols-[0.85fr_1.25fr] lg:items-center" style={{ zIndex: 1 }}>
        {/* Left — message */}
        <div>
          <div className="flex items-center gap-3 mb-7">
            <span className="w-11 h-px" style={{ backgroundColor: "var(--signal)" }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--signal)" }}>
              AI for modern supply chains
            </span>
          </div>

          <h1
            className="max-w-fit whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 4.2vw, 52px)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
            }}
          >
            <span className="block">AI-powered process</span>
            <span className="block">automation for</span>
            <span className="block text-gradient">modern supply chains.</span>
          </h1>

          <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Automate freight operations, procurement, and back-office workflows. Your team
            monitors, approves, and acts on <span style={kw}>instinct</span>, through one intelligent
            operations workspace, without replacing the systems you already run.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <BookDemoButton source="hero" className="btn-signal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Book a demo
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BookDemoButton>
            <Link href="#product" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
              See how it works
            </Link>
          </div>
        </div>

        {/* Right — video with controls */}
        <div className="relative" style={{ paddingLeft: "clamp(8px, 2vw, 24px)" }}>
          <span className="glow-blob" style={{ width: 420, height: 360, background: "var(--signal)", top: "-2%", right: "-6%", opacity: 0.22 }} />
          <div className="blend-media">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Video Controls */}
            <div className="hero-video-controls">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="hero-video-btn"
                aria-label={playing ? "Pause video" : "Play video"}
                title={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  /* Pause icon */
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="1" width="4" height="12" rx="1" fill="currentColor" />
                    <rect x="8" y="1" width="4" height="12" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  /* Play icon */
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 1.5l9 5.5-9 5.5V1.5z" fill="currentColor" />
                  </svg>
                )}
              </button>

              {/* Fullscreen / Zoom */}
              <button
                onClick={openFullscreen}
                className="hero-video-btn"
                aria-label="Open fullscreen"
                title="Fullscreen"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 5V2h3M10 2h3v3M13 9v3h-3M4 12H1V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
