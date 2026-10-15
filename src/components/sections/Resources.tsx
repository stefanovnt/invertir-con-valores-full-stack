import { BookOpen, Calculator, ClipboardCheck, Table2 } from "lucide-react";
import { Ant } from "@/components/animals";
import { LeadForm } from "@/components/forms/LeadForm";
import { TiltCard } from "@/components/motion/Interactive";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const icons = [BookOpen, ClipboardCheck, Calculator, Table2];

export function Resources({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const r = dict.resources;
  return (
    <section
      id="recursos"
      aria-labelledby="resources-title"
      className="section"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{r.eyebrow}</p>
          <h2 id="resources-title" className="h2 mt-4">
            {r.title}
          </h2>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {r.cards.map((card, i) => {
            const Icon = icons[i] ?? BookOpen;
            return (
              <RevealItem as="li" key={card.title}>
                <TiltCard className="h-full">
                  <article
                    className={cn(
                      "card flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgb(var(--icv-blue)/0.6)]",
                      card.soon && "bg-brand-tint-blue/40"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-tint-blue text-brand-blue-ink">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          card.soon
                            ? "bg-white text-brand-muted ring-1 ring-brand-line"
                            : "bg-brand-tint-green text-brand-green-ink"
                        )}
                      >
                        {card.badge}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-extrabold leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-brand-muted">
                      {card.text}
                    </p>
                  </article>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Lead magnet form — the navbar/hero "Guía gratis" CTAs point here. */}
        <Reveal className="mt-16">
          <div
            id="guia"
            className="relative scroll-mt-28 overflow-hidden rounded-[2.5rem] bg-brand-gradient p-[2px] shadow-[0_40px_80px_-50px_rgb(var(--icv-blue)/0.9)]"
          >
            <div className="group grid gap-10 rounded-[calc(2.5rem-2px)] bg-white p-7 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
              <div>
                <Ant className="h-24 w-24" />
                <h3 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
                  {r.formTitle}
                </h3>
                <p className="lead mt-3">{r.formText}</p>
              </div>
              <LeadForm
                locale={locale}
                dict={dict.forms}
                source="guide"
                withName
                submitLabel={r.submit}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
