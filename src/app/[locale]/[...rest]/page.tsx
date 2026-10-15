import { notFound } from "next/navigation";

// Catch-all so unknown URLs render the localized [locale]/not-found.tsx
// inside the site layout (navbar + footer).
export default function CatchAll() {
  notFound();
}
