import { Reveal } from "@/components/motion/Reveal";
import { tightPunctuation } from "@/lib/typography";
import { ImpactCompare } from "./ImpactCompare";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** "El problema": dark section comparing bank savings with values-driven investing. */
export function Problem({ dict }: { dict: Dictionary["problem"] }) {
  return (
    <section
      aria-labelledby="problem-title"
      className="on-dark section relative overflow-hidden bg-brand-deep text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl"
      />
      <div className="container relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="problem-title" className="h2 text-white">
            {tightPunctuation(dict.title)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-on-dark sm:text-xl">
            {dict.text}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <ImpactCompare dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
