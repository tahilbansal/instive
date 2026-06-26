"use client";

import { useEffect, useRef, useState } from "react";
import { RESULTS, type Stat } from "@/lib/site";

function format(stat: Stat, value: number) {
  const isFloat = !Number.isInteger(stat.value);
  const num = isFloat ? value.toFixed(1) : Math.round(value).toString();
  return `${stat.prefix ?? ""}${num}${stat.suffix ?? ""}`;
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(stat.value);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(stat.value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [stat]);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(40px, 6vw, 64px)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--signal)",
        }}
      >
        {format(stat, value)}
      </div>
      <div className="mt-3 text-sm leading-snug" style={{ color: "var(--text-secondary)" }}>
        {stat.label}
      </div>
    </div>
  );
}

export default function Results() {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {RESULTS.map((stat) => (
        <Counter key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
