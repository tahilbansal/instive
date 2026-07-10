import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SOLUTIONS, INDUSTRIES, SEGMENTS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level marketing routes, ordered by priority.
  const staticRoutes: Array<{ path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/solutions", priority: 0.9, freq: "weekly" },
    { path: "/industries", priority: 0.9, freq: "weekly" },
    { path: "/segments", priority: 0.9, freq: "weekly" },
    { path: "/services", priority: 0.8, freq: "monthly" },
    { path: "/integrations", priority: 0.8, freq: "monthly" },
    { path: "/case-studies", priority: 0.8, freq: "weekly" },
    { path: "/mockups", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
    { path: "/faq", priority: 0.6, freq: "monthly" },
  ];

  const dynamicRoutes = [
    ...SOLUTIONS.map((s) => `/solutions/${s.id}`),
    ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
    ...SEGMENTS.map((s) => `/segments/${s.slug}`),
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...dynamicRoutes.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
