import { getSortedJournalPosts } from "@/data/journal";
import { profile } from "@/data/profile";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getSortedJournalPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/journal/${post.slug}`);

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.excerpt)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(SITE_NAME)}</title>
        <link>${absoluteUrl("/")}</link>
        <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
        <language>ko-KR</language>
        <managingEditor>${escapeXml(profile.email)} (${escapeXml(profile.nameEn)})</managingEditor>
        <webMaster>${escapeXml(profile.email)} (${escapeXml(profile.nameEn)})</webMaster>
        <lastBuildDate>${new Date("2026-07-14").toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
