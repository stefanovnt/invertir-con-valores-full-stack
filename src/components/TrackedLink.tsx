"use client";

import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event?: AnalyticsEvent;
  eventProps?: Record<string, string>;
};

/** External link that fires an analytics event on click (no-op without consent). */
export function TrackedLink({ event, eventProps, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (event) track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
