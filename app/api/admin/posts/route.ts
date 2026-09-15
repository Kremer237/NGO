import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { hasPermission } from "@/lib/auth";
import { createStory, type StoryInput } from "@/lib/stories-repo";
import { logAdminAction } from "@/lib/audit-log";

// Matches exactly what StoryForm.tsx marks as `required` on the client —
// summary is deliberately not required (an editor can add one later; the
// server used to require it while the form didn't, which produced a
// confusing generic 400 with no indication which field was missing).
const REQUIRED_FIELDS = ["slug_en", "slug_fr", "title_en", "title_fr", "category", "body_en", "body_fr"] as const;

function extractInput(body: Record<string, unknown>): StoryInput | null {
  for (const key of REQUIRED_FIELDS) {
    if (typeof body[key] !== "string" || !(body[key] as string).trim()) return null;
  }
  return {
    slug_en: body.slug_en as string,
    slug_fr: body.slug_fr as string,
    title_en: body.title_en as string,
    title_fr: body.title_fr as string,
    category: body.category as StoryInput["category"],
    featured_image: typeof body.featured_image === "string" ? body.featured_image : null,
    summary_en: typeof body.summary_en === "string" ? body.summary_en : "",
    summary_fr: typeof body.summary_fr === "string" ? body.summary_fr : "",
    body_en: body.body_en as string,
    body_fr: body.body_fr as string,
    related_project: typeof body.related_project === "string" && body.related_project ? body.related_project : null,
  };
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });
  if (!hasPermission(session.role, "manageStories")) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input = extractInput(body);
  if (!input) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const story = await createStory(input, session.sub);

  await logAdminAction({ adminUserId: session.sub, action: "create", resource: "stories", resourceId: story.id });

  return NextResponse.json({ ok: true, story });
}
