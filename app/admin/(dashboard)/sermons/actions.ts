"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import SermonModel from "@/models/Sermon";
import { requirePermission } from "@/lib/rbac/access";

function readSermon(formData: FormData) {
  const title = String(formData.get("title") || "");
  return {
    slug: slugify(String(formData.get("slug") || title)),
    title,
    speaker: String(formData.get("speaker") || ""),
    date: String(formData.get("date") || ""),
    scripture: String(formData.get("scripture") || ""),
    category: String(formData.get("category") || "Sunday Service"),
    description: String(formData.get("description") || ""),
    youtubeId: String(formData.get("youtubeId") || ""),
    duration: String(formData.get("duration") || ""),
  };
}

export async function createSermon(formData: FormData) {
  await requirePermission("Sermon.Create");
  await dbConnect();
  await SermonModel.create(readSermon(formData));
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  redirect("/admin/sermons");
}

export async function updateSermon(id: string, formData: FormData) {
  await requirePermission("Sermon.Edit");
  await dbConnect();
  await SermonModel.findByIdAndUpdate(id, readSermon(formData));
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
  redirect("/admin/sermons");
}

export async function deleteSermon(id: string) {
  await requirePermission("Sermon.Delete");
  await dbConnect();
  await SermonModel.findByIdAndDelete(id);
  revalidatePath("/admin/sermons");
  revalidatePath("/sermons");
}
