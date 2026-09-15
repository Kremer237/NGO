import Link from "next/link";
import type { SessionPayload } from "@/lib/auth";
import { hasPermission } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

const ROLE_LABELS: Record<SessionPayload["role"], string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  content_editor: "Content Editor",
  finance: "Finance",
  marketing: "Marketing",
};

export default function AdminNav({ session }: { session: SessionPayload }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <nav className="flex items-center gap-6">
          <Link href="/admin" className="font-heading text-sm font-semibold text-forest">
            NACLB Admin
          </Link>
          {hasPermission(session.role, "manageStories") && (
            <Link href="/admin/posts" className="text-sm text-charcoal hover:text-forest">
              Posts
            </Link>
          )}
          {hasPermission(session.role, "manageUsers") && (
            <Link href="/admin/users" className="text-sm text-charcoal hover:text-forest">
              Users
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate">
            {session.name} · {ROLE_LABELS[session.role]}
          </span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
