"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const ASPECT_RATIO = 1466 / 183;

export default function Logo({ height = 22, href = "/" }: { height?: number; href?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    const update = () => setIsDark(!html.classList.contains("light"));
    update();

    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const src = isDark
    ? "/logo/Instive_light_logo_dark_tp_crop.png"
    : "/logo/Instive_light_logo_tp_crop.png";

  return (
    <Link href={href} style={{ display: "inline-flex", alignItems: "center" }}>
      <Image
        src={src}
        alt="Instive"
        width={Math.round(height * ASPECT_RATIO)}
        height={height}
        style={{ height, width: "auto" }}
        priority
      />
    </Link>
  );
}
