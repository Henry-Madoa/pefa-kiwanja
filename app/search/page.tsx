import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SearchPage from "@/components/SearchPage";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import SermonModel from "@/models/Sermon";
import EventModel from "@/models/Event";
import BlogPostModel from "@/models/BlogPost";
import LeaderModel from "@/models/Leader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search | NCCI",
  description: "Search across sermons, events, blog posts, ministries, and leadership at NCCI.",
};

async function getSearchableContent() {
  try {
    await dbConnect();
    const [sermons, events, blogPosts, leaders] = await Promise.all([
      SermonModel.find().lean(),
      EventModel.find().lean(),
      BlogPostModel.find().lean(),
      LeaderModel.find().sort({ order: 1 }).lean(),
    ]);
    return {
      sermons: serialize(sermons),
      events: serialize(events),
      blogPosts: serialize(blogPosts),
      leaders: serialize(leaders),
    };
  } catch {
    return { sermons: [], events: [], blogPosts: [], leaders: [] };
  }
}

export default async function SiteSearchPage() {
  const { sermons, events, blogPosts, leaders } = await getSearchableContent();

  return (
    <>
      <PageHero eyebrow="Find Anything" title="Search" />
      <section className="section">
        <div className="container-page max-w-[720px]">
          <SearchPage sermons={sermons} events={events} blogPosts={blogPosts} leaders={leaders} />
        </div>
      </section>
    </>
  );
}
