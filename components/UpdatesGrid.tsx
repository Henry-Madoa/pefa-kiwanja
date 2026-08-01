import Link from "next/link";
import { formatDate } from "@/lib/data";
import { dbConnect } from "@/lib/mongodb";
import { serialize } from "@/lib/serialize";
import BlogPostModel from "@/models/BlogPost";

const gradients = [
  "linear-gradient(160deg, #6E1423, #2E070E)",
  "linear-gradient(160deg, #B8923F, #8a6c2d)",
  "linear-gradient(160deg, #1F3A2B, #0f2018)",
];

async function getRecentPosts() {
  try {
    await dbConnect();
    const posts = await BlogPostModel.find().sort({ date: -1 }).limit(3).lean();
    return serialize(posts);
  } catch {
    return [];
  }
}

export default async function UpdatesGrid() {
  const posts = await getRecentPosts();

  if (posts.length === 0) return null;

  return (
    <section className="section pt-0" id="events">
      <div className="container-page">
        <div className="section-head">
          <span className="eyebrow block mb-3">Stay Connected</span>
          <h2 className="text-[clamp(1.8rem,3vw,2.4rem)]">Recent Updates</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-6">
          {posts.map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className={`bg-white rounded-lg overflow-hidden border border-[color:var(--line)] block ${
                i === 0 ? "lg:row-span-1" : ""
              }`}
            >
              <div
                className={`relative flex items-center justify-center ${
                  i === 0 ? "h-[220px] lg:h-[280px]" : "h-[190px]"
                }`}
                style={{ background: gradients[i % gradients.length] }}
              >
                {i === 0 && (
                  <svg width="80" height="90" viewBox="0 0 400 480">
                    <path
                      d="M200 6C110 6 40 76 40 166V462H360V166C360 76 290 6 200 6Z"
                      fill="none"
                      stroke="#E3C077"
                      strokeWidth="6"
                      opacity="0.5"
                    />
                  </svg>
                )}
              </div>
              <div className="px-6 py-6">
                <span className="eyebrow block mb-2">{post.category}</span>
                <h3 className={`mb-2 leading-snug ${i === 0 ? "text-[1.3rem]" : "text-[1.05rem]"}`}>
                  {post.title}
                </h3>
                {i === 0 && <p className="text-[0.88rem] text-ink-soft">{post.excerpt}</p>}
                <div className="font-sans text-[0.74rem] text-gold font-semibold tracking-[0.04em] mt-3">
                  {formatDate(post.date).toUpperCase()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
