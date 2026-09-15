import { listAdminUsers } from "@/lib/admin-users-repo";
import CreateUserForm from "@/components/admin/CreateUserForm";

export default async function UsersPage() {
  const users = await listAdminUsers();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-forest">Users</h1>

      <table className="mt-6 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-slate">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Last login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border">
              <td className="py-3">{user.name}</td>
              <td className="py-3 text-slate">{user.email}</td>
              <td className="py-3 text-slate">{user.role}</td>
              <td className="py-3 text-slate">
                {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "Never"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 max-w-xl">
        <CreateUserForm />
      </div>
    </div>
  );
}
