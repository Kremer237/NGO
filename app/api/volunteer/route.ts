import { NextResponse } from "next/server";
import { isValidEmail, requireString, requireTrue, type FieldErrors } from "@/lib/validation";
import { escapeHtml, sendNotificationEmail } from "@/lib/email";

// See app/api/contact/route.ts: validates the application shape (spec
// section 48/79), then emails it. No applicant-tracking system destination
// is configured yet (see ARCHITECTURE.md) — email is the only channel.
const OPTIONAL_FIELDS = [
  "phone",
  "city",
  "volunteerType",
  "profession",
  "location",
  "language",
  "skills",
  "availability",
  "motivation",
] as const;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "invalid_json" } }, { status: 400 });
  }

  const errors: FieldErrors = {};
  requireString(body.firstName, "firstName", errors);
  requireString(body.lastName, "lastName", errors);
  requireString(body.country, "country", errors);
  requireTrue(body.ageConfirm, "ageConfirm", errors);
  requireTrue(body.consent, "consent", errors);
  if (!isValidEmail(body.email)) errors.email = "invalid_email";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const firstName = String(body.firstName);
  const lastName = String(body.lastName);
  const email = String(body.email);
  const country = String(body.country);

  const presentOptional = OPTIONAL_FIELDS.filter((key) => body[key]);
  const optionalRowsHtml = presentOptional.map(
    (key) => `<p><strong>${key}:</strong> ${escapeHtml(String(body[key]))}</p>`
  );
  const optionalRowsText = presentOptional.map((key) => `${key}: ${String(body[key])}`);

  const sent = await sendNotificationEmail({
    subject: `New volunteer application from ${firstName} ${lastName}`,
    replyTo: email,
    html: `
      <h2>New volunteer application</h2>
      <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Country:</strong> ${escapeHtml(country)}</p>
      ${optionalRowsHtml.join("\n")}
    `,
    text: [
      "New volunteer application",
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Country: ${country}`,
      ...optionalRowsText,
    ].join("\n"),
  });

  if (!sent) {
    return NextResponse.json({ ok: false, errors: { form: "send_failed" } }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
