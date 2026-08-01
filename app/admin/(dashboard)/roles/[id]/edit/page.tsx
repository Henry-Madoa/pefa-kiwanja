import { notFound, redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import RoleModel from "@/models/Role";
import { can } from "@/lib/rbac/access";
import RoleForm from "../../RoleForm";
import { updateRole } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditRolePage({ params }: { params: { id: string } }) {
  if (!(await can("Role.Edit"))) redirect("/admin/roles");

  await dbConnect();
  const role = await RoleModel.findById(params.id).lean<{
    name: string;
    description?: string;
    permissions?: string[];
    isSystem?: boolean;
  } | null>();
  if (!role) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Role</h1>
      <RoleForm
        action={updateRole.bind(null, params.id)}
        defaultValues={{
          name: role.name,
          description: role.description,
          permissions: role.permissions,
          isSystem: role.isSystem,
        }}
        submitLabel="Save Changes"
      />
    </div>
  );
}
