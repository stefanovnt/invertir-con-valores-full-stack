"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Flag, Hand } from "lucide-react";
import { Kangaroo } from "@/components/animals";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Step heights (% of the stairs box). The first one is within reach; the rest
// fade away towards a dashed, almost unreachable "perfection".
const STEPS = [20, 34, 48, 62, 76];

// The kangaroo's feet sit at ~82% of its SVG box (viewBox y=98 of 120).
const FEET = 0.82;

// Index of the starting spot: the ground at the foot of the stairs.
const GROUND = -1;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));

/**
 * Interactive staircase with a kangaroo (mindset).
 *
 * - The kangaroo starts on the ground at the foot of the stairs: taking the
 *   first step is up to the visitor (step 1 pulses gently as an invitation).
 * - Every step is a button: click/tap/Enter makes the kangaroo jump to it.
 * - The kangaroo can be dragged (mouse or touch); on release it jumps to the
 *   nearest step. A click without dragging makes it hop in place.
 * - The jump is a single timeline: crouch → take-off stretch → arc through the
 *   air (tilting nose-up, then nose-down) → squash on landing → settle. It
 *   always turns to face the direction it is jumping.
 * - Position comes from the real layout (offsetLeft/Top of each step), so it
 *   works at any width and re-snaps on resize.
 * - Steps light up in green (like the first one) when the kangaroo lands on
 *   them or passes them on the way up; the fill is timed to follow the jump.
 *   Jumping down switches the steps above it off again, top first.
 * - Reduced motion: no arcs or squash; the kangaroo simply moves.
 */
export function KangarooStairs({ dict }: { dict: Dictionary["firstStep"] }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const roo = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(boxRef, { once: true, amount: 0.5 });

  // Transform channels of the kangaroo (outer element) and its facing (inner).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const rotate = useMotionValue(0);
  const opacity = useMotionValue(0);
  const facing = useMotionValue(1);

  const [step, setStep] = useState(GROUND);
  // Per-step transition delay (s) so the green fill follows the kangaroo.
  const [fillDelays, setFillDelays] = useState<number[]>(() =>
    STEPS.map(() => 0)
  );
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const ready = useRef(false);
  const current = useRef(GROUND);
  const running = useRef<AnimationPlaybackControls[]>([]);
  const drag = useRef<{
    dx: number;
    dy: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  /** Top-left position that puts the kangaroo's feet on step i (or the ground). */
  const target = useCallback((i: number) => {
    const k = roo.current;
    const box = boxRef.current;
    if (i === GROUND) {
      if (!k || !box) return { x: 0, y: 0 };
      return { x: 0, y: box.clientHeight - k.offsetHeight * FEET };
    }
    const col = stepRefs.current[i];
    if (!col || !k) return { x: 0, y: 0 };
    return {
      x: col.offsetLeft + col.offsetWidth / 2 - k.offsetWidth / 2,
      y: col.offsetTop - k.offsetHeight * FEET,
    };
  }, []);

  const stopAll = () => {
    running.current.forEach((c) => c.stop());
    running.current = [];
  };

  const jumpTo = useCallback(
    (i: number) => {
      if (!ready.current) return;
      stopAll();
      const from = { x: x.get(), y: y.get() };
      const to = target(i);
      const prev = current.current;
      current.current = i;

      if (reduce) {
        setFillDelays(STEPS.map(() => 0));
        setStep(i);
        x.set(to.x);
        y.set(to.y);
        return;
      }

      // Face where we're going (keep facing for in-place hops).
      const dx = to.x - from.x;
      const dir = Math.abs(dx) > 4 ? Math.sign(dx) : facing.get();

      // Bigger distance → higher, slightly longer jump.
      const pitch =
        stepRefs.current[1] && stepRefs.current[0]
          ? stepRefs.current[1]!.offsetLeft - stepRefs.current[0]!.offsetLeft
          : 80;
      const dist = Math.max(
        0.6,
        Math.hypot(dx, to.y - from.y) / Math.max(pitch, 1)
      );
      const lift = Math.min(150, 36 + 24 * dist);
      const peak = Math.min(from.y, to.y) - lift;

      const crouch = 0.12;
      const air = Math.min(0.85, 0.42 + 0.08 * dist);
      const land = 0.22;
      const total = crouch + air + land;
      const at = (t: number) => t / total; // seconds → keyframe offset

      // Going up: each passed step lights as the kangaroo flies over it and
      // the landing step lights on touchdown. Going down: steps above switch
      // off from the top as it leaves.
      setFillDelays(
        STEPS.map((_, k) => {
          if (i > prev && k > prev && k <= i)
            return crouch + air * 0.9 * ((k - prev) / (i - prev));
          if (i < prev && k > i && k <= prev)
            return crouch + air * 0.6 * ((prev - k) / (prev - i));
          return 0;
        })
      );
      setStep(i);

      setBusy(true);
      const move = { duration: air, delay: crouch };
      const list = [
        animate(facing, dir, { duration: 0.12 }),
        animate(x, to.x, { ...move, ease: [0.45, 0, 0.55, 1] }),
        // y: rise fast, fall with gravity
        animate(y, [from.y, peak, to.y], {
          ...move,
          times: [0, 0.42, 1],
          ease: ["easeOut", "easeIn"],
        }),
        // body tilt: nose up on take-off, nose down before landing
        animate(rotate, [0, 0, -9 * dir, 7 * dir, 0], {
          duration: total,
          times: [
            0,
            at(crouch),
            at(crouch + air * 0.3),
            at(crouch + air * 0.85),
            1,
          ],
          ease: "easeInOut",
        }),
        // squash & stretch: crouch, stretch in the air, squash on landing
        animate(scaleY, [1, 0.8, 1.12, 1, 0.82, 1], {
          duration: total,
          times: [
            0,
            at(crouch),
            at(crouch + air * 0.25),
            at(crouch + air * 0.8),
            at(crouch + air + 0.05),
            1,
          ],
          ease: "easeInOut",
        }),
        animate(scaleX, [1, 1.14, 0.92, 1, 1.14, 1], {
          duration: total,
          times: [
            0,
            at(crouch),
            at(crouch + air * 0.25),
            at(crouch + air * 0.8),
            at(crouch + air + 0.05),
            1,
          ],
          ease: "easeInOut",
        }),
      ];
      running.current = list;
      Promise.all(list).then(() => {
        // Only the latest jump clears state (an earlier one may have been stopped).
        if (running.current !== list) return;
        running.current = [];
        setBusy(false);
      });
    },
    [facing, reduce, rotate, scaleX, scaleY, target, x, y]
  );

  // Entrance: once the stairs are visible, drop the kangaroo onto the ground.
  useEffect(() => {
    if (!inView || ready.current) return;
    const start = target(GROUND);
    x.set(start.x);
    ready.current = true;
    if (reduce) {
      y.set(start.y);
      animate(opacity, 1, { duration: 0.4 });
      return;
    }
    y.set(start.y - 90);
    animate(opacity, 1, { duration: 0.25, delay: 0.7 });
    animate(y, start.y, {
      type: "spring",
      stiffness: 320,
      damping: 14,
      delay: 0.7,
    });
  }, [inView, opacity, reduce, target, x, y]);

  // Keep the kangaroo on its step when the layout changes size.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(() => {
      if (!ready.current || drag.current || running.current.length) return;
      const t = target(current.current);
      x.set(t.x);
      y.set(t.y);
    });
    ro.observe(box);
    return () => ro.disconnect();
  }, [target, x, y]);

  // --- drag (pointer events; works for mouse, pen and touch) ---------------
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!ready.current || !boxRef.current) return;
    stopAll();
    e.currentTarget.setPointerCapture(e.pointerId);
    const box = boxRef.current.getBoundingClientRect();
    drag.current = {
      dx: e.clientX - box.left - x.get(),
      dy: e.clientY - box.top - y.get(),
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    setDragging(true);
    rotate.set(0);
    if (!reduce) {
      running.current = [
        animate(scaleX, 1.06, { duration: 0.15 }),
        animate(scaleY, 1.06, { duration: 0.15 }),
      ];
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const boxEl = boxRef.current;
    const k = roo.current;
    if (!d || !boxEl || !k) return;
    const box = boxEl.getBoundingClientRect();
    if (Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 5)
      d.moved = true;
    const nx = e.clientX - box.left - d.dx;
    const ny = e.clientY - box.top - d.dy;
    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));
    const prev = x.get();
    x.set(clamp(nx, -k.offsetWidth / 3, box.width - (k.offsetWidth * 2) / 3));
    y.set(clamp(ny, -k.offsetHeight / 2, box.height - k.offsetHeight * FEET));
    if (Math.abs(x.get() - prev) > 1) facing.set(Math.sign(x.get() - prev));
  };

  const onPointerUp = () => {
    const d = drag.current;
    const k = roo.current;
    drag.current = null;
    setDragging(false);
    if (!d || !k) return;
    // Snap to the step (or the ground) closest to the kangaroo's centre;
    // a click without dragging makes it hop in place.
    const centre = x.get() + k.offsetWidth / 2;
    let nearest = current.current;
    if (d.moved) {
      let best = Math.abs(target(GROUND).x + k.offsetWidth / 2 - centre);
      nearest = GROUND;
      stepRefs.current.forEach((col, i) => {
        if (!col) return;
        const gap = Math.abs(col.offsetLeft + col.offsetWidth / 2 - centre);
        if (gap < best) {
          best = gap;
          nearest = i;
        }
      });
    }
    jumpTo(nearest);
  };

  return (
    <figure className="mx-auto w-full max-w-md">
      <div
        ref={boxRef}
        className="relative flex h-80 select-none items-end gap-2 pl-20 sm:h-96 sm:gap-3 sm:pl-24"
      >
        {STEPS.map((height, i) => {
          const first = i === 0;
          const last = i === STEPS.length - 1;
          const isCurrent = i === step;
          const lit = i <= step; // landed on or passed on the way up
          return (
            <m.div
              key={height}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative flex-1"
              style={{ height: `${height}%`, originY: 1 }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.3, 0, 0.2, 1],
              }}
            >
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={
                  last
                    ? `${fill(dict.stepLabel, { n: i + 1 })}: ${dict.perfectLabel}`
                    : fill(dict.stepLabel, { n: i + 1 })
                }
                aria-pressed={isCurrent}
                className={cn(
                  "group/step relative flex h-full w-full cursor-pointer flex-col items-center overflow-hidden rounded-t-2xl pt-3 transition-[box-shadow,border-color] duration-500",
                  lit && "shadow-[0_20px_40px_-20px_rgb(var(--icv-green)/0.8)]",
                  last &&
                    (lit
                      ? "border-2 border-dashed border-white/70"
                      : "border-2 border-dashed border-brand-slate/40 hover:border-brand-slate/70")
                )}
                style={{ transitionDelay: `${fillDelays[i]}s` }}
              >
                {/* resting colour: pale steps fading towards "perfection" */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-brand-tint-blue transition-colors group-hover/step:bg-brand-blue/15"
                    style={{ opacity: 1 - i * 0.18 }}
                  />
                )}
                {/* invitation: step 1 pulses while the kangaroo waits on the ground */}
                {first && step === GROUND && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-t-2xl bg-brand-green/25 ring-2 ring-inset ring-brand-green/60 motion-safe:animate-pulse"
                  />
                )}
                {/* green fill, faded in when the kangaroo lands on or passes the step */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-brand-gradient transition-opacity duration-500 ease-out"
                  style={{
                    opacity: lit ? 1 : 0,
                    transitionDelay: `${fillDelays[i]}s`,
                  }}
                />
                {last && (
                  <span
                    className={cn(
                      "relative flex flex-col items-center px-1 text-center transition-colors duration-500",
                      lit ? "text-brand-deep" : "text-brand-muted"
                    )}
                    style={{ transitionDelay: `${fillDelays[i]}s` }}
                  >
                    <Flag className="h-4 w-4" aria-hidden="true" />
                    <span className="mt-1 text-xs font-semibold leading-tight">
                      {dict.perfectLabel}
                    </span>
                    <span className="text-[11px] leading-tight">
                      {dict.perfectNote}
                    </span>
                  </span>
                )}
              </button>
            </m.div>
          );
        })}

        {/* The kangaroo: absolutely positioned, moved with motion values. */}
        <m.div
          ref={roo}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            x,
            y,
            scaleX,
            scaleY,
            rotate,
            opacity,
            originX: 0.5,
            originY: 1,
          }}
          className={cn(
            "kangaroo-interactive absolute left-0 top-0 z-10 h-20 w-20 touch-none sm:h-24 sm:w-24",
            dragging ? "cursor-grabbing" : "cursor-grab",
            (busy || dragging) && "is-busy"
          )}
        >
          <m.div style={{ scaleX: facing }} className="h-full w-full">
            <Kangaroo className="h-full w-full drop-shadow-[0_10px_8px_rgb(var(--icv-deep)/0.15)]" />
          </m.div>
        </m.div>
      </div>

      <figcaption className="relative mt-3 border-t border-brand-line pt-2">
        {/* Same column grid as the stairs, so the arrow sits right under step 1. */}
        <div className="flex gap-2 pl-20 sm:gap-3 sm:pl-24">
          {STEPS.map((height, i) => (
            <div
              key={height}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              {i === 0 && (
                <>
                  <ArrowUp
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 text-brand-green-ink",
                      step === GROUND && "motion-safe:animate-bounce"
                    )}
                  />
                  <span className="mt-1 whitespace-nowrap rounded-full bg-brand-tint-green px-3 py-1 text-xs font-semibold leading-4 text-brand-green-ink">
                    {dict.firstStepLabel}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
        {/* From sm up: same row as the "Tu primer paso" pill (same height, bottom-aligned). */}
        <p className="mt-4 flex items-center justify-end gap-1.5 text-xs text-brand-muted sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:min-h-6 sm:max-w-[calc(100%-11.75rem)] sm:text-right">
          <Hand className="h-3.5 w-3.5" aria-hidden="true" />
          {dict.hint}
        </p>
        <span className="sr-only">{dict.visualAlt}</span>
        <span className="sr-only" aria-live="polite">
          {step === GROUND
            ? dict.statusGround
            : fill(dict.status, { n: step + 1, total: STEPS.length })}
        </span>
      </figcaption>
    </figure>
  );
}
