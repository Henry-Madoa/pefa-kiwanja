import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import BoardMemberModel from "@/models/BoardMember";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteBoardMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBoardPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canManage = hasPermission(perms, "Board.Manage");

  await dbConnect();
  const members = await BoardMemberModel.find().sort({ order: 1, name: 1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Church Board</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{members.length} total</p>
        </div>
        {canManage && (
          <Link href="/admin/board/new" className="btn btn-primary">
            + New Board Member
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Position</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={String(m._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 text-ink-soft">{m.order}</td>
                <td className="px-5 py-3 font-medium text-ink">
                  {m.title} {m.name}
                </td>
                <td className="px-5 py-3 text-ink-soft">{m.position}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/board/${m._id}/edit`}
                    className="text-wine hover:underline mr-4"
                  >
                    {canManage ? "Edit" : "View"}
                  </Link>
                  <form action={deleteBoardMember.bind(null, String(m._id))} className="inline">
                    <button
                      type="submit"
                      disabled={!canManage}
                      title={canManage ? undefined : "View-only access"}
                      className={
                        canManage
                          ? "text-ink-soft hover:text-wine hover:underline"
                          : "text-ink-soft/40 cursor-not-allowed"
                      }
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-soft">
                  No board members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
