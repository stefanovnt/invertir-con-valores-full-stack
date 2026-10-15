import "server-only";
import { addToMailingList, isMailgunConfigured, sendEmail } from "@/lib/mailgun";
import type { LeadSource, WaitlistOffer } from "./types";

export type Lead = {
  email: string;
  name?: string;
  source: LeadSource;
  offer?: WaitlistOffer;
  locale: string;
};

/**
 * Lead storage is a list of swappable providers. Each one turns itself on when
 * its env vars are present; a lead is accepted when at least one provider
 * stores it. To add e.g. Brevo/Buttondown/ConvertKit, add an entry here.
 */
type Provider = { name: string; enabled: () => boolean; save: (lead: Lead) => Promise<void> };

const providers: Provider[] = [
  {
    // Postgres via Drizzle (ShipFree's DB layer). Table: leads (src/db/schema.ts).
    name: "database",
    enabled: () => Boolean(process.env.DATABASE_URL),
    save: async (lead) => {
      const [{ db }, { leadsTable }] = await Promise.all([import("@/db"), import("@/db/schema")]);
      await db
        .insert(leadsTable)
        .values({
          email: lead.email,
          name: lead.name || null,
          source: lead.source,
          offer: lead.offer ?? "",
          locale: lead.locale,
        })
        .onConflictDoNothing();
    },
  },
  {
    // Mailgun mailing list = newsletter audience. Vars keep source/offer/locale for segmenting.
    name: "mailgun_list",
    enabled: () => isMailgunConfigured() && Boolean(process.env.MAILGUN_LIST_ADDRESS),
    save: async (lead) => {
      await addToMailingList(process.env.MAILGUN_LIST_ADDRESS!, {
        email: lead.email,
        name: lead.name,
        vars: { source: lead.source, offer: lead.offer ?? "", locale: lead.locale },
      });
    },
  },
  {
    // Simple inbox notification: useful as the only "storage" while starting out.
    name: "notify_email",
    enabled: () => isMailgunConfigured() && Boolean(process.env.LEADS_NOTIFY_EMAIL),
    save: async (lead) => {
      const rows = Object.entries(lead)
        .map(([k, v]) => `<li><b>${k}:</b> ${escapeHtml(String(v ?? ""))}</li>`)
        .join("");
      await sendEmail({
        to: process.env.LEADS_NOTIFY_EMAIL!,
        subject: `Nuevo lead (${lead.source}${lead.offer ? `: ${lead.offer}` : ""})`,
        html: `<ul>${rows}</ul>`,
      });
    },
  },
];

export const enabledProviders = () => providers.filter((p) => p.enabled());

/** True when at least one provider can store leads (or we are in local dev). */
export const leadsBackendReady = () =>
  enabledProviders().length > 0 || process.env.NODE_ENV === "development";

export async function saveLead(lead: Lead): Promise<"stored" | "not_configured" | "failed"> {
  const active = enabledProviders();
  if (active.length === 0) {
    if (process.env.NODE_ENV === "development") {
      console.info("[leads] No provider configured, lead not stored (dev):", lead);
      return "stored";
    }
    return "not_configured";
  }

  const results = await Promise.allSettled(active.map((p) => p.save(lead)));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[leads] provider ${active[i].name} failed:`, r.reason);
  });
  return results.some((r) => r.status === "fulfilled") ? "stored" : "failed";
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
