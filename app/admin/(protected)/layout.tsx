import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";

// proxy.ts already redirects unauthenticated requests to /admin/login before
// this layout renders — this check is defense in depth (e.g. a direct RSC
// navigation that skips the edge middleware), not the primary guard.
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <AdminNav session={session} />
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
