import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { config } from "@/config";
import { Button, type ButtonProps } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { homeAnchor, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  label: string;
  /** Label used when NEXT_PUBLIC_TELEGRAM_URL is empty. */
  fallbackLabel: string;
  /** Section the fallback links to (default: the guide form). */
  fallbackAnchor?: string;
  location: string;
  newTabLabel: string;
} & Pick<ButtonProps, "variant" | "size" | "className">;

/** Telegram CTA with tracking; degrades to the email form when no URL is set. */
export function TelegramButton({
  locale,
  label,
  fallbackLabel,
  fallbackAnchor = "guia",
  location,
  newTabLabel,
  ...button
}: Props) {
  if (!config.links.telegram) {
    return (
      <Button asChild {...button}>
        <Link href={homeAnchor(locale, fallbackAnchor)}>{fallbackLabel}</Link>
      </Button>
    );
  }
  return (
    <Button asChild {...button}>
      <TrackedLink
        href={config.links.telegram}
        target="_blank"
        rel="noopener noreferrer"
        event="telegram_click"
        eventProps={{ location }}
      >
        <FaTelegramPlane aria-hidden="true" />
        {label}
        <span className="sr-only">{newTabLabel}</span>
      </TrackedLink>
    </Button>
  );
}
