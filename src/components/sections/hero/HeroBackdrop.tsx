"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Slow parallax floating shapes behind the hero. Each layer moves at a
 * different speed while scrolling; static with reduced motion.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const slow = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 80]);
  const fast = useTransform(scrollY, [0, 800], [0, reduce ? 0 : -140]);
  const mid = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 40]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <m.div style={{ y: slow }} className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-blue/15 blur-3xl" />
      <m.div style={{ y: mid }} className="absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-brand-green/15 blur-3xl" />
      <m.div style={{ y: fast }} className="absolute left-[46%] top-28 hidden h-16 w-16 rounded-full border-2 border-brand-blue/30 lg:block">
        <span className="float block h-full w-full" />
      </m.div>
      <m.div style={{ y: slow }} className="absolute bottom-24 left-[8%] h-6 w-6 rounded-full bg-brand-green/40" />
      <m.div style={{ y: fast }} className="absolute right-[12%] top-24 h-3 w-3 rounded-full bg-brand-blue/50" />
      <m.div style={{ y: mid }} className="absolute bottom-10 right-[38%] hidden h-10 w-10 rotate-12 rounded-xl border-2 border-brand-green/30 sm:block" />
    </div>
  );
}
