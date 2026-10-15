import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import tailwindTypography from "@tailwindcss/typography";

// Brand tokens live as CSS variables in src/app/globals.css (RGB channels),
// so they can be used with Tailwind opacity modifiers: bg-brand-blue/10.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        brand: {
          blue: token("icv-blue"),
          green: token("icv-green"),
          deep: token("icv-deep"),
          slate: token("icv-slate"),
          // Darker variants for text on white (WCAG AA >= 4.5:1).
          "blue-ink": token("icv-blue-ink"),
          "green-ink": token("icv-green-ink"),
          muted: token("icv-muted"),
          // Light tints for backgrounds.
          "tint-blue": token("icv-tint-blue"),
          "tint-green": token("icv-tint-green"),
          line: token("icv-line"),
          "on-dark": token("icv-on-dark"),
        },
        // shadcn/ui semantic colors (kept from ShipFree, remapped to brand).
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "ui-sans-serif",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, rgb(var(--icv-blue)), rgb(var(--icv-green)))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "4xl": "2rem",
      },
      maxWidth: { prose: "65ch" },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--icv-deep) / 0.88)",
            "--tw-prose-headings": "rgb(var(--icv-deep))",
            "--tw-prose-links": "rgb(var(--icv-blue-ink))",
            "--tw-prose-bold": "rgb(var(--icv-deep))",
            "--tw-prose-bullets": "rgb(var(--icv-green))",
            "--tw-prose-counters": "rgb(var(--icv-green-ink))",
            "--tw-prose-quotes": "rgb(var(--icv-deep))",
            "--tw-prose-quote-borders": "rgb(var(--icv-green))",
            "--tw-prose-hr": "rgb(var(--icv-line))",
          },
        },
      },
    },
  },
  plugins: [tailwindAnimate, tailwindTypography],
} satisfies Config;
