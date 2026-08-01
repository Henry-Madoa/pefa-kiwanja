"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import NewsletterSubscriberModel from "@/models/NewsletterSubscriber";
import { requirePermission } from "@/lib/rbac/access";

export async function deleteSubscriber(id: string) {
  await requirePermission("Subscriber.Manage");
  await dbConnect();
  await NewsletterSubscriberModel.findByIdAndDelete(id);
  revalidatePath("/admin/subscribers");
}
