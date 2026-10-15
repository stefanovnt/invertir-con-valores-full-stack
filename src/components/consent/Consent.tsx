"use client";

import Link from "next/link";
import Script from "next/script";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/dictionaries/es";

// GDPR / LSSI-CE: analytics are loaded only after explicit consent.
// The choice is stored in localStorage (no cookie is set by this site itself).
// If no analytics provider is configured there is nothing to consent to,
// so neither the banner nor the "Manage cookies" link are shown.

type Choice = "granted" | "denied";
const STORAGE_KEY = "icv-consent-v1";

type ConsentState = {
  enabled: boolean;
  choice: Choice | null;
  ready: boolean;
  open: boolean;
  decide: (choice: Choice) => void;
  reopen: () => void;
};

const ConsentContext = createContext<ConsentState | null>(null);

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function ConsentProvider({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    // Reading localStorage is only possible after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(stored);
    setOpen(stored === null);
    setReady(true);
  }, []);

  const decide = useCallback(
    (next: Choice) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage blocked: keep the choice for this page view only.
      }
      // Revoking consent after analytics loaded: reload so the script is gone.
      if (choice === "granted" && next === "denied") {
        window.location.reload();
        return;
      }
      setChoice(next);
      setOpen(false);
    },
    [choice]
  );

  const reopen = useCallback(() => setOpen(true), []);

  return (
    <ConsentContext.Provider value={{ enabled, choice, ready, open, decide, reopen }}>
      {children}
    </ConsentContext.Provider>
  );
}

function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}

export function CookieBanner({ dict, privacyHref }: { dict: Dictionary["cookies"]; privacyHref: string }) {
  const { enabled, ready, open, decide } = useConsent();
  if (!enabled || !ready || !open) return null;

  return (
    <section
      aria-label={dict.title}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-3xl border border-brand-line bg-white/95 p-5 shadow-[0_20px_60px_-25px_rgb(var(--icv-deep)/0.45)] backdrop-blur motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 sm:bottom-5 sm:p-6"
    >
      <p className="text-sm leading-relaxed text-brand-deep">
        {dict.text}{" "}
        <Link href={privacyHref} className="font-semibold text-brand-blue-ink underline underline-offset-2">
          {dict.more}
        </Link>
      </p>
      {/* Accept and reject have equal visual weight (AEPD guidance). */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button variant="secondary" size="sm" onClick={() => decide("denied")}>
          {dict.reject}
        </Button>
        <Button variant="dark" size="sm" onClick={() => decide("granted")}>
          {dict.accept}
        </Button>
      </div>
    </section>
  );
}

export function ManageCookiesButton({ label }: { label: string }) {
  const { enabled, reopen } = useConsent();
  if (!enabled) return null;
  return (
    <button type="button" onClick={reopen} className="text-left hover:text-white hover:underline">
      {label}
    </button>
  );
}

/** Plausible analytics, injected only after consent. */
export function Analytics({ domain, src }: { domain: string; src: string }) {
  const { enabled, choice } = useConsent();
  if (!enabled || choice !== "granted") return null;
  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script src={src} data-domain={domain} strategy="afterInteractive" />
    </>
  );
}
