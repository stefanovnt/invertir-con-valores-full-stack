"use client";

import { useReducedMotion } from "framer-motion";
import { Turtle } from "@/components/animals";

// Hero illustration: a soft wave that rises like a growth curve while the sea
// turtle swims along it and settles near the top (patience pays).
//
// - The curve draws itself with CSS (`.draw-path`).
// - The turtle moves with SMIL <animateMotion>, which starts on page load
//   without waiting for hydration. Its path is the same curve expressed
//   relative to the start point, so before/after the animation the turtle
//   is always somewhere sensible.
// - With reduced motion the turtle is simply placed at its resting point.

const START = { x: 20, y: 330 };
const REST = { x: 410, y: 150, angle: -26.6 };
const CURVE = "M20 330C110 330 150 290 210 280S300 240 340 205S380 165 410 150";
const CURVE_TAIL = "S480 95 505 80";
const MOTION = "M0 0C90 0 130-40 190-50S280-90 320-125S360-165 390-180";

export function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 520 400" className="h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="hero-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1c92e1" />
          <stop offset="1" stopColor="#31b317" />
        </linearGradient>
        <linearGradient id="hero-water" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1c92e1" stopOpacity=".18" />
          <stop offset="1" stopColor="#31b317" stopOpacity=".18" />
        </linearGradient>
        {/* fade the water out at the left and bottom edges */}
        <linearGradient id="hero-fade-x" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".25" stopColor="#fff" />
        </linearGradient>
        <linearGradient id="hero-fade-y" x1="0" y1="0" x2="0" y2="1">
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="hero-mask-x" maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="400">
          <rect width="520" height="400" fill="url(#hero-fade-x)" />
        </mask>
        <mask id="hero-mask-y" maskUnits="userSpaceOnUse" x="0" y="0" width="520" height="400">
          <rect width="520" height="400" fill="url(#hero-fade-y)" />
        </mask>
      </defs>

      {/* faint grid */}
      <g stroke="#748596" strokeOpacity=".16" strokeWidth="1">
        {[100, 180, 260, 340].map((y) => (
          <line key={y} x1="0" x2="520" y1={y} y2={y} strokeDasharray="3 7" />
        ))}
      </g>

      {/* water under the curve */}
      <g mask="url(#hero-mask-x)">
        <path d={`${CURVE}${CURVE_TAIL}L520 80V400H0V330z`} fill="url(#hero-water)" mask="url(#hero-mask-y)" />
      </g>

      {/* rising bubbles */}
      <g fill="#1c92e1" fillOpacity=".25">
        <circle className="float" cx="120" cy="365" r="5" style={{ animationDelay: "-1s" }} />
        <circle className="float" cx="250" cy="330" r="3.5" style={{ animationDelay: "-3s" }} />
        <circle className="float" cx="330" cy="300" r="6" style={{ animationDelay: "-2s" }} />
        <circle className="float" cx="450" cy="210" r="4" style={{ animationDelay: "-4s" }} />
      </g>

      {/* growth curve */}
      <path
        d={`${CURVE}${CURVE_TAIL}`}
        pathLength={1}
        className="draw-path"
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="505" cy="80" r="7" fill="#31b317" className="motion-safe:animate-pulse" />

      {/* swimming turtle */}
      <g transform={reduce ? `translate(${REST.x} ${REST.y}) rotate(${REST.angle})` : `translate(${START.x} ${START.y})`}>
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
  );
}
