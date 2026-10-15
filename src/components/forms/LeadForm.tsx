"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessBurst } from "./SuccessBurst";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import type {
  LeadField,
  LeadResponse,
  LeadSource,
  WaitlistOffer,
} from "@/lib/leads/types";

type Props = {
  locale: Locale;
  dict: Dictionary["forms"];
  source: LeadSource;
  offer?: WaitlistOffer;
  submitLabel: string;
  withName?: boolean;
  tone?: "light" | "dark";
  /** Single-row layout used in the footer/blog. */
  compact?: boolean;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Shared lead form (guide, newsletter, waitlist). Posts JSON to /api/leads,
 * validates on the client with localized messages, and swaps itself for an
 * animated success message.
 */
export function LeadForm({
  locale,
  dict,
  source,
  offer,
  submitLabel,
  withName = false,
  tone = "light",
  compact = false,
  className,
}: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<LeadField[]>([]);
  const [message, setMessage] = useState("");
  // Keep the form's height when it is swapped for the success message (no layout jump).
  const [lockedHeight, setLockedHeight] = useState<number | undefined>();

  const dark = tone === "dark";
  const kind =
    source === "guide"
      ? "guide"
      : source === "waitlist"
        ? "waitlist"
        : "newsletter";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(e.currentTarget);
    const payload = {
      name: withName ? String(data.get("name") ?? "").trim() : undefined,
      email: String(data.get("email") ?? "").trim(),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
      source,
      offer,
      locale,
    };

    const errors: LeadField[] = [];
    if (withName && !payload.name) errors.push("name");
    if (!EMAIL_RE.test(payload.email)) errors.push("email");
    if (!payload.consent) errors.push("consent");
    if (errors.length) return fail(errors, dict.errors.summary);

    setStatus("submitting");
    setFieldErrors([]);
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res
        .json()
        .catch(() => ({ ok: false, error: "server" }))) as LeadResponse;
      if (body.ok) {
        track(source === "waitlist" ? "waitlist_submit" : "lead_submit", {
          source,
          ...(offer ? { offer } : {}),
        });
        setLockedHeight(formRef.current?.offsetHeight);
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (body.error === "validation" && body.fields?.length)
        return fail(body.fields, dict.errors.summary);
      fail(
        [],
        body.error === "rate_limit" ? dict.errors.rateLimit : dict.errors.server
      );
    } catch {
      fail([], dict.errors.server);
    }
  }

  function fail(fields: LeadField[], msg: string) {
    setStatus("error");
    setFieldErrors(fields);
    setMessage(msg);
    // Move focus to the first invalid field.
    const first = fields[0];
    if (first)
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  if (status === "success") {
    const s = dict.success[kind];
    return (
      <div
        role="status"
        style={{ minHeight: lockedHeight }}
        className={cn(
          "flex flex-col items-center justify-center py-4 text-center",
          className
        )}
      >
        <SuccessBurst />
        <h3
          ref={successRef}
          tabIndex={-1}
          className={cn(
            "mt-5 font-display text-2xl font-extrabold outline-none",
            dark ? "text-white" : "text-brand-deep"
          )}
        >
          {s.title}
        </h3>
        <p
          className={cn(
            "mx-auto mt-2 max-w-sm",
            dark ? "text-brand-on-dark" : "text-brand-muted"
          )}
        >
          {s.text}
        </p>
      </div>
    );
  }

  const hasError = (f: LeadField) => fieldErrors.includes(f);
  const errorId = (f: LeadField) => `${id}-${f}-error`;
  const labelClass = cn(
    "mb-1.5 block text-sm font-semibold",
    dark ? "text-white" : "text-brand-deep"
  );
  const errorClass = cn(
    "mt-1.5 text-sm font-medium",
    dark ? "text-[#ffb4a8]" : "text-destructive"
  );

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className={cn("space-y-4", className)}
    >
      {/* Honeypot: visually hidden and skipped by keyboard and screen readers. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div
        className={cn(
          compact
            ? "flex flex-col gap-3 sm:flex-row sm:items-start"
            : "grid gap-4 sm:grid-cols-2"
        )}
      >
        {withName && (
          <div>
            <label htmlFor={`${id}-name`} className={labelClass}>
              {dict.name}
            </label>
            <Input
              id={`${id}-name`}
              name="name"
              autoComplete="given-name"
              placeholder={dict.namePlaceholder}
              maxLength={80}
              aria-invalid={hasError("name")}
              aria-describedby={hasError("name") ? errorId("name") : undefined}
            />
            {hasError("name") && (
              <p id={errorId("name")} className={errorClass}>
                {dict.errors.name}
              </p>
            )}
          </div>
        )}
        <div
          className={cn(
            compact && "flex-1",
            !withName && !compact && "sm:col-span-2"
          )}
        >
          <label
            htmlFor={`${id}-email`}
            className={cn(labelClass, compact && "sr-only")}
          >
            {dict.email}
          </label>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={dict.emailPlaceholder}
            maxLength={254}
            aria-invalid={hasError("email")}
            aria-describedby={hasError("email") ? errorId("email") : undefined}
            className={cn(
              dark &&
                "border-white/20 bg-white/10 text-white placeholder:text-white/60 hover:border-white/40"
            )}
          />
          {hasError("email") && (
            <p id={errorId("email")} className={errorClass}>
              {dict.errors.email}
            </p>
          )}
        </div>
        {compact && (
          <Button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0"
          >
            {status === "submitting" ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : null}
            {status === "submitting" ? dict.sending : submitLabel}
          </Button>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            aria-invalid={hasError("consent")}
            aria-describedby={
              hasError("consent") ? errorId("consent") : undefined
            }
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-[rgb(var(--icv-green-ink))]"
          />
          <label
            htmlFor={`${id}-consent`}
            className={cn(
              "text-sm leading-relaxed",
              dark ? "text-brand-on-dark" : "text-brand-muted"
            )}
          >
            {dict.consentBefore}
            <Link
              href={localePath(locale, "/privacidad")}
              className={cn(
                "font-semibold underline underline-offset-2",
                dark ? "text-white" : "text-brand-blue-ink"
              )}
            >
              {dict.consentLink}
            </Link>
            {dict.consentAfter}
          </label>
        </div>
        {hasError("consent") && (
          <p id={errorId("consent")} className={errorClass}>
            {dict.errors.consent}
          </p>
        )}
      </div>

      {!compact && (
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : null}
          {status === "submitting" ? dict.sending : submitLabel}
        </Button>
      )}

      <p
        aria-live="polite"
        className={cn("min-h-0 text-sm font-medium empty:hidden", errorClass)}
      >
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
