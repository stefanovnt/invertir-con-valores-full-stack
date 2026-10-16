import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand logo: the balance scale with the planet and money in equilibrium.
 * public/images/logo.png is a transparent cut-out of the original artwork,
 * so it works on the white navbar and on the dark footer.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={40}
      height={40}
      className={cn("h-10 w-10 object-contain", className)}
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
      <LogoMark />
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
