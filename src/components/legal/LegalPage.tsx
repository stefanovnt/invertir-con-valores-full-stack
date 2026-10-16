import fs from "node:fs/promises";
import { tightPunctuation } from "@/lib/typography";
import path from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { proseClass, renderMdx } from "@/components/blog/Mdx";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { formatDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

// Legal pages are MDX templates in content/legal/<locale>/<slug>.mdx.
// Slugs stay in Spanish for every locale: /aviso-legal, /it/aviso-legal, /en/aviso-legal.

export type LegalSlug = "aviso-legal" | "privacidad" | "cookies";

async function readLegal(locale: Locale, slug: LegalSlug) {
  const raw = await fs.readFile(
    path.join(process.cwd(), "content", "legal", locale, `${slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(raw);
  const updated =
    data.updated instanceof Date
      ? data.updated.toISOString().slice(0, 10)
      : String(data.updated ?? "");
  return {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    updated,
    content,
  };
}

export async function legalMetadata(
  rawLocale: string,
  slug: LegalSlug
): Promise<Metadata> {
  if (!isLocale(rawLocale)) return {};
  const [doc, dict] = await Promise.all([
    readLegal(rawLocale, slug),
    getDictionary(rawLocale),
  ]);
  return pageMetadata({
    locale: rawLocale,
    path: `/${slug}`,
    title: doc.title,
    description: doc.description,
    imageAlt: dict.meta.ogAlt,
  });
}

export async function LegalPage({
  locale: rawLocale,
  slug,
}: {
  locale: string;
  slug: LegalSlug;
}) {
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const [doc, dict] = await Promise.all([
    readLegal(locale, slug),
    getDictionary(locale),
  ]);
  const content = await renderMdx(doc.content);

  return (
    <article className="bg-gradient-to-b from-brand-tint-blue via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="container max-w-3xl">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          {tightPunctuation(doc.title)}
        </h1>
        {doc.updated && (
          <p className="mt-4 text-sm text-brand-muted">
            {dict.legal.lastUpdated}:{" "}
            <time dateTime={doc.updated}>
              {formatDate(doc.updated, locale)}
            </time>
          </p>
        )}
        <div className={`${proseClass} mt-10`}>{content}</div>
      </div>
    </article>
  );
}
