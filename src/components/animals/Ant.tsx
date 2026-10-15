import { AnimalSvg, BLUE, GREEN, INK, type AnimalProps } from "./shared";

/** Ant = saving. Carries a coin on its back. Idle: legs walk. Hover: the coin hops. */
export function Ant(props: AnimalProps) {
  return (
    <AnimalSvg kind="ant" {...props}>
      <g className="a-body">
        {/* legs */}
        <g className="a-legs">
          <path d="M50 74c-5 6-9 11-15 20M57 76c0 6-1 12-3 19M64 74c4 5 8 10 10 20" />
        </g>
        {/* antennae */}
        <path d="M84 52c2-9 7-14 13-16M78 51c-2-8-6-13-12-15" />
        <circle cx="97.5" cy="35.5" r="3" fill={GREEN} />
        <circle cx="65.5" cy="35.5" r="3" fill={GREEN} />
        {/* abdomen, thorax, head */}
        <ellipse cx="31" cy="70" rx="18" ry="14" fill={INK} />
        <path d="M24 61c5-2 11-1 15 3" stroke={GREEN} strokeWidth="3" />
        <ellipse cx="56" cy="70" rx="10" ry="8" fill={INK} />
        <circle cx="80" cy="63" r="13" fill={INK} />
        <circle cx="85" cy="60" r="3.6" fill="#fff" stroke="none" />
        <circle cx="86" cy="60" r="1.8" fill={INK} stroke="none" />
        <path d="M84 69c2.5 1.5 5.5 1.5 8-.5" stroke="#fff" strokeWidth="2" />
        {/* arms holding the coin */}
        <path d="M58 63c-2-6-5-10-9-12M54 64c-5-3-10-5-14-5" />
        {/* coin */}
        <g className="a-coin">
          <circle cx="42" cy="40" r="14" fill={BLUE} />
          <circle cx="42" cy="40" r="8.5" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
          <path d="M42 35v10" stroke="#fff" strokeOpacity=".8" strokeWidth="2" />
        </g>
      </g>
    </AnimalSvg>
  );
}
