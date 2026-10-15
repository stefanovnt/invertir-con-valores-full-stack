// Metadata helpers (replaces ShipFree's Pages-Router <Head> SEO component,
// which does nothing in the App Router).
import type { Metadata } from "next";
import { config } from "@/config";
import { defaultLocale, localePath, locales, localeTags, type Locale } from "@/i18n/config";

export function absoluteUrl(path = "/"): string {
  return `${config.domainName}${path === "/" ? "" : path}` || "/";
}

/** Canonical + hreflang alternates for a path that exists in every locale. */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = absoluteUrl(localePath(l, path));
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return { canonical: absoluteUrl(localePath(locale, path)), languages };
}

type PageMetaInput = {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  /** Only the canonical locale path exists (e.g. a Spanish-only blog post). */
  singleLocale?: boolean;
  type?: "website" | "article";
  noindex?: boolean;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  singleLocale,
  type = "website",
  noindex,
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
      locale: localeTags[locale].replace("-", "_"),
      ...(title ? { title } : {}),
      description,
    },
    twitter: { card: "summary_large_image", ...(title ? { title } : {}), description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
