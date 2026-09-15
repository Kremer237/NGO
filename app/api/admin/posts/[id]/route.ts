import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { hasPermission } from "@/lib/auth";
import { updateStory, deleteStory, setStoryStatus, type StoryInput, type StoryStatus } from "@/lib/stories-repo";
import { logAdminAction } from "@/lib/audit-log";

async function authorize() {
  const session = await getSession();
  if (!session) return { error: NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 }) };
  if (!hasPermission(session.role, "manageStories")) {
    return { error: NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 }) };
  }
  return { session };
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize();
  if (auth.error) return auth.error;
  const { id } = await params;

  let body: Partial<StoryInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const required = ["slug_en", "slug_fr", "title_en", "title_fr", "category", "body_en", "body_fr"] as const;
  for (const key of required) {
    if (typeof body[key] !== "string" || !(body[key] as string).trim()) {
      return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
    }
  }

  const story = await updateStory(id, {
    slug_en: body.slug_en!,
    slug_fr: body.slug_fr!,
    title_en: body.title_en!,
    title_fr: body.title_fr!,
    category: body.category!,
    featured_image: body.featured_image ?? null,
    summary_en: body.summary_en ?? "",
    summary_fr: body.summary_fr ?? "",
    body_en: body.body_en!,
    body_fr: body.body_fr!,
    related_project: body.related_project ?? null,
  });

  if (!story) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  await logAdminAction({ adminUserId: auth.session!.sub, action: "update", resource: "stories", resourceId: id });
  return NextResponse.json({ ok: true, story });
}

const VALID_STATUSES: StoryStatus[] = ["draft", "review", "approved", "published", "archived"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize();
  if (auth.error) return auth.error;
  const { id } = await params;

  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (typeof body.status !== "string" || !VALID_STATUSES.includes(body.status as StoryStatus)) {
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });
  }

  const story = await setStoryStatus(id, body.status as StoryStatus);
  if (!story) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });

  await logAdminAction({
    adminUserId: auth.session!.sub,
    action: `status:${body.status}`,
    resource: "stories",
    resourceId: id,
  });
  return NextResponse.json({ ok: true, story });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize();
  if (auth.error) return auth.error;
  const { id } = await params;

  await deleteStory(id);
  await logAdminAction({ adminUserId: auth.session!.sub, action: "delete", resource: "stories", resourceId: id });
  return NextResponse.json({ ok: true });
}
