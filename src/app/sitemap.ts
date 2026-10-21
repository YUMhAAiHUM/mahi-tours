import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = [
    { path: "", priority: 1 },
    { path: "/fleet", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
    { path: "/about", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: `${base}${p.path}`, lastModified: new Date(), priority: p.priority }));
}
