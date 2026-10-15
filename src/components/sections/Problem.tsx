import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Animated visual (CSS only, see globals.css):
 * left  = coins sitting in an account, slowly fading (losing value);
 * right = coins flowing towards a green "values" circle.
 */
function MoneyFlow({ dict }: { dict: Dictionary["problem"] }) {
  const idle = [
    [40, 110], [72, 110], [104, 110],
    [56, 138], [88, 138],
    [40, 166], [72, 166], [104, 166],
  ];
  const lanes = [118, 148, 178];
  return (
    <figure className="relative">
      <svg viewBox="0 0 400 260" className="h-auto w-full" role="img" aria-label={dict.visualAlt}>
        <defs>
          <radialGradient id="problem-goal">
            <stop offset="0" stopColor="#31b317" stopOpacity=".55" />
            <stop offset="1" stopColor="#31b317" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* account box */}
        <rect x="16" y="80" width="116" height="116" rx="22" fill="none" stroke="#748596" strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 6" />
        {idle.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="11"
            fill="#9aa8b5"
            className="coin-fade"
            style={{ animationDelay: `${(i * 0.45) % 4}s`, transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}

        {/* flow lanes */}
        {lanes.map((y, i) => (
          <g key={y}>
            <path d={`M200 ${y}H330`} stroke="#31b317" strokeOpacity=".22" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
            {[0, 1.2, 2.4].map((d) => (
              <circle
                key={d}
                cx="200"
                cy={y}
                r="8"
                fill={i === 1 ? "#31b317" : "#1c92e1"}
                className="coin-flow"
                style={{ animationDelay: `${d + i * 0.4}s`, "--x0": `${d * 40}px` } as React.CSSProperties}
              />
            ))}
          </g>
        ))}

        {/* destination */}
        <circle cx="352" cy="148" r="60" fill="url(#problem-goal)" />
        <circle cx="352" cy="148" r="26" fill="#31b317" />
        <path d="M341 149l7 7 14-15" fill="none" stroke="#14250d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <figcaption className="mt-2 grid grid-cols-2 text-center text-sm font-medium">
        <span className="text-brand-on-dark">{dict.idleLabel}</span>
        <span className="text-brand-green">{dict.flowLabel}</span>
      </figcaption>
    </figure>
  );
}

export function Problem({ dict }: { dict: Dictionary["problem"] }) {
  return (
    <section aria-labelledby="problem-title" className="on-dark section relative overflow-hidden bg-brand-deep text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="container relative grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <h2 id="problem-title" className="h2 text-white">
            {dict.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-on-dark sm:text-xl">{dict.text}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <MoneyFlow dict={dict} />
        </Reveal>
      </div>
    </section>
  );
}
