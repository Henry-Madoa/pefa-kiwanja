"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import AdminUserModel from "@/models/AdminUser";
import RoleModel from "@/models/Role";
import { requirePermission, writeAudit, type CurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { assertValidPassword } from "@/lib/password";

// Ids of roles that grant the wildcard (Super Administrator).
async function superAdminRoleIds(): Promise<Set<string>> {
  const roles = await RoleModel.find({ permissions: "*" }).select("_id").lean<{ _id: unknown }[]>();
  return new Set(roles.map((r) => String(r._id)));
}

function userIsSuper(roles: unknown[] | undefined, superIds: Set<string>): boolean {
  return (roles ?? []).some((r) => superIds.has(String(r)));
}

async function countActiveSuperAdmins(superIds: Set<string>): Promise<number> {
  if (superIds.size === 0) return 0;
  return AdminUserModel.countDocuments({
    isActive: { $ne: false },
    roles: { $in: [...superIds] },
  });
}

function readRoleIds(formData: FormData): string[] {
  return formData
    .getAll("roles")
    .map(String)
    .filter((v) => /^[a-f\d]{24}$/i.test(v));
}

// Prevents privilege escalation: a non-super actor may not grant a super-admin role.
function guardRoleAssignment(actor: CurrentUser, roleIds: string[], superIds: Set<string>) {
  const actorIsSuper = actor.permissions.includes("*");
  if (!actorIsSuper && roleIds.some((r) => superIds.has(r))) {
    throw new Error("Only a Super Administrator can grant the Super Administrator role.");
  }
}

export async function createUser(formData: FormData) {
  const actor = await requirePermission("User.Create");
  await dbConnect();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");
  assertValidPassword(password, { name, email });

  const existing = await AdminUserModel.findOne({ email });
  if (existing) throw new Error("A user with that email already exists.");

  const superIds = await superAdminRoleIds();
  let roleIds = readRoleIds(formData);
  // Assigning roles is a separate permission.
  if (roleIds.length && !hasPermission(actor.permissions, "User.AssignRole")) roleIds = [];
  guardRoleAssignment(actor, roleIds, superIds);

  await AdminUserModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
    roles: roleIds,
    isActive: formData.get("isActive") === "on",
    role: "member",
  });

  await writeAudit(actor, "User.Create", email, `${roleIds.length} role(s)`);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  const actor = await requirePermission("User.Edit");
  await dbConnect();

  const user = await AdminUserModel.findById(id);
  if (!user) redirect("/admin/users");

  const superIds = await superAdminRoleIds();
  const wasSuper = userIsSuper(user.roles as unknown[], superIds);

  user.name = String(formData.get("name") || user.name).trim();
  user.email = String(formData.get("email") || user.email).toLowerCase().trim();

  // Role assignment (guarded).
  if (hasPermission(actor.permissions, "User.AssignRole")) {
    const roleIds = readRoleIds(formData);
    guardRoleAssignment(actor, roleIds, superIds);
    user.roles = roleIds as unknown as typeof user.roles;
  }

  // Activation. Deactivating the last active Super Administrator is blocked.
  const nextActive = formData.get("isActive") === "on";
  if (!nextActive && wasSuper) {
    const activeSupers = await countActiveSuperAdmins(superIds);
    if (activeSupers <= 1) {
      throw new Error("Cannot deactivate the last active Super Administrator.");
    }
  }
  user.isActive = nextActive;

  await user.save();
  await writeAudit(actor, "User.Edit", user.email);
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function resetPassword(id: string, formData: FormData) {
  const actor = await requirePermission("User.ResetPassword");
  await dbConnect();
  const password = String(formData.get("password") || "");
  const user = await AdminUserModel.findById(id);
  if (!user) redirect("/admin/users");
  assertValidPassword(password, { name: user.name, email: user.email });
  user.passwordHash = await bcrypt.hash(password, 10);
  await user.save();
  await writeAudit(actor, "User.ResetPassword", user.email);
  revalidatePath("/admin/users");
  redirect(`/admin/users/${id}/edit`);
}

export async function deleteUser(id: string) {
  const actor = await requirePermission("User.Delete");
  await dbConnect();
  const user = await AdminUserModel.findById(id);
  if (!user) return;

  if (String(user._id) === actor.id) {
    throw new Error("You cannot delete your own account.");
  }

  const superIds = await superAdminRoleIds();
  const targetIsSuper = userIsSuper(user.roles as unknown[], superIds);
  if (targetIsSuper) {
    if (!actor.permissions.includes("*")) {
      throw new Error("Only a Super Administrator can delete a Super Administrator.");
    }
    const activeSupers = await countActiveSuperAdmins(superIds);
    if (user.isActive !== false && activeSupers <= 1) {
      throw new Error("Cannot delete the last active Super Administrator.");
    }
  }

  await user.deleteOne();
  await writeAudit(actor, "User.Delete", user.email);
  revalidatePath("/admin/users");
}
