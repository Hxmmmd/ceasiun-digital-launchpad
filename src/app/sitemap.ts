import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceasiun.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/services", "/products", "/blog", "/careers", "/contact"].map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
