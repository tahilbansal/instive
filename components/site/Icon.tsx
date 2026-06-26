import type { CSSProperties } from "react";

// Line icons, 24×24, stroke = currentColor. Kept deliberately plain — these are
// operational signposts, not decoration.
const PATHS: Record<string, JSX.Element> = {
  // ── Sidecars ──
  audit: (
    <>
      <path d="M5 3h9l5 5v13H5z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 14.5l2 2 4-4.5" />
    </>
  ),
  carrier: (
    <>
      <path d="M3 17V5h11v12" />
      <path d="M14 9h4l3 4v4h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  forecast: (
    <>
      <path d="M3 20h18" />
      <path d="M4 16l5-6 4 4 7-9" />
      <path d="M20 5h-4M20 5v4" />
    </>
  ),
  labor: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
      <path d="M17 11l2 2 4-4" />
    </>
  ),
  returns: (
    <>
      <path d="M3 8a9 9 0 1 1-1 4" />
      <path d="M3 4v4h4" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  report: (
    <>
      <path d="M5 3h14v18H5z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  dispatch: (
    <>
      <circle cx="12" cy="10" r="3" />
      <path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" />
    </>
  ),
  custom: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // ── Capabilities ──
  doc: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M7 8h10v3a5 5 0 0 1-10 0z" />
      <path d="M12 16v5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <rect x="7" y="11" width="3" height="6" />
      <rect x="12" y="7" width="3" height="10" />
      <rect x="17" y="13" width="3" height="4" />
    </>
  ),
  human: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M9 8l2 2 4-4" />
    </>
  ),
  draft: (
    <>
      <path d="M4 4h16v12H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  trail: (
    <>
      <path d="M6 4v16" />
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <path d="M10 6h10M10 12h7M10 18h10" />
    </>
  ),
  // ── Industries ──
  factory: (
    <>
      <path d="M3 21V10l6 4V10l6 4V7l3 2v12z" />
      <path d="M3 21h18" />
      <path d="M7 17h.01M11 17h.01M15 17h.01" />
    </>
  ),
  boxes: (
    <>
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="8" y="13" width="8" height="8" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
      <path d="M5 11v9h14v-9" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h11v9H2z" />
      <path d="M13 9h4l4 3v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 21V8l9-4 9 4v13" />
      <path d="M7 21v-7h10v7" />
      <path d="M7 17h10" />
    </>
  ),
  team: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="10" r="2.5" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M14 20a5 5 0 0 1 8-3.5" />
    </>
  ),
  // ── Utility ──
  arrow: <path d="M4 12h14M12 5l7 7-7 7" />,
  check: <path d="M5 12l4 4 10-11" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  bolt: <path d="M13 3L4 14h6l-1 7 9-11h-6z" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  brain: (
    <>
      <path d="M12 5v14" />
      <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9a2.5 2.5 0 0 0 1 4 2.5 2.5 0 0 0 3 4" />
      <path d="M9 4a2 2 0 0 1 3 1.5" />
      <path d="M15 6.5h2.5M16 10h2.5M15 13.5h2" />
      <circle cx="18" cy="6.5" r="1.2" />
      <circle cx="19" cy="10" r="1.2" />
      <circle cx="17.5" cy="13.5" r="1.2" />
      <path d="M15 17a2.5 2.5 0 0 1-3-2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
};

export default function Icon({
  name,
  size = 22,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const content = PATHS[name] ?? PATHS.bolt;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
