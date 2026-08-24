import { NextResponse } from "next/server";
import { isValidEmail, requireString, requireTrue, type FieldErrors } from "@/lib/validation";

// Spec section 79: "Validation côté client + serveur." This route performs
// the server-side half. It intentionally does not persist or send the
// message anywhere yet — no email provider is configured (see
// .env.example / ARCHITECTURE.md). Wiring EMAIL_PROVIDER_API_KEY here is
// the one change needed once that account exists; until then this endpoint
// only confirms the submission is well-formed.
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

  // TODO(email-provider): send via Resend/Postmark/SES once EMAIL_PROVIDER_API_KEY is set.

  return NextResponse.json({ ok: true });
}
