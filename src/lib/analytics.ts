// Tiny analytics facade over Simple Analytics events (no-op when the script
// isn't loaded, e.g. NEXT_PUBLIC_SIMPLE_ANALYTICS is off or a blocker is on).

export type AnalyticsEvent =
  | "lead_submit"
  | "cal_click"
  | "waitlist_submit"
  | "substack_open";

declare global {
  interface Window {
    sa_event?: (event: string, metadata?: Record<string, string>) => void;
  }
}

export function track(
  event: AnalyticsEvent,
  metadata?: Record<string, string>
) {
  if (typeof window === "undefined") return;
  try {
    window.sa_event?.(event, metadata);
  } catch {
    // Analytics must never break the UI.
  }
}
