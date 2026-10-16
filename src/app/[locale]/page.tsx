import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Transformation } from "@/components/sections/Transformation";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FirstStep } from "@/components/sections/FirstStep";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { Community } from "@/components/sections/Community";
import { Coaching } from "@/components/sections/Coaching";
import { LearningPath } from "@/components/sections/LearningPath";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { config } from "@/config";
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
      <Problem dict={dict.problem} />
      <Transformation dict={dict.transformation} />
      <HowItWorks dict={dict.how} />
      <FirstStep locale={locale} dict={dict.firstStep} />
      <NewsletterSection locale={locale} dict={dict} />
      <Community locale={locale} dict={dict} />
      <Coaching locale={locale} dict={dict} />
      {config.features.waitlist && <LearningPath locale={locale} dict={dict} />}
      {config.features.blog && <LatestPosts locale={locale} dict={dict} />}
      <About dict={dict.about} />
      <Faq dict={dict.faq} />
      <FinalCta locale={locale} dict={dict.finalCta} />
    </>
  );
}
