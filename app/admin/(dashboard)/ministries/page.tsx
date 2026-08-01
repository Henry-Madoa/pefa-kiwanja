import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import MinistryModel from "@/models/Ministry";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteMinistry } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMinistriesPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canManage = hasPermission(perms, "Ministry.Manage");

  await dbConnect();
  const ministries = await MinistryModel.find().sort({ order: 1, name: 1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Ministries</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{ministries.length} total</p>
        </div>
        {canManage && (
          <Link href="/admin/ministries/new" className="btn btn-primary">
            + New Ministry
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Leader</th>
              <th className="px-5 py-3">Schedule</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {ministries.map((m) => (
              <tr key={String(m._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 text-ink-soft">{m.order}</td>
                <td className="px-5 py-3 font-medium text-ink">{m.name}</td>
                <td className="px-5 py-3 text-ink-soft">{m.leader || "—"}</td>
                <td className="px-5 py-3 text-ink-soft">{m.schedule || "—"}</td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/ministries/${m._id}/edit`}
                    className="text-wine hover:underline mr-4"
                  >
                    {canManage ? "Edit" : "View"}
                  </Link>
                  <form action={deleteMinistry.bind(null, String(m._id))} className="inline">
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
            {ministries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No ministries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
