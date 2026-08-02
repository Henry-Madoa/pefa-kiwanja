"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import { uploadImage } from "@/lib/cloudinary-server";
import BlogPostModel from "@/models/BlogPost";
import { requirePermission } from "@/lib/rbac/access";

function readPost(formData: FormData) {
  const title = String(formData.get("title") || "");
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  return {
    slug: slugify(String(formData.get("slug") || title)),
    title,
    category: String(formData.get("category") || "News"),
    author: String(formData.get("author") || ""),
    date: String(formData.get("date") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    tags,
  };
}

export async function createBlogPost(formData: FormData) {
  await requirePermission("Blog.Create");
  await dbConnect();
  const coverImage = await uploadImage(formData.get("coverImage"), "pbkc/blog");
  await BlogPostModel.create({ ...readPost(formData), coverImage: coverImage || "" });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requirePermission("Blog.Edit");
  await dbConnect();
  const update: Record<string, unknown> = readPost(formData);

  const coverImage = await uploadImage(formData.get("coverImage"), "pbkc/blog");
  if (coverImage) {
    update.coverImage = coverImage; // new upload replaces the old one
  } else if (formData.get("removeCoverImage") === "on") {
    update.coverImage = ""; // admin chose to clear it
  }

  await BlogPostModel.findByIdAndUpdate(id, update);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await requirePermission("Blog.Delete");
  await dbConnect();
  await BlogPostModel.findByIdAndDelete(id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
