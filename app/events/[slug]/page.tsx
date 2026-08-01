import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import RsvpForm from "@/components/RsvpForm";
import { formatDate } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import EventModel from "@/models/Event";

export const dynamic = "force-dynamic";

async function getEvent(slug: string) {
  try {
    await dbConnect();
    const event = await EventModel.findOne({ slug }).lean();
    return event ? serialize(event) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);
  return { title: event ? `${event.title} | NCCI Events` : "Event | NCCI" };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) return notFound();

  const spotsLeft = event.capacity - event.registered;

  return (
    <>
      <PageHero
        eyebrow={event.category}
        title={event.title}
        description={event.description}
        image={pageImages.events}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14">
          <div>
            <h2 className="text-[1.3rem] mb-4">Details</h2>
            <dl className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <dt className="eyebrow mb-1">Date</dt>
                <dd className="text-ink">{formatDate(event.date)}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Time</dt>
                <dd className="text-ink">{event.time}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Venue</dt>
                <dd className="text-ink">{event.venue}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Organizer</dt>
                <dd className="text-ink">{event.organizer}</dd>
              </div>
            </dl>
            {event.capacity > 0 && (
              <p className="text-[0.9rem] text-ink-soft">
                {spotsLeft > 0
                  ? `${spotsLeft} of ${event.capacity} spots remaining.`
                  : "This event is fully booked."}
              </p>
            )}
          </div>
          <aside className="bg-cream-dim rounded-lg p-7 h-fit">
            <h3 className="text-[1rem] mb-4">Register / RSVP</h3>
            <RsvpForm eventSlug={event.slug} eventTitle={event.title} />
          </aside>
        </div>
      </section>
    </>
  );
}
