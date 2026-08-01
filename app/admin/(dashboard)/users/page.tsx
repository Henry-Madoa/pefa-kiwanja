import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import AdminUserModel from "@/models/AdminUser";
import RoleModel from "@/models/Role";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const me = await getCurrentUser();
  const perms = me?.permissions ?? [];
  const canCreate = hasPermission(perms, "User.Create");
  const canEdit = hasPermission(perms, "User.Edit");
  const canDelete = hasPermission(perms, "User.Delete");

  await dbConnect();
  const [users, roles] = await Promise.all([
    AdminUserModel.find().sort({ createdAt: 1 }).lean<
      { _id: unknown; name: string; email: string; roles?: unknown[]; isActive?: boolean; lastLoginAt?: Date }[]
    >(),
    RoleModel.find().select("name").lean<{ _id: unknown; name: string }[]>(),
  ]);
  const roleName = new Map(roles.map((r) => [String(r._id), r.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Users</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{users.length} total</p>
        </div>
        {canCreate && (
          <Link href="/admin/users/new" className="btn btn-primary">
            + New User
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[720px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Roles</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const names = (u.roles ?? []).map((r) => roleName.get(String(r))).filter(Boolean);
              const active = u.isActive !== false;
              return (
                <tr key={String(u._id)} className="border-b border-[color:var(--line)] last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{u.name}</td>
                  <td className="px-5 py-3 text-ink-soft">{u.email}</td>
                  <td className="px-5 py-3 text-ink-soft">
                    {names.length ? names.join(", ") : <span className="text-ink-soft/60">—</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[0.72rem] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        active ? "text-forest bg-forest/10" : "text-wine bg-wine/10"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {canEdit && (
                      <Link href={`/admin/users/${u._id}/edit`} className="text-wine hover:underline mr-4">
                        Edit
                      </Link>
                    )}
                    {canDelete && String(u._id) !== me?.id && (
                      <form action={deleteUser.bind(null, String(u._id))} className="inline">
                        <button type="submit" className="text-ink-soft hover:text-wine hover:underline">
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
