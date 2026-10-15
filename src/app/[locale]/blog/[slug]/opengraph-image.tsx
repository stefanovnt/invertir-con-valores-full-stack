import { brandOgImage, ogSize } from "@/lib/og";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getPost } from "@/lib/blog";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Invertir con Valores · Blog";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const [dict, found] = await Promise.all([getDictionary(locale), getPost(locale, slug)]);
  return brandOgImage({ title: found?.post.title ?? dict.blog.title, eyebrow: dict.blog.eyebrow });
}
