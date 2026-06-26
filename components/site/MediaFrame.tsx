import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  src: string;
  alt: string;
  label?: string;
  variant?: "ui" | "photo";
  accent?: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  /** overlay nodes (network canvas, floating chips) positioned over the image */
  children?: ReactNode;
};

/**
 * Blends a reference screenshot or photo into the page instead of pasting it raw.
 * "ui" wraps it in an app-window chrome with a live badge; "photo" colour-grades
 * it into the palette. Both fade the bottom edge into the surrounding surface.
 */
export default function MediaFrame({
  src,
  alt,
  label,
  variant = "ui",
  accent = "#FFB23E",
  width,
  height,
  priority,
  sizes,
  children,
}: Props) {
  return (
    <div className={`media-frame ${variant === "photo" ? "media-photo" : ""}`} style={{ ["--accent" as any]: accent }}>
      {variant === "ui" && (
        <div className="media-chrome">
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6B5E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFB23E" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#5BD6A6" }} />
          {label && (
            <span className="ml-2 text-[12px]" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              {label}
            </span>
          )}
          <span style={{ flex: 1 }} />
          <span className="flex items-center gap-1.5 text-[10px] uppercase" style={{ fontFamily: "var(--font-mono)", color: "var(--cleared)", letterSpacing: "0.1em" }}>
            <span className="live-dot status-pulse" />
            Live
          </span>
        </div>
      )}
      <div className="media-body">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes={sizes} style={{ width: "100%", height: "auto" }} />
        {variant === "photo" && <span className="media-grade" />}
        {variant === "photo" && label && (
          <span
            className="glass-chip absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-[11px] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--paper)", letterSpacing: "0.08em", zIndex: 3 }}
          >
            {label}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
