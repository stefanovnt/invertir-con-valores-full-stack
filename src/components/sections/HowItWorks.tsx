"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Infinity as InfinityIcon } from "lucide-react";
import { animals, isAnimal } from "@/components/animals";
import { Reveal } from "@/components/motion/Reveal";
import { tightPunctuation } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Geometry of the loop (SVG viewBox 0 0 400 400).
const C = 200; // centre
const R = 150; // ring radius
// Stages sit on the diagonals, clockwise from top-left: save → invest → share → grow.
const STAGE_ANGLES = [-135, -45, 45, 135];
const LAP_SECONDS = 16; // one full turn = 4 s per stage

const point = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) };
};
// Desktop placement of the four text cards around the loop.
const CARD_PLACEMENT = [
  "lg:col-start-1 lg:row-start-1 lg:text-right",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-1 lg:row-start-2 lg:text-right",
];

/**
 * "Cómo funciona" as a continuous cycle, not a ladder: you keep saving,
 * investing, sharing and growing at the same time.
 *
 * - A gradient current flows clockwise around the ring (CSS dash animation).
 * - A dot travels the loop; the stage it last passed is highlighted, both on
 *   the ring and in its text card.
 * - Hovering a stage (node or card) brings the dot to it and pauses the loop.
 * - Reduced motion: no flow, no travelling dot; hover still highlights.
 * All four stages are always visible as text, so nothing depends on motion.
 */
export function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  const loopRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(loopRef, { amount: 0.4 });
  const [active, setActive] = useState<number | null>(null);

  // Dot angle (degrees, clockwise from 3 o'clock) and its position on the ring.
  const angle = useMotionValue(STAGE_ANGLES[0]);
  const dotX = useTransform(angle, (a) => point(a).x);
  const dotY = useTransform(angle, (a) => point(a).y);
  const loop = useRef<AnimationPlaybackControls | null>(null);
  const hovering = useRef(false);

  useMotionValueEvent(angle, "change", (a) => {
    if (hovering.current) return;
    const travelled = (((a - STAGE_ANGLES[0]) % 360) + 360) % 360;
    const stage = Math.floor(travelled / 90) % 4;
    setActive((prev) => (prev === stage ? prev : stage));
  });

  const startLoop = useCallback(() => {
    loop.current?.stop();
    const from = angle.get();
    loop.current = animate(angle, [from, from + 360], {
      duration: LAP_SECONDS,
      ease: "linear",
      repeat: Infinity,
    });
  }, [angle]);

  // Run the loop only while visible (and never with reduced motion).
  useEffect(() => {
    if (reduce || !inView) {
      loop.current?.stop();
      loop.current = null;
      return;
    }
    if (!hovering.current) startLoop();
    return () => loop.current?.stop();
  }, [inView, reduce, startLoop]);

  const focusStage = (i: number) => {
    hovering.current = true;
    setActive(i);
    if (reduce) return;
    loop.current?.stop();
    // Travel forward (clockwise) to the stage, never backwards.
    const current = angle.get();
    const delta = (((STAGE_ANGLES[i] - current) % 360) + 360) % 360;
    loop.current = animate(angle, current + delta, {
      duration: 0.35 + delta / 360,
      ease: [0.3, 0, 0.2, 1],
    });
  };
  const release = () => {
    hovering.current = false;
    if (reduce) {
      setActive(null);
      return;
    }
    if (inView) startLoop();
  };

  const stages = dict.steps.map((s, i) => ({
    ...s,
    Animal: isAnimal(s.animal) ? animals[s.animal] : animals.ant,
    pos: point(STAGE_ANGLES[i]),
  }));

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
            {tightPunctuation(dict.title)}
          </h2>
          <p className="lead mt-5">{dict.lead}</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-[1fr_minmax(0,26rem)_1fr] lg:grid-rows-2 lg:items-center lg:gap-x-10 lg:gap-y-10">
          {/* the loop */}
          <Reveal className="sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div
              ref={loopRef}
              className="relative mx-auto aspect-square w-full max-w-[26rem]"
              onPointerLeave={release}
            >
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="loop-grad"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="400"
                    y2="400"
                  >
                    <stop offset="0" stopColor="#1c92e1" />
                    <stop offset="1" stopColor="#31b317" />
                  </linearGradient>
                </defs>
                <circle
                  cx={C}
                  cy={C}
                  r={R}
                  fill="none"
                  stroke="#748596"
                  strokeOpacity=".18"
                  strokeWidth="10"
                />
                {/* clockwise current */}
                <circle
                  cx={C}
                  cy={C}
                  r={R}
                  fill="none"
                  stroke="url(#loop-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="4 14"
                  className="loop-flow"
                />
                {/* direction chevrons between stages */}
                {[-90, 0, 90, 180].map((deg) => {
                  const p = point(deg);
                  return (
                    <path
                      key={deg}
                      d="M-5 -7 L3 0 L-5 7"
                      transform={`translate(${p.x} ${p.y}) rotate(${deg + 90})`}
                      fill="none"
                      stroke="#23810f"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })}
                {/* travelling dot */}
                {!reduce && (
                  <g>
                    <m.circle
                      cx={dotX}
                      cy={dotY}
                      r="16"
                      fill="#31b317"
                      fillOpacity=".22"
                    />
                    <m.circle
                      cx={dotX}
                      cy={dotY}
                      r="8"
                      fill="#31b317"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  </g>
                )}
              </svg>

              {/* centre */}
              <div className="absolute inset-[30%] flex flex-col items-center justify-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_-15px_rgb(var(--icv-deep)/0.5)]">
                  <InfinityIcon
                    className="h-6 w-6 text-brand-green-ink"
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-3 font-display text-base font-extrabold leading-tight sm:text-lg">
                  {dict.loopLabel}
                </p>
                <p className="text-sm text-brand-muted">{dict.loopNote}</p>
              </div>

              {/* stage nodes (decorative: the cards carry the content) */}
              {stages.map(({ Animal, pos, title }, i) => (
                <div
                  key={title}
                  aria-hidden="true"
                  onPointerEnter={() => focusStage(i)}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{
                    left: `${(pos.x / 400) * 100}%`,
                    top: `${(pos.y / 400) * 100}%`,
                  }}
                >
                  <span
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full border bg-white shadow-[0_10px_30px_-18px_rgb(var(--icv-deep)/0.5)] transition-[transform,box-shadow,border-color,background-color] duration-300 sm:h-24 sm:w-24",
                      active === i
                        ? "scale-110 border-brand-green/50 bg-brand-tint-green ring-4 ring-brand-green/25"
                        : "border-brand-line"
                    )}
                  >
                    <Animal className="h-14 w-14 sm:h-16 sm:w-16" />
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 rounded-full px-2.5 py-0.5 font-display text-sm font-extrabold transition-colors duration-300",
                      active === i
                        ? "bg-brand-deep text-white"
                        : "bg-white/80 text-brand-deep"
                    )}
                  >
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* stage texts, in reading order (save → invest → share → grow) */}
          {stages.map(({ Animal, title, text }, i) => (
            <Reveal key={title} delay={0.08 * i} className={CARD_PLACEMENT[i]}>
              <article
                onPointerEnter={() => focusStage(i)}
                onPointerLeave={release}
                className={cn(
                  "group flex h-full items-start gap-4 rounded-3xl border bg-white/80 p-5 transition-[border-color,box-shadow] duration-300 sm:p-6",
                  i === 0 || i === 3 ? "lg:flex-row-reverse" : "",
                  active === i
                    ? "border-brand-green/50 shadow-[0_20px_40px_-25px_rgb(var(--icv-green)/0.7)]"
                    : "border-brand-line"
                )}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-tint-green">
                  <Animal className="h-10 w-10" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold">
                    {title}
                  </h3>
                  <p className="mt-1 leading-relaxed text-brand-muted">
                    {text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
