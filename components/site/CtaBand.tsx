import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icon";
import { BookDemoButton } from "@/components/site/BookDemo";

export default function CtaBand({
  title,
  sub,
  secondary,
}: {
  title: string;
  sub: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="radiant relative z-10 px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.04, color: "var(--text-primary)" }}>
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {sub}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <BookDemoButton source="cta-band" className="btn-signal inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
              Book a demo
              <Icon name="arrow" size={16} />
            </BookDemoButton>
            {secondary && (
              <Link href={secondary.href} className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold rounded-tight border transition-colors" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)", borderColor: "var(--line-strong)" }}>
                {secondary.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
