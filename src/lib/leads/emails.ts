import "server-only";
import { config } from "@/config";
import type { Dictionary } from "@/i18n/dictionaries/es";
import { isMailgunConfigured, sendEmail } from "@/lib/mailgun";
import { escapeHtml, type Lead } from "./providers";

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

/** Minimal, inline-styled brand email (works in every client). */
function layout(
  paragraphs: string[],
  cta?: { label: string; href: string },
  footer?: string
) {
  const ps = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 16px;line-height:1.6">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`
    )
    .join("");
  const button = cta
    ? `<p style="margin:24px 0"><a href="${escapeHtml(cta.href)}" style="display:inline-block;padding:14px 26px;border-radius:999px;background:linear-gradient(110deg,#1c92e1,#31b317);background-color:#31b317;color:#14250d;font-weight:700;text-decoration:none">${escapeHtml(cta.label)}</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f2faef;padding:24px;font-family:Inter,Arial,sans-serif;color:#14250d">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px">
<p style="margin:0 0 24px;font-weight:700;font-size:18px">Invertir con <span style="color:#23810f">Valores</span></p>
${ps}${button}
${footer ? `<p style="margin:32px 0 0;font-size:12px;line-height:1.5;color:#546372">${escapeHtml(footer)}</p>` : ""}
</div></body></html>`;
}

/** Confirmation email to the person who signed up, in their language. */
export async function sendLeadConfirmation(lead: Lead, dict: Dictionary) {
  if (!isMailgunConfigured()) return;
  const e = dict.emails;
  const replyTo = config.contactEmail || undefined;

  if (lead.source === "guide") {
    const guideUrl = (process.env.GUIDE_URL ?? "").trim();
    const name = lead.name?.trim() || "";
    const paragraphs = [
      fill(e.guide.greeting, { name }).replace(" ,", ","),
      e.guide.body,
    ];
    if (!guideUrl) paragraphs.push(e.guide.pending);
    await sendEmail({
      to: lead.email,
      subject: e.guide.subject,
      html: layout(
        [...paragraphs, e.signature],
        guideUrl ? { label: e.guide.cta, href: guideUrl } : undefined,
        e.unsubscribe
      ),
      replyTo,
    });
    return;
  }

  if (lead.source === "waitlist") {
    const offer =
      dict.learning.offers.find((o) => o.id === lead.offer)?.title ?? "";
    await sendEmail({
      to: lead.email,
      subject: fill(e.waitlist.subject, { offer }),
      html: layout(
        [e.waitlist.greeting, fill(e.waitlist.body, { offer }), e.signature],
        undefined,
        e.unsubscribe
      ),
      replyTo,
    });
    return;
  }

  await sendEmail({
    to: lead.email,
    subject: e.newsletter.subject,
    html: layout(
      [e.newsletter.greeting, e.newsletter.body, e.signature],
      undefined,
      e.unsubscribe
    ),
    replyTo,
  });
}
