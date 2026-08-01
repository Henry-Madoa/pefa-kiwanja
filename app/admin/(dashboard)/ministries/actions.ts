"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import { slugify } from "@/lib/slugify";
import MinistryModel from "@/models/Ministry";
import { requirePermission } from "@/lib/rbac/access";

function readMinistry(formData: FormData) {
  const name = String(formData.get("name") || "");
  const upcoming = String(formData.get("upcoming") || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    slug: slugify(String(formData.get("slug") || name)),
    name,
    description: String(formData.get("description") || ""),
    leader: String(formData.get("leader") || ""),
    contact: String(formData.get("contact") || ""),
    schedule: String(formData.get("schedule") || ""),
    upcoming,
    order: Number(formData.get("order") || 0),
  };
}

export async function createMinistry(formData: FormData) {
  await requirePermission("Ministry.Manage");
  await dbConnect();
  await MinistryModel.create(readMinistry(formData));
  revalidatePath("/admin/ministries");
  revalidatePath("/ministries");
  redirect("/admin/ministries");
}

export async function updateMinistry(id: string, formData: FormData) {
  await requirePermission("Ministry.Manage");
  await dbConnect();
  await MinistryModel.findByIdAndUpdate(id, readMinistry(formData));
  revalidatePath("/admin/ministries");
  revalidatePath("/ministries");
  redirect("/admin/ministries");
}

export async function deleteMinistry(id: string) {
  await requirePermission("Ministry.Manage");
  await dbConnect();
  await MinistryModel.findByIdAndDelete(id);
  revalidatePath("/admin/ministries");
  revalidatePath("/ministries");
}
