import Link from "next/link";
import { tightPunctuation } from "@/lib/typography";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Info } from "lucide-react";
import { PostCover } from "@/components/blog/PostCard";
import { proseClass, renderMdx } from "@/components/blog/Mdx";
import { NewsletterBlock } from "@/components/forms/NewsletterBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { config } from "@/config";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  defaultLocale,
  isLocale,
  localePath,
  locales,
  localeTags,
} from "@/i18n/config";
import { formatDate, getPost, getPosts, tagSlug } from "@/lib/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    const { posts } = await getPosts(locale);
    for (const p of posts) params.push({ locale, slug: p.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const found = await getPost(locale, slug);
  if (!found) return {};
  const { post, fallback } = found;
  const meta = pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    singleLocale: true,
    type: "article",
    // Drafts are visible (clearly labelled) but never indexed.
    noindex: post.draft,
  });
  return {
    ...meta,
    // A fallback (Spanish post shown under /it or /en) points to the original.
    alternates: {
      canonical: absoluteUrl(
        localePath(fallback ? defaultLocale : locale, `/blog/${slug}`)
      ),
    },
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const found = await getPost(locale, slug);
  if (!found) notFound();
  const { post, fallback } = found;
  const dict = await getDictionary(locale);
  const content = await renderMdx(post.body);
  const url = absoluteUrl(localePath(locale, `/blog/${slug}`));

  return (
    <article
      lang={fallback ? localeTags[post.contentLocale] : undefined}
      className="pb-24 pt-28 sm:pt-36"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          inLanguage: localeTags[post.contentLocale],
          keywords: post.tags.join(", "),
          mainEntityOfPage: url,
          url,
          image: `${url}/opengraph-image`,
          author: { "@type": "Person", name: config.founder },
          publisher: { "@id": `${absoluteUrl("/")}#organization` },
        }}
      />
      <div className="container max-w-3xl">
        <Link
          href={localePath(locale, "/blog")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-ink hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.blog.backToBlog}
        </Link>

        <header className="mt-8">
          <ul
            className="flex flex-wrap gap-2 text-xs font-semibold"
            aria-label={dict.blog.tagsLabel}
          >
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={localePath(locale, `/blog/tag/${tagSlug(tag)}`)}
                  className="inline-block rounded-full bg-brand-tint-green px-3 py-1 text-brand-green-ink hover:bg-brand-green/20"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            {tightPunctuation(post.title)}
          </h1>
          <p className="lead mt-5">{post.description}</p>
          <p className="mt-6 text-sm text-brand-muted">
            {config.founder} ·{" "}
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time> ·{" "}
            {post.readingMinutes} {dict.blog.readingTime}
          </p>
        </header>

        {(post.draft || fallback) && (
          <div className="mt-8 space-y-2">
            {post.draft && (
              <p className="flex items-start gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 ring-1 ring-amber-200">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {dict.blog.draft}: {dict.blog.draftNotice}
              </p>
            )}
            {fallback && (
              <p className="flex items-start gap-2 rounded-2xl bg-brand-tint-blue px-4 py-3 text-sm font-medium text-brand-blue-ink">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {dict.blog.fallbackNotice}
              </p>
            )}
          </div>
        )}

        <div className="group mt-10 overflow-hidden rounded-4xl">
          <PostCover post={post} />
        </div>

        <div className={`${proseClass} mt-12`}>{content}</div>

        <aside className="mt-12 rounded-3xl border border-brand-line bg-brand-tint-blue/50 p-6 text-sm leading-relaxed text-brand-muted">
          {dict.blog.disclaimer}
        </aside>

        <section
          aria-labelledby="post-newsletter"
          className="card mt-12 p-7 sm:p-10"
        >
          <h2
            id="post-newsletter"
            className="font-display text-2xl font-extrabold"
          >
            {dict.blog.newsletterTitle}
          </h2>
          <p className="mt-2 text-brand-muted">{dict.blog.newsletterText}</p>
          <div className="mt-6">
            <NewsletterBlock
              locale={locale}
              dict={dict}
              source="newsletter_blog"
            />
          </div>
        </section>
      </div>
    </article>
  );
}
