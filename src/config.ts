// Site-wide configuration (reused from the ShipFree boilerplate and adapted).
// Public URLs come from NEXT_PUBLIC_* env vars so they can change per environment.

const env = (value: string | undefined) => (value ?? "").trim();

export const config = {
  appName: "Invertir con Valores",
  founder: "Stefano",
  /** Canonical origin, no trailing slash. */
  domainName:
    env(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") ||
    "http://localhost:3000",
  /** Founder photo in /public, shown in the "Sobre mí" blob (cut-out with a
   *  transparent background). Empty = kangaroo placeholder. */
  founderPhoto: "/images/stefano.png",
  // Sections that are switched off for now (set to true to bring them back).
  features: {
    blog: false,
    waitlist: false, // "Camino de aprendizaje" (paid offers waitlist)
  },
  links: {
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
      env(process.env.NEXT_PUBLIC_PLAUSIBLE_SRC) ||
      "https://plausible.io/js/script.js",
  },
  email: {
    // Sender for emails sent with Resend; must be on a domain verified in Resend,
    // e.g. "Stefano · Invertir con Valores <hola@invertirconvalores.com>".
    from: env(process.env.EMAIL_FROM),
  },
};

export type SiteConfig = typeof config;

/** Hide navigation links to sections that are switched off. */
export const isNavLinkEnabled = (link: { href?: string }) =>
  config.features.blog || link.href !== "/blog";
