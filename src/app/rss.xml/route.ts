import { config } from "@/config";
import { defaultLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// RSS feed of published (non-draft) Spanish posts: /rss.xml
export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const [posts, dict] = await Promise.all([
    getPublishedPosts(defaultLocale),
    getDictionary(defaultLocale),
  ]);
  const blogUrl = absoluteUrl(localePath(defaultLocale, "/blog"));

  const items = posts
    .map((p) => {
      const url = absoluteUrl(localePath(defaultLocale, `/blog/${p.slug}`));
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(`${p.date}T08:00:00Z`).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(config.appName)} · Blog</title>
    <link>${blogUrl}</link>
    <description>${esc(dict.blog.pageDescription)}</description>
    <language>es-ES</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
