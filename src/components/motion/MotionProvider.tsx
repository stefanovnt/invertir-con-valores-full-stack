"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * - LazyMotion + `m` components keep the framer-motion bundle small.
 * - reducedMotion="user": when the OS asks for reduced motion, framer-motion
 *   drops transform/layout animations and keeps opacity fades.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
