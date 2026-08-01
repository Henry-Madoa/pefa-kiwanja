import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import RoleModel from "@/models/Role";
import { can, getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import UserForm from "../UserForm";
import { createUser } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewUserPage() {
  const me = await getCurrentUser();
  if (!me || !(await can("User.Create"))) redirect("/admin/users");

  await dbConnect();
  const roles = await RoleModel.find().select("name").sort({ name: 1 }).lean<{ _id: unknown; name: string }[]>();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New User</h1>
      <UserForm
        action={createUser}
        roles={roles.map((r) => ({ id: String(r._id), name: r.name }))}
        submitLabel="Create User"
        showPassword
        canAssignRoles={hasPermission(me.permissions, "User.AssignRole")}
      />
    </div>
  );
}
