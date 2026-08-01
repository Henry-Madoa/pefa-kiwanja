import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import SermonModel from "@/models/Sermon";
import { getAdminReviewStats } from "@/lib/reviews";
import AdminReviewsCell from "../AdminReviewsCell";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteSermon } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSermonsPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canCreate = hasPermission(perms, "Sermon.Create");
  const canEdit = hasPermission(perms, "Sermon.Edit");
  const canDelete = hasPermission(perms, "Sermon.Delete");

  await dbConnect();
  const sermons = await SermonModel.find().sort({ date: -1 }).lean();
  const stats = await getAdminReviewStats("sermon");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Sermons</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{sermons.length} total</p>
        </div>
        {canCreate && (
          <Link href="/admin/sermons/new" className="btn btn-primary">
            + New Sermon
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[760px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Speaker</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Reviews</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sermons.map((s) => (
              <tr key={String(s._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 font-medium text-ink">{s.title}</td>
                <td className="px-5 py-3 text-ink-soft">{s.speaker}</td>
                <td className="px-5 py-3 text-ink-soft">{s.date}</td>
                <td className="px-5 py-3 text-ink-soft">{s.category}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <AdminReviewsCell refType="sermon" refSlug={s.slug} stats={stats[s.slug]} />
                </td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/sermons/${s._id}/edit`}
                    className="text-wine hover:underline mr-4"
                  >
                    {canEdit ? "Edit" : "View"}
                  </Link>
                  <form action={deleteSermon.bind(null, String(s._id))} className="inline">
                    <button
                      type="submit"
                      disabled={!canDelete}
                      title={canDelete ? undefined : "View-only access"}
                      className={
                        canDelete
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
            {sermons.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No sermons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
