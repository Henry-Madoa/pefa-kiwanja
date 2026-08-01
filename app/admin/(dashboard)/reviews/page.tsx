import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import ReviewModel from "@/models/Review";
import { getCurrentUser } from "@/lib/rbac/access";
import { hasPermission } from "@/lib/rbac/permissions";
import { deleteReview, toggleApproved } from "./actions";

export const dynamic = "force-dynamic";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={n <= value ? "#E3C077" : "none"}
          stroke="#E3C077"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: { refType?: string; refSlug?: string };
}) {
  const canModerate = hasPermission((await getCurrentUser())?.permissions ?? [], "Review.Moderate");

  await dbConnect();

  const refType =
    searchParams.refType === "blog" || searchParams.refType === "sermon"
      ? searchParams.refType
      : undefined;
  const refSlug = searchParams.refSlug;
  const filter = refType && refSlug ? { refType, refSlug } : {};
  const isFiltered = Boolean(refType && refSlug);

  const reviews = await ReviewModel.find(filter).sort({ createdAt: -1 }).lean();
  const pendingCount = reviews.filter((r) => !r.approved).length;
  const filterTitle = isFiltered ? reviews[0]?.refTitle : undefined;

  return (
    <div>
      <div className="mb-8">
        {isFiltered && (
          <Link
            href="/admin/reviews"
            className="font-sans text-[0.82rem] text-ink-soft hover:text-wine inline-block mb-2"
          >
            &larr; All comments &amp; ratings
          </Link>
        )}
        <h1 className="font-display text-[1.6rem] font-semibold text-ink mb-1">
          Comments &amp; Ratings
          {isFiltered && (
            <span className="font-sans font-normal text-ink-soft text-[1rem]">
              {" "}
              · <span className="capitalize">{refType}</span>: {filterTitle ?? refSlug}
            </span>
          )}
        </h1>
        <p className="font-sans text-[0.9rem] text-ink-soft">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
          {isFiltered ? " for this item" : ""}
          {pendingCount > 0 && (
            <span className="ml-2 text-gold-bright font-medium">
              · {pendingCount} pending approval
            </span>
          )}
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => {
          const href = `/${r.refType}/${r.refSlug}`;
          return (
            <div
              key={String(r._id)}
              className={`bg-white border rounded-lg p-6 ${
                r.approved ? "border-[color:var(--line)]" : "border-gold/40 bg-gold/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-sans font-semibold text-ink flex items-center gap-2">
                    {r.name}
                    <Stars value={r.rating} />
                    {!r.approved && (
                      <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-gold-bright bg-gold/15 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    )}
                  </p>
                  <p className="font-sans text-[0.8rem] text-ink-soft">
                    {r.email ? `${r.email} · ` : ""}
                    <span className="capitalize">{r.refType}</span>:{" "}
                    <Link href={href} className="text-wine hover:underline">
                      {r.refTitle}
                    </Link>
                  </p>
                </div>
                <p className="font-sans text-[0.78rem] text-ink-soft whitespace-nowrap">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                </p>
              </div>
              {r.comment && (
                <p className="font-sans text-[0.9rem] text-ink mb-4">{r.comment}</p>
              )}
              <div className="flex items-center gap-4">
                <form action={toggleApproved.bind(null, String(r._id), Boolean(r.approved))}>
                  <button
                    type="submit"
                    disabled={!canModerate}
                    title={canModerate ? undefined : "View-only access"}
                    className={`font-sans text-[0.82rem] font-medium disabled:opacity-40 disabled:cursor-not-allowed ${
                      r.approved ? "text-forest" : "text-ink-soft hover:text-forest"
                    }`}
                  >
                    {r.approved ? "✓ Approved" : "Approve"}
                  </button>
                </form>
                <form action={deleteReview.bind(null, String(r._id))}>
                  <button
                    type="submit"
                    disabled={!canModerate}
                    title={canModerate ? undefined : "View-only access"}
                    className="font-sans text-[0.82rem] text-ink-soft hover:text-wine disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {reviews.length === 0 && (
          <p className="text-center text-ink-soft font-sans py-10">
            {isFiltered
              ? "No comments or ratings for this item yet."
              : "No comments or ratings yet."}
          </p>
        )}
      </div>
    </div>
  );
}
