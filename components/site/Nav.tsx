"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Icon from "@/components/site/Icon";
import { BookDemoButton } from "@/components/site/BookDemo";
import { NAV_MENU, type NavItem } from "@/lib/site";

function Logo({ size = 28 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
      <span
        style={{ display: "grid", placeItems: "center", width: size, height: size, borderRadius: 6, backgroundColor: "var(--signal)", color: "#0E1A24", fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: size * 0.5 }}
      >
        i
      </span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16 }}>
        Instive<span style={{ color: "var(--signal)" }}>.ai</span>
      </span>
    </Link>
  );
}

function hasMenu(i: NavItem): i is Extract<NavItem, { menu: any }> {
  return "menu" in i;
}

function DropdownItem({ item, onClick }: { item: { label: string; sub: string; href: string; icon: string; accent: string }; onClick?: () => void }) {
  const internal = item.href.startsWith("/");
  const Cmp: any = internal ? Link : "a";
  return (
    <Cmp href={item.href} onClick={onClick} className="dropdown-item" style={{ textDecoration: "none" }}>
      <span style={{ width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", backgroundColor: `${item.accent}1a`, color: item.accent, flexShrink: 0 }}>
        <Icon name={item.icon} size={17} />
      </span>
      <span>
        <span className="block" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
          {item.label}
        </span>
        <span className="block mt-0.5" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>
          {item.sub}
        </span>
      </span>
    </Cmp>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false); // mobile sheet
  const [openMenu, setOpenMenu] = useState<string | null>(null); // desktop dropdown
  const [acc, setAcc] = useState<string | null>(null); // mobile accordion
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="site-nav sticky top-0 z-50 border-b"
      data-scrolled={scrolled}
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderColor: "var(--line)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center gap-5">
        <Logo />

        <span
          className="hidden lg:flex items-center gap-2 text-[11px] uppercase"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: "var(--text-muted)" }}
        >
          <span className="live-dot status-pulse" />
          Systems operational
        </span>

        <div className="flex-1" />

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_MENU.map((item) =>
            hasMenu(item) ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-tight transition-colors"
                  style={{ color: openMenu === item.label ? "var(--signal)" : "var(--text-secondary)" }}
                >
                  {item.label}
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ transform: openMenu === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {openMenu === item.label && (
                  <div style={{ position: "absolute", top: "100%", right: item.label === "Resources" ? 0 : "auto", left: item.label === "Resources" ? "auto" : 0, paddingTop: 8, zIndex: 60 }}>
                    <div
                      className="glass dropdown-panel"
                      style={{ width: (item.cols ?? 1) === 2 ? 540 : 320, display: "grid", gridTemplateColumns: `repeat(${item.cols ?? 1}, 1fr)`, gap: 2 }}
                    >
                      {item.menu.map((m) => (
                        <DropdownItem key={m.href + m.label} item={m} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="px-3 py-2 text-sm rounded-tight transition-colors" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 ml-2">
          <ThemeToggle />
          <BookDemoButton source="nav" className="btn-signal inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-tight" style={{ fontFamily: "var(--font-display)" }}>
            Book a demo
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </BookDemoButton>
        </div>

        {/* mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex items-center justify-center w-10 h-10 rounded-tight border"
            style={{ borderColor: "var(--line-strong)", color: "var(--text-primary)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="md:hidden border-t overflow-y-auto" style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--line)", height: "calc(100vh - 61px)" }}>
          <nav className="px-6 py-5 flex flex-col">
            {NAV_MENU.map((item) =>
              hasMenu(item) ? (
                <div key={item.label} className="border-b" style={{ borderColor: "var(--line)" }}>
                  <button
                    onClick={() => setAcc(acc === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between py-4"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}
                  >
                    {item.label}
                    <Icon name={acc === item.label ? "minus" : "plus"} size={18} />
                  </button>
                  {acc === item.label && (
                    <div className="pb-3 flex flex-col gap-1">
                      {item.menu.map((m) => (
                        <DropdownItem key={m.href + m.label} item={m} onClick={() => setOpen(false)} />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-4 border-b"
                  style={{ color: "var(--text-primary)", borderColor: "var(--line)", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}
                >
                  {item.label}
                </Link>
              )
            )}
            <BookDemoButton
              source="nav-mobile"
              onClick={() => setOpen(false)}
              className="btn-signal mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold rounded-tight"
            >
              Book a demo
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BookDemoButton>
          </nav>
        </div>
      )}
    </header>
  );
}
