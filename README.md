# Invertir con Valores

Marketing website for **Invertir con Valores**, an educational brand and community that helps
values-driven people save and invest long term without funding weapons, fossil fuels or exploitation.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS and Framer Motion, on top of
the [ShipFree](https://github.com/idee8/shipfree) boilerplate (MIT, see `LICENSE.md`).

## Quick start

```bash
pnpm install
cp .env.example .env.local   # every variable is optional
pnpm dev                     # http://localhost:3000
```

| Script                      | What it does                                           |
| --------------------------- | ------------------------------------------------------ |
| `pnpm dev`                  | Dev server (Turbopack)                                 |
| `pnpm build` / `pnpm start` | Production build / serve                               |
| `pnpm lint`                 | ESLint                                                 |
| `pnpm typecheck`            | Route type generation + `tsc --noEmit`                 |
| `pnpm db:push`              | Create/update the `leads` table (needs `DATABASE_URL`) |

---

## Invertir con Valores

### Languages and URLs

- Spanish is the default and has **no prefix**: `/`, `/blog`, `/privacidad`.
- Italian and English live under `/it` and `/en`. `/es/...` redirects to the unprefixed URL.
- Routing is done in `src/proxy.ts`; locale helpers are in `src/i18n/config.ts`.

### Editing copy

All UI copy lives in typed dictionaries:

- `src/i18n/dictionaries/es.ts`: **source of truth** (Spanish, Spain)
- `src/i18n/dictionaries/it.ts`, `en.ts`: translations. TypeScript fails if a key is missing.

Strings marked `// REVIEW` were not in the original brief and should be proofread.
Section components (`src/components/sections/*`) only render the dictionary, so you rarely need to touch them.

Other content:

- **Legal pages:** `content/legal/<locale>/{aviso-legal,privacidad,cookies}.mdx`. Fill in every `[TO COMPLETE]`.
- **Founder photo:** put the image in `public/` and set `founderPhoto` in `src/config.ts`.
- **Social links, Cal.com, Substack:** environment variables (see `.env.example`).

### Sections switched off for now

`config.features` in `src/config.ts` hides whole sections without deleting them:

- `blog: false` hides the blog link (navbar and footer), the home blog section, `/blog` (404), the sitemap
  entries and `/rss.xml`. Set it to `true` to bring the blog back.
- `waitlist: false` hides "Camino de aprendizaje" (the paid-offers waitlist). The `/api/leads` waitlist source
  keeps working. Before turning it back on, add Resend (and the database, if used) to the privacy policy.
- `social` picks the networks shown in the footer and in the JSON-LD. Only YouTube is on for now; set
  `instagram`/`tiktok` to `true` (and their `NEXT_PUBLIC_*_URL`) to show them.

### Adding a blog post

Create `content/blog/es/<slug>.mdx` (the slug becomes the URL `/blog/<slug>`):

```mdx
---
title: "Título del artículo"
description: "Resumen de una o dos frases para tarjetas y SEO."
date: 2026-11-01
tags: ["Ahorro", "Primeros pasos"]
animal: ant # ant | turtle | bee | kangaroo (illustrated cover)
draft: false # true = visible with a "Borrador" badge, noindex, not in sitemap/RSS
---

Contenido en **Markdown/MDX**. Tables (GFM) are supported.
```

Reading time, tag pages (`/blog/tag/<tag>`), the RSS feed (`/rss.xml`), the sitemap and the Open Graph image
are generated automatically. To translate a post, add the same slug under `content/blog/it/` or `content/blog/en/`.
Locales with no posts show the Spanish ones with a notice.

> The three sample posts are **drafts** (`draft: true`). Review them and set `draft: false` to publish.

### Changing colours and fonts

- Brand tokens are CSS variables in `src/app/globals.css` (`--icv-blue`, `--icv-green`, `--icv-deep`, …),
  exposed to Tailwind as `brand-*` colours in `tailwind.config.ts` (`bg-brand-blue/10`, `text-brand-deep`, …).
- Use the `*-ink` variants (`text-brand-blue-ink`, `text-brand-green-ink`, `text-brand-muted`) for text on white:
  the pure brand blue/green do not meet WCAG AA contrast for body text.
- Fonts (Plus Jakarta Sans ExtraBold for headings, Inter for body) are loaded with `next/font` in `src/app/[locale]/layout.tsx`.

### Forms and leads

**Newsletter (Substack).** With `NEXT_PUBLIC_SUBSTACK_URL` set, the newsletter forms (home, footer, blog index and
posts) show Substack's official signup form (`<publication>/embed`). It loads only when the visitor clicks the button,
so no Substack iframe or cookies are loaded before that (see `src/components/forms/SubstackEmbed.tsx`). Substack
handles confirmation and unsubscribes. The blog page also links to your Substack archive.

**Waitlist and fallback.** The waitlist forms (and the newsletter forms when no Substack URL is set) post to
`POST /api/leads` with a `source` tag (`newsletter_home`, `newsletter_footer`, `newsletter_blog`, `waitlist` +
`offer`; `guide` is ready for a future lead magnet). The route validates with zod, has a
honeypot and a per-IP rate limit, then stores the lead with every configured provider
(`src/lib/leads/providers.ts`):

| Provider                             | Enabled when                                           |
| ------------------------------------ | ------------------------------------------------------ |
| Postgres via Drizzle (`leads` table) | `DATABASE_URL`                                         |
| Resend contacts (one segment)        | `RESEND_API_KEY` + `RESEND_SEGMENT_ID`                 |
| Email notification to you            | `RESEND_API_KEY` + `EMAIL_FROM` + `LEADS_NOTIFY_EMAIL` |

Emails are sent with [Resend](https://resend.com) (`src/lib/email.ts`). With `RESEND_API_KEY` and `EMAIL_FROM` set,
people also get a confirmation email in their language (`GUIDE_URL` is only used by the future `guide` source).
To add another provider (Brevo, Buttondown, ConvertKit…), add an entry to the `providers` array.

### Analytics and cookies

Set `NEXT_PUBLIC_SIMPLE_ANALYTICS=true` to load [Simple Analytics](https://simpleanalytics.com) (add the domain in
your Simple Analytics dashboard first). It is cookieless and collects no personal data, so the site has **no
cookie banner**. Third-party embeds (Substack, Cal.com) only load after a click. Tracked events (`sa_event`):
`lead_submit`, `waitlist_submit`, `cal_click`, `substack_open`.

If you ever add a tool that sets cookies, you'll need a consent banner again (see the git history for the
previous `src/components/consent/` implementation) and an updated cookie policy.

### Deploying to Vercel

1. Push this repository to GitHub and import it in Vercel (the framework and pnpm are detected automatically).
2. Add the environment variables from `.env.example` (at least `NEXT_PUBLIC_SITE_URL`).
3. If you use Postgres, create the table once locally: `DATABASE_URL=... pnpm db:push`.
4. Add your domain in Vercel and make sure it matches `NEXT_PUBLIC_SITE_URL`.
5. Optional: verify your sending domain in Resend (DNS records) and set `RESEND_API_KEY` + `EMAIL_FROM`.

---

## What changed from ShipFree

Kept and adapted: Next.js/Tailwind/shadcn setup, `src/config.ts`, the Drizzle DB layer and the UI primitives.
Email moved from ShipFree's Mailgun helper (and its reply-forwarding webhook) to Resend.

Removed (still available in the first git commit): Supabase auth pages, dashboard, Stripe and LemonSqueezy
checkout/webhooks, pricing/testimonials/demo sections, Docker files and their dependencies.
