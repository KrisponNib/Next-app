import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/marketing/services";
import { ARTICLES } from "@/lib/marketing/articles";

const SITE = "https://www.omriberger.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: SITE + path,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/drum-lessons", 0.9),
    page("/drum-lessons-for-kids", 0.8),
    ...SERVICES.map((s) => page(`/drum-lessons/${s.slug}`, 0.8)),
    page("/blog", 0.7),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.6)),
    page("/about", 0.5),
    page("/faq", 0.5),
  ];
}
