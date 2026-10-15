import { AnimalSvg, BLUE, GREEN, INK, TINT_BLUE, type AnimalProps } from "./shared";

/** Kangaroo = mindset & growth. Wears a green scarf. Idle: ear twitch. Hover: hops. */
export function Kangaroo(props: AnimalProps) {
  return (
    <AnimalSvg kind="kangaroo" {...props}>
      <g className="a-body">
        {/* tail */}
        <path d="M40 92c-12 5-24 4-32-4 10 1 20-1 30-7" fill={BLUE} />
        {/* ears */}
        <path className="a-ear" d="M66 30c-5-9-5-18-1-21 5 3 7 12 5 21" fill={BLUE} />
        <path className="a-ear" d="M74 29c-1-9 2-16 7-17 3 5 1 13-3 19" fill={BLUE} />
        {/* body */}
        <path d="M42 98c-12-14-10-38 6-50 9-7 21-6 24 4 3 9-1 18-1 28 0 8 2 14 2 18z" fill={BLUE} />
        {/* belly / pouch */}
        <path d="M58 64c7 1 11 7 11 15 0 8-4 13-10 13" fill={TINT_BLUE} />
        <path d="M58 80c3 2 7 2 10 0" strokeWidth="2" />
        {/* thigh + foot */}
        <path d="M36 80c0-9 8-14 15-11 7 3 7 13 3 20" fill={BLUE} />
        <path d="M40 98h36c2-5-3-8-10-8H48c-6 0-9 4-8 8z" fill={BLUE} />
        {/* head */}
        <path d="M60 44c-2-9 4-17 13-17 7 0 12 3 16 6 5 3 8 6 6 10-2 5-9 5-15 5-8 1-15 2-20-4z" fill={BLUE} />
        <circle cx="74" cy="35" r="2.4" fill={INK} stroke="none" />
        <circle cx="94" cy="39" r="2.2" fill={INK} stroke="none" />
        <path d="M86 45c-2 1.5-5 1.6-7 .4" strokeWidth="2" />
        {/* scarf */}
        <path d="M60 48c6 4 14 4 20 0l1 6c-6 4-15 4-21 0z" fill={GREEN} />
        <path d="M76 53l4 12-6-2-1-9" fill={GREEN} />
        {/* arm */}
        <path d="M68 60c5 3 9 6 12 5" />
      </g>
    </AnimalSvg>
  );
}
