// Site-wide configuration (reused from the ShipFree boilerplate and adapted).
// Public URLs come from NEXT_PUBLIC_* env vars so they can change per environment.

const env = (value: string | undefined) => (value ?? "").trim();

export const config = {
  appName: "Invertir con Valores",
  founder: "Stefano",
  /** Canonical origin, no trailing slash. */
  domainName: env(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") || "http://localhost:3000",
  /** Path to the founder photo in /public (e.g. "/stefano.jpg"). Empty = blob placeholder. */
  founderPhoto: "", // [TO COMPLETE]
  links: {
    telegram: env(process.env.NEXT_PUBLIC_TELEGRAM_URL),
    cal: env(process.env.NEXT_PUBLIC_CAL_URL),
    substack: env(process.env.NEXT_PUBLIC_SUBSTACK_URL),
  },
  /** Social profiles. Empty strings are hidden in the footer. [TO COMPLETE] */
  social: {
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    tiktok: env(process.env.NEXT_PUBLIC_TIKTOK_URL),
  },
  /** Contact email shown in legal pages and used as Reply-To. [TO COMPLETE] */
  contactEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  analytics: {
    plausibleDomain: env(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    plausibleSrc:
      env(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC) || "https://plausible.io/js/script.js",
  },
  mailgun: {
    // REQUIRED when Mailgun is enabled — 'From' used for lead confirmation emails.
    fromAdmin: env(process.env.MAILGUN_FROM_EMAIL) || "Invertir con Valores <hola@example.com>",
    // When someone replies to an email sent by the app, forward it here (see /api/mailgun).
    forwardRepliesTo: env(process.env.MAILGUN_FORWARD_REPLIES_TO),
  },
};

export type SiteConfig = typeof config;
