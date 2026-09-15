import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export interface UploadResult {
  url: string;
}

export interface StorageAdapter {
  upload(buffer: Buffer, originalFilename: string, contentType: string): Promise<UploadResult>;
}

function safeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
  return allowed.includes(ext) ? ext : "";
}

// Writes into public/uploads/, served by Next's static file handling at
// /uploads/<file>. Only viable for local dev or a persistent Node server —
// on Vercel (and most serverless hosts) the filesystem is read-only /
// ephemeral at runtime, so this silently fails to persist across
// deployments and instances. Tested and confirmed working in this repo's
// local dev environment; do not rely on it in production.
class LocalDiskAdapter implements StorageAdapter {
  async upload(buffer: Buffer, originalFilename: string, _contentType: string): Promise<UploadResult> {
    void _contentType;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const filename = `${randomUUID()}${safeExtension(originalFilename)}`;
    await writeFile(path.join(dir, filename), buffer);
    return { url: `/uploads/${filename}` };
  }
}

// Written against the real @vercel/blob SDK but not runnable in this
// session — it needs a BLOB_READ_WRITE_TOKEN from a Vercel project with
// Blob storage enabled, which requires the org's own Vercel account.
// Activate by setting BLOB_READ_WRITE_TOKEN; getStorageAdapter() below
// picks this automatically once that's set.
class VercelBlobAdapter implements StorageAdapter {
  async upload(buffer: Buffer, originalFilename: string, contentType: string): Promise<UploadResult> {
    const { put } = await import("@vercel/blob");
    const filename = `${randomUUID()}${safeExtension(originalFilename)}`;
    const blob = await put(filename, buffer, { access: "public", contentType });
    return { url: blob.url };
  }
}

export function getStorageAdapter(): StorageAdapter {
  if (process.env.BLOB_READ_WRITE_TOKEN) return new VercelBlobAdapter();
  return new LocalDiskAdapter();
}
