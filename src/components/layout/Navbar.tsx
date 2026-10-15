"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  homeAnchor,
  localeNames,
  localePath,
  locales,
  stripLocale,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
};

/**
 * Sticky navbar: transparent and roomy at the top of the page; once the user
 * scrolls it shrinks and gets a blurred glass background.
 */
export function Navbar({ locale, nav, common }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? "/";
  const basePath = stripLocale(pathname);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Mobile menu: focus the first link on open, close on Escape and restore focus.
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const links = nav.links.map((l) => ({
    label: l.label,
    href: "anchor" in l && l.anchor ? homeAnchor(locale, l.anchor) : localePath(locale, l.href ?? "/"),
  }));

  const languageLinks = (
    <ul className="flex items-center gap-1" aria-label={common.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={localePath(l, basePath)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            title={localeNames[l]}
            onClick={() => setOpen(false)}
            className={cn(
              "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-semibold uppercase tracking-wider transition-colors",
              l === locale
                ? "bg-brand-deep text-white"
                : "text-brand-muted hover:bg-brand-tint-blue hover:text-brand-deep"
            )}
          >
            <span className="sr-only">{localeNames[l]}</span>
            <span aria-hidden="true">{l}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "border-b border-brand-line/70 bg-white/75 shadow-[0_6px_30px_-20px_rgb(var(--icv-deep)/0.35)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent"
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-4 transition-[height] duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        <Link href={localePath(locale, "/")} className="shrink-0 rounded-lg" aria-label="Invertir con Valores">
          <Logo />
        </Link>

        <nav aria-label={nav.label} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="whitespace-nowrap rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-brand-deep/80 transition-colors hover:bg-brand-tint-blue hover:text-brand-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {languageLinks}
          <Button asChild size={scrolled ? "sm" : "default"}>
            <Link href={homeAnchor(locale, "guia")}>{nav.cta}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Button asChild size="sm" className="hidden min-[400px]:inline-flex">
            <Link href={homeAnchor(locale, "guia")}>{nav.cta}</Link>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? common.closeMenu : common.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-deep hover:bg-brand-tint-blue"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="border-t border-brand-line/70 xl:hidden"
      >
        <nav aria-label={nav.label} className="container py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 font-display text-xl font-semibold text-brand-deep hover:bg-brand-tint-blue"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-line/70 pt-4">
            {languageLinks}
            <Button asChild size="sm">
              <Link href={homeAnchor(locale, "guia")} onClick={() => setOpen(false)}>
                {nav.cta}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
