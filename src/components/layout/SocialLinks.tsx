import {
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { config } from "@/config";
import { TrackedLink } from "@/components/TrackedLink";

const items = [
  {
    key: "youtube",
    label: "YouTube",
    href: config.social.youtube,
    Icon: FaYoutube,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: config.social.instagram,
    Icon: FaInstagram,
  },
  {
    key: "tiktok",
    label: "TikTok",
    href: config.social.tiktok,
    Icon: FaTiktok,
  },
  {
    key: "telegram",
    label: "Telegram",
    href: config.links.telegram,
    Icon: FaTelegramPlane,
  },
  {
    key: "substack",
    label: "Substack",
    href: config.links.substack,
    Icon: SiSubstack,
  },
] as const;

/** Social icons; profiles without a URL configured are hidden. */
export function SocialLinks() {
  const visible = items.filter((i) => i.href);
  if (visible.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {visible.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <TrackedLink
            href={href}
            event={key === "telegram" ? "telegram_click" : undefined}
            eventProps={{ location: "footer" }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-brand-green hover:bg-white/5 hover:text-white"
          >
            <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
