import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { formatDate } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import SermonModel from "@/models/Sermon";
import ReviewModel from "@/models/Review";
import ReviewSection, { type Review } from "@/components/ReviewSection";

export const dynamic = "force-dynamic";

async function getSermon(slug: string) {
  try {
    await dbConnect();
    const sermon = await SermonModel.findOne({ slug }).lean();
    return sermon ? serialize(sermon) : null;
  } catch {
    return null;
  }
}

async function getReviews(slug: string) {
  try {
    await dbConnect();
    const reviews = await ReviewModel.find({ refType: "sermon", refSlug: slug, approved: true })
      .sort({ createdAt: -1 })
      .lean();
    return serialize(reviews) as unknown as Review[];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const sermon = await getSermon(params.slug);
  return { title: sermon ? `${sermon.title} | NCCI Sermons` : "Sermon | NCCI" };
}

export default async function SermonDetailPage({ params }: { params: { slug: string } }) {
  const sermon = await getSermon(params.slug);
  if (!sermon) return notFound();
  const reviews = await getReviews(params.slug);

  return (
    <>
      <PageHero
        eyebrow={sermon.category}
        title={sermon.title}
        description={sermon.scripture}
        image={pageImages.sermons}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
          <div>
            <div className="aspect-video rounded-lg overflow-hidden border border-[color:var(--line)] mb-8">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                title={sermon.title}
                allowFullScreen
              />
            </div>
            <p className="text-ink-soft leading-relaxed mb-6">{sermon.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="btn btn-outline">Download Audio</a>
              <a href="#" className="btn btn-outline">Download Notes (PDF)</a>
              <a href="#" className="btn btn-ghost">Share &rarr;</a>
            </div>
            <ReviewSection
              refType="sermon"
              refSlug={sermon.slug}
              refTitle={sermon.title}
              reviews={reviews}
            />
          </div>
          <aside className="bg-cream-dim rounded-lg p-7 h-fit">
            <h3 className="text-[1rem] mb-4">Details</h3>
            <dl className="space-y-4 text-[0.9rem]">
              <div>
                <dt className="eyebrow mb-1">Speaker</dt>
                <dd className="text-ink">{sermon.speaker}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Date</dt>
                <dd className="text-ink">{formatDate(sermon.date)}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Scripture</dt>
                <dd className="text-ink">{sermon.scripture}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Duration</dt>
                <dd className="text-ink">{sermon.duration}</dd>
              </div>
            </dl>
            <Link href="/sermons" className="btn btn-outline mt-6 w-full justify-center">
              &larr; All Sermons
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
