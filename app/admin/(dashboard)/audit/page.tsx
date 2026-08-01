import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import AuditLogModel from "@/models/AuditLog";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
  if (!(await can("Audit.View"))) redirect("/admin");

  await dbConnect();
  const entries = await AuditLogModel.find().sort({ createdAt: -1 }).limit(200).lean<
    { _id: unknown; actorName: string; actorEmail: string; action: string; target?: string; detail?: string; createdAt?: Date }[]
  >();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Audit Log</h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">
          Sensitive actions — user, role and permission changes. Most recent {entries.length}.
        </p>
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[720px] font-sans text-[0.86rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">When</th>
              <th className="px-5 py-3">Actor</th>
              <th className="px-5 py-3">Action</th>
              <th className="px-5 py-3">Target</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={String(e._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 text-ink-soft whitespace-nowrap">
                  {e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}
                </td>
                <td className="px-5 py-3 text-ink">{e.actorName || e.actorEmail}</td>
                <td className="px-5 py-3">
                  <code className="text-[0.8rem] text-wine">{e.action}</code>
                </td>
                <td className="px-5 py-3 text-ink-soft">
                  {e.target}
                  {e.detail ? <span className="text-ink-soft/70"> · {e.detail}</span> : null}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-ink-soft">
                  No audit entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
