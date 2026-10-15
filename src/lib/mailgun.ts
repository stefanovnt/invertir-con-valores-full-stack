import "server-only";
import { config } from "@/config";
import formData from "form-data";
import Mailgun from "mailgun.js";

// Reused from ShipFree, fixed and made lazy:
// - the sending domain comes from MAILGUN_DOMAIN (ShipFree concatenated a URL by mistake)
// - MAILGUN_API_URL allows the EU region (https://api.eu.mailgun.net), recommended for Spain
// - nothing is created when Mailgun is not configured

export const isMailgunConfigured = () =>
  Boolean(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN);

let client: ReturnType<Mailgun["client"]> | null = null;

function mg() {
  if (!client) {
    client = new Mailgun(formData).client({
      username: "api",
      key: process.env.MAILGUN_API_KEY ?? "",
      ...(process.env.MAILGUN_API_URL ? { url: process.env.MAILGUN_API_URL } : {}),
    });
  }
  return client;
}

/**
 * Sends an email using the provided parameters.
 */
export const sendEmail = async ({
  html,
  replyTo,
  subject,
  text,
  to,
}: {
  to: string;
  subject: string;
  text?: string;
  html: string;
  replyTo?: string;
}) => {
  await mg().messages.create(process.env.MAILGUN_DOMAIN ?? "", {
    from: config.mailgun.fromAdmin,
    to: [to],
    subject,
    text,
    html,
    ...(replyTo && { "h:Reply-To": replyTo }),
  });
};

/** Upsert a member in a Mailgun mailing list (used as the newsletter provider). */
export const addToMailingList = async (
  listAddress: string,
  member: { email: string; name?: string; vars: Record<string, string> }
) => {
  await mg().lists.members.createMember(listAddress, {
    address: member.email,
    name: member.name,
    subscribed: "yes",
    upsert: "yes",
    vars: JSON.stringify(member.vars),
  });
};
