// Tiny analytics facade. Plausible is only loaded after cookie consent
// (see components/consent), so until then every call is a no-op.

export type AnalyticsEvent = "lead_submit" | "cal_click" | "waitlist_submit";

type Plausible = (
  event: string,
  options?: { props?: Record<string, string> }
) => void;

declare global {
  interface Window {
    plausible?: Plausible & { q?: unknown[] };
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // Analytics must never break the UI.
  }
}
