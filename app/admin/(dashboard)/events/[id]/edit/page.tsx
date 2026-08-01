import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import EventModel from "@/models/Event";
import EventForm from "../../EventForm";
import { updateEvent } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const event = await EventModel.findById(params.id).lean();
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Event</h1>
      <EventForm
        action={updateEvent.bind(null, params.id)}
        defaultValues={{
          slug: event.slug,
          title: event.title,
          description: event.description,
          venue: event.venue,
          date: event.date,
          time: event.time,
          organizer: event.organizer,
          category: event.category,
          capacity: event.capacity,
          registered: event.registered,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Event.Edit")}
      />
    </div>
  );
}
