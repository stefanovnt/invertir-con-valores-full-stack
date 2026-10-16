"use client";

import { useReducedMotion } from "framer-motion";
import { Flag } from "lucide-react";
import { Turtle } from "@/components/animals";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Hero illustration: a soft wave that rises like a growth curve while the sea
// turtle swims along it and settles near the top (patience pays).
//
// - The curve draws itself with CSS (`.draw-path`).
// - The turtle moves with SMIL <animateMotion>, which starts on page load
//   without waiting for hydration. Its path is the same curve expressed
//   relative to the start point, so before/after the animation the turtle
//   is always somewhere sensible.
// - With reduced motion the turtle is simply placed at its resting point.
//
// The journey reads left → right: a start point ("Hoy · tus ahorros"), the
// solid curve already travelled, the turtle, then a dashed path ahead with
// dashes flowing towards an arrow and the goal marker ("Tu meta").
// Labels are HTML (not SVG text) so they stay readable on small screens.

const START = { x: 20, y: 330 };
const REST = { x: 410, y: 150, angle: -26.6 };
const CURVE = "M20 330C110 330 150 290 210 280S300 240 340 205S380 165 410 150";
const CURVE_TAIL = "S480 95 505 80";
// Path ahead: same curve from the resting point, stopping just before the goal.
const AHEAD = "M410 150C440 135 470 104 494 87";
const GOAL = { x: 505, y: 80 };
const pct = (v: number, total: number) => `${(v / total) * 100}%`;
const MOTION = "M0 0C90 0 130-40 190-50S280-90 320-125S360-165 390-180";

export function HeroScene({
  labels,
}: {
  labels: Dictionary["hero"]["journey"];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <svg
        viewBox="0 0 520 400"
        className="h-auto w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#1c92e1" />
            <stop offset="1" stopColor="#31b317" />
          </linearGradient>
          <linearGradient id="hero-water" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1c92e1" stopOpacity=".18" />
            <stop offset="1" stopColor="#31b317" stopOpacity=".18" />
          </linearGradient>
          {/* fade the water out at the left, right and bottom edges */}
          <linearGradient id="hero-fade-x" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".25" stopColor="#fff" />
            <stop offset=".85" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-fade-y" x1="0" y1="0" x2="0" y2="1">
            <stop offset=".55" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask
            id="hero-mask-x"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="520"
            height="400"
          >
            <rect width="520" height="400" fill="url(#hero-fade-x)" />
          </mask>
          <mask
            id="hero-mask-y"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="520"
            height="400"
          >
            <rect width="520" height="400" fill="url(#hero-fade-y)" />
          </mask>
          {/* arrowhead at the end of the path ahead */}
          <marker
            id="hero-arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path
              d="M1 1L8 5L1 9"
              fill="none"
              stroke="#23810f"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* faint grid */}
        <g stroke="#748596" strokeOpacity=".16" strokeWidth="1">
          {[100, 180, 260, 340].map((y) => (
            <line key={y} x1="0" x2="520" y1={y} y2={y} strokeDasharray="3 7" />
          ))}
        </g>

        {/* water under the curve */}
        <g mask="url(#hero-mask-x)">
          <path
            d={`${CURVE}${CURVE_TAIL}L520 80V400H0V330z`}
            fill="url(#hero-water)"
            mask="url(#hero-mask-y)"
          />
        </g>

        {/* rising bubbles */}
        <g fill="#1c92e1" fillOpacity=".25">
          <circle
            className="float"
            cx="120"
            cy="365"
            r="5"
            style={{ animationDelay: "-1s" }}
          />
          <circle
            className="float"
            cx="250"
            cy="330"
            r="3.5"
            style={{ animationDelay: "-3s" }}
          />
          <circle
            className="float"
            cx="330"
            cy="300"
            r="6"
            style={{ animationDelay: "-2s" }}
          />
          <circle
            className="float"
            cx="450"
            cy="210"
            r="4"
            style={{ animationDelay: "-4s" }}
          />
        </g>

        {/* the way travelled: from today to where the turtle is */}
        <path
          d={CURVE}
          pathLength={1}
          className="draw-path"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* the way ahead: dashed, flowing towards the goal */}
        <g className="animate-in fade-in fill-mode-both delay-1000 duration-1000">
          <path
            d={AHEAD}
            fill="none"
            stroke="#31b317"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1 11"
            markerEnd="url(#hero-arrow)"
            className="journey-flow"
          />
        </g>

        {/* start point */}
        <circle
          cx={START.x}
          cy={START.y}
          r="9"
          fill="#fff"
          stroke="#1c92e1"
          strokeWidth="3.5"
        />
        <circle cx={START.x} cy={START.y} r="3.5" fill="#1c92e1" />

        {/* goal */}
        <circle
          cx={GOAL.x}
          cy={GOAL.y}
          r="20"
          fill="#31b317"
          fillOpacity=".18"
          className="motion-safe:animate-pulse"
        />
        <circle
          cx={GOAL.x}
          cy={GOAL.y}
          r="11"
          fill="#fff"
          stroke="#31b317"
          strokeWidth="3.5"
        />
        <circle cx={GOAL.x} cy={GOAL.y} r="4.5" fill="#23810f" />

        {/* swimming turtle */}
        <g
          transform={
            reduce
              ? `translate(${REST.x} ${REST.y}) rotate(${REST.angle})`
              : `translate(${START.x} ${START.y})`
          }
        >
          <g>
            {!reduce && (
              <animateMotion
                path={MOTION}
                dur="5.5s"
                begin="0s"
                fill="freeze"
                rotate="auto"
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines="0.45 0 0.25 1"
              />
            )}
            <Turtle svgProps={{ x: -50, y: -78, width: 100, height: 100 }} />
          </g>
        </g>
      </svg>

      {/* start label, under the start point */}
      <div
        className="absolute left-0 rounded-2xl bg-white/85 px-3 py-1.5 shadow-[0_8px_20px_-14px_rgb(var(--icv-deep)/0.5)] backdrop-blur-sm"
        style={{ top: `calc(${pct(START.y, 400)} + 16px)` }}
      >
        <p className="font-display text-sm font-extrabold leading-tight text-brand-blue-ink">
          {labels.startTitle}
        </p>
        <p className="text-xs leading-tight text-brand-muted">
          {labels.startNote}
        </p>
      </div>

      {/* goal label, above the goal marker */}
      <div
        className="absolute right-0 rounded-2xl bg-white/85 px-3 py-1.5 text-right shadow-[0_8px_20px_-14px_rgb(var(--icv-deep)/0.5)] backdrop-blur-sm"
        style={{ bottom: `calc(${pct(400 - GOAL.y, 400)} + 26px)` }}
      >
        <p className="flex items-center justify-end gap-1.5 font-display text-sm font-extrabold leading-tight text-brand-green-ink">
          <Flag className="h-3.5 w-3.5" aria-hidden="true" />
          {labels.goalTitle}
        </p>
        <p className="text-xs leading-tight text-brand-muted">
          {labels.goalNote}
        </p>
      </div>
    </div>
  );
}
