import {
  AnimalSvg,
  BLUE,
  GREEN,
  INK,
  TINT_GREEN,
  type AnimalProps,
} from "./shared";

/** Sea turtle = long-term investing. Idle: paddles. Hover: playful roll forward. */
export function Turtle(props: AnimalProps) {
  return (
    <AnimalSvg kind="turtle" {...props}>
      <g className="a-body">
        {/* back flipper */}
        <path
          className="a-flipper-back"
          d="M30 70c-8 2-16 8-18 14 8 1 17-3 22-9"
          fill={BLUE}
        />
        {/* head + neck */}
        <path
          d="M86 62c4-6 10-10 17-9 7 1 11 6 10 11-1 6-8 9-15 8-5 0-9-3-12-6"
          fill={TINT_GREEN}
        />
        <circle cx="104" cy="60" r="2.4" fill={INK} stroke="none" />
        <path d="M107 66c-2 1.5-4.5 1.5-6.5.5" strokeWidth="2" />
        {/* plastron */}
        <path d="M20 68h72c-4 7-17 11-36 11s-32-4-36-11z" fill={TINT_GREEN} />
        {/* shell */}
        <path d="M18 68c1-20 18-36 40-36 21 0 35 15 36 36z" fill={GREEN} />
        <path
          d="M46 46l10-6 11 6v12l-11 6-10-6zM46 46l-12 4M67 46l12 4M46 58l-10 10M67 58l10 10M56 40v-8"
          stroke={INK}
          strokeOpacity=".4"
          strokeWidth="2"
        />
        {/* front flipper */}
        <path
          className="a-flipper-front"
          d="M64 72c6 8 7 19 1 27-4-3-8-11-9-19"
          fill={BLUE}
        />
      </g>
    </AnimalSvg>
  );
}
