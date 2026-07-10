// Central SEO config. Override the production origin at build time with
// NEXT_PUBLIC_SITE_URL (e.g. https://instive.ai) so canonical/OG/sitemap URLs
// are absolute and correct.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://instiveai.com"
).replace(/\/$/, "");

export const SITE_NAME = "Instive AI";

// Absolute URL helper for canonicals, OG images, sitemap entries.
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const DEFAULT_OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 675,
  alt: "Instive AI — operational AI for supply chain",
};

import type { Metadata } from "next";

// Builds page-level metadata with a correct canonical URL and OG/Twitter tags.
// Every page should call this so it doesn't inherit the root layout's "/"
// canonical (which would otherwise point every page at the homepage).
export function pageMeta(opts: {
  title?: string;
  description: string;
  path: string; // absolute path, e.g. "/solutions"
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absoluteUrl(path),
      title: title ? `${title} · ${SITE_NAME}` : undefined,
      description,
      images: [DEFAULT_OG_IMAGE],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} · ${SITE_NAME}` : undefined,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
