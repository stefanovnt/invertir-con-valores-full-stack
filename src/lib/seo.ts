// Metadata helpers (replaces ShipFree's Pages-Router <Head> SEO component,
// which does nothing in the App Router).
import type { Metadata } from "next";
import { config } from "@/config";
import {
  defaultLocale,
  localePath,
  locales,
  localeTags,
  type Locale,
} from "@/i18n/config";

export function absoluteUrl(path = "/"): string {
  return `${config.domainName}${path === "/" ? "" : path}` || "/";
}

/** Canonical + hreflang alternates for a path that exists in every locale. */
export function alternatesFor(
  locale: Locale,
  path: string
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales)
    languages[localeTags[l]] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return { canonical: absoluteUrl(localePath(locale, path)), languages };
}

/** Share image (Open Graph / Twitter): the brand banner, 1200×630 JPEG. */
export const SHARE_IMAGE = {
  url: "/images/og-banner.jpg",
  width: 1200,
  height: 630,
  type: "image/jpeg",
};

// Open Graph needs language_TERRITORY (Facebook rejects a bare "en").
const OG_LOCALES: Record<Locale, string> = {
  es: "es_ES",
  it: "it_IT",
  en: "en_GB",
};
const ogLocale = (l: Locale) => OG_LOCALES[l];

type PageMetaInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  /** Only the canonical locale path exists (e.g. a Spanish-only blog post). */
  singleLocale?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
  /** Alt text of the share image, in the page language (dict.meta.ogAlt). */
  imageAlt: string;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  singleLocale,
  type = "website",
  noindex,
  imageAlt,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  return {
    ...(title ? { title } : {}),
    description,
    alternates: singleLocale ? { canonical: url } : alternatesFor(locale, path),
    openGraph: {
      type,
      url,
      siteName: config.appName,
      locale: ogLocale(locale),
      alternateLocale: locales.filter((l) => l !== locale).map(ogLocale),
      ...(title ? { title } : {}),
      description,
      // Child pages replace (not merge) the parent's openGraph, so every page
      // sets the image explicitly.
      images: [{ ...SHARE_IMAGE, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      description,
      images: [{ url: SHARE_IMAGE.url, alt: imageAlt }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
