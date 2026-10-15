import { useId } from "react";
import {
  AnimalSvg,
  GREEN,
  INK,
  TINT_BLUE,
  TINT_GREEN,
  type AnimalProps,
} from "./shared";

/** Bee = community. Idle: wings flap and it floats. Hover: buzzes. */
export function Bee(props: AnimalProps) {
  const clipId = `bee-body-${useId().replace(/:/g, "")}`;
  return (
    <AnimalSvg kind="bee" {...props}>
      <defs>
        <clipPath id={clipId}>
          <ellipse cx="58" cy="70" rx="27" ry="20" />
        </clipPath>
      </defs>
      <g className="a-body">
        {/* wings */}
        <ellipse
          className="a-wing"
          cx="50"
          cy="38"
          rx="12"
          ry="19"
          transform="rotate(-22 50 38)"
          fill={TINT_BLUE}
        />
        <ellipse
          className="a-wing"
          cx="67"
          cy="38"
          rx="10.5"
          ry="17"
          transform="rotate(18 67 38)"
          fill={TINT_BLUE}
        />
        {/* stinger */}
        <path d="M32 72l-9-1 8 6" fill={INK} />
        {/* body with stripes */}
        <ellipse cx="58" cy="70" rx="27" ry="20" fill={GREEN} />
        <g clipPath={`url(#${clipId})`} stroke="none" fill={INK}>
          <rect x="45" y="48" width="7" height="45" />
          <rect x="60" y="48" width="7" height="45" />
        </g>
        <ellipse cx="58" cy="70" rx="27" ry="20" />
        {/* head */}
        <circle cx="90" cy="64" r="13" fill={TINT_GREEN} />
        <circle cx="94" cy="61" r="2.6" fill={INK} stroke="none" />
        <path d="M92 70c2.5 1.6 5.5 1.4 7.5-.6" strokeWidth="2" />
        <path d="M88 51c0-7 3-11 8-13M94 53c2-6 6-9 11-9" />
        <circle cx="96" cy="38" r="2.5" fill={INK} stroke="none" />
        <circle cx="105" cy="44" r="2.5" fill={INK} stroke="none" />
      </g>
    </AnimalSvg>
  );
}
