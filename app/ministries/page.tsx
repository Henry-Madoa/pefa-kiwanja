import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { type Ministry } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import MinistryModel from "@/models/Ministry";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ministries | PEFA Branch Kiwanja Cathedral",
  description: "Explore the ministries at PEFA Branch Kiwanja Cathedral.",
};

async function getMinistries(): Promise<Ministry[]> {
  try {
    await dbConnect();
    const ministries = await MinistryModel.find().sort({ order: 1, name: 1 }).lean();
    return serialize(ministries) as unknown as Ministry[];
  } catch {
    return [];
  }
}

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Ministries"
        description="Whatever your season of life, there's a place for you to grow, serve, and belong."
        image={pageImages.ministries}
      />
      <section className="section">
        {ministries.length === 0 ? (
          <div className="container-page">
            <p className="text-ink-soft text-center py-10">
              Our ministries will be listed here soon.
            </p>
          </div>
        ) : (
          <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => (
              <Link
                href={`/ministries/${ministry.slug}`}
                key={ministry.slug}
                className="bg-white border border-[color:var(--line)] rounded-lg p-7 hover:-translate-y-1 transition-transform block"
              >
                <h3 className="text-[1.1rem] mb-2">{ministry.name}</h3>
                <p className="text-[0.9rem] text-ink-soft mb-3">{ministry.description}</p>
                {ministry.schedule && (
                  <p className="text-[0.8rem] font-sans text-gold font-semibold uppercase tracking-wide">
                    {ministry.schedule}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
