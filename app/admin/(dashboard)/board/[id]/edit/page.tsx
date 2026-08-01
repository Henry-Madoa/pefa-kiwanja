import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import BoardMemberModel from "@/models/BoardMember";
import BoardForm from "../../BoardForm";
import { updateBoardMember } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditBoardMemberPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const member = await BoardMemberModel.findById(params.id).lean();
  if (!member) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Board Member</h1>
      <BoardForm
        action={updateBoardMember.bind(null, params.id)}
        defaultValues={{
          title: member.title,
          name: member.name,
          position: member.position,
          note: member.note ?? "",
          photo: member.photo ?? "",
          order: member.order,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Board.Manage")}
      />
    </div>
  );
}
