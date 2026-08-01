import { dbConnect } from "@/lib/mongodb";
import ContactMessageModel from "@/models/ContactMessage";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { toggleRead, deleteContactMessage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const canManage = hasPermission((await getCurrentUser())?.permissions ?? [], "Message.Manage");

  await dbConnect();
  const messages = await ContactMessageModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">
          Contact Messages
        </h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">{messages.length} total</p>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={String(m._id)}
            className={`bg-white border rounded-lg p-6 ${
              m.read ? "border-[color:var(--line)]" : "border-wine/40"
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-sans font-semibold text-ink">
                  {m.name} {!m.read && <span className="ml-2 text-[0.7rem] text-wine">NEW</span>}
                </p>
                <p className="font-sans text-[0.8rem] text-ink-soft">{m.email}</p>
                {m.subject && (
                  <p className="font-sans text-[0.85rem] text-ink-soft mt-1">
                    Subject: {m.subject}
                  </p>
                )}
              </div>
              <p className="font-sans text-[0.78rem] text-ink-soft whitespace-nowrap">
                {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
            <p className="font-sans text-[0.9rem] text-ink mb-4">{m.message}</p>
            <div className="flex items-center gap-4">
              <form action={toggleRead.bind(null, String(m._id), Boolean(m.read))}>
                <button
                  type="submit"
                  disabled={!canManage}
                  title={canManage ? undefined : "View-only access"}
                  className="font-sans text-[0.82rem] font-medium text-ink-soft hover:text-wine disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {m.read ? "Mark unread" : "Mark read"}
                </button>
              </form>
              <form action={deleteContactMessage.bind(null, String(m._id))}>
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
        {messages.length === 0 && (
          <p className="text-center text-ink-soft font-sans py-10">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
