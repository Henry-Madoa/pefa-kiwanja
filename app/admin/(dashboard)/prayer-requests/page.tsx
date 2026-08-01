import { dbConnect } from "@/lib/mongodb";
import PrayerRequestModel from "@/models/PrayerRequest";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { togglePrayed, deletePrayerRequest } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPrayerRequestsPage() {
  const canManage = hasPermission((await getCurrentUser())?.permissions ?? [], "Prayer.Manage");

  await dbConnect();
  const requests = await PrayerRequestModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">
          Prayer Requests
        </h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">{requests.length} total</p>
      </div>

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={String(r._id)}
            className={`bg-white border rounded-lg p-6 ${
              r.prayedFor ? "border-forest/30" : "border-[color:var(--line)]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-sans font-semibold text-ink">
                  {r.anonymous ? "Anonymous" : r.name || "—"}{" "}
                  <span className="ml-2 text-[0.75rem] font-normal text-ink-soft">
                    {r.category}
                  </span>
                </p>
                <p className="font-sans text-[0.8rem] text-ink-soft">
                  {r.email} {r.phone ? `· ${r.phone}` : ""}
                </p>
              </div>
              <p className="font-sans text-[0.78rem] text-ink-soft whitespace-nowrap">
                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
            <p className="font-sans text-[0.9rem] text-ink mb-4">{r.request}</p>
            <div className="flex items-center gap-4">
              <form action={togglePrayed.bind(null, String(r._id), Boolean(r.prayedFor))}>
                <button
                  type="submit"
                  disabled={!canManage}
                  title={canManage ? undefined : "View-only access"}
                  className={`font-sans text-[0.82rem] font-medium disabled:opacity-40 disabled:cursor-not-allowed ${
                    r.prayedFor ? "text-forest" : "text-ink-soft hover:text-forest"
                  }`}
                >
                  {r.prayedFor ? "✓ Prayed for" : "Mark as prayed for"}
                </button>
              </form>
              <form action={deletePrayerRequest.bind(null, String(r._id))}>
                <button
                  type="submit"
                  disabled={!canManage}
                  title={canManage ? undefined : "View-only access"}
                  className="font-sans text-[0.82rem] text-ink-soft hover:text-wine disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {requests.length === 0 && (
          <p className="text-center text-ink-soft font-sans py-10">No prayer requests yet.</p>
        )}
      </div>
    </div>
  );
}
