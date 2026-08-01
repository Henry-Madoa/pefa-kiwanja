"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary-server";
import LeaderModel from "@/models/Leader";
import { requirePermission } from "@/lib/rbac/access";

function readLeader(formData: FormData) {
  return {
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    bio: String(formData.get("bio") || ""),
    responsibilities: String(formData.get("responsibilities") || ""),
    order: Number(formData.get("order") || 0),
  };
}

export async function createLeader(formData: FormData) {
  await requirePermission("Leadership.Manage");
  await dbConnect();
  const photo = await uploadImage(formData.get("photo"), "ncci/leadership");
  await LeaderModel.create({ ...readLeader(formData), photo });
  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");
  redirect("/admin/leadership");
}

export async function updateLeader(id: string, formData: FormData) {
  await requirePermission("Leadership.Manage");
  await dbConnect();
  const update: Record<string, unknown> = readLeader(formData);

  const photo = await uploadImage(formData.get("photo"), "ncci/leadership");
  if (photo) {
    update.photo = photo; // new upload replaces the old one
  } else if (formData.get("removePhoto") === "on") {
    update.photo = ""; // admin chose to clear it
  }

  await LeaderModel.findByIdAndUpdate(id, update);
  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");
  redirect("/admin/leadership");
}

export async function deleteLeader(id: string) {
  await requirePermission("Leadership.Manage");
  await dbConnect();
  await LeaderModel.findByIdAndDelete(id);
  revalidatePath("/admin/leadership");
  revalidatePath("/leadership");
}
