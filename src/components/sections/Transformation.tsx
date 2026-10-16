"use client";

import { m } from "framer-motion";
import { tightPunctuation } from "@/lib/typography";
import { Kangaroo } from "@/components/animals";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** Antes → Después: muted "before" card, an arrow that draws itself, a bright "after" card. */
export function Transformation({
  dict,
}: {
  dict: Dictionary["transformation"];
}) {
  return (
    <section aria-labelledby="transformation-title" className="section">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="transformation-title" className="h2 mt-4">
            {tightPunctuation(dict.title)}
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <Reveal className="card flex flex-col bg-brand-tint-blue/60 p-8 sm:p-10">
            <span className="chip self-start border-brand-slate/40 bg-transparent text-brand-muted">
              {dict.before.label}
            </span>
            <blockquote className="mt-6 text-xl leading-relaxed text-brand-muted sm:text-2xl">
              “{dict.before.text}”
            </blockquote>
          </Reveal>

          {/* arrow: vertical on mobile, horizontal on desktop */}
          <div className="flex items-center justify-center" aria-hidden="true">
            <svg
              viewBox="0 0 80 80"
              className="h-16 w-16 rotate-90 lg:h-20 lg:w-20 lg:rotate-0"
            >
              <m.path
                d="M8 40h58M48 22l18 18-18 18"
                fill="none"
                stroke="url(#transform-arrow)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
              />
              <defs>
                <linearGradient id="transform-arrow" x1="0" x2="1">
                  <stop offset="0" stopColor="#1c92e1" />
                  <stop offset="1" stopColor="#31b317" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <Reveal
            delay={0.35}
            className="relative rounded-4xl bg-brand-gradient p-[2px] shadow-[0_30px_60px_-35px_rgb(var(--icv-green)/0.8)]"
          >
            <div className="group flex h-full flex-col rounded-[calc(2rem-2px)] bg-white p-8 sm:p-10">
              <div className="flex items-start justify-between gap-4">
                <span className="chip border-transparent bg-brand-tint-green text-brand-green-ink">
                  {dict.after.label}
                </span>
                <Kangaroo className="-mt-4 h-20 w-20 shrink-0" />
              </div>
              <blockquote className="mt-4 text-xl font-medium leading-relaxed text-brand-deep sm:text-2xl">
                “{dict.after.text}”
              </blockquote>
              <p className="mt-8 text-sm font-semibold text-brand-muted">
                {dict.feelingsLabel}
              </p>
              <RevealGroup as="ul" className="mt-3 flex flex-wrap gap-2">
                {dict.feelings.map((f) => (
                  <RevealItem
                    as="li"
                    key={f}
                    className="chip border-brand-green/30 bg-brand-tint-green/60"
                  >
                    {f}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
