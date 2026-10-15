import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Transformation } from "@/components/sections/Transformation";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Resources } from "@/components/sections/Resources";
import { Community } from "@/components/sections/Community";
import { Coaching } from "@/components/sections/Coaching";
import { LearningPath } from "@/components/sections/LearningPath";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Marquee } from "@/components/motion/Marquee";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

// Home page: one main idea per section, top to bottom as in the design spec.
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <div className="border-y border-brand-line bg-white py-6 text-brand-deep sm:py-8">
        <Marquee items={dict.values.items} label={dict.values.label} />
      </div>
      <Problem dict={dict.problem} />
      <Transformation dict={dict.transformation} />
      <HowItWorks dict={dict.how} />
      <Resources locale={locale} dict={dict} />
      <Community locale={locale} dict={dict} />
      <Coaching locale={locale} dict={dict} />
      <LearningPath locale={locale} dict={dict} />
      <LatestPosts locale={locale} dict={dict} />
      <About dict={dict.about} values={dict.values} />
      <Faq dict={dict.faq} />
      <FinalCta locale={locale} dict={dict.finalCta} />
    </>
  );
}
