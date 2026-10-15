import crypto from "crypto";

import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/lib/mailgun";
import { config } from "@/config";

// Kept from ShipFree: Mailgun inbound webhook that forwards replies to
// config.mailgun.forwardRepliesTo (MAILGUN_FORWARD_REPLIES_TO).
export async function POST(req: NextRequest) {
  // Get your HTTP webhook signing key from Mailgun and set MAILGUN_SIGNING_KEY.
  const signingKey = process.env.MAILGUN_SIGNING_KEY;
  if (!signingKey) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 404 });
  }

  try {
    const formData = await req.formData();

    const timestamp = formData.get("timestamp")?.toString() ?? "";
    const token = formData.get("token")?.toString() ?? "";
    const signature = formData.get("signature")?.toString() ?? "";

    const hash = crypto.createHmac("sha256", signingKey).update(timestamp + token).digest("hex");
    const valid =
      signature.length === hash.length && crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature));
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // extract the sender, subject and email content
    const sender = formData.get("From");
    const subject = formData.get("Subject");
    const html = formData.get("body-html");

    // send email to the admin if forwardRepliesTo is set & emailData exists
    if (config.mailgun.forwardRepliesTo && html && subject && sender) {
      await sendEmail({
        to: config.mailgun.forwardRepliesTo,
        subject: `${config.appName} | ${subject}`,
        html: `<div><p><b>- Subject:</b> ${subject}</p><p><b>- From:</b> ${sender}</p><p><b>- Content:</b></p><div>${html}</div></div>`,
        replyTo: String(sender),
      });
    }

    return NextResponse.json({});
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
