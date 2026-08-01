"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary-server";
import GalleryImageModel from "@/models/GalleryImage";
import { requirePermission } from "@/lib/rbac/access";

export async function uploadGalleryImage(formData: FormData) {
  await requirePermission("Media.Manage");
  await dbConnect();

  const url = await uploadImage(formData.get("image"), "ncci/gallery");
  if (!url) {
    throw new Error("Please choose an image to upload.");
  }
  await GalleryImageModel.create({
    url,
    alt: String(formData.get("alt") || "").trim(),
    order: Number(formData.get("order") || 0),
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/"); // marquee on the landing page
  redirect("/admin/gallery");
}

export async function updateGalleryImage(id: string, formData: FormData) {
  await requirePermission("Media.Manage");
  await dbConnect();

  const update: Record<string, unknown> = {
    alt: String(formData.get("alt") || "").trim(),
    order: Number(formData.get("order") || 0),
  };
  // Optional replacement image.
  const url = await uploadImage(formData.get("image"), "ncci/gallery");
  if (url) update.url = url;

  await GalleryImageModel.findByIdAndUpdate(id, update);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(id: string) {
  await requirePermission("Media.Manage");
  await dbConnect();
  await GalleryImageModel.findByIdAndDelete(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
