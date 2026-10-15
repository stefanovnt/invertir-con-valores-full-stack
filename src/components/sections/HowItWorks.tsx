"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { animals, isAnimal } from "@/components/animals";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Scroll journey: as the visitor scrolls, an SVG line draws itself from the
 * ant (saving) through the turtle (investing) to the bee and the kangaroo.
 * A glowing dot rides the tip of the line. With reduced motion the line is
 * simply fully drawn.
 */
export function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = useTransform(smooth, (v) => (reduce ? 1 : v));
  const tipTop = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section
      id="como-funciona"
      aria-labelledby="how-title"
      className="section bg-gradient-to-b from-white via-brand-tint-green/60 to-white"
    >
      <div className="container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="how-title" className="h2 mt-4">
            {dict.title}
          </h2>
          <p className="lead mt-5">
            <Counter
              value={dict.steps.length}
              className="font-display font-extrabold text-brand-green-ink"
            />{" "}
            {dict.stepsCountSuffix}
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-5xl lg:mt-24">
          {/* the path: left on mobile, centered on desktop */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[35px] top-10 w-1 lg:left-1/2 lg:-translate-x-1/2"
          >
            <svg
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              className="h-full w-full overflow-visible"
            >
              <defs>
                {/* userSpaceOnUse: a vertical line has a zero-width bounding box */}
                <linearGradient
                  id="journey-line"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                >
                  <stop offset="0" stopColor="#1c92e1" />
                  <stop offset="1" stopColor="#31b317" />
                </linearGradient>
              </defs>
              <path
                d="M1 0V100"
                stroke="#748596"
                strokeOpacity=".25"
                strokeWidth="2"
                strokeDasharray="1 2"
              />
              <m.path
                d="M1 0V100"
                stroke="url(#journey-line)"
                strokeWidth="2"
                style={{ pathLength: progress }}
              />
            </svg>
            <m.span
              style={{ top: tipTop }}
              className="absolute left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green shadow-[0_0_0_6px_rgb(var(--icv-green)/0.2)]"
            />
          </div>

          <ol ref={listRef} className="relative space-y-12 lg:space-y-20">
            {dict.steps.map((step, i) => {
              const Animal = isAnimal(step.animal)
                ? animals[step.animal]
                : animals.ant;
              const left = i % 2 === 0;
              return (
                <li
                  key={step.title}
                  className="group grid grid-cols-[72px_1fr] items-center gap-5 lg:grid-cols-[1fr_160px_1fr] lg:gap-8"
                >
                  {/* node */}
                  <m.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="relative z-10 flex h-[72px] w-[72px] items-center justify-center justify-self-center rounded-full border border-brand-line bg-white shadow-[0_10px_30px_-18px_rgb(var(--icv-deep)/0.5)] lg:col-start-2 lg:row-start-1 lg:h-32 lg:w-32"
                  >
                    <Animal className="h-14 w-14 lg:h-24 lg:w-24" />
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-deep font-display text-sm font-extrabold text-white lg:h-9 lg:w-9 lg:text-base">
                      {i + 1}
                    </span>
                  </m.div>

                  {/* text */}
                  <Reveal
                    y={16}
                    className={cn(
                      "lg:row-start-1",
                      left ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
                    )}
                  >
                    <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-sm text-lg leading-relaxed text-brand-muted",
                        left && "lg:ml-auto"
                      )}
                    >
                      {step.text}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
