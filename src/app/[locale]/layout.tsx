import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { config, isNavLinkEnabled } from "@/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SimpleAnalytics } from "@/components/analytics/SimpleAnalytics";
import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, localeTags } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
// Display font: Plus Jakarta Sans (variable, 200–800) — modern, round, curvy.
// Headings use ExtraBold (800).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

// Only es/it/en exist; anything else 404s.
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(config.domainName),
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    applicationName: config.appName,
    keywords: dict.meta.keywords,
    authors: [{ name: config.founder, url: config.domainName }],
    creator: config.founder,
    publisher: config.appName,
    category: "finance",
    // Let Google show large image previews and full snippets.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
    ...(config.seo.googleVerification
      ? { verification: { google: config.seo.googleVerification } }
      : {}),
    ...pageMetadata({
      locale,
      path: "/",
      description: dict.meta.description,
      imageAlt: dict.meta.ogAlt,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={localeTags[locale]}
      className={`${inter.variable} ${jakarta.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-brand-deep px-5 py-3 font-semibold text-white"
        >
          {dict.common.skipToContent}
        </a>
        <MotionProvider>
          <Navbar
            locale={locale}
            nav={{
              ...dict.nav,
              links: dict.nav.links.filter(isNavLinkEnabled),
            }}
            common={dict.common}
          />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
        </MotionProvider>
        {config.analytics.simpleAnalytics && (
          <SimpleAnalytics hostname={config.analytics.hostname || undefined} />
        )}
        <JsonLd
          data={[
            organizationJsonLd(),
            websiteJsonLd(locale, dict.meta.description),
          ]}
        />
      </body>
    </html>
  );
}
