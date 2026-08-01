import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import BlogForm from "../../BlogForm";
import { updateBlogPost } from "../../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const post = await BlogPostModel.findById(params.id).lean();
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">Edit Post</h1>
      <BlogForm
        action={updateBlogPost.bind(null, params.id)}
        defaultValues={{
          slug: post.slug,
          title: post.title,
          category: post.category,
          author: post.author,
          date: post.date,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
          tags: post.tags,
        }}
        submitLabel="Save Changes"
        canSubmit={await can("Blog.Edit")}
      />
    </div>
  );
}
