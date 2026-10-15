import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee (CSS only). The list is rendered twice and the
 * track slides by -50%; the duplicate is hidden from assistive tech. Pauses on
 * hover and is static with reduced motion.
 */
export function Marquee({
  items,
  label,
  className,
}: {
  items: string[];
  label: string;
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
      {...(!hidden && { "aria-label": label })}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-3xl font-bold tracking-tight sm:px-10 sm:text-5xl">
            {item}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
            aria-hidden="true"
          >
            <path
              d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z"
              fill="url(#marquee-star)"
            />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("marquee relative overflow-hidden", className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <linearGradient id="marquee-star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1c92e1" />
          <stop offset="1" stopColor="#31b317" />
        </linearGradient>
      </svg>
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
