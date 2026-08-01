import FormField from "../FormField";
import PasswordField from "@/components/PasswordField";

export default function UserForm({
  action,
  roles,
  defaultValues,
  submitLabel,
  showPassword,
  canAssignRoles,
}: {
  action: (formData: FormData) => void;
  roles: { id: string; name: string }[];
  defaultValues?: {
    name?: string;
    email?: string;
    roleIds?: string[];
    isActive?: boolean;
  };
  submitLabel: string;
  showPassword?: boolean;
  canAssignRoles: boolean;
}) {
  const v = defaultValues || {};
  const selected = new Set(v.roleIds || []);
  const active = v.isActive !== false;

  return (
    <form
      action={action}
      className="space-y-5 bg-white border border-[color:var(--line)] rounded-lg p-8 max-w-[640px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full name" name="name" defaultValue={v.name} required />
        <FormField label="Email" name="email" type="email" defaultValue={v.email} required />
      </div>

      {showPassword && <PasswordField label="Temporary password" name="password" />}

      <div>
        <p className="font-sans text-[0.82rem] font-semibold text-ink-soft mb-2">Roles</p>
        {roles.length === 0 ? (
          <p className="font-sans text-[0.84rem] text-ink-soft">
            No roles exist yet. Create roles first.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {roles.map((r) => (
              <label
                key={r.id}
                className={`flex items-center gap-2 font-sans text-[0.86rem] ${
                  canAssignRoles ? "text-ink-soft" : "text-ink-soft/60"
                }`}
              >
                <input
                  type="checkbox"
                  name="roles"
                  value={r.id}
                  defaultChecked={selected.has(r.id)}
                  disabled={!canAssignRoles}
                  className="w-4 h-4 accent-wine"
                />
                {r.name}
              </label>
            ))}
          </div>
        )}
        {!canAssignRoles && (
          <p className="font-sans text-[0.76rem] text-ink-soft mt-1.5">
            You do not have permission to change role assignments.
          </p>
        )}
      </div>

      <label className="flex items-center gap-2.5 font-sans text-[0.86rem] text-ink-soft">
        <input type="checkbox" name="isActive" defaultChecked={active} className="w-4 h-4 accent-wine" />
        Account is active (can sign in)
      </label>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
