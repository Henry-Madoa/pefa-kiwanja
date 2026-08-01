"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import PrayerRequestModel from "@/models/PrayerRequest";
import { requirePermission } from "@/lib/rbac/access";

export async function togglePrayed(id: string, prayedFor: boolean) {
  await requirePermission("Prayer.Manage");
  await dbConnect();
  await PrayerRequestModel.findByIdAndUpdate(id, { prayedFor: !prayedFor });
  revalidatePath("/admin/prayer-requests");
}

export async function deletePrayerRequest(id: string) {
  await requirePermission("Prayer.Manage");
  await dbConnect();
  await PrayerRequestModel.findByIdAndDelete(id);
  revalidatePath("/admin/prayer-requests");
}
