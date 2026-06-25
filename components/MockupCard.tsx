"use client";

import { Mockup, SIDECAR_META } from "@/data/mockups";

/**
 * Category-specific SVG icon for the preview zone.
 * Each sidecar gets a unique abstract logistics icon.
 */
function CategoryIcon({ sidecar, color }: { sidecar: string; color: string }) {
  const iconStyle = { opacity: 0.18, width: 120, height: 120 };

  switch (sidecar) {
    case "Carrier Intelligence":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <path d="M20 70L40 30L60 50L80 20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="70" r="6" fill={color} />
          <circle cx="80" cy="20" r="6" fill={color} />
          <circle cx="40" cy="30" r="4" fill={color} />
          <circle cx="60" cy="50" r="4" fill={color} />
        </svg>
      );
    case "Demand Forecasting":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <path d="M15 80L30 55L45 65L60 35L75 45L90 15" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" />
          <rect x="10" y="82" width="85" height="2" rx="1" fill={color} />
          <circle cx="60" cy="35" r="5" fill={color} />
        </svg>
      );
    case "Client Reporting":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <rect x="15" y="15" width="70" height="70" rx="8" stroke={color} strokeWidth="2.5" />
          <line x1="30" y1="38" x2="70" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="50" x2="60" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="62" x2="50" y2="62" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "Invoice Auditor":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <rect x="20" y="10" width="50" height="65" rx="6" stroke={color} strokeWidth="2.5" />
          <line x1="30" y1="28" x2="60" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="40" x2="55" y2="40" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="52" x2="50" y2="52" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="65" cy="65" r="20" stroke={color} strokeWidth="2.5" />
          <path d="M60 65L64 69L72 61" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Labor Planning":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <circle cx="35" cy="30" r="10" stroke={color} strokeWidth="2.5" />
          <circle cx="65" cy="30" r="10" stroke={color} strokeWidth="2.5" />
          <path d="M15 75C15 58 25 48 35 48C42 48 48 52 50 58C52 52 58 48 65 48C75 48 85 58 85 75" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "Returns Intelligence":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <path d="M70 30H35C25 30 18 40 18 50C18 60 25 70 35 70H60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M55 60L65 70L55 80" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 25L70 30L80 35" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Dispatch & Crew Scheduling":
      return (
        <svg viewBox="0 0 100 100" fill="none" style={iconStyle}>
          <rect x="15" y="20" width="70" height="60" rx="8" stroke={color} strokeWidth="2.5" />
          <line x1="15" y1="38" x2="85" y2="38" stroke={color} strokeWidth="2" />
          <line x1="40" y1="20" x2="40" y2="80" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="30" cy="55" r="5" fill={color} />
          <circle cx="60" cy="55" r="5" fill={color} />
          <circle cx="60" cy="68" r="5" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

export default function MockupCard({
  mockup,
  onPreview,
  index = 0,
}: {
  mockup: Mockup;
  onPreview: (mockup: Mockup) => void;
  index?: number;
}) {
  const meta = SIDECAR_META[mockup.sidecar];
  const accent = meta.accent;

  return (
    <article
      className="glass-card glow-border card-enter group cursor-pointer"
      style={{
        "--glow-color": `${accent}66`,
        animationDelay: `${index * 0.08}s`,
      } as React.CSSProperties}
      onClick={() => onPreview(mockup)}
    >
      {/* ─── Preview Zone ─── */}
      <div
        className="preview-zone"
        style={{
          background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 40%, transparent 70%)`,
        }}
      >
        {/* Category icon watermark */}
        <div
          style={{
            position: "absolute",
            right: -10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
          }}
        >
          <CategoryIcon sidecar={mockup.sidecar} color={accent} />
        </div>

        {/* Floating content over preview */}
        <div className="preview-company">
          {/* Category badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              borderRadius: 6,
              color: accent,
              backgroundColor: `${accent}18`,
              border: `1px solid ${accent}30`,
              width: "fit-content",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}80`,
              }}
            />
            {mockup.sidecar}
          </span>

          {/* Company Name — big and bold */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(22px, 3vw, 28px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              marginBottom: 6,
            }}
          >
            {mockup.companyName}
          </h3>

          {/* Industry */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            {mockup.industry}
          </p>
        </div>
      </div>

      {/* ─── Card Content ─── */}
      <div className="card-content">
        {/* Hero scenario */}
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            fontStyle: "italic",
            marginBottom: 18,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          &ldquo;{mockup.heroScenario}&rdquo;
        </p>

        {/* Benefits */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {mockup.benefits.slice(0, 2).map((benefit) => (
            <li
              key={benefit}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 12,
                lineHeight: 1.5,
                color: "var(--text-secondary)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: `${accent}20`,
                  color: accent,
                  fontSize: 10,
                  fontWeight: 700,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(mockup);
            }}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              borderRadius: 8,
              border: `1px solid ${accent}40`,
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = accent;
              e.currentTarget.style.color = accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${accent}40`;
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            Preview
          </button>
          <a
            href={mockup.mockupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
              borderRadius: 8,
              backgroundColor: accent,
              color: "#0E1A24",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Open Demo
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
