import MinistryForm from "../MinistryForm";
import { createMinistry } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewMinistryPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Ministry</h1>
      <MinistryForm action={createMinistry} submitLabel="Create Ministry" canSubmit={await can("Ministry.Manage")} />
    </div>
  );
}
