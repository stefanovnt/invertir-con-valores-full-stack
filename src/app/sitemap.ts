import type { MetadataRoute } from "next";
import { defaultLocale, localePath, locales, localeTags } from "@/i18n/config";
import { config } from "@/config";
import { getPublishedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// Every public page in every locale, with hreflang alternates.
// Drafts and tag listings are left out (they are noindex).
const pages = [
  "/",
  ...(config.features.blog ? ["/blog"] : []),
  "/aviso-legal",
  "/privacidad",
  "/cookies",
];

function languages(path: string) {
  return Object.fromEntries(
    locales.map((l) => [localeTags[l], absoluteUrl(localePath(l, path))])
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of pages) {
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(localePath(locale, path)),
        lastModified: now,
        changeFrequency: path === "/" || path === "/blog" ? "weekly" : "yearly",
        priority: path === "/" ? 1 : path === "/blog" ? 0.8 : 0.3,
        alternates: { languages: languages(path) },
      });
    }
  }

  for (const locale of config.features.blog ? locales : []) {
    // Posts are listed in the language they are written in only.
    const posts = await getPublishedPosts(locale);
    for (const post of posts) {
      entries.push({
        url: absoluteUrl(localePath(locale, `/blog/${post.slug}`)),
        lastModified: new Date(`${post.date}T12:00:00Z`),
        changeFrequency: "monthly",
        priority: locale === defaultLocale ? 0.7 : 0.6,
      });
    }
  }

  return entries;
}
