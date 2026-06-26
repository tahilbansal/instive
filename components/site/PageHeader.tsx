import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { BookDemoButton } from "@/components/site/BookDemo";

type Crumb = { label: string; href?: string };

export default function PageHeader({
  eyebrow,
  title,
  sub,
  accent = "#FFB23E",
  crumbs,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  accent?: string;
  crumbs?: Crumb[];
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="radiant relative z-10 px-6 pt-12 pb-16 border-b" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-7xl mx-auto">
        {crumbs && (
          <nav className="mb-7 flex items-center gap-2 text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} style={{ color: "var(--text-muted)" }}>
                    {c.label}
                  </Link>
                ) : (
                  <span style={{ color: "var(--text-secondary)" }}>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span style={{ opacity: 0.5 }}>/</span>}
              </span>
            ))}
          </nav>
        )}

        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-11 h-px" style={{ backgroundColor: accent }} />
            <span className="text-[12px] uppercase" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: accent }}>
              {eyebrow}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 5.6vw, 64px)", lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--text-primary)", maxWidth: 880 }}>
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
            {sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BookDemoButton source="page-header" className="btn-signal inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Book a demo
              <Icon name="arrow" size={15} />
            </BookDemoButton>
            {secondary && (
              <Link href={secondary.href} className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
