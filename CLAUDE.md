# CLAUDE.md: Invertir con Valores

Marketing site (Next.js 16 App Router, React 19, TS strict, Tailwind v3, Framer Motion) built on ShipFree.
Package manager: **pnpm**. Checks before committing: `pnpm lint && pnpm typecheck && pnpm build`.

## Language rules

- **UI copy, metadata and emails:** Spanish (Spain) by default, plus Italian and English.
  Never hardcode user-facing strings in components. Add them to `src/i18n/dictionaries/es.ts`
  (source of truth) and to `it.ts`/`en.ts` (typed as `Dictionary`, so missing keys fail the build).
- **Code, comments, commit messages, docs:** English.
- Tone: simple, warm, positive, playful. Never preachy, never finance-bro. Prefer "consciente" and
  "valores" over "ética". In es/it, words that refer to the reader use the inclusive "@" form
  ("sol@", "bienvenid@", "por ti mism@", "iscritt@"); words about Stefano stay as they are.
- Do not invent testimonials, statistics, returns, guarantees or user counts. Use `[TO COMPLETE]` or
  `// REVIEW` placeholders instead.

## Structure

```
content/blog/<locale>/*.mdx      blog posts (frontmatter: title, description, date, tags, animal, draft)
content/legal/<locale>/*.mdx     aviso-legal, privacidad, cookies (slugs stay Spanish in every locale)
src/proxy.ts                     locale routing: / → /es (rewrite), /es/* → /* (308), /it, /en as is
src/i18n/                        config (locales, localePath, homeAnchor), dictionaries, getDictionary
src/app/[locale]/                root layout (html/lang, fonts, navbar, footer, consent), pages
src/app/api/leads/route.ts       single lead endpoint (zod, honeypot, rate limit) for every form
src/lib/leads/                   providers (db, mailgun list, notify email), emails, rate limit, types
src/lib/blog.ts, seo.ts, og.tsx  MDX loading, metadata helpers (canonical + hreflang), OG images
src/components/animals/          Ant, Turtle, Bee, Kangaroo (original SVGs) + shared stroke/palette
src/components/layout/logo-mark.ts  brand mark: balance scale, planet = money (level beam). After
                                 editing run `pnpm icons` to regenerate src/app/icon.svg
src/components/motion/           Reveal, WordReveal, Counter, TiltCard/GlowSurface
src/components/sections/         one file per home section, rendered from the dictionary
src/components/consent/          ConsentProvider, CookieBanner, Analytics (Plausible after consent)
```

Server components by default; `"use client"` only for interactivity/animation (navbar, forms, FAQ,
"Cómo funciona" loop, kangaroo stairs, counters, dialog, pointer effects). Pass dictionary slices to client components as props.
Links: always build them with `localePath(locale, path)` / `homeAnchor(locale, id)`.

## Design tokens

CSS variables in `src/app/globals.css`, used through Tailwind `brand-*` colors:
blue `#1c92e1`, green `#31b317`, deep `#14250d` (text, dark sections, footer), slate `#748596` (lines only),
tints `tint-blue`/`tint-green`, `line`. For text on white use `brand-blue-ink`, `brand-green-ink`,
`brand-muted` (AA). Text on the blue→green gradient is `brand-deep`, never white (contrast).
Light theme only; dark backgrounds only for "El problema" and the footer (add class `on-dark`).
Fonts: `font-display` (Plus Jakarta Sans, `font-extrabold`) for headings, `font-sans` (Inter) for body.
Wrap heading text in `tightPunctuation()` (src/lib/typography.tsx) to fix the font's detached punctuation.
Gradient (`bg-brand-gradient`, `.bg-gradient-animated`, `.text-gradient`) is used sparingly: CTAs, highlights.

## Animation rules

- Must respect `prefers-reduced-motion`: decorative CSS keyframes live inside
  `@media (prefers-reduced-motion: no-preference)` in globals.css; Framer Motion runs under
  `MotionConfig reducedMotion="user"` (transforms dropped, fades kept); pointer effects check the media query.
- Use `m.*` components (LazyMotion `domAnimation`, `strict`), not `motion.*`.
- Animate only `transform`/`opacity` (and SVG stroke). No layout shift: reserve space for animated elements.
- Hero headline reveal is pure CSS (`WordReveal`) so it starts before hydration (LCP).
- Animals: idle loop + hover reaction via `.animal-<kind>` classes; hovering a `.group` ancestor triggers it.
- Buttons never move on hover (no lift, no magnetic pull, no tilt around them): colour/shadow feedback only.
- Keep it light: no 3D, no new animation libraries without a clear need.

## Accessibility

Semantic landmarks, one `h1` per page, `aria-labelledby` on sections, visible `:focus-visible`,
keyboard-operable menu/accordion/dialog (native `<dialog>`), icon buttons need `aria-label`,
decorative SVGs `aria-hidden`. Forms: labels, `aria-invalid` + `aria-describedby` errors, live region.
