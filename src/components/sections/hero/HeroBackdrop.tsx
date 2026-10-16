"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Two soft, blurred colour glows behind the hero that drift slowly at
 * different speeds while scrolling (parallax). Static with reduced motion.
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const slow = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 80]);
  const mid = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 40]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <m.div
        style={{ y: slow }}
        className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-brand-blue/15 blur-3xl"
      />
      <m.div
        style={{ y: mid }}
        className="absolute -right-24 top-40 h-[24rem] w-[24rem] rounded-full bg-brand-green/15 blur-3xl"
      />
    </div>
  );
}
