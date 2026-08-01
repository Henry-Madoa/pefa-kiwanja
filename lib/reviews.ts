import { dbConnect } from "@/lib/mongodb";
import ReviewModel from "@/models/Review";

export type ReviewStats = { average: number; count: number };

// Aggregates approved reviews for every item of a given type into a
// { slug: { average, count } } map for use on listing tiles.
export async function getReviewStats(
  refType: "blog" | "sermon"
): Promise<Record<string, ReviewStats>> {
  try {
    await dbConnect();
    const rows = await ReviewModel.aggregate<{
      _id: string;
      count: number;
      avg: number;
    }>([
      { $match: { refType, approved: true } },
      { $group: { _id: "$refSlug", count: { $sum: 1 }, avg: { $avg: "$rating" } } },
    ]);
    const map: Record<string, ReviewStats> = {};
    for (const r of rows) {
      map[r._id] = { average: r.avg, count: r.count };
    }
    return map;
  } catch {
    return {};
  }
}

export type AdminReviewStats = { average: number; count: number; pending: number };

// Like getReviewStats but counts ALL reviews (approved + pending) per slug and
// tracks how many are still awaiting approval — for the admin listing tables.
export async function getAdminReviewStats(
  refType: "blog" | "sermon"
): Promise<Record<string, AdminReviewStats>> {
  try {
    await dbConnect();
    const rows = await ReviewModel.aggregate<{
      _id: string;
      count: number;
      avg: number;
      pending: number;
    }>([
      { $match: { refType } },
      {
        $group: {
          _id: "$refSlug",
          count: { $sum: 1 },
          avg: { $avg: "$rating" },
          pending: {
            $sum: { $cond: [{ $eq: ["$approved", true] }, 0, 1] },
          },
        },
      },
    ]);
    const map: Record<string, AdminReviewStats> = {};
    for (const r of rows) {
      map[r._id] = { average: r.avg, count: r.count, pending: r.pending };
    }
    return map;
  } catch {
    return {};
  }
}
