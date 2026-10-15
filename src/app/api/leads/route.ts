import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getDictionary } from "@/i18n/get-dictionary";
import { locales } from "@/i18n/config";
import { sendLeadConfirmation } from "@/lib/leads/emails";
import { saveLead } from "@/lib/leads/providers";
import { rateLimit } from "@/lib/leads/rate-limit";
import {
  leadSources,
  waitlistOffers,
  type LeadField,
  type LeadResponse,
} from "@/lib/leads/types";

// One endpoint for every form: lead magnet (guide), newsletter (footer/blog)
// and waitlist (tagged by offer). The "source" field tells them apart.

const schema = z
  .object({
    name: z.string().trim().max(80).optional(),
    email: z.email().trim().toLowerCase().max(254),
    consent: z.literal(true),
    source: z.enum(leadSources),
    offer: z.enum(waitlistOffers).optional(),
    locale: z.enum(locales),
    website: z.string().optional(), // honeypot: real people never fill it
  })
  .superRefine((data, ctx) => {
    if (data.source === "guide" && !data.name) {
      ctx.addIssue({ code: "custom", path: ["name"], message: "required" });
    }
    if (data.source === "waitlist" && !data.offer) {
      ctx.addIssue({ code: "custom", path: ["offer"], message: "required" });
    }
  });

const json = (body: LeadResponse, status = 200, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers });

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return json({ ok: false, error: "rate_limit" }, 429, {
      "Retry-After": String(limit.retryAfter),
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "validation" }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields = [
      ...new Set(
        parsed.error.issues
          .map((i) => i.path[0])
          .filter(
            (f): f is LeadField =>
              f === "name" || f === "email" || f === "consent"
          )
      ),
    ];
    return json({ ok: false, error: "validation", fields }, 400);
  }

  const { website, email, name, source, offer, locale } = parsed.data;
  // Honeypot filled: pretend success so bots don't retry.
  if (website) return json({ ok: true });
  const lead = { email, name, source, offer, locale };

  const result = await saveLead(lead);
  if (result === "not_configured")
    return json({ ok: false, error: "not_configured" }, 503);
  if (result === "failed") return json({ ok: false, error: "server" }, 502);

  // The confirmation email is best effort: the lead is already stored.
  try {
    await sendLeadConfirmation(lead, await getDictionary(lead.locale));
  } catch (err) {
    console.error("[leads] confirmation email failed:", err);
  }

  return json({ ok: true });
}
