import { dbConnect } from "@/lib/mongodb";
import RoleModel from "@/models/Role";
import { WILDCARD } from "./permissions";

type UserLike = {
  role?: string | null;
  roles?: unknown[] | null;
};

// Resolves a user's effective permissions = union of all their roles'
// permissions. Legacy fallback: a user with role "admin" and no assigned roles
// is treated as Super Administrator (wildcard) so existing accounts keep working.
export async function resolvePermissions(user: UserLike): Promise<string[]> {
  const roleIds = (user.roles ?? []) as unknown[];
  if (roleIds.length === 0) {
    return user.role === "admin" ? [WILDCARD] : [];
  }
  await dbConnect();
  const roles = await RoleModel.find({ _id: { $in: roleIds } })
    .select("permissions")
    .lean<{ permissions: string[] }[]>();
  const set = new Set<string>();
  for (const r of roles) for (const p of r.permissions ?? []) set.add(p);
  return [...set];
}

/** Whether a permission set grants access to the admin portal at all. */
export function canAccessAdmin(permissions: string[]): boolean {
  return permissions.length > 0;
}
