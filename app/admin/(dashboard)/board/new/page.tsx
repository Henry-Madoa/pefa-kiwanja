import BoardForm from "../BoardForm";
import { createBoardMember } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewBoardMemberPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Board Member</h1>
      <BoardForm action={createBoardMember} submitLabel="Add Board Member" canSubmit={await can("Board.Manage")} />
    </div>
  );
}
