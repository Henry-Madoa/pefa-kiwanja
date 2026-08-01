"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import ContactMessageModel from "@/models/ContactMessage";
import { requirePermission } from "@/lib/rbac/access";

export async function toggleRead(id: string, read: boolean) {
  await requirePermission("Message.Manage");
  await dbConnect();
  await ContactMessageModel.findByIdAndUpdate(id, { read: !read });
  revalidatePath("/admin/messages");
}

export async function deleteContactMessage(id: string) {
  await requirePermission("Message.Manage");
  await dbConnect();
  await ContactMessageModel.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
}
