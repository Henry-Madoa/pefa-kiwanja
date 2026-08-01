"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import RoleModel from "@/models/Role";
import AdminUserModel from "@/models/AdminUser";
import { requirePermission, writeAudit } from "@/lib/rbac/access";
import { ALL_PERMISSIONS } from "@/lib/rbac/permissions";

function readPermissions(formData: FormData): string[] {
  const selected = formData.getAll("permissions").map(String);
  // Only accept known permission keys.
  return ALL_PERMISSIONS.filter((p) => selected.includes(p));
}

export async function createRole(formData: FormData) {
  const actor = await requirePermission("Role.Create");
  await dbConnect();
  const name = String(formData.get("name") || "").trim();
  const role = await RoleModel.create({
    name,
    description: String(formData.get("description") || "").trim(),
    permissions: readPermissions(formData),
    isSystem: false,
  });
  await writeAudit(actor, "Role.Create", name, `${role.permissions.length} permissions`);
  revalidatePath("/admin/roles");
  redirect("/admin/roles");
}

export async function updateRole(id: string, formData: FormData) {
  const actor = await requirePermission("Role.Edit");
  await dbConnect();
  const role = await RoleModel.findById(id);
  if (!role) redirect("/admin/roles");

  // Never strip the Super Administrator's wildcard; never rename system roles.
  if (!role.permissions.includes("*")) {
    role.permissions = readPermissions(formData);
  }
  if (!role.isSystem) {
    role.name = String(formData.get("name") || role.name).trim();
  }
  role.description = String(formData.get("description") || "").trim();
  await role.save();

  await writeAudit(actor, "Role.Edit", role.name, `${role.permissions.length} permissions`);
  revalidatePath("/admin/roles");
  redirect("/admin/roles");
}

export async function deleteRole(id: string) {
  const actor = await requirePermission("Role.Delete");
  await dbConnect();
  const role = await RoleModel.findById(id);
  if (!role) return;
  if (role.isSystem) {
    throw new Error("System roles cannot be deleted.");
  }
  const inUse = await AdminUserModel.countDocuments({ roles: role._id });
  if (inUse > 0) {
    throw new Error(`Cannot delete "${role.name}": it is assigned to ${inUse} user(s).`);
  }
  await role.deleteOne();
  await writeAudit(actor, "Role.Delete", role.name);
  revalidatePath("/admin/roles");
}
