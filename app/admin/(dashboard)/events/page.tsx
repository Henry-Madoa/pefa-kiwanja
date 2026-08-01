import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import EventModel from "@/models/Event";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteEvent } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canCreate = hasPermission(perms, "Event.Create");
  const canEdit = hasPermission(perms, "Event.Edit");
  const canDelete = hasPermission(perms, "Event.Delete");

  await dbConnect();
  const events = await EventModel.find().sort({ date: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Events</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{events.length} total</p>
        </div>
        {canCreate && (
          <Link href="/admin/events/new" className="btn btn-primary">
            + New Event
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[640px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Venue</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Registered</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={String(e._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 font-medium text-ink">{e.title}</td>
                <td className="px-5 py-3 text-ink-soft">{e.venue}</td>
                <td className="px-5 py-3 text-ink-soft">{e.date}</td>
                <td className="px-5 py-3 text-ink-soft">
                  {e.registered}/{e.capacity}
                </td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/events/${e._id}/edit`}
                    className="text-wine hover:underline mr-4"
                  >
                    {canEdit ? "Edit" : "View"}
                  </Link>
                  <form action={deleteEvent.bind(null, String(e._id))} className="inline">
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
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-soft">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
