import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import SermonModel from "@/models/Sermon";
import SermonForm from "../../SermonForm";
import { updateSermon } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditSermonPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const sermon = await SermonModel.findById(params.id).lean();
  if (!sermon) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Sermon</h1>
      <SermonForm
        action={updateSermon.bind(null, params.id)}
        defaultValues={{
          slug: sermon.slug,
          title: sermon.title,
          speaker: sermon.speaker,
          date: sermon.date,
          scripture: sermon.scripture,
          category: sermon.category,
          description: sermon.description,
          youtubeId: sermon.youtubeId,
          duration: sermon.duration,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Sermon.Edit")}
      />
    </div>
  );
}
