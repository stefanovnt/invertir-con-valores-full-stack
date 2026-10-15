import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

// MDX rendering for blog posts and legal pages. Content lives in /content and
// is trusted (written by us), but JS expressions stay blocked (mdx-remote v6 default).

const components = {
  a: ({ href = "", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
};

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  return content;
}

export const proseClass =
  "prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-h2:mt-12 prose-a:font-semibold prose-a:underline-offset-2 prose-blockquote:rounded-r-2xl prose-blockquote:bg-brand-tint-green/50 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic prose-li:my-1";
