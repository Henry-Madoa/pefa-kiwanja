import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import RoleModel from "@/models/Role";
import AdminUserModel from "@/models/AdminUser";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteRole } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminRolesPage() {
  const user = await getCurrentUser();
  const perms = user?.permissions ?? [];
  const canCreate = hasPermission(perms, "Role.Create");
  const canEdit = hasPermission(perms, "Role.Edit");
  const canDelete = hasPermission(perms, "Role.Delete");

  await dbConnect();
  const roles = await RoleModel.find().sort({ isSystem: -1, name: 1 }).lean();
  const users = await AdminUserModel.find().select("roles").lean<{ roles?: unknown[] }[]>();
  const usageByRole = new Map<string, number>();
  for (const u of users) for (const rid of u.roles ?? []) {
    const k = String(rid);
    usageByRole.set(k, (usageByRole.get(k) ?? 0) + 1);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Roles</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{roles.length} total</p>
        </div>
        {canCreate && (
          <Link href="/admin/roles/new" className="btn btn-primary">
            + New Role
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Permissions</th>
              <th className="px-5 py-3">Users</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => {
              const isWildcard = (r.permissions ?? []).includes("*");
              const count = usageByRole.get(String(r._id)) ?? 0;
              return (
                <tr key={String(r._id)} className="border-b border-[color:var(--line)] last:border-0">
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink flex items-center gap-2">
                      {r.name}
                      {r.isSystem && (
                        <span className="text-[0.66rem] font-semibold uppercase tracking-wide text-gold-bright bg-gold/15 px-2 py-0.5 rounded-full">
                          System
                        </span>
                      )}
                    </div>
                    {r.description && (
                      <p className="text-ink-soft text-[0.8rem] mt-0.5">{r.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">
                    {isWildcard ? "All (full access)" : `${(r.permissions ?? []).length} permissions`}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{count}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {canEdit && (
                      <Link href={`/admin/roles/${r._id}/edit`} className="text-wine hover:underline mr-4">
                        Edit
                      </Link>
                    )}
                    {canDelete && !r.isSystem && (
                      <form action={deleteRole.bind(null, String(r._id))} className="inline">
                        <button type="submit" className="text-ink-soft hover:text-wine hover:underline">
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
            {roles.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-soft">
                  No roles yet. Run <code>npm run seed:rbac</code> to create the defaults.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
