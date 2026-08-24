import { NextResponse } from "next/server";
import { isValidEmail, requireString, requireTrue, type FieldErrors } from "@/lib/validation";

// See app/api/contact/route.ts for the same disclaimer: validates the
// application shape (spec section 48/79) but does not yet forward it
// anywhere, since no email provider or applicant-tracking destination is
// configured.
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

  // TODO(email-provider / ATS): forward the application once a destination is configured.

  return NextResponse.json({ ok: true });
}
