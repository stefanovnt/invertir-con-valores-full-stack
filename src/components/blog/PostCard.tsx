import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { animals } from "@/components/animals";
import { cn } from "@/lib/utils";
import { formatDate, tagSlug, type PostMeta } from "@/lib/blog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const coverTints = {
  ant: "from-brand-tint-green to-brand-tint-blue",
  turtle: "from-brand-tint-blue to-brand-tint-green",
  bee: "from-brand-tint-green via-white to-brand-tint-green",
  kangaroo: "from-brand-tint-blue via-white to-brand-tint-blue",
} as const;

/** Illustrated cover (no image files needed): brand tint + the post's animal. */
export function PostCover({ post, className }: { post: Pick<PostMeta, "animal">; className?: string }) {
  const Animal = animals[post.animal];
  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br",
        coverTints[post.animal],
        className
      )}
    >
      <div aria-hidden="true" className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/60" />
      <div aria-hidden="true" className="absolute -left-6 -top-6 h-24 w-24 rounded-full border-2 border-white/80" />
      <Animal className="relative h-1/2 w-1/2 max-w-[9rem] transition-transform duration-500 group-hover:scale-110" />
    </div>
  );
}

export function PostCard({
  post,
  locale,
  dict,
  headingLevel = "h3",
}: {
  post: PostMeta;
  locale: Locale;
  dict: Dictionary["blog"];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = localePath(locale, `/blog/${post.slug}`);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-brand-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgb(var(--icv-deep)/0.45)]">
      <PostCover post={post} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag}
              href={localePath(locale, `/blog/tag/${tagSlug(tag)}`)}
              className="relative z-10 rounded-full bg-brand-tint-green px-2.5 py-1 text-brand-green-ink hover:bg-brand-green/20"
            >
              {tag}
            </Link>
          ))}
          {post.draft && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">{dict.draft}</span>
          )}
        </div>
        <Heading className="mt-4 font-display text-xl font-bold leading-snug">
          {/* The whole card is clickable through this link's ::after. */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 flex-1 leading-relaxed text-brand-muted">{post.description}</p>
        <div className="mt-5 flex items-center justify-between text-sm text-brand-muted">
          <span>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time> · {post.readingMinutes} {dict.readingTime}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 text-brand-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </article>
  );
}
