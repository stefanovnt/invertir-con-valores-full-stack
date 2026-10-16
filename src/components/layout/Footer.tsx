import Link from "next/link";
import { isNavLinkEnabled } from "@/config";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { NewsletterBlock } from "@/components/forms/NewsletterBlock";
import { homeAnchor, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type Props = { locale: Locale; dict: Dictionary };

export function Footer({ locale, dict }: Props) {
  const { footer, nav } = dict;
  const year = new Date().getFullYear();
  const linkClass =
    "rounded text-brand-on-dark transition-colors hover:text-white hover:underline";

  return (
    <footer className="on-dark relative overflow-hidden bg-brand-deep text-white">
      {/* Soft brand glow in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl"
      />
      <div className="container relative py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.5fr]">
          <div className="space-y-5">
            <Link
              href={localePath(locale, "/")}
              className="inline-block rounded-lg"
              aria-label="Invertir con Valores"
            >
              <Logo onDark />
            </Link>
            <p className="max-w-xs text-brand-on-dark">{footer.tagline}</p>
            <SocialLinks />
          </div>

          <nav aria-label={footer.navTitle}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {footer.navTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              {nav.links.filter(isNavLinkEnabled).map((l) => (
                <li key={l.label}>
                  <Link
                    className={linkClass}
                    href={
                      "anchor" in l && l.anchor
                        ? homeAnchor(locale, l.anchor)
                        : localePath(locale, l.href ?? "/")
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.legalTitle}>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white">
              {footer.legalTitle}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  className={linkClass}
                  href={localePath(locale, "/aviso-legal")}
                >
                  {footer.legal.notice}
                </Link>
              </li>
              <li>
                <Link
                  className={linkClass}
                  href={localePath(locale, "/privacidad")}
                >
                  {footer.legal.privacy}
                </Link>
              </li>
              <li>
                <Link
                  className={linkClass}
                  href={localePath(locale, "/cookies")}
                >
                  {footer.legal.cookies}
                </Link>
              </li>
            </ul>
          </nav>

          <div id="newsletter" className="scroll-mt-28">
            <h2 className="font-display text-lg font-semibold text-white">
              {footer.newsletterTitle}
            </h2>
            <p className="mt-2 text-brand-on-dark">{footer.newsletterText}</p>
            <div className="mt-5">
              <NewsletterBlock
                locale={locale}
                dict={dict}
                source="newsletter_footer"
                tone="dark"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-sm leading-relaxed text-brand-on-dark">
            {footer.disclaimer}
          </p>
          <p className="mt-4 text-sm text-brand-on-dark">
            © {year} Invertir con Valores. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
