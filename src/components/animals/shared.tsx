import { cn } from "@/lib/utils";

// Shared look for the animal family: flat shapes, one stroke color and weight,
// rounded joins, 2-3 palette colors each. Idle loops and hover reactions are
// defined in globals.css (.animal-*), and only run without reduced motion.

export const INK = "#14250d";
export const BLUE = "#1c92e1";
export const GREEN = "#31b317";
export const TINT_BLUE = "#d6ecfb";
export const TINT_GREEN = "#d9f2d1";
export const STROKE = 2.5;

export type AnimalProps = {
  className?: string;
  /** Accessible name. Omit for decorative use (aria-hidden). */
  title?: string;
};

export function AnimalSvg({
  kind,
  className,
  title,
  children,
}: AnimalProps & { kind: "ant" | "turtle" | "bee" | "kangaroo"; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("animal", `animal-${kind}`, "overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
      stroke={INK}
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
