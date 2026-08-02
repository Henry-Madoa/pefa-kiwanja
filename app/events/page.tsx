import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { type ChurchEvent } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import EventModel from "@/models/Event";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events | PEFA Branch Kiwanja Cathedral",
  description: "Services, Bible studies, and gatherings at PEFA Branch Kiwanja Cathedral this year.",
};

async function getEvents(): Promise<ChurchEvent[]> {
  try {
    await dbConnect();
    const events = await EventModel.find().sort({ date: -1 }).lean();
    return serialize(events) as unknown as ChurchEvent[];
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        eyebrow="Calendar"
        title="Events"
        description="Services, worship experiences, and Bible studies from across the year — with more always on the way at the Cathedral."
        image={pageImages.events}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <Link
              href={`/events/${event.slug}`}
              key={event.slug}
              className="bg-white border border-[color:var(--line)] rounded-lg p-7 flex gap-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex-shrink-0 w-16 text-center bg-wine text-cream rounded-md py-2.5">
                <div className="font-display font-semibold text-lg leading-none">
                  {new Date(event.date).getDate()}
                </div>
                <div className="font-sans text-[0.65rem] uppercase tracking-wide mt-1">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                </div>
              </div>
              <div>
                <span className="eyebrow block mb-1">{event.category}</span>
                <h3 className="text-[1.1rem] mb-2">{event.title}</h3>
                <p className="text-[0.88rem] text-ink-soft mb-2">{event.description}</p>
                <p className="text-[0.8rem] text-ink-soft">
                  {event.venue} &middot; {event.time}
                </p>
              </div>
            </Link>
          ))}
          {events.length === 0 && (
            <p className="text-ink-soft col-span-2 text-center py-10">No upcoming events yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
