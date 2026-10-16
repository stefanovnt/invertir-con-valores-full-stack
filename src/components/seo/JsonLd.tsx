import { config } from "@/config";
import { absoluteUrl } from "@/lib/seo";
import { localePath, localeTags, type Locale } from "@/i18n/config";

/** Renders JSON-LD safely (escapes "<" so content can't close the script tag). */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationJsonLd() {
  const sameAs = [
    config.social.youtube,
    config.social.instagram,
    config.social.tiktok,
    config.links.substack,
  ].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: config.appName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    founder: { "@type": "Person", name: config.founder },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl(localePath(locale, "/"))}#website`,
    name: config.appName,
    url: absoluteUrl(localePath(locale, "/")),
    description,
    inLanguage: localeTags[locale],
    publisher: { "@id": `${absoluteUrl("/")}#organization` },
  };
}
