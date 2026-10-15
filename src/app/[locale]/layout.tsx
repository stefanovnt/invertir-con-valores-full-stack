import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { config } from "@/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Analytics, ConsentProvider, CookieBanner } from "@/components/consent/Consent";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localePath, locales, localeTags } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
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

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    metadataBase: new URL(config.domainName),
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    applicationName: config.appName,
    authors: [{ name: config.founder }],
    creator: config.founder,
    ...pageMetadata({ locale, path: "/", description: dict.meta.description }),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const analyticsEnabled = Boolean(config.analytics.plausibleDomain);

  return (
    <html lang={localeTags[locale]} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-brand-deep px-5 py-3 font-semibold text-white"
        >
          {dict.common.skipToContent}
        </a>
        <ConsentProvider enabled={analyticsEnabled}>
          <MotionProvider>
            <Navbar locale={locale} nav={dict.nav} common={dict.common} />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
          </MotionProvider>
          <CookieBanner dict={dict.cookies} privacyHref={localePath(locale, "/cookies")} />
          <Analytics domain={config.analytics.plausibleDomain} src={config.analytics.plausibleSrc} />
        </ConsentProvider>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale, dict.meta.description)]} />
      </body>
    </html>
  );
}
