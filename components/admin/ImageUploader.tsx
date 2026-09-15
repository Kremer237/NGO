"use client";

import { useState } from "react";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setError(body.error === "file_too_large" ? "Image is too large (max 5MB)." : "Upload failed.");
        setUploading(false);
        return;
      }
      onChange(body.url);
    } catch {
      setError("Upload failed.");
    }
    setUploading(false);
  }

  return (
    <div>
      <label className="text-sm font-medium text-charcoal" htmlFor="featured-image">
        Featured image
      </label>
      <div className="mt-2 flex items-center gap-4">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element -- admin-only preview of an arbitrary uploaded URL, next/image's static optimization doesn't apply
          <img src={value} alt="" className="h-16 w-16 rounded object-cover" />
        )}
        <input
          id="featured-image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="text-sm"
        />
        {value && (
          <button type="button" onClick={() => onChange(null)} className="text-sm text-slate underline">
            Remove
          </button>
        )}
      </div>
      {uploading && <p className="mt-1 text-xs text-slate">Uploading...</p>}
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
