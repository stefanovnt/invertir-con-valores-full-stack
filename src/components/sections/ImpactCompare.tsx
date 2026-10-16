"use client";

import { m, type Variants } from "framer-motion";
import {
  Ban,
  Earth,
  HeartHandshake,
  Landmark,
  PawPrint,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Turtle } from "@/components/animals";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Bar heights are an illustrative shape, NOT data: no figures are shown.
const BANK = [1, 0.9, 0.8, 0.71, 0.63, 0.55]; // real value eroded by inflation
const INVESTED = [0.3, 0.38, 0.48, 0.6, 0.76, 1]; // long-term growth

const bankIcons = [Ban];
const investedIcons = [HeartHandshake, PawPrint, Earth];

/*
 * Animation, played once when the chart scrolls into view:
 * - bank: every bar starts at full height (what you saved) and shrinks one
 *   after another, leaving a dashed outline of the value inflation took;
 * - invested: bars start small and grow one after another.
 * Only transforms are animated, so with reduced motion framer-motion shows
 * the final state immediately.
 */
const bar: Variants = {
  start: (c: { from: number }) => ({ scaleY: c.from }),
  end: (c: { to: number; i: number }) => ({
    scaleY: c.to,
    transition: {
      duration: 1,
      delay: 0.25 + c.i * 0.14,
      ease: [0.3, 0, 0.2, 1],
    },
  }),
};

function Bars({ kind, label }: { kind: "bank" | "invested"; label: string }) {
  const values = kind === "bank" ? BANK : INVESTED;
  return (
    <m.div
      role="img"
      aria-label={label}
      initial="start"
      whileInView="end"
      viewport={{ once: true, amount: 0.7 }}
      className="flex h-36 items-end gap-2 sm:h-44 sm:gap-3"
    >
      {values.map((to, i) => (
        <div key={i} className="relative h-full flex-1">
          {kind === "bank" && (
            // what the savings were worth: stays visible as the bar shrinks
            <span className="absolute inset-0 rounded-t-xl border-2 border-dashed border-brand-coral/45" />
          )}
          <m.span
            custom={{ from: kind === "bank" ? 1 : 0.12, to, i }}
            variants={bar}
            style={{ originY: 1 }}
            className={cn(
              "absolute inset-x-0 bottom-0 h-full rounded-t-xl",
              kind === "bank"
                ? "bg-gradient-to-t from-[#6f7f8c] to-[#a3b0bb]"
                : "bg-gradient-to-t from-brand-blue to-brand-green"
            )}
          />
        </div>
      ))}
    </m.div>
  );
}

function CompareCard({
  kind,
  copy,
  timeStart,
  timeEnd,
}: {
  kind: "bank" | "invested";
  copy: Dictionary["problem"]["bank"];
  timeStart: string;
  timeEnd: string;
}) {
  const bank = kind === "bank";
  const TrendIcon = bank ? TrendingDown : TrendingUp;
  const icons = bank ? bankIcons : investedIcons;

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-4xl border p-6 sm:p-8",
        bank
          ? "border-white/10 bg-white/[0.04]"
          : "border-brand-green/40 bg-white/[0.08] shadow-[0_30px_80px_-40px_rgb(var(--icv-green)/0.6)]"
      )}
    >
      <header className="flex items-center gap-3">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
            bank ? "bg-brand-coral/15 text-brand-coral" : "bg-white"
          )}
        >
          {bank ? (
            <Landmark className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Turtle className="h-10 w-10" />
          )}
        </span>
        <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">
          {copy.title}
        </h3>
      </header>

      <div className="mt-8 flex items-center justify-between gap-3">
        <p className="text-sm text-brand-on-dark">{copy.chartLabel}</p>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
            bank
              ? "bg-brand-coral/15 text-brand-coral"
              : "bg-brand-green/15 text-brand-green"
          )}
        >
          <TrendIcon className="h-4 w-4" aria-hidden="true" />
          {copy.trend}
        </span>
      </div>

      <div className="mt-4">
        <Bars kind={kind} label={`${copy.chartLabel}: ${copy.trend}`} />
        <div className="mt-2 flex justify-between border-t border-white/15 pt-2 text-xs text-brand-on-dark">
          <span>{timeStart}</span>
          <span>{timeEnd}</span>
        </div>
      </div>

      <p className="mt-6 leading-relaxed text-white/90">{copy.caption}</p>

      <div className="mt-auto pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-on-dark">
          {copy.itemsLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {copy.items.map((item, i) => {
            const Icon = icons[i] ?? icons[0];
            return (
              <li
                key={item}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium",
                  bank
                    ? "border-brand-coral/30 text-brand-coral"
                    : "border-brand-green/40 text-brand-green"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

/** Side-by-side comparison: money left in the bank vs invested with values. */
export function ImpactCompare({ dict }: { dict: Dictionary["problem"] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
      <CompareCard
        kind="bank"
        copy={dict.bank}
        timeStart={dict.timeStart}
        timeEnd={dict.timeEnd}
      />
      <CompareCard
        kind="invested"
        copy={dict.invested}
        timeStart={dict.timeStart}
        timeEnd={dict.timeEnd}
      />
    </div>
  );
}
