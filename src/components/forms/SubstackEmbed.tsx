"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type Props = {
  locale: Locale;
  substackUrl: string;
  dict: Dictionary["forms"]["substack"];
  externalLabel: string;
  newTabLabel: string;
  /** Button label before the form loads. */
  label: string;
  /** Where the form is shown (analytics). */
  source: string;
  tone?: "light" | "dark";
};

/**
 * Substack's official signup form (https://<publication>/embed) behind a
 * click-to-load facade: nothing from Substack (iframe, cookies) loads until
 * the visitor asks for it. Substack then handles confirmation, double opt-in
 * and unsubscribes.
 */
export function SubstackEmbed({
  locale,
  substackUrl,
  dict,
  externalLabel,
  newTabLabel,
  label,
  source,
  tone = "light",
}: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const base = substackUrl.replace(/\/+$/, "");
  const dark = tone === "dark";

  const externalLink = (
    <a
      href={base}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-xs font-semibold underline-offset-2 hover:underline",
        dark ? "text-brand-on-dark hover:text-white" : "text-brand-blue-ink"
      )}
    >
      {externalLabel}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">{newTabLabel}</span>
    </a>
  );

  if (!open) {
    return (
      <div className="space-y-3">
        <Button
          type="button"
          variant={dark ? "light" : "primary"}
          onClick={() => {
            track("substack_open", { source });
            setOpen(true);
          }}
        >
          <Mail aria-hidden="true" />
          {label}
        </Button>
        <p
          className={cn(
            "text-xs leading-relaxed",
            dark ? "text-brand-on-dark" : "text-brand-muted"
          )}
        >
          {dict.note}{" "}
          <Link
            href={localePath(locale, "/privacidad")}
            className={cn(
              "font-semibold underline underline-offset-2",
              dark ? "text-white" : "text-brand-blue-ink"
            )}
          >
            {dict.privacy}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="relative overflow-hidden rounded-2xl border border-brand-line bg-white">
        {!loaded && (
          <p
            role="status"
            className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-brand-muted"
          >
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {dict.loading}
          </p>
        )}
        <iframe
          src={`${base}/embed`}
          title={dict.iframeTitle}
          className="block h-[320px] w-full"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      {externalLink}
    </div>
  );
}
