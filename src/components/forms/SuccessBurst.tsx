// Small celebration shown after a successful submit: a check mark draws itself
// while confetti dots burst outwards. Pure CSS (see globals.css); with reduced
// motion only the check fades in.

const DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = 46 + (i % 3) * 12;
  return {
    dx: `${Math.round(Math.cos(angle) * distance)}px`,
    dy: `${Math.round(Math.sin(angle) * distance)}px`,
    color:
      i % 3 === 0
        ? "rgb(var(--icv-blue))"
        : i % 3 === 1
          ? "rgb(var(--icv-green))"
          : "rgb(var(--icv-deep))",
    size: 6 + (i % 2) * 3,
    delay: `${(i % 4) * 40}ms`,
  };
});

export function SuccessBurst() {
  return (
    <div className="relative mx-auto h-20 w-20" aria-hidden="true">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="burst-dot absolute left-1/2 top-1/2 -ml-1 -mt-1 rounded-full opacity-0"
          style={
            {
              width: d.size,
              height: d.size,
              background: d.color,
              animationDelay: d.delay,
              "--dx": d.dx,
              "--dy": d.dy,
            } as React.CSSProperties
          }
        />
      ))}
      <svg
        viewBox="0 0 80 80"
        className="relative h-20 w-20 motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:duration-500"
      >
        <circle cx="40" cy="40" r="34" fill="rgb(var(--icv-green))" />
        <path
          d="M26 41l9 9 19-20"
          pathLength={1}
          fill="none"
          stroke="rgb(var(--icv-deep))"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="success-check"
        />
      </svg>
    </div>
  );
}
