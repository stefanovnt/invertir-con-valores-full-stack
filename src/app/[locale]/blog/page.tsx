import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { config } from "@/config";
import { tightPunctuation } from "@/lib/typography";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { NewsletterBlock } from "@/components/forms/NewsletterBlock";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localePath } from "@/i18n/config";
import { getPosts, tagSlug } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || !config.features.blog) return {};
  const { blog, meta } = await getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/blog",
    title: blog.pageTitle,
    description: blog.pageDescription,
    imageAlt: meta.ogAlt,
  });
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  // The blog is switched off for now (config.features.blog).
  if (!isLocale(locale) || !config.features.blog) notFound();
  const dict = await getDictionary(locale);
  const { posts, fallback } = await getPosts(locale);
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
    a.localeCompare(b, locale)
  );

  return (
    <div className="bg-gradient-to-b from-brand-tint-blue via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="container">
        {/* No JS reveal above the fold: the h1 is the LCP element. */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">{dict.blog.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-extrabold sm:text-6xl">
              {tightPunctuation(dict.blog.title)}
            </h1>
            <p className="lead mt-5 max-w-xl">{dict.blog.pageDescription}</p>
            {config.links.substack && (
              <a
                href={config.links.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-blue-ink underline-offset-4 hover:underline"
              >
                {dict.blog.substackArchive}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">{dict.common.opensNewTab}</span>
              </a>
            )}
            {fallback && (
              <p className="mt-3 font-medium text-brand-blue-ink">
                {dict.blog.fallbackNotice}
              </p>
            )}
          </div>
          <div className="card p-6 sm:p-7">
            <h2 className="font-display text-lg font-extrabold">
              {dict.footer.newsletterTitle}
            </h2>
            <p className="mt-1 text-brand-muted">{dict.blog.newsletterText}</p>
            <div className="mt-4">
              <NewsletterBlock
                locale={locale}
                dict={dict}
                source="newsletter_blog"
              />
            </div>
          </div>
        </div>

        {tags.length > 0 && (
          <nav aria-label={dict.blog.tagsLabel} className="mt-14">
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={localePath(locale, `/blog/tag/${tagSlug(tag)}`)}
                    className="chip transition-colors hover:border-brand-green hover:bg-brand-tint-green"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {posts.length === 0 ? (
          <p className="mt-14 text-lg text-brand-muted">{dict.blog.empty}</p>
        ) : (
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard
                  post={post}
                  locale={locale}
                  dict={dict.blog}
                  headingLevel="h2"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
