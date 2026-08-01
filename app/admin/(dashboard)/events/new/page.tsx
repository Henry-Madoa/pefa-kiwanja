import EventForm from "../EventForm";
import { createEvent } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Event</h1>
      <EventForm action={createEvent} submitLabel="Create Event" canSubmit={await can("Event.Create")} />
    </div>
  );
}
