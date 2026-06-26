"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  /** number of nodes */
  count?: number;
  /** travelling pulses */
  pulses?: number;
};

/**
 * A living supply-chain network: nodes joined by faint lanes, with light
 * pulses travelling between them. Transparent background so it overlays an
 * image or gradient. Honors prefers-reduced-motion (renders one static frame).
 */
export default function NetworkCanvas({ className, count = 26, pulses = 14 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const AMBER = "255,178,62";
    const TEAL = "91,214,166";
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; r: number; hub: boolean; ph: number };
    type Edge = { a: number; b: number };
    type Pulse = { e: number; t: number; sp: number; teal: boolean };

    const nodes: Node[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() < 0.18 ? 3 : 1.6,
      hub: i < 4,
      ph: Math.random() * Math.PI * 2,
    }));

    // connect each node to its 2 nearest neighbours
    const edges: Edge[] = [];
    const seen = new Set<string>();
    nodes.forEach((n, i) => {
      const dist = nodes
        .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      dist.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ a: i, b: j });
        }
      });
    });

    const pulseArr: Pulse[] = Array.from({ length: pulses }, () => ({
      e: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      sp: 0.0015 + Math.random() * 0.0035,
      teal: Math.random() < 0.4,
    }));

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const px = (n: Node) => ({ x: n.x * w, y: n.y * h });

    let raf = 0;
    let t0 = performance.now();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (now: number) => {
      const dt = now - t0;
      ctx.clearRect(0, 0, w, h);

      // lanes
      ctx.lineWidth = 1;
      edges.forEach((e) => {
        const a = px(nodes[e.a]);
        const b = px(nodes[e.b]);
        ctx.strokeStyle = `rgba(${AMBER},0.1)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // pulses
      pulseArr.forEach((p) => {
        if (!reduce) p.t += p.sp;
        if (p.t > 1) {
          p.t = 0;
          p.e = Math.floor(Math.random() * edges.length);
          p.teal = Math.random() < 0.4;
        }
        const e = edges[p.e];
        const a = px(nodes[e.a]);
        const b = px(nodes[e.b]);
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const col = p.teal ? TEAL : AMBER;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${col},0.9)`);
        g.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${col},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // nodes
      nodes.forEach((n) => {
        const { x, y } = px(n);
        const tw = reduce ? 0.6 : 0.55 + 0.45 * Math.sin(dt * 0.0018 + n.ph);
        if (n.hub) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
          g.addColorStop(0, `rgba(${AMBER},${0.25 * tw})`);
          g.addColorStop(1, `rgba(${AMBER},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 16, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = n.hub ? `rgba(${AMBER},0.95)` : `rgba(245,242,234,${0.45 + 0.3 * tw})`;
        ctx.beginPath();
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduce) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, pulses]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" style={{ position: "absolute", inset: 0 }} />;
}
