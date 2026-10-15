"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Accessible accordion: real <button>s with aria-expanded/aria-controls,
 * keyboard friendly by default. The panel height animates with the
 * grid-template-rows 0fr → 1fr trick (no JS measuring).
 */
export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-brand-tint-blue/50">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="faq-title" className="h2 mt-4">
            {dict.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="divide-y divide-brand-line rounded-4xl border border-brand-line bg-white">
            {dict.items.map((item, i) => {
              const isOpen = open === i;
              const buttonId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left font-display text-lg font-semibold sm:px-8 sm:text-xl"
                    >
                      {item.q}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-line transition-[transform,background-color] duration-300",
                          isOpen && "rotate-45 border-transparent bg-brand-gradient"
                        )}
                      >
                        <Plus className="h-5 w-5" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-lg leading-relaxed text-brand-muted sm:px-8">{item.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
