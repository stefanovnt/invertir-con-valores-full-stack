import Link from "next/link";
import { Coffee } from "lucide-react";
import { Turtle } from "@/components/animals";
import { config } from "@/config";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { CalBooking } from "./CalBooking";
import { TelegramButton } from "./TelegramButton";
import { homeAnchor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

export function Coaching({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.coaching;
  return (
    <section id="coaching" aria-labelledby="coaching-title" className="section pt-0 sm:pt-0 lg:pt-0">
      <div className="container">
        <div className="card relative overflow-hidden p-7 sm:p-12 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint-green text-brand-green-ink">
                <Coffee className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="eyebrow mt-6">{c.eyebrow}</p>
              <h2 id="coaching-title" className="h2 mt-4">
                {c.title}
              </h2>
              <p className="lead mt-5">{c.text}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-brand-line pt-6">
                {c.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <Counter
                        value={f.value}
                        suffix={f.suffix}
                        className="block font-display text-3xl font-bold text-brand-deep sm:text-4xl"
                      />
                      <span className="mt-1 block text-sm text-brand-muted">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="group flex flex-col items-start justify-center">
              <div className="mb-8 flex w-full items-start gap-5 rounded-3xl bg-brand-tint-green/60 p-6 sm:p-8">
                <Turtle className="hidden h-20 w-20 shrink-0 sm:block" />
                <div>
                  <h3 className="font-display text-lg font-bold">{c.stepsTitle}</h3>
                  <ol className="mt-3 space-y-3">
                    {c.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-brand-deep">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-display text-sm font-bold text-brand-green-ink ring-1 ring-brand-green/30">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              {config.links.cal ? (
                <CalBooking
                  calUrl={config.links.cal}
                  cta={c.cta}
                  embedTitle={c.embedTitle}
                  openInNewTab={c.openInNewTab}
                  loading={c.loading}
                />
              ) : (
                // Graceful fallback while NEXT_PUBLIC_CAL_URL is empty.
                <div className="w-full rounded-3xl bg-brand-tint-blue/70 p-7 sm:p-9">
                  <p className="text-lg text-brand-deep">{c.fallback}</p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {config.links.telegram ? (
                      <TelegramButton
                        locale={locale}
                        label={dict.community.cta}
                        fallbackLabel={c.fallbackCta}
                        location="coaching"
                        newTabLabel={dict.common.opensNewTab}
                        variant="dark"
                      />
                    ) : null}
                    <Button asChild variant="secondary">
                      <Link href={homeAnchor(locale, "guia")}>{c.fallbackCta}</Link>
                    </Button>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
