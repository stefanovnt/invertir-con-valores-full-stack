import { useId } from "react";
import { cn } from "@/lib/utils";
import { LOGO_INK, LOGO_INK_ON_DARK, logoMarkInner } from "./logo-mark";

/** Balance scale (planet = money) used as logo mark. Markup lives in logo-mark.ts. */
export function LogoMark({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const id = `logo-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
      dangerouslySetInnerHTML={{
        __html: logoMarkInner(onDark ? LOGO_INK_ON_DARK : LOGO_INK, id),
      }}
    />
  );
}

export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark onDark={onDark} />
      <span
        className={cn(
          "font-display text-[1.05rem] font-extrabold leading-none tracking-tight",
          onDark ? "text-white" : "text-brand-deep"
        )}
      >
        Invertir con{" "}
        <span className={onDark ? "text-brand-green" : "text-brand-green-ink"}>
          Valores
        </span>
      </span>
    </span>
  );
}
