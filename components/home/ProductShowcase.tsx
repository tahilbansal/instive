"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PRODUCT_SHOTS } from "@/lib/site";

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const shot = PRODUCT_SHOTS[active];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % PRODUCT_SHOTS.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-9">
        {PRODUCT_SHOTS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="px-4 py-2.5 rounded-tight border transition-all text-sm"
              style={{
                borderColor: on ? "var(--signal)" : "var(--line-strong)",
                backgroundColor: on ? "rgba(255,178,62,0.12)" : "transparent",
                color: on ? "var(--signal)" : "var(--text-muted)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                borderRadius: 999,
              }}
            >
              {s.eyebrow}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        {/* Screenshot */}
        <div className="relative order-2 lg:order-1">
          <span
            className="glow-blob"
            style={{ width: 420, height: 340, background: "var(--signal)", top: "8%", left: "-6%", opacity: 0.18 }}
          />
          <div className="media-frame" key={shot.id}>
            <div className="media-body">
              <Image
                src={shot.image}
                alt={shot.alt}
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={active === 0}
                style={{ objectFit: "cover", maxHeight: 560, objectPosition: "top" }}
              />
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="order-1 lg:order-2">
          <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.16em", color: "var(--signal)" }}>
            {shot.eyebrow}
          </span>
          <h3
            className="mt-4 mb-4"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(22px, 3vw, 30px)", letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            {shot.title}
          </h3>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {shot.body}
          </p>

          {/* dot rail */}
          <div className="flex gap-2 mt-8">
            {PRODUCT_SHOTS.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Show ${s.eyebrow}`}
                onClick={() => setActive(i)}
                className="flow-rail-dot"
                data-active={i === active}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
