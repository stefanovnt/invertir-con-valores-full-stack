import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowSurface } from "@/components/motion/Interactive";
import { WordReveal } from "@/components/motion/WordReveal";
import { HeroBackdrop } from "./hero/HeroBackdrop";
import { HeroScene } from "./hero/HeroScene";
import { TelegramButton } from "./TelegramButton";
import { homeAnchor, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero, common } = dict;
  return (
    <GlowSurface
      as="section"
      aria-labelledby="hero-title"
      className="overflow-hidden bg-gradient-to-b from-brand-tint-blue via-white to-white pb-16 pt-28 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <HeroBackdrop />
      <div className="container grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="min-w-0">
          <p className="eyebrow motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700">
            {hero.eyebrow}
          </p>
          <div id="hero-title">
            <WordReveal
              text={hero.title}
              className="mt-5 text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
            />
          </div>
          <p className="lead mt-6 max-w-xl animate-in fade-in fill-mode-both delay-500 duration-700">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 animate-in fade-in fill-mode-both delay-700 duration-700 sm:flex-row sm:items-center">
            <div>
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={homeAnchor(locale, "guia")}>
                  {hero.primaryCta}
                  <ArrowDown aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <TelegramButton
              locale={locale}
              label={hero.secondaryCta}
              fallbackLabel={hero.secondaryCta.replace(/\s*\(Telegram\)/, "")}
              fallbackAnchor="comunidad"
              location="hero"
              newTabLabel={common.opensNewTab}
              variant="secondary"
              size="lg"
            />
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-brand-muted animate-in fade-in fill-mode-both delay-1000 duration-700">
            {hero.trust.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-brand-slate"
                  />
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-[560px] lg:-mr-6">
          <HeroScene />
        </div>
      </div>
    </GlowSurface>
  );
}
