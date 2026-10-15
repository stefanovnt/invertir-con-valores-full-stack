import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word headline reveal. Pure CSS (globals.css `.word-reveal`) so it
 * starts on first paint, before hydration, and never hides the LCP text for
 * long. Screen readers read the sr-only copy; the animated words are aria-hidden.
 */
export function WordReveal({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span className="word-reveal" aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
