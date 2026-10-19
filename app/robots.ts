import type { MetadataRoute } from "next";

// Only the public lessons page is for search engines; the rest is Omri's private app.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/money",
        "/today",
        "/profile",
        "/wins",
        "/reflect",
        "/practice",
        "/lessons",
        "/students",
        "/student/",
        "/thank-you",
      ],
    },
    sitemap: "https://www.omriberger.com/sitemap.xml",
  };
}
