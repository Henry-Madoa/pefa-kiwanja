import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import LeaderModel from "@/models/Leader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership Team | NCCI",
  description: "Meet the pastors, elders, deacons, and ministry leaders of NCCI.",
};

async function getLeaders() {
  try {
    await dbConnect();
    const leaders = await LeaderModel.find().sort({ order: 1, name: 1 }).lean();
    return serialize(leaders);
  } catch {
    return [];
  }
}

export default async function LeadershipPage() {
  const leadership = await getLeaders();

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Leadership Team"
        description="A team of shepherds committed to guiding, serving, and equipping our church family."
        image={pageImages.leadership}
      />
      <section className="section">
        {leadership.length === 0 ? (
          <div className="container-page">
            <p className="text-ink-soft text-center py-10">
              Our leadership team will be listed here soon.
            </p>
          </div>
        ) : (
          <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <div
                key={String(leader._id)}
                className="bg-white border border-[color:var(--line)] rounded-lg overflow-hidden"
              >
                <div className="aspect-[4/3] bg-wine-deeper flex items-center justify-center overflow-hidden p-1">
                  {leader.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="h-full aspect-square object-cover rounded-full"
                    />
                  ) : (
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#E3C077" strokeWidth="1.4">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21v-1a8 8 0 0116 0v1" />
                    </svg>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[1.1rem] mb-1">{leader.name}</h3>
                  <p className="eyebrow mb-3">{leader.position}</p>
                  <p className="text-[0.9rem] text-ink-soft mb-3">{leader.bio}</p>
                  {leader.responsibilities && (
                    <p className="text-[0.82rem] text-gold font-sans font-semibold">
                      {leader.responsibilities}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
