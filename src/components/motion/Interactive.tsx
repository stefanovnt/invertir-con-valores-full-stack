"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

// Pointer-driven micro-interactions. Both:
// - only react to a fine pointer (mouse/trackpad), never to touch,
// - do nothing when the user prefers reduced motion,
// - write CSS variables / transforms directly (no React re-renders).

const canAnimate = (e: React.PointerEvent) =>
  e.pointerType === "mouse" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Card that tilts slightly towards the cursor. */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-300 ease-out [transform-style:preserve-3d]",
        className
      )}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || !canAnimate(e)) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}

/** Section with a soft radial glow that follows the cursor. */
export function GlowSurface({
  children,
  className,
  color = "rgb(var(--icv-blue) / 0.16)",
  as: Tag = "div",
  id,
  "aria-labelledby": labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  as?: "div" | "section";
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      id={id}
      aria-labelledby={labelledBy}
      className={cn("group/glow relative isolate", className)}
      onPointerMove={(e: React.PointerEvent) => {
        const el = ref.current;
        if (!el || !canAnimate(e)) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/glow:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 30%), ${color}, transparent 70%)`,
        }}
      />
      {children}
    </Tag>
  );
}
