"use client";

import Link from "next/link";
import { tightPunctuation } from "@/lib/typography";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { KangarooStairs } from "./KangarooStairs";
import { homeAnchor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** "Sin perfeccionismo": perfect is almost impossible, the first step isn't. */
export function FirstStep({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["firstStep"];
}) {
  return (
    <section
      id="primer-paso"
      aria-labelledby="first-step-title"
      className="section bg-gradient-to-b from-white to-brand-tint-green/60"
    >
      <div className="container grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="first-step-title" className="h2 mt-4">
            {tightPunctuation(dict.title)}
          </h2>
          <p className="lead mt-6">{dict.text}</p>
          <p className="mt-8 font-semibold text-brand-deep">{dict.listTitle}</p>
          <ul className="mt-4 space-y-3">
            {dict.steps.map((step) => (
              <li
                key={step}
                className="flex items-start gap-3 text-brand-deep/90"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                  <Check
                    className="h-3.5 w-3.5 text-brand-deep"
                    aria-hidden="true"
                  />
                </span>
                {step}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-9">
            <Link href={homeAnchor(locale, "suscribete")}>
              {dict.cta}
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
        <Reveal delay={0.1}>
          <KangarooStairs dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
