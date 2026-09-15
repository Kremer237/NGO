import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { hasPermission } from "@/lib/auth";
import { getStorageAdapter } from "@/lib/storage";
import { logAdminAction } from "@/lib/audit-log";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });
  if (!hasPermission(session.role, "manageStories")) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ ok: false, error: "unsupported_type" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const adapter = getStorageAdapter();
  const { url } = await adapter.upload(buffer, file.name, file.type);

  await logAdminAction({ adminUserId: session.sub, action: "upload", resource: "media", metadata: { url } });

  return NextResponse.json({ ok: true, url });
}
