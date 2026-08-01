import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { formatDate } from "@/lib/data";
import { pageImages } from "@/lib/images";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import BlogPostModel from "@/models/BlogPost";
import ReviewModel from "@/models/Review";
import ReviewSection, { type Review } from "@/components/ReviewSection";

export const dynamic = "force-dynamic";

async function getBlogPost(slug: string) {
  try {
    await dbConnect();
    const post = await BlogPostModel.findOne({ slug }).lean();
    return post ? serialize(post) : null;
  } catch {
    return null;
  }
}

async function getReviews(slug: string) {
  try {
    await dbConnect();
    const reviews = await ReviewModel.find({ refType: "blog", refSlug: slug, approved: true })
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
  const post = await getBlogPost(params.slug);
  return { title: post ? `${post.title} | NCCI Blog` : "Blog | NCCI" };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return notFound();
  const reviews = await getReviews(params.slug);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={`${post.author} · ${formatDate(post.date)}`}
        image={pageImages.blog}
      />
      <section className="section">
        <div className="container-page max-w-[720px]">
          <p className="text-ink-soft leading-relaxed text-[1.05rem] whitespace-pre-line">
            {post.content}
          </p>
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-sans text-[0.76rem] font-semibold text-wine bg-cream-dim px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Link href="/blog" className="btn btn-outline mt-10 inline-flex">
            &larr; Back to Blog
          </Link>
          <ReviewSection
            refType="blog"
            refSlug={post.slug}
            refTitle={post.title}
            reviews={reviews}
          />
        </div>
      </section>
    </>
  );
}
