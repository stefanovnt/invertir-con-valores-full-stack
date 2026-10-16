"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  localeNames,
  localePath,
  locales,
  stripLocale,
  type Locale,
} from "@/i18n/config";

/**
 * Language dropdown (disclosure pattern: a button that shows/hides a list of
 * links). Closes on outside click, Escape (focus returns to the button) and
 * when a language is picked. Links keep the current page in the new locale
 * and the current scroll position.
 */
export function LanguageMenu({
  locale,
  label,
  onNavigate,
  align = "right",
}: {
  locale: Locale;
  label: string;
  onNavigate?: () => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const basePath = stripLocale(usePathname() ?? "/");

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          // Don't let Escape also close the mobile menu around us.
          e.stopPropagation();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-brand-line bg-white/70 px-3 text-sm font-semibold uppercase tracking-wide text-brand-deep transition-colors hover:border-brand-slate/50 hover:bg-white"
      >
        <Globe className="h-4 w-4 text-brand-muted" aria-hidden="true" />
        <span className="sr-only">
          {label}: {localeNames[locale]}
        </span>
        <span aria-hidden="true">{locale}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-brand-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <ul
        id={listId}
        hidden={!open}
        aria-label={label}
        className={cn(
          "absolute top-full z-10 mt-2 w-48 rounded-2xl border border-brand-line bg-white p-1.5 shadow-[0_20px_40px_-20px_rgb(var(--icv-deep)/0.35)]",
          align === "right" ? "right-0" : "left-0"
        )}
      >
        {locales.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <Link
                href={localePath(l, basePath)}
                // Same page in another language: keep the reader where they are
                // (Next.js would otherwise scroll the new page into view).
                scroll={false}
                hrefLang={l}
                lang={l}
                aria-current={current ? "page" : undefined}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-brand-tint-blue",
                  current
                    ? "font-semibold text-brand-deep"
                    : "text-brand-deep/80"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="w-6 text-xs font-bold uppercase tracking-wider text-brand-muted"
                  >
                    {l}
                  </span>
                  {localeNames[l]}
                </span>
                {current && (
                  <Check
                    className="h-4 w-4 text-brand-green-ink"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
