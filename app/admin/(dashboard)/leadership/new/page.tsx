import LeaderForm from "../LeaderForm";
import { createLeader } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewLeaderPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Leader</h1>
      <LeaderForm action={createLeader} submitLabel="Add Leader" canSubmit={await can("Leadership.Manage")} />
    </div>
  );
}
