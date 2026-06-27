import Link from "next/link";
import Logo from "@/components/site/Logo";
import { FOOTER_NAV, BOOK_CALL, CONTACT_EMAIL } from "@/lib/site";
import { BookDemoButton } from "@/components/site/BookDemo";

export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--line)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="mb-4">
              <Logo height={24} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Operational AI for supply chain. We read what your systems already know, sense what is
              about to go wrong, and act before it costs you.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block mt-5 text-sm"
              style={{ color: "var(--signal)", fontFamily: "var(--font-mono)" }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* Link columns */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <div
                className="text-[11px] uppercase mb-4"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  color: "var(--text-muted)",
                }}
              >
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  if (l.href === BOOK_CALL) {
                    return (
                      <li key={l.label}>
                        <BookDemoButton source="footer" className="text-sm transition-colors" style={{ color: "var(--text-secondary)", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "var(--font-body)" }}>
                          {l.label}
                        </BookDemoButton>
                      </li>
                    );
                  }
                  const internal = l.href.startsWith("/") && !l.href.startsWith("//");
                  const Cmp: any = internal ? Link : "a";
                  return (
                    <li key={l.label}>
                      <Cmp
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-secondary)", textDecoration: "none" }}
                      >
                        {l.label}
                      </Cmp>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          style={{ borderColor: "var(--line)" }}
        >
          <p
            className="text-[11px] uppercase"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--text-muted)" }}
          >
            © {new Date().getFullYear()} Instive AI · Intelligence in motion
          </p>
          <BookDemoButton
            source="footer-bottom"
            className="text-[11px] uppercase transition-colors"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: "var(--signal)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            Book a demo →
          </BookDemoButton>
        </div>
      </div>
    </footer>
  );
}
