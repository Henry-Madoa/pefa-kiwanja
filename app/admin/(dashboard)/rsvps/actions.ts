"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import RsvpEntryModel from "@/models/RsvpEntry";
import { requirePermission } from "@/lib/rbac/access";

export async function deleteRsvp(id: string) {
  await requirePermission("Rsvp.Manage");
  await dbConnect();
  await RsvpEntryModel.findByIdAndDelete(id);
  revalidatePath("/admin/rsvps");
}
