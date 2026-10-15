"use client";

import { useRef, useState } from "react";
import { GraduationCap, UserRound, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { waitlistOffers, type WaitlistOffer } from "@/lib/leads/types";

const icons: Record<WaitlistOffer, typeof Users> = {
  premium: Users,
  coaching: UserRound,
  course: GraduationCap,
};
const isOffer = (v: string): v is WaitlistOffer =>
  (waitlistOffers as readonly string[]).includes(v);

/**
 * Soft teaser of future paid offers (no prices). Each card opens a native
 * <dialog> (focus trap, Esc to close, inert background for free) with a
 * waitlist form tagged by offer.
 */
export function LearningPath({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const l = dict.learning;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [offer, setOffer] = useState<WaitlistOffer | null>(null);
  const [formKey, setFormKey] = useState(0);
  const current = l.offers.find((o) => o.id === offer);

  function openFor(id: WaitlistOffer) {
    setOffer(id);
    setFormKey((k) => k + 1); // fresh form each time
    dialogRef.current?.showModal();
  }

  return (
    <section
      id="camino"
      aria-labelledby="learning-title"
      className="section bg-gradient-to-b from-white to-brand-tint-blue/60"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{l.eyebrow}</p>
          <h2 id="learning-title" className="h2 mt-4">
            {l.title}
          </h2>
          <p className="lead mt-5">{l.text}</p>
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-5 md:grid-cols-3">
          {l.offers.map((o) => {
            if (!isOffer(o.id)) return null;
            const Icon = icons[o.id];
            return (
              <RevealItem as="li" key={o.id}>
                <article className="card flex h-full flex-col p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-brand-deep">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    {o.soon && (
                      <span className="rounded-full bg-brand-tint-blue px-3 py-1 text-xs font-semibold text-brand-blue-ink">
                        {dict.common.comingSoon}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-extrabold">
                    {o.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-brand-muted">
                    {o.text}
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-8 self-start"
                    onClick={() => openFor(o.id as WaitlistOffer)}
                    aria-haspopup="dialog"
                  >
                    {l.cta}
                    <span className="sr-only">: {o.title}</span>
                  </Button>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="waitlist-title"
        onClick={(e) => {
          // Click on the backdrop closes the dialog.
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(92vw,34rem)] rounded-[2rem] bg-white p-0 text-brand-deep shadow-2xl backdrop:bg-brand-deep/50 backdrop:backdrop-blur-sm open:motion-safe:animate-in open:motion-safe:fade-in open:motion-safe:zoom-in-95"
      >
        <div className="relative p-7 sm:p-9">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={dict.common.close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-tint-blue"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="eyebrow">{l.dialogTitle}</p>
          <h2
            id="waitlist-title"
            className="mt-3 pr-10 font-display text-3xl font-extrabold"
          >
            {current?.title}
          </h2>
          <p className="mt-3 text-brand-muted">{l.dialogText}</p>
          {offer && (
            <LeadForm
              key={formKey}
              locale={locale}
              dict={dict.forms}
              source="waitlist"
              offer={offer}
              submitLabel={l.submit}
              className="mt-6"
            />
          )}
        </div>
      </dialog>
    </section>
  );
}
