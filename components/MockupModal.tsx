"use client";

import { useEffect } from "react";
import { Mockup, SIDECAR_META } from "@/data/mockups";
import { hexToRgba } from "@/lib/colors";

export default function MockupModal({
  mockup,
  onClose,
}: {
  mockup: Mockup | null;
  onClose: () => void;
}) {
  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!mockup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mockup, onClose]);

  if (!mockup) return null;

  const accent = SIDECAR_META[mockup.sidecar].accent;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 sm:p-8"
      onMouseDown={(e) => {
        // Click on the backdrop (not the frame) closes.
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${mockup.companyName} — ${mockup.sidecar} demo`}
    >
      <div className="flex h-[85vh] w-full max-w-[85vw] flex-col overflow-hidden rounded-xl border border-hairline bg-ink-surface">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="inline-flex flex-shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
              style={{
                color: accent,
                backgroundColor: hexToRgba(accent, 0.12),
                border: `1px solid ${hexToRgba(accent, 0.3)}`,
              }}
            >
              {mockup.sidecar}
            </span>
            <span className="truncate text-sm font-semibold text-white">
              {mockup.companyName}
            </span>
            <span className="hidden truncate text-xs text-white/40 sm:inline">
              {mockup.industry}
            </span>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href={mockup.mockupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-hairline px-3 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 sm:inline"
            >
              Open in new tab ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-lg leading-none text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Live mockup */}
        <iframe
          src={mockup.mockupUrl}
          title={`${mockup.companyName} ${mockup.sidecar} mockup`}
          className="h-full w-full flex-1 bg-white"
        />
      </div>
    </div>
  );
}
