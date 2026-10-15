import { brandOgImage, ogSize } from "@/lib/og";
import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, isLocale } from "@/i18n/config";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Invertir con Valores";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : defaultLocale);
  return brandOgImage({ title: dict.hero.title, eyebrow: dict.hero.eyebrow });
}
