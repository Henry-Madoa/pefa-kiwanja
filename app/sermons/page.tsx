import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SermonBrowser from "@/components/SermonBrowser";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import SermonModel from "@/models/Sermon";
import type { Sermon } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { getReviewStats } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sermons | PEFA Branch Kiwanja Cathedral",
  description: "Watch and listen to recent sermons from PEFA Branch Kiwanja Cathedral.",
};

async function getSermons(): Promise<Sermon[]> {
  try {
    await dbConnect();
    const sermons = await SermonModel.find().sort({ date: -1 }).lean();
    return serialize(sermons) as unknown as Sermon[];
  } catch {
    return [];
  }
}

export default async function SermonsPage() {
  const sermons = await getSermons();
  const stats = await getReviewStats("sermon");

  return (
    <>
      <PageHero
        eyebrow="The Word"
        title="Sermons"
        description="Catch up on recent messages, search by speaker or scripture, and grow in the Word."
        image={pageImages.sermons}
      />
      <section className="section">
        <div className="container-page">
          <SermonBrowser sermons={sermons} stats={stats} />
        </div>
      </section>
    </>
  );
}
