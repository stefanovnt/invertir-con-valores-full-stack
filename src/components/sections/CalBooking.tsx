"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarHeart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/Interactive";
import { track } from "@/lib/analytics";

type Props = {
  calUrl: string;
  cta: string;
  embedTitle: string;
  openInNewTab: string;
  loading: string;
};

/**
 * Cal.com booking as a click-to-load facade: no third-party iframe (and no
 * cookies) until the visitor asks for it, which keeps the page fast.
 */
export function CalBooking({ calUrl, cta, embedTitle, openInNewTab, loading }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const embedUrl = `${calUrl}${calUrl.includes("?") ? "&" : "?"}embed=true&theme=light&layout=month_view`;

  if (!open) {
    return (
      <div className="flex flex-col items-start gap-4">
        <Magnetic>
          <Button
            size="lg"
            onClick={() => {
              track("cal_click", { location: "coaching" });
              setOpen(true);
            }}
          >
            <CalendarHeart aria-hidden="true" />
            {cta}
          </Button>
        </Magnetic>
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cal_click", { location: "coaching_new_tab" })}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-ink underline-offset-4 hover:underline"
        >
          {openInNewTab}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative h-[640px] overflow-hidden rounded-3xl border border-brand-line bg-white">
        {!loaded && (
          <p className="absolute inset-0 flex items-center justify-center gap-2 text-brand-muted" role="status">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            {loading}
          </p>
        )}
        <iframe
          src={embedUrl}
          title={embedTitle}
          className="h-full w-full"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <a
        href={calUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-ink underline-offset-4 hover:underline"
      >
        {openInNewTab}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
