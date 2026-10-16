import Link from "next/link";
import { tightPunctuation } from "@/lib/typography";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/PostCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getPosts } from "@/lib/blog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

export async function LatestPosts({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const { posts, fallback } = await getPosts(locale);
  const latest = posts.slice(0, 3);
  const b = dict.blog;
  if (latest.length === 0) return null;

  return (
    <section id="blog" aria-labelledby="blog-title" className="section">
      <div className="container">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{b.eyebrow}</p>
            <h2 id="blog-title" className="h2 mt-4">
              {tightPunctuation(b.title)}
            </h2>
            {fallback && (
              <p className="mt-3 text-brand-muted">{b.fallbackNotice}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="#suscribete">
                <Mail aria-hidden="true" />
                {b.subscribe}
              </Link>
            </Button>
            <Button asChild variant="dark">
              <Link href={localePath(locale, "/blog")}>
                {b.viewAll}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Reveal>
        <RevealGroup
          as="ul"
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {latest.map((post) => (
            <RevealItem as="li" key={post.slug}>
              <PostCard post={post} locale={locale} dict={b} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
