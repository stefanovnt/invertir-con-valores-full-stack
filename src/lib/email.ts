import "server-only";
import { Resend } from "resend";
import { config } from "@/config";

// Transactional email with Resend (https://resend.com).
// - RESEND_API_KEY + EMAIL_FROM (an address on a domain verified in Resend) enable sending.
// - The client is created lazily, so the site works without Resend configured.
// - The SDK returns { data, error } instead of throwing: errors are re-thrown
//   here so callers can rely on try/catch.

export const isEmailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && config.email.from);

let client: Resend | null = null;
const resend = () => (client ??= new Resend(process.env.RESEND_API_KEY));

export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}) {
  const { error } = await resend().emails.send({
    from: config.email.from,
    to,
    subject,
    html,
    ...(text ? { text } : {}),
    ...(replyTo ? { replyTo } : {}),
  });
  if (error) throw new Error(`[resend] ${error.name}: ${error.message}`);
}

/**
 * Save a lead as a Resend contact, optionally inside a segment (Resend's
 * audiences). Re-submitting an existing email is not treated as an error.
 */
export async function addContact({
  email,
  firstName,
  segmentId,
}: {
  email: string;
  firstName?: string;
  segmentId?: string;
}) {
  const { error } = await resend().contacts.create({
    email,
    unsubscribed: false,
    ...(firstName ? { firstName } : {}),
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });
  if (error && !/already exists/i.test(error.message)) {
    throw new Error(`[resend] ${error.name}: ${error.message}`);
  }
}
