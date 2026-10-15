import { ArrowUpRight } from "lucide-react";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { LeadForm } from "./LeadForm";
import { leadsBackendReady } from "@/lib/leads/providers";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type { LeadSource } from "@/lib/leads/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  source: Extract<LeadSource, "newsletter_footer" | "newsletter_blog">;
  tone?: "light" | "dark";
};

/**
 * Newsletter signup. Uses the shared /api/leads endpoint when a lead provider
 * is configured; otherwise falls back to a link to Substack (NEXT_PUBLIC_SUBSTACK_URL).
 */
export function NewsletterBlock({ locale, dict, source, tone = "light" }: Props) {
  if (!leadsBackendReady() && config.links.substack) {
    return (
      <Button asChild variant={tone === "dark" ? "light" : "dark"}>
        <a href={config.links.substack} target="_blank" rel="noopener noreferrer">
          {dict.footer.substackCta}
          <ArrowUpRight aria-hidden="true" />
          <span className="sr-only">{dict.common.opensNewTab}</span>
        </a>
      </Button>
    );
  }

  return (
    <LeadForm
      locale={locale}
      dict={dict.forms}
      source={source}
      submitLabel={dict.footer.newsletterSubmit}
      tone={tone}
      compact
    />
  );
}
