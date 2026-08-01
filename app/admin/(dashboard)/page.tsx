import Link from "next/link";
import type { Model } from "mongoose";
import { dbConnect } from "@/lib/mongodb";
import SermonModel from "@/models/Sermon";
import EventModel from "@/models/Event";
import BlogPostModel from "@/models/BlogPost";
import PrayerRequestModel from "@/models/PrayerRequest";
import ContactMessageModel from "@/models/ContactMessage";
import NewsletterSubscriberModel from "@/models/NewsletterSubscriber";
import RsvpEntryModel from "@/models/RsvpEntry";
import ReviewModel from "@/models/Review";
import AdminCharts, { type ChartData } from "./AdminCharts";

export const dynamic = "force-dynamic";

// The six month buckets ending with the current month.
function lastSixMonths() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, idx) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
    return {
      key: `${d.getFullYear()}-${d.getMonth() + 1}`,
      label: d.toLocaleString("en-US", { month: "short" }),
    };
  });
}

// Counts documents per calendar month (from createdAt) since `start`.
async function monthlyCounts(model: Model<unknown>, start: Date) {
  const rows = await model.aggregate<{ _id: { y: number; m: number }; count: number }>([
    { $match: { createdAt: { $gte: start } } },
    { $group: { _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } }, count: { $sum: 1 } } },
  ]);
  const map = new Map<string, number>();
  for (const r of rows) map.set(`${r._id.y}-${r._id.m}`, r.count);
  return map;
}

async function getCounts() {
  await dbConnect();
  const [sermons, events, blogPosts, prayerRequests, messages, subscribers, rsvps] =
    await Promise.all([
      SermonModel.countDocuments(),
      EventModel.countDocuments(),
      BlogPostModel.countDocuments(),
      PrayerRequestModel.countDocuments(),
      ContactMessageModel.countDocuments(),
      NewsletterSubscriberModel.countDocuments(),
      RsvpEntryModel.countDocuments(),
    ]);
  return { sermons, events, blogPosts, prayerRequests, messages, subscribers, rsvps };
}

async function getChartData(counts: {
  sermons: number;
  events: number;
  blogPosts: number;
  prayerRequests: number;
}): Promise<ChartData> {
  const buckets = lastSixMonths();
  const start = new Date();
  start.setMonth(start.getMonth() - 5, 1);
  start.setHours(0, 0, 0, 0);

  const [prayerMonthly, messagesMonthly, subsMonthly, rsvpMonthly, prayed, ratingRows] =
    await Promise.all([
      monthlyCounts(PrayerRequestModel as unknown as Model<unknown>, start),
      monthlyCounts(ContactMessageModel as unknown as Model<unknown>, start),
      monthlyCounts(NewsletterSubscriberModel as unknown as Model<unknown>, start),
      monthlyCounts(RsvpEntryModel as unknown as Model<unknown>, start),
      PrayerRequestModel.countDocuments({ prayedFor: true }),
      ReviewModel.aggregate<{ _id: number; count: number }>([
        { $group: { _id: "$rating", count: { $sum: 1 } } },
      ]),
    ]);

  const series = (map: Map<string, number>) => buckets.map((b) => map.get(b.key) ?? 0);

  const ratingByStar = new Map<number, number>();
  for (const r of ratingRows) ratingByStar.set(r._id, r.count);
  const dist = [5, 4, 3, 2, 1].map((s) => ratingByStar.get(s) ?? 0);
  const ratingTotal = dist.reduce((a, b) => a + b, 0);
  const ratingSum = [5, 4, 3, 2, 1].reduce((a, s, i) => a + s * dist[i], 0);

  return {
    contentMix: [
      { label: "Sermons", value: counts.sermons },
      { label: "Events", value: counts.events },
      { label: "Blog Posts", value: counts.blogPosts },
    ],
    prayerStatus: { prayed, pending: Math.max(counts.prayerRequests - prayed, 0) },
    submissions: {
      months: buckets.map((b) => b.label),
      series: [
        { label: "Prayer Requests", values: series(prayerMonthly) },
        { label: "Contact Messages", values: series(messagesMonthly) },
        { label: "Newsletter", values: series(subsMonthly) },
        { label: "Event RSVPs", values: series(rsvpMonthly) },
      ],
    },
    ratings: {
      total: ratingTotal,
      average: ratingTotal > 0 ? ratingSum / ratingTotal : 0,
      dist,
    },
  };
}

const cards = [
  { key: "sermons", label: "Sermons", href: "/admin/sermons" },
  { key: "events", label: "Events", href: "/admin/events" },
  { key: "blogPosts", label: "Blog Posts", href: "/admin/blog" },
  { key: "prayerRequests", label: "Prayer Requests", href: "/admin/prayer-requests" },
  { key: "messages", label: "Contact Messages", href: "/admin/messages" },
  { key: "subscribers", label: "Newsletter Subscribers", href: "/admin/subscribers" },
  { key: "rsvps", label: "Event RSVPs", href: "/admin/rsvps" },
] as const;

export default async function AdminDashboardPage() {
  let counts: Awaited<ReturnType<typeof getCounts>> | null = null;
  let chartData: ChartData | null = null;
  let dbError: string | null = null;

  try {
    counts = await getCounts();
    chartData = await getChartData(counts);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not connect to the database.";
  }

  return (
    <div>
      <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">Dashboard</h1>
      <p className="font-sans text-[0.9rem] text-ink-soft mb-8">
        Overview of church content and submissions.
      </p>

      {dbError && (
        <div className="bg-wine/10 border border-wine/30 text-wine rounded-md px-5 py-4 font-sans text-[0.88rem] mb-8">
          <p className="font-semibold mb-1">Database not connected</p>
          <p>{dbError}</p>
          <p className="mt-2 text-ink-soft">
            Set <code className="bg-white/50 px-1 rounded">MONGODB_URI</code> in{" "}
            <code className="bg-white/50 px-1 rounded">.env.local</code> to a running MongoDB
            instance, then run <code className="bg-white/50 px-1 rounded">npm run seed</code>.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="bg-white border border-[color:var(--line)] rounded-lg p-6 hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <p className="font-display text-[2rem] font-semibold text-wine">
              {counts ? counts[c.key] : "—"}
            </p>
            <p className="font-sans text-[0.85rem] text-ink-soft mt-1">{c.label}</p>
          </Link>
        ))}
      </div>

      {chartData && (
        <div className="mt-8">
          <AdminCharts data={chartData} />
        </div>
      )}
    </div>
  );
}
