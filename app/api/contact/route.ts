import { NextResponse } from "next/server";
import { isValidEmail, requireString, requireTrue, type FieldErrors } from "@/lib/validation";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

// Spec section 79: "Validation côté client + serveur." This route performs
// the server-side half, then emails the submission via EMAIL_PROVIDER_API_KEY
// (see .env.example / lib/email.ts).
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "invalid_json" } }, { status: 400 });
  }

  const errors: FieldErrors = {};
  requireString(body.name, "name", errors);
  requireString(body.message, "message", errors);
  requireTrue(body.consent, "consent", errors);
  if (!isValidEmail(body.email)) errors.email = "invalid_email";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const name = String(body.name);
  const email = String(body.email);
  const organization = body.organization ? String(body.organization) : "";
  const category = body.category ? String(body.category) : "";
  const message = String(body.message);

  const sent = await sendNotificationEmail({
    subject: `New contact form message from ${name}`,
    replyTo: email,
    html: `
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
      ${category ? `<p><strong>Subject:</strong> ${escapeHtml(category)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (!sent) {
    return NextResponse.json({ ok: false, errors: { form: "send_failed" } }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
