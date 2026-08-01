import { dbConnect } from "@/lib/mongodb";
import RsvpEntryModel from "@/models/RsvpEntry";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteRsvp } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminRsvpsPage() {
  const canManage = hasPermission((await getCurrentUser())?.permissions ?? [], "Rsvp.Manage");

  await dbConnect();
  const rsvps = await RsvpEntryModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Event RSVPs</h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">{rsvps.length} total</p>
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Event</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Guests</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map((r) => (
              <tr key={String(r._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 font-medium text-ink">{r.eventTitle}</td>
                <td className="px-5 py-3 text-ink-soft">{r.name}</td>
                <td className="px-5 py-3 text-ink-soft">{r.email}</td>
                <td className="px-5 py-3 text-ink-soft">{r.guests}</td>
                <td className="px-5 py-3 text-right">
                  <form action={deleteRsvp.bind(null, String(r._id))} className="inline">
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
            {rsvps.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No RSVPs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
