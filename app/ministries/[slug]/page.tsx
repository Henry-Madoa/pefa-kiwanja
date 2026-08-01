import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { type Ministry } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import MinistryModel from "@/models/Ministry";

export const dynamic = "force-dynamic";

async function getMinistry(slug: string): Promise<Ministry | null> {
  try {
    await dbConnect();
    const ministry = await MinistryModel.findOne({ slug }).lean();
    return ministry ? (serialize(ministry) as unknown as Ministry) : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ministry = await getMinistry(params.slug);
  return { title: ministry ? `${ministry.name} | NCCI` : "Ministry | NCCI" };
}

export default async function MinistryDetailPage({ params }: { params: { slug: string } }) {
  const ministry = await getMinistry(params.slug);
  if (!ministry) return notFound();

  return (
    <>
      <PageHero
        eyebrow="Ministry"
        title={ministry.name}
        description={ministry.description}
        image={pageImages.ministries}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
          <div>
            <h2 className="text-[1.4rem] mb-4">Upcoming Activities</h2>
            {ministry.upcoming.length > 0 ? (
              <ul className="space-y-3 mb-10">
                {ministry.upcoming.map((activity) => (
                  <li
                    key={activity}
                    className="border border-[color:var(--line)] rounded-md px-5 py-4 text-ink-soft bg-white"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink-soft mb-10">No upcoming activities scheduled right now.</p>
            )}
            <Link href="/ministries" className="btn btn-outline">
              &larr; Back to All Ministries
            </Link>
          </div>
          <aside className="bg-cream-dim rounded-lg p-7 h-fit">
            <h3 className="text-[1rem] mb-4">Ministry Details</h3>
            <dl className="space-y-4 text-[0.9rem]">
              {ministry.leader && (
                <div>
                  <dt className="eyebrow mb-1">Leader</dt>
                  <dd className="text-ink">{ministry.leader}</dd>
                </div>
              )}
              {ministry.contact && (
                <div>
                  <dt className="eyebrow mb-1">Contact</dt>
                  <dd className="text-ink">{ministry.contact}</dd>
                </div>
              )}
              {ministry.schedule && (
                <div>
                  <dt className="eyebrow mb-1">Meeting Schedule</dt>
                  <dd className="text-ink">{ministry.schedule}</dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
