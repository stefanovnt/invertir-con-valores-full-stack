import { Fragment } from "react";

const PUNCTUATION = /([.,;:!?…]+)(?=\s|$)/g;

/**
 * Plus Jakarta Sans' heavy punctuation has a wide left sidebearing that looks
 * detached at heading sizes ("paso, no ."). Pull it in slightly.
 * Use on display-font headings only.
 */
export function tightPunctuation(text: string): React.ReactNode {
  const parts = text.split(PUNCTUATION);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="-ml-[0.06em]">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
