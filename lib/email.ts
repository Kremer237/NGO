import { Resend } from "resend";

// Spec section 78/41: form submissions notify the organization by email.
// EMAIL_FROM_ADDRESS defaults to Resend's shared testing address until a
// domain is verified in the Resend dashboard (see .env.example).
// EMAIL_TO_ADDRESS is the inbox that actually receives them.
//
// A display name on the From address and a plain-text alternative
// alongside the HTML body are both meaningful spam-score factors —
// HTML-only mail from a bare address is a common reason a message is
// accepted by the provider (no error) but still never reaches the inbox.
const FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS || "onboarding@resend.dev";
const FROM_NAME = "No African Child Left Behind";
const TO_ADDRESS = process.env.EMAIL_TO_ADDRESS || "noafricanchildleftbehind@outlook.com";

export async function sendNotificationEmail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  if (!apiKey) {
    console.error("EMAIL_PROVIDER_API_KEY is not set; notification email not sent.");
    return false;
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `${FROM_NAME} <${FROM_ADDRESS}>`,
    to: TO_ADDRESS,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  if (error) {
    console.error("Failed to send notification email:", error);
    return false;
  }
  console.log(`Notification email sent (id: ${data?.id}) to ${TO_ADDRESS}: ${options.subject}`);
  return true;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
