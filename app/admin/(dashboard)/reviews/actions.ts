"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import ReviewModel from "@/models/Review";
import { requirePermission } from "@/lib/rbac/access";

export async function toggleApproved(id: string, approved: boolean) {
  await requirePermission("Review.Moderate");
  await dbConnect();
  const review = await ReviewModel.findByIdAndUpdate(
    id,
    { approved: !approved },
    { new: true }
  ).lean();
  revalidatePath("/admin/reviews");
  if (review) {
    revalidatePath(`/${review.refType}/${review.refSlug}`);
  }
}

export async function deleteReview(id: string) {
  await requirePermission("Review.Moderate");
  await dbConnect();
  const review = await ReviewModel.findByIdAndDelete(id).lean();
  revalidatePath("/admin/reviews");
  if (review) {
    revalidatePath(`/${review.refType}/${review.refSlug}`);
  }
}
