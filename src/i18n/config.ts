// Locale routing rules.
// - Spanish is the default locale and is served WITHOUT a prefix ("/", "/blog").
// - Italian and English are served under "/it" and "/en".
// - src/proxy.ts rewrites unprefixed paths to /es internally and redirects /es/* to /*.

export const locales = ["es", "it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  it: "Italiano",
  en: "English",
};

/** BCP 47 tags used for <html lang>, Open Graph and JSON-LD. */
export const localeTags: Record<Locale, string> = {
  es: "es-ES",
  it: "it-IT",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a public URL path for a locale: ("es", "/blog") -> "/blog", ("it", "/blog") -> "/it/blog". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}

/** Link to a section anchor on the home page of a locale ("/#recursos", "/it#recursos"). */
export function homeAnchor(locale: Locale, id: string): string {
  return `${localePath(locale, "/")}#${id}`;
}

/** Strip a non-default locale prefix from a browser pathname. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (first && isLocale(first)) return `/${rest.join("/")}`;
  return pathname || "/";
}
