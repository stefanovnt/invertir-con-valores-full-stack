// Shared between the client forms and the /api/leads route.

export const leadSources = [
  "guide",
  "newsletter_footer",
  "newsletter_blog",
  "waitlist",
] as const;
export type LeadSource = (typeof leadSources)[number];

export const waitlistOffers = ["premium", "coaching", "course"] as const;
export type WaitlistOffer = (typeof waitlistOffers)[number];

export type LeadField = "name" | "email" | "consent";

export type LeadResponse =
  | { ok: true }
  | {
      ok: false;
      error: "validation" | "rate_limit" | "server" | "not_configured";
      fields?: LeadField[];
    };
