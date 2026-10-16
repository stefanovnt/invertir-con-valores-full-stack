import { Check } from "lucide-react";
import { Ant } from "@/components/animals";
import { NewsletterBlock } from "@/components/forms/NewsletterBlock";
import { Reveal } from "@/components/motion/Reveal";
import { tightPunctuation } from "@/lib/typography";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Main signup of the home page. Every "Newsletter" CTA (navbar, hero,
 * first step, community, final CTA) points here (#suscribete).
 */
export function NewsletterSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const n = dict.newsletter;
  return (
    <section
      id="suscribete"
      aria-labelledby="newsletter-title"
      className="section scroll-mt-20"
    >
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-gradient p-[2px] shadow-[0_40px_80px_-50px_rgb(var(--icv-blue)/0.9)]">
            <div className="group grid gap-10 rounded-[calc(2.5rem-2px)] bg-white p-7 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow">{n.eyebrow}</p>
                <h2 id="newsletter-title" className="h2 mt-4">
                  {tightPunctuation(n.title)}
                </h2>
                <p className="lead mt-4">{n.text}</p>
                <ul className="mt-6 space-y-3">
                  {n.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-brand-deep/90"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gradient">
                        <Check
                          className="h-3.5 w-3.5 text-brand-deep"
                          aria-hidden="true"
                        />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-brand-tint-green/60 p-6 sm:p-8">
                <Ant className="-mt-2 mb-2 h-20 w-20" />
                <NewsletterBlock
                  locale={locale}
                  dict={dict}
                  source="newsletter_home"
                  submitLabel={n.submit}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
