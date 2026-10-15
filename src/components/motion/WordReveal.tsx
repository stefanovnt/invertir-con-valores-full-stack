import { Fragment } from "react";

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
            <span style={{ "--i": i } as React.CSSProperties}>
              <Word word={word} />
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/** Trailing punctuation is pulled in slightly: the display font's heavy
 * full stop has a wide sidebearing that looks detached at large sizes. */
function Word({ word }: { word: string }) {
  const match = word.match(/^(.*?)([.,;:!?…]+)$/);
  if (!match) return word;
  return (
    <>
      {match[1]}
      <span className="-ml-[0.06em]">{match[2]}</span>
    </>
  );
}
