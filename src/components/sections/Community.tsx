import { Bee } from "@/components/animals";
import { Reveal } from "@/components/motion/Reveal";
import { config } from "@/config";
import { TelegramButton } from "./TelegramButton";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Abstract "avatar" bubbles floating around the bee (no fake people or counts).
const bubbles = [
  { x: "8%", y: "14%", size: 64, color: "bg-brand-blue/80", delay: "0s" },
  { x: "72%", y: "6%", size: 48, color: "bg-brand-green/80", delay: "-2s" },
  { x: "84%", y: "58%", size: 72, color: "bg-brand-tint-blue", delay: "-4s" },
  { x: "4%", y: "64%", size: 44, color: "bg-brand-tint-green", delay: "-1s" },
  { x: "56%", y: "80%", size: 36, color: "bg-brand-blue/30", delay: "-3s" },
  { x: "30%", y: "2%", size: 28, color: "bg-brand-green/40", delay: "-5s" },
];

function Hive() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md"
      aria-hidden="true"
    >
      {/* honeycomb pattern */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full text-brand-green/25"
      >
        <defs>
          {/* pointy-top hexagon (r=16) + the shared vertical edge tiles a honeycomb */}
          <pattern
            id="hive"
            width="27.71"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(.9)"
          >
            <path
              d="M13.86 0l13.85 8v16l-13.85 8L0 24V8zM13.86 32v16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </pattern>
          <radialGradient id="hive-fade">
            <stop offset=".35" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="hive-mask">
            <rect width="200" height="200" fill="url(#hive-fade)" />
          </mask>
        </defs>
        <rect
          width="200"
          height="200"
          fill="url(#hive)"
          mask="url(#hive-mask)"
        />
      </svg>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className={`float absolute rounded-full border-4 border-white shadow-[0_12px_30px_-16px_rgb(var(--icv-deep)/0.5)] ${b.color}`}
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            animationDelay: b.delay,
          }}
        />
      ))}
      <div className="group absolute inset-0 flex items-center justify-center">
        <div className="float">
          <Bee className="h-44 w-44 sm:h-56 sm:w-56" />
        </div>
      </div>
    </div>
  );
}

export function Community({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const c = dict.community;
  return (
    <section
      id="comunidad"
      aria-labelledby="community-title"
      className="section"
    >
      <div className="container">
        <div className="grid items-center gap-12 rounded-[2.5rem] bg-brand-tint-green/70 px-6 py-14 sm:px-12 lg:grid-cols-2 lg:px-16 lg:py-20">
          <Reveal>
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 id="community-title" className="h2 mt-4">
              {c.title}
            </h2>
            <p className="lead mt-5">{c.text}</p>
            {!config.links.telegram && (
              <p className="mt-4 font-medium text-brand-deep">{c.fallback}</p>
            )}
            <div className="mt-8">
              <TelegramButton
                locale={locale}
                label={c.cta}
                fallbackLabel={c.fallbackCta}
                location="community"
                newTabLabel={dict.common.opensNewTab}
                variant="dark"
                size="lg"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Hive />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
