"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { uploadImage } from "@/lib/cloudinary-server";
import BoardMemberModel from "@/models/BoardMember";
import { requirePermission } from "@/lib/rbac/access";

function readBoardMember(formData: FormData) {
  return {
    title: String(formData.get("title") || ""),
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    note: String(formData.get("note") || ""),
    order: Number(formData.get("order") || 0),
  };
}

export async function createBoardMember(formData: FormData) {
  await requirePermission("Board.Manage");
  await dbConnect();
  const photo = await uploadImage(formData.get("photo"), "pbkc/board");
  await BoardMemberModel.create({ ...readBoardMember(formData), photo });
  revalidatePath("/admin/board");
  revalidatePath("/about");
  redirect("/admin/board");
}

export async function updateBoardMember(id: string, formData: FormData) {
  await requirePermission("Board.Manage");
  await dbConnect();
  const update: Record<string, unknown> = readBoardMember(formData);

  const photo = await uploadImage(formData.get("photo"), "pbkc/board");
  if (photo) {
    update.photo = photo; // new upload replaces the old one
  } else if (formData.get("removePhoto") === "on") {
    update.photo = ""; // admin chose to clear it
  }

  await BoardMemberModel.findByIdAndUpdate(id, update);
  revalidatePath("/admin/board");
  revalidatePath("/about");
  redirect("/admin/board");
}

export async function deleteBoardMember(id: string) {
  await requirePermission("Board.Manage");
  await dbConnect();
  await BoardMemberModel.findByIdAndDelete(id);
  revalidatePath("/admin/board");
  revalidatePath("/about");
}
