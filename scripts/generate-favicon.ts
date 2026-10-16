// Regenerates src/app/icon.svg from the brand mark (pnpm icons).
// The favicon switches to white ink when the browser UI is dark.
import { writeFileSync } from "node:fs";
import { LOGO_INK, logoMarkSvg } from "../src/components/layout/logo-mark";

const darkMode = `<style>@media (prefers-color-scheme: dark){[fill="${LOGO_INK}"]{fill:#fff}[stroke="${LOGO_INK}"]{stroke:#fff}}</style>`;

writeFileSync(
  new URL("../src/app/icon.svg", import.meta.url),
  `${logoMarkSvg(LOGO_INK, darkMode)}\n`
);
console.log("src/app/icon.svg updated");
