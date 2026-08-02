import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { formatDate, type BlogPost } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import BlogPostModel from "@/models/BlogPost";
import { getReviewStats } from "@/lib/reviews";
import TileReviewStats from "@/components/TileReviewStats";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & News | PEFA Branch Kiwanja Cathedral",
  description: "News, devotionals, testimonies, and updates from PEFA Branch Kiwanja Cathedral.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await dbConnect();
    const posts = await BlogPostModel.find().sort({ date: -1 }).lean();
    return serialize(posts) as unknown as BlogPost[];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const stats = await getReviewStats("blog");

  return (
    <>
      <PageHero
        eyebrow="Stories & Updates"
        title="Blog & News"
        description="Devotionals, church news, testimonies, and mission updates from our community."
        image={pageImages.blog}
      />
      <section className="section">
        <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="bg-white border border-[color:var(--line)] rounded-lg overflow-hidden block hover:-translate-y-1 transition-transform"
            >
              <div className="h-[160px] bg-gradient-to-br from-wine to-wine-deeper overflow-hidden">
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <span className="eyebrow block mb-2">{post.category}</span>
                <h3 className="text-[1.05rem] mb-2 leading-snug">{post.title}</h3>
                <p className="text-[0.86rem] text-ink-soft mb-3">{post.excerpt}</p>
                <div className="font-sans text-[0.76rem] text-gold font-semibold">
                  {post.author} &middot; {formatDate(post.date)}
                </div>
                <div className="mt-3 pt-3 border-t border-[color:var(--line)]">
                  <TileReviewStats
                    href={`/blog/${post.slug}`}
                    average={stats[post.slug]?.average ?? 0}
                    count={stats[post.slug]?.count ?? 0}
                  />
                </div>
              </div>
            </Link>
          ))}
          {blogPosts.length === 0 && (
            <p className="text-ink-soft col-span-3 text-center py-10">No posts yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
