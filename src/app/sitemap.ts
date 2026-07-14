import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/journal";
import { works } from "@/data/works";
import { absoluteUrl } from "@/lib/site-url";

const staticRoutes = ["/", "/about", "/works", "/journal", "/contact"];
const defaultLastModified = new Date("2026-07-14");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: defaultLastModified,
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const workEntries = works.map((work) => ({
    url: absoluteUrl(`/works/${work.slug}`),
    lastModified: defaultLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalEntries = journalPosts.map((post) => ({
    url: absoluteUrl(`/journal/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...workEntries, ...journalEntries];
}
