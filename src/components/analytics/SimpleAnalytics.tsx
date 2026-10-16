import Script from "next/script";

/**
 * Simple Analytics (https://simpleanalytics.com): privacy-first and
 * cookieless, it collects no personal data, so it needs no consent banner
 * (GDPR / LSSI-CE art. 22.2). The queue stub lets `sa_event` calls made before
 * the script loads be sent once it does (see src/lib/analytics.ts).
 */
export function SimpleAnalytics({ hostname }: { hostname?: string }) {
  return (
    <>
      <Script id="sa-event-queue" strategy="afterInteractive">
        {`window.sa_event=window.sa_event||function(){var a=[].slice.call(arguments);window.sa_event.q?window.sa_event.q.push(a):window.sa_event.q=[a]};`}
      </Script>
      <Script
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        strategy="afterInteractive"
        {...(hostname ? { "data-hostname": hostname } : {})}
      />
    </>
  );
}
