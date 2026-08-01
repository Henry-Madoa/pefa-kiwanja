import { redirect } from "next/navigation";
import { can } from "@/lib/rbac/access";
import RoleForm from "../RoleForm";
import { createRole } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewRolePage() {
  if (!(await can("Role.Create"))) redirect("/admin/roles");
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Role</h1>
      <RoleForm action={createRole} submitLabel="Create Role" />
    </div>
  );
}
