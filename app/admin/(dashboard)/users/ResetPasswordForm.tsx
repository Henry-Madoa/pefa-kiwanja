import PasswordField from "@/components/PasswordField";

export default function ResetPasswordForm({
  action,
  identity,
}: {
  action: (formData: FormData) => void;
  identity: { name?: string; email?: string };
}) {
  return (
    <form
      action={action}
      className="space-y-4 bg-white border border-[color:var(--line)] rounded-lg p-6 max-w-[640px]"
    >
      <PasswordField label="New password" name="password" identity={identity} />
      <button type="submit" className="btn btn-outline">
        Reset Password
      </button>
    </form>
  );
}
