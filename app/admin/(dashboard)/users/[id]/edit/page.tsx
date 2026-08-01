import { notFound, redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import AdminUserModel from "@/models/AdminUser";
import RoleModel from "@/models/Role";
import { can, getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import UserForm from "../../UserForm";
import ResetPasswordForm from "../../ResetPasswordForm";
import { updateUser, resetPassword } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const me = await getCurrentUser();
  if (!me || !(await can("User.Edit"))) redirect("/admin/users");

  await dbConnect();
  const [user, roles] = await Promise.all([
    AdminUserModel.findById(params.id).lean<{
      name: string;
      email: string;
      roles?: unknown[];
      isActive?: boolean;
    } | null>(),
    RoleModel.find().select("name").sort({ name: 1 }).lean<{ _id: unknown; name: string }[]>(),
  ]);
  if (!user) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit User</h1>
        <UserForm
          action={updateUser.bind(null, params.id)}
          roles={roles.map((r) => ({ id: String(r._id), name: r.name }))}
          defaultValues={{
            name: user.name,
            email: user.email,
            roleIds: (user.roles ?? []).map((r) => String(r)),
            isActive: user.isActive,
          }}
          submitLabel="Save Changes"
          canAssignRoles={hasPermission(me.permissions, "User.AssignRole")}
        />
      </div>

      {hasPermission(me.permissions, "User.ResetPassword") && (
        <div>
          <h2 className="font-display text-[1.2rem] font-semibold text-ink mb-4">Reset password</h2>
          <ResetPasswordForm
            action={resetPassword.bind(null, params.id)}
            identity={{ name: user.name, email: user.email }}
          />
        </div>
      )}
    </div>
  );
}
