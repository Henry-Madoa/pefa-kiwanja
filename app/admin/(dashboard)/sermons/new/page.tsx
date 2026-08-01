import SermonForm from "../SermonForm";
import { createSermon } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewSermonPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Sermon</h1>
      <SermonForm action={createSermon} submitLabel="Create Sermon" canSubmit={await can("Sermon.Create")} />
    </div>
  );
}
