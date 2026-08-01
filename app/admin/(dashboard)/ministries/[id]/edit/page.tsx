import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import MinistryModel from "@/models/Ministry";
import MinistryForm from "../../MinistryForm";
import { updateMinistry } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditMinistryPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const ministry = await MinistryModel.findById(params.id).lean<{
    slug: string;
    name: string;
    description: string;
    leader?: string;
    contact?: string;
    schedule?: string;
    upcoming?: string[];
    order?: number;
  } | null>();
  if (!ministry) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Ministry</h1>
      <MinistryForm
        action={updateMinistry.bind(null, params.id)}
        defaultValues={{
          slug: ministry.slug,
          name: ministry.name,
          description: ministry.description,
          leader: ministry.leader,
          contact: ministry.contact,
          schedule: ministry.schedule,
          upcoming: ministry.upcoming,
          order: ministry.order,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Ministry.Manage")}
      />
    </div>
  );
}
