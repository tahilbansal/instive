"use client";

import { useEffect, useCallback } from "react";
import { Mockup, SIDECAR_META } from "@/data/mockups";

export default function MockupModal({
  mockup,
  onClose,
}: {
  mockup: Mockup | null;
  onClose: () => void;
}) {
  const stableOnClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    if (!mockup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") stableOnClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mockup, stableOnClose]);

  if (!mockup) return null;

  const meta = SIDECAR_META[mockup.sidecar];
  const accent = meta.accent;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 modal-backdrop-enter"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${mockup.companyName} · ${mockup.sidecar} demo`}
    >
      <div
        className="relative w-full max-w-6xl h-[92vh] overflow-hidden flex flex-col modal-panel-enter"
        style={{
          backgroundColor: "rgba(22, 37, 47, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 16,
          border: `1px solid ${accent}30`,
          boxShadow: `0 0 0 1px ${accent}15, 0 24px 80px -16px rgba(0,0,0,0.6), 0 0 60px -20px ${accent}30`,
        }}
      >
        {/* Accent gradient line at top */}
        <div
          style={{
            height: 3,
            background: `linear-gradient(90deg, ${accent}, ${accent}60, transparent)`,
            borderRadius: "16px 16px 0 0",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "16px 24px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            {/* Category badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                borderRadius: 6,
                color: accent,
                backgroundColor: `${accent}18`,
                border: `1px solid ${accent}30`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: accent,
                  boxShadow: `0 0 6px ${accent}80`,
                }}
              />
              {mockup.sidecar}
            </span>

            {/* Company info */}
            <div style={{ minWidth: 0, flex: 1 }}>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "var(--font-display)",
                  color: "var(--text-primary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {mockup.companyName}
              </p>
              <p
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {mockup.industry}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <a
              href={mockup.mockupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
              style={{
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "var(--font-display)",
                borderRadius: 6,
                border: "1px solid var(--line-strong)",
                color: "var(--text-primary)",
                textDecoration: "none",
                transition: "all 0.2s",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              Open in tab
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 8,
                border: "1px solid var(--line-strong)",
                backgroundColor: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
                fontSize: 18,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.color = accent;
                e.currentTarget.style.backgroundColor = `${accent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--line-strong)";
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Iframe container */}
        <div style={{ flex: 1, overflow: "hidden", backgroundColor: "#fff" }}>
          <iframe
            src={mockup.mockupUrl}
            title={`${mockup.companyName} ${mockup.sidecar} mockup`}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
