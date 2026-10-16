import Image from "next/image";
import { tightPunctuation } from "@/lib/typography";
import { Kangaroo } from "@/components/animals";
import { Reveal } from "@/components/motion/Reveal";
import { config } from "@/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

// Organic blob used as the photo mask (objectBoundingBox units, 0..1).
const BLOB =
  "M0.86,0.2 C0.97,0.33,0.99,0.53,0.92,0.7 C0.84,0.87,0.67,0.99,0.48,0.98 C0.29,0.97,0.1,0.84,0.04,0.66 C-0.03,0.47,0.04,0.25,0.19,0.12 C0.35,-0.01,0.75,0.07,0.86,0.2 Z";

/** Founder photo in an organic blob. Shows a placeholder until config.founderPhoto is set. */
function BlobPhoto({ alt, placeholder }: { alt: string; placeholder: string }) {
  return (
    <div className="group relative mx-auto aspect-square w-60 sm:w-72">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <clipPath id="about-blob" clipPathUnits="objectBoundingBox">
          <path d={BLOB} />
        </clipPath>
      </svg>
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-4 translate-y-4 bg-brand-gradient opacity-80 [clip-path:url(#about-blob)]"
      />
      <div className="relative h-full w-full overflow-hidden bg-brand-tint-blue [clip-path:url(#about-blob)]">
        {config.founderPhoto ? (
          <Image
            src={config.founderPhoto}
            alt={alt}
            fill
            sizes="(min-width: 640px) 18rem, 15rem"
            // Cut-out on a transparent background: the blob tint shows behind it.
            className="object-cover object-[50%_30%]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
            <Kangaroo className="h-32 w-32" />
            <p className="font-display text-lg font-semibold text-brand-muted">
              {placeholder}
              <span className="block text-sm font-normal">[TO COMPLETE]</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="section overflow-hidden"
    >
      <div className="container grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <BlobPhoto alt={dict.photoAlt} placeholder={dict.photoPlaceholder} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 id="about-title" className="h2 mt-4">
            {tightPunctuation(dict.title)}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-deep/85 sm:text-xl">
            {dict.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
