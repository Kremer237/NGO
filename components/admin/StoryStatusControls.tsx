"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { StoryStatus } from "@/lib/stories-repo";

const NEXT_ACTIONS: Partial<Record<StoryStatus, { label: string; to: StoryStatus }[]>> = {
  draft: [{ label: "Submit for review", to: "review" }],
  review: [
    { label: "Approve", to: "approved" },
    { label: "Back to draft", to: "draft" },
  ],
  approved: [
    { label: "Publish", to: "published" },
    { label: "Back to review", to: "review" },
  ],
  published: [{ label: "Archive", to: "archived" }],
  archived: [{ label: "Restore to draft", to: "draft" }],
};

export default function StoryStatusControls({ id, status }: { id: string; status: StoryStatus }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(to: StoryStatus) {
    setBusy(true);
    await fetch(`/api/admin/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: to }),
    });
    router.refresh();
    setBusy(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this post permanently?")) return;
    setBusy(true);
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    router.push("/admin/posts");
    router.refresh();
  }

  const actions = NEXT_ACTIONS[status] ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate">Status: {status}</span>
        {actions.map((action) => (
          <button
            key={action.to}
            disabled={busy}
            onClick={() => setStatus(action.to)}
            className="rounded-button border border-forest px-4 py-2 text-sm text-forest disabled:opacity-60"
          >
            {action.label}
          </button>
        ))}
        <button disabled={busy} onClick={handleDelete} className="text-sm text-red-700 underline">
          Delete
        </button>
      </div>
      {status === "published" && (
        <p className="mt-2 text-xs text-slate">
          May take up to a minute to appear on the public site (it&apos;s cached briefly for performance).
        </p>
      )}
    </div>
  );
}
