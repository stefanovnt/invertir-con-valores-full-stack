import Link from "next/link";
import { notFound } from "next/navigation";
import { config } from "@/config";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { getPosts, tagSlug } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  for (const locale of locales) {
    const { posts } = await getPosts(locale);
    for (const tag of new Set(posts.flatMap((p) => p.tags.map(tagSlug))))
      params.push({ locale, tag });
  }
  return params;
}

async function load(locale: Locale, slug: string) {
  const { posts } = await getPosts(locale);
  const matching = posts.filter((p) => p.tags.some((t) => tagSlug(t) === slug));
  const label = matching[0]?.tags.find((t) => tagSlug(t) === slug);
  return { matching, label };
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/tag/[tag]">): Promise<Metadata> {
  const { locale, tag } = await params;
  if (!isLocale(locale) || !config.features.blog) return {};
  const [{ blog }, { label }] = await Promise.all([
    getDictionary(locale),
    load(locale, tag),
  ]);
  if (!label) return {};
  // Tag listings are thin pages: keep them out of the index, follow links.
  return pageMetadata({
    locale,
    path: `/blog/tag/${tag}`,
    title: `${blog.tagTitle} ${label}`,
    description: blog.pageDescription,
    noindex: true,
  });
}

export default async function TagPage({
  params,
}: PageProps<"/[locale]/blog/tag/[tag]">) {
  const { locale, tag } = await params;
  // The blog is switched off for now (config.features.blog).
  if (!isLocale(locale) || !config.features.blog) notFound();
  const [dict, { matching, label }] = await Promise.all([
    getDictionary(locale),
    load(locale, tag),
  ]);
  if (!label) notFound();

  return (
    <div className="bg-gradient-to-b from-brand-tint-green via-white to-white pb-24 pt-32 sm:pt-40">
      <div className="container">
        <Link
          href={localePath(locale, "/blog")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-ink hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {dict.blog.allPosts}
        </Link>
        <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">
          {dict.blog.tagTitle} <span className="text-gradient">{label}</span>
        </h1>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matching.map((post) => (
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
      </div>
    </div>
  );
}
