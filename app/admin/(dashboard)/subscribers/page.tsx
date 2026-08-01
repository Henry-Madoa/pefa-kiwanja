import { dbConnect } from "@/lib/mongodb";
import NewsletterSubscriberModel from "@/models/NewsletterSubscriber";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteSubscriber } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const canManage = hasPermission((await getCurrentUser())?.permissions ?? [], "Subscriber.Manage");

  await dbConnect();
  const subscribers = await NewsletterSubscriberModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">
          Newsletter Subscribers
        </h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">{subscribers.length} total</p>
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[560px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Subscribed</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={String(s._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 text-ink">{s.name || "—"}</td>
                <td className="px-5 py-3 text-ink-soft">{s.email}</td>
                <td className="px-5 py-3 text-ink-soft">
                  {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : ""}
                </td>
                <td className="px-5 py-3 text-right">
                  <form action={deleteSubscriber.bind(null, String(s._id))} className="inline">
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
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-soft">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
