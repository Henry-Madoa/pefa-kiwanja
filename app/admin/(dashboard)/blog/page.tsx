import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { getAdminReviewStats } from "@/lib/reviews";
import AdminReviewsCell from "../AdminReviewsCell";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteBlogPost } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const perms = (await getCurrentUser())?.permissions ?? [];
  const canCreate = hasPermission(perms, "Blog.Create");
  const canEdit = hasPermission(perms, "Blog.Edit");
  const canDelete = hasPermission(perms, "Blog.Delete");

  await dbConnect();
  const posts = await BlogPostModel.find().sort({ date: -1 }).lean();
  const stats = await getAdminReviewStats("blog");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Blog & News</h1>
          <p className="font-sans text-[0.9rem] text-ink-soft">{posts.length} total</p>
        </div>
        {canCreate && (
          <Link href="/admin/blog/new" className="btn btn-primary">
            + New Post
          </Link>
        )}
      </div>

      <div className="bg-white border border-[color:var(--line)] rounded-lg overflow-x-auto">
        <table className="w-full min-w-[760px] font-sans text-[0.88rem]">
          <thead>
            <tr className="border-b border-[color:var(--line)] text-left text-ink-soft text-[0.78rem] uppercase tracking-wide">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Reviews</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={String(p._id)} className="border-b border-[color:var(--line)] last:border-0">
                <td className="px-5 py-3 font-medium text-ink">{p.title}</td>
                <td className="px-5 py-3 text-ink-soft">{p.author}</td>
                <td className="px-5 py-3 text-ink-soft">{p.date}</td>
                <td className="px-5 py-3 text-ink-soft">{p.category}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <AdminReviewsCell refType="blog" refSlug={p.slug} stats={stats[p.slug]} />
                </td>
                <td className="px-5 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/admin/blog/${p._id}/edit`}
                    className="text-wine hover:underline mr-4"
                  >
                    {canEdit ? "Edit" : "View"}
                  </Link>
                  <form action={deleteBlogPost.bind(null, String(p._id))} className="inline">
                    <button
                      type="submit"
                      disabled={!canDelete}
                      title={canDelete ? undefined : "View-only access"}
                      className={
                        canDelete
                          ? "text-ink-soft hover:text-wine hover:underline"
                          : "text-ink-soft/40 cursor-not-allowed"
                      }
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink-soft">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
