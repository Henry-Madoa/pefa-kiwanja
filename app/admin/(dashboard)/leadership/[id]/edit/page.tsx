import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import LeaderModel from "@/models/Leader";
import LeaderForm from "../../LeaderForm";
import { updateLeader } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditLeaderPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const leader = await LeaderModel.findById(params.id).lean();
  if (!leader) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Leader</h1>
      <LeaderForm
        action={updateLeader.bind(null, params.id)}
        defaultValues={{
          name: leader.name,
          position: leader.position,
          bio: leader.bio,
          responsibilities: leader.responsibilities ?? "",
          photo: leader.photo ?? "",
          order: leader.order,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Leadership.Manage")}
      />
    </div>
  );
}
