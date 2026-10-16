import { config } from "@/config";
import { LeadForm } from "./LeadForm";
import { SubstackEmbed } from "./SubstackEmbed";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { LeadSource } from "@/lib/leads/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  source: Extract<
    LeadSource,
    "newsletter_home" | "newsletter_footer" | "newsletter_blog"
  >;
  tone?: "light" | "dark";
  /** Button label (defaults to the footer's "Suscribirme"). */
  submitLabel?: string;
};

/**
 * Newsletter signup used by the home section, footer and blog.
 * - NEXT_PUBLIC_SUBSTACK_URL set → Substack's own form (click-to-load embed).
 * - Otherwise → the site's form posting to /api/leads (DB / Resend providers).
 */
export function NewsletterBlock({
  locale,
  dict,
  source,
  tone = "light",
  submitLabel,
}: Props) {
  if (config.links.substack) {
    return (
      <SubstackEmbed
        locale={locale}
        substackUrl={config.links.substack}
        dict={dict.forms.substack}
        externalLabel={dict.footer.substackCta}
        newTabLabel={dict.common.opensNewTab}
        label={submitLabel ?? dict.forms.substack.cta}
        source={source}
        tone={tone}
      />
    );
  }

  return (
    <LeadForm
      locale={locale}
      dict={dict.forms}
      source={source}
      submitLabel={submitLabel ?? dict.footer.newsletterSubmit}
      tone={tone}
      compact
    />
  );
}
