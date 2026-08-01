import BlogForm from "../BlogForm";
import { createBlogPost } from "../actions";
import { can } from "@/lib/rbac/access";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-8">New Post</h1>
      <BlogForm action={createBlogPost} submitLabel="Publish Post" canSubmit={await can("Blog.Create")} />
    </div>
  );
}
