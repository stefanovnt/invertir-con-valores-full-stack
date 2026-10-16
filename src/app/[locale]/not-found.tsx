"use client";

// not-found.tsx receives no params, so the locale is read from the URL.
import Link from "next/link";
import { tightPunctuation } from "@/lib/typography";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Turtle } from "@/components/animals";
import {
  isLocale,
  localePath,
  defaultLocale,
  type Locale,
} from "@/i18n/config";

const copy: Record<Locale, { title: string; text: string; cta: string }> = {
  es: {
    title: "Esta página se ha ido a nadar",
    text: "No encuentro lo que buscas. Vuelve al inicio y seguimos junt@s.",
    cta: "Volver al inicio",
  },
  it: {
    title: "Questa pagina è andata a nuotare",
    text: "Non trovo quello che cerchi. Torna alla home e andiamo avanti insieme.",
    cta: "Torna alla home",
  },
  en: {
    title: "This page went for a swim",
    text: "I can't find what you're looking for. Head back home and let's keep going together.",
    cta: "Back to home",
  },
};

export default function NotFound() {
  const first = (usePathname() ?? "/").split("/")[1] ?? "";
  const locale: Locale = isLocale(first) ? first : defaultLocale;
  const t = copy[locale];
  return (
    <section className="container flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-32 text-center">
      <Turtle className="h-32 w-32" />
      <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">
        {tightPunctuation(t.title)}
      </h1>
      <p className="lead mt-4 max-w-md">{t.text}</p>
      <Button asChild size="lg" className="mt-8">
        <Link href={localePath(locale, "/")}>{t.cta}</Link>
      </Button>
    </section>
  );
}
