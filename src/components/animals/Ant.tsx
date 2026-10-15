import { AnimalSvg, GREEN, INK, type AnimalProps } from "./shared";

/** Ant = saving. Idle: legs walk. Hover: antennae wiggle and a little hop. */
export function Ant(props: AnimalProps) {
  return (
    <AnimalSvg kind="ant" {...props}>
      {/* nudged up so the ant sits centred in the 120×120 box */}
      <g transform="translate(0 -8)">
        <g className="a-body">
          {/* legs */}
          <g className="a-legs">
            <path d="M50 74c-5 6-9 11-15 20M57 76c0 6-1 12-3 19M64 74c4 5 8 10 10 20" />
          </g>
          {/* antennae */}
          <g className="a-antennae">
            <path d="M84 52c2-9 7-14 13-16M78 51c-2-8-6-13-12-15" />
            <circle cx="97.5" cy="35.5" r="3" fill={GREEN} />
            <circle cx="65.5" cy="35.5" r="3" fill={GREEN} />
          </g>
          {/* abdomen, thorax, head */}
          <ellipse cx="31" cy="70" rx="18" ry="14" fill={INK} />
          <path d="M24 61c5-2 11-1 15 3" stroke={GREEN} strokeWidth="3" />
          <ellipse cx="56" cy="70" rx="10" ry="8" fill={INK} />
          <circle cx="80" cy="63" r="13" fill={INK} />
          <circle cx="85" cy="60" r="3.6" fill="#fff" stroke="none" />
          <circle cx="86" cy="60" r="1.8" fill={INK} stroke="none" />
          <path d="M84 69c2.5 1.5 5.5 1.5 8-.5" stroke="#fff" strokeWidth="2" />
        </g>
      </g>
    </AnimalSvg>
  );
}
