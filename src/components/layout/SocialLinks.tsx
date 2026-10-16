import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { config } from "@/config";

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
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-brand-green hover:bg-white/5 hover:text-white"
          >
            <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
