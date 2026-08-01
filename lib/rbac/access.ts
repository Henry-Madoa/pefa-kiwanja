import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import AdminUserModel from "@/models/AdminUser";
import AuditLogModel from "@/models/AuditLog";
import { resolvePermissions } from "./resolve";
import { hasPermission } from "./permissions";

export class ForbiddenError extends Error {
  constructor(permission?: string) {
    super(permission ? `Forbidden: missing permission "${permission}"` : "Forbidden");
    this.name = "ForbiddenError";
  }
}

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  permissions: string[];
};

// Loads the signed-in user fresh from the database and resolves their effective
// permissions on every call, so role changes and deactivation take effect
// immediately (the JWT is not trusted for fine-grained checks).
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getServerSession(authOptions);
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) return null;

  await dbConnect();
  const user = await AdminUserModel.findById(id).lean<{
    _id: unknown;
    name: string;
    email: string;
    role?: string;
    roles?: unknown[];
    isActive?: boolean;
  } | null>();
  if (!user || user.isActive === false) return null;

  const permissions = await resolvePermissions(user);
  return { id: String(user._id), name: user.name, email: user.email, permissions };
}

/** Returns the current user's permissions, or [] when signed out. */
export async function getPermissions(): Promise<string[]> {
  return (await getCurrentUser())?.permissions ?? [];
}

export async function can(permission: string): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user && hasPermission(user.permissions, permission);
}

// Guard for server actions / route handlers. Throws ForbiddenError when the
// signed-in user lacks the permission. Returns the user so callers can audit.
export async function requirePermission(permission: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || !hasPermission(user.permissions, permission)) {
    throw new ForbiddenError(permission);
  }
  return user;
}

// Records a sensitive action in the audit log. Never throws (best-effort).
export async function writeAudit(
  actor: CurrentUser,
  action: string,
  target = "",
  detail = ""
): Promise<void> {
  try {
    await dbConnect();
    await AuditLogModel.create({
      actorId: actor.id,
      actorName: actor.name,
      actorEmail: actor.email,
      action,
      target,
      detail,
    });
  } catch {
    // Auditing must never block the primary action.
  }
}
