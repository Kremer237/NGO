"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminRole } from "@/lib/auth";

const ROLES: { value: AdminRole; label: string }[] = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "content_editor", label: "Content Editor" },
  { value: "finance", label: "Finance" },
  { value: "marketing", label: "Marketing" },
];

export default function CreateUserForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<AdminRole>("content_editor");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role, password }),
      });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        setError(
          body.error === "email_taken"
            ? "That email is already registered."
            : body.error === "invalid_input"
              ? "Check the fields — password needs at least 12 characters."
              : "Something went wrong."
        );
        setSubmitting(false);
        return;
      }
      setEmail("");
      setName("");
      setPassword("");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setSubmitting(false);
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-border bg-surface p-6">
      <h2 className="font-heading text-lg font-semibold text-forest">Add personnel account</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="new-user-name">
            Name
          </label>
          <input
            id="new-user-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="new-user-email">
            Email
          </label>
          <input
            id="new-user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="new-user-role">
            Role
          </label>
          <select
            id="new-user-role"
            value={role}
            onChange={(e) => setRole(e.target.value as AdminRole)}
            className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
          >
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal" htmlFor="new-user-password">
            Temporary password
          </label>
          <input
            id="new-user-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={12}
            className="mt-2 w-full rounded-button border border-border px-4 py-3 text-sm"
          />
          <p className="mt-1 text-xs text-slate">At least 12 characters. Share it with them out of band.</p>
        </div>
      </div>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-button bg-forest px-5 py-3 text-sm font-medium text-ivory disabled:opacity-60"
        >
          {submitting ? "Creating..." : "Create account"}
        </button>
      </div>
    </form>
  );
}
