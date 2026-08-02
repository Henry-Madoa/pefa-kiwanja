import Link from "next/link";
import { missionStatement, pastor } from "@/lib/data";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import SermonModel from "@/models/Sermon";
import EventModel from "@/models/Event";

async function getHighlights() {
  try {
    await dbConnect();
    const [latestSermon, nextEvents] = await Promise.all([
      SermonModel.findOne().sort({ date: -1 }).lean(),
      EventModel.find().sort({ date: 1 }).limit(2).lean(),
    ]);
    return {
      latestSermon: latestSermon ? serialize(latestSermon) : null,
      nextEvents: serialize(nextEvents),
    };
  } catch {
    return { latestSermon: null, nextEvents: [] as { title: string }[] };
  }
}

export default async function FeaturedGrid() {
  const { latestSermon, nextEvents } = await getHighlights();

  const cards = [
    {
      href: latestSermon ? `/sermons/${latestSermon.slug}` : "/sermons",
      title: "Latest Sermon",
      text: latestSermon
        ? `"${latestSermon.title}" — ${latestSermon.speaker}`
        : "Check back soon for our latest message.",
      tag: "Watch Now",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6E1423" strokeWidth="1.7">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      href: "/events",
      title: "Upcoming Events",
      text: nextEvents.length ? nextEvents.map((e) => e.title).join(", ") : "No events scheduled yet.",
      tag: "View Calendar",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6E1423" strokeWidth="1.7">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      ),
    },
    {
      href: "/about",
      title: "Weekly Scripture",
      text: `"${missionStatement.quote.slice(0, 60)}..."`,
      tag: "Read More",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6E1423" strokeWidth="1.7">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      ),
    },
    {
      href: "/pastor",
      title: "Bishop's Welcome",
      text: `A personal word from ${pastor.name} to every visitor and member`,
      tag: "Watch Message",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6E1423" strokeWidth="1.7">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a8 8 0 0116 0v1" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section" id="about">
      <div className="container-page">
        <div className="section-head">
          <span className="eyebrow block mb-3">This Week</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]">Featured at PBKC</h2>
          <p className="text-ink-soft mt-3.5">
            Catch up on the latest word, what&apos;s happening next, and where our hearts are
            this season.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link href={card.href} key={card.title} className="arch-card block">
              <div className="arch-icon">{card.icon}</div>
              <h3 className="text-[1.1rem] mb-2">{card.title}</h3>
              <p className="text-[0.92rem] text-ink-soft">{card.text}</p>
              <span className="font-sans text-[0.7rem] font-semibold tracking-[0.08em] uppercase text-gold mt-3.5 inline-block">
                {card.tag}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
