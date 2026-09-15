import Link from "next/link";
import { getSession } from "@/lib/session";
import { hasPermission } from "@/lib/auth";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const session = await getSession();
  const { denied } = await searchParams;

  return (
    <div>
      {denied && (
        <div className="mb-6 border border-ochre bg-ochre/10 p-4 text-sm text-charcoal">
          You don&apos;t have access to that page.
        </div>
      )}
      <h1 className="font-heading text-2xl font-semibold text-forest">Dashboard</h1>
      <p className="mt-2 text-sm text-slate">Signed in as {session?.name}.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {session && hasPermission(session.role, "manageStories") && (
          <Link href="/admin/posts" className="border border-border bg-surface p-6 hover:border-forest">
            <p className="font-heading text-lg font-semibold text-forest">Posts</p>
            <p className="mt-1 text-sm text-slate">Write, edit, and publish Stories to the public site.</p>
          </Link>
        )}
        {session && hasPermission(session.role, "manageUsers") && (
          <Link href="/admin/users" className="border border-border bg-surface p-6 hover:border-forest">
            <p className="font-heading text-lg font-semibold text-forest">Users</p>
            <p className="mt-1 text-sm text-slate">Create and manage personnel accounts and roles.</p>
          </Link>
        )}
      </div>
    </div>
  );
}
