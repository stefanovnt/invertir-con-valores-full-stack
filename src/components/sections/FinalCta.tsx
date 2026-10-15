import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Turtle } from "@/components/animals";
import { Button } from "@/components/ui/button";
import { GlowSurface, Magnetic } from "@/components/motion/Interactive";
import { Reveal } from "@/components/motion/Reveal";
import { homeAnchor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** Full-width animated blue → green band with the last call to action. */
export function FinalCta({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["finalCta"];
}) {
  return (
    <GlowSurface
      as="section"
      aria-labelledby="final-cta-title"
      color="rgb(255 255 255 / 0.35)"
      className="bg-gradient-animated overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full border-[40px] border-white/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/15"
      />
      <div className="container relative flex flex-col items-center py-24 text-center sm:py-32">
        <Reveal className="group flex flex-col items-center">
          <div className="float rounded-full bg-white/80 p-4 shadow-[0_20px_40px_-24px_rgb(var(--icv-deep)/0.6)]">
            <Turtle className="h-20 w-20 sm:h-24 sm:w-24" />
          </div>
          <h2
            id="final-cta-title"
            className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] text-brand-deep sm:text-6xl"
          >
            {dict.title}
          </h2>
          <Magnetic className="mt-10">
            <Button asChild size="lg" variant="dark">
              <Link href={homeAnchor(locale, "guia")}>
                {dict.cta}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </GlowSurface>
  );
}
