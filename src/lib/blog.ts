import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/i18n/config";
import { isAnimal, type AnimalName } from "@/components/animals";

// Blog posts are MDX files in content/blog/<locale>/<slug>.mdx with frontmatter:
//   title, description, date (YYYY-MM-DD), tags: [..], animal: ant|turtle|bee|kangaroo, draft: true|false
// Locales without posts fall back to the Spanish ones (with a notice).

const ROOT = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
  /** Language the post is actually written in. */
  contentLocale: Locale;
  title: string;
  description: string;
  date: string;
  tags: string[];
  animal: AnimalName;
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

async function readPost(locale: Locale, slug: string): Promise<Post | null> {
  try {
    const raw = await fs.readFile(
      path.join(ROOT, locale, `${slug}.mdx`),
      "utf8"
    );
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).filter(Boolean).length;
    const animal = String(data.animal ?? "turtle");
    return {
      slug,
      contentLocale: locale,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: toDateString(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      animal: isAnimal(animal) ? animal : "turtle",
      draft: data.draft === true,
      readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
      body: content,
    };
  } catch {
    return null;
  }
}

async function readLocale(locale: Locale): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(path.join(ROOT, locale));
  } catch {
    return [];
  }
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => readPost(locale, f.replace(/\.mdx$/, "")))
  );
  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Posts for a locale, newest first. `fallback` = showing Spanish posts in another locale. */
export async function getPosts(
  locale: Locale
): Promise<{ posts: PostMeta[]; fallback: boolean }> {
  const own = await readLocale(locale);
  if (own.length > 0 || locale === defaultLocale)
    return { posts: own.map(stripBody), fallback: false };
  return {
    posts: (await readLocale(defaultLocale)).map(stripBody),
    fallback: true,
  };
}

export async function getPost(
  locale: Locale,
  slug: string
): Promise<{ post: Post; fallback: boolean } | null> {
  const own = await readPost(locale, slug);
  if (own) return { post: own, fallback: false };
  if (locale === defaultLocale) return null;
  const { fallback } = await getPosts(locale);
  if (!fallback) return null;
  const es = await readPost(defaultLocale, slug);
  return es ? { post: es, fallback: true } : null;
}

/** Published (non-draft) posts in their own language — for sitemap and RSS. */
export async function getPublishedPosts(locale: Locale): Promise<PostMeta[]> {
  return (await readLocale(locale)).filter((p) => !p.draft).map(stripBody);
}

export function tagSlug(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: string, locale: Locale): string {
  const d = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function stripBody({ body: _body, ...meta }: Post): PostMeta {
  void _body;
  return meta;
}
