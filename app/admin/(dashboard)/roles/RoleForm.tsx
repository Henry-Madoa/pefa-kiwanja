import FormField from "../FormField";
import { PERMISSION_GROUPS } from "@/lib/rbac/permissions";

export default function RoleForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: {
    name?: string;
    description?: string;
    permissions?: string[];
    isSystem?: boolean;
  };
  submitLabel: string;
}) {
  const v = defaultValues || {};
  const selected = new Set(v.permissions || []);
  const isSuperAdmin = selected.has("*");

  return (
    <form
      action={action}
      className="space-y-6 bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[720px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Role name" name="name" defaultValue={v.name} required readOnly={v.isSystem} />
        <FormField label="Description" name="description" defaultValue={v.description} />
      </div>
      {v.isSystem && (
        <p className="font-sans text-[0.8rem] text-ink-soft -mt-2">
          This is a system role — its name is fixed.
        </p>
      )}

      {isSuperAdmin ? (
        <div className="bg-cream-dim border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.86rem] text-ink">
          <span className="font-semibold">Full access.</span> The Super Administrator holds
          every permission, including future ones. This cannot be edited.
        </div>
      ) : (
        <div>
          <p className="font-sans text-[0.82rem] font-semibold text-ink-soft mb-3">Permissions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {PERMISSION_GROUPS.map((group) => (
              <fieldset key={group.domain}>
                <legend className="font-sans text-[0.78rem] font-semibold text-ink mb-1.5">
                  {group.domain}
                </legend>
                <div className="space-y-1">
                  {group.permissions.map((p) => (
                    <label
                      key={p.key}
                      className="flex items-center gap-2 font-sans text-[0.84rem] text-ink-soft"
                    >
                      <input
                        type="checkbox"
                        name="permissions"
                        value={p.key}
                        defaultChecked={selected.has(p.key)}
                        className="w-4 h-4 accent-wine"
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
