"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitReview } from "@/lib/actions/public";

export type Review = {
  _id: string;
  name: string;
  rating: number;
  comment?: string;
  createdAt?: string;
};

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
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

export default function ReviewSection({
  refType,
  refSlug,
  refTitle,
  reviews,
}: {
  refType: "blog" | "sermon";
  refSlug: string;
  refTitle: string;
  reviews: Review[];
}) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const count = reviews.length;
  const average = count
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
    : 0;

  const noun = refType === "blog" ? "post" : "sermon";

  return (
    <div id="reviews" className="border-t border-[color:var(--line)] mt-12 pt-10 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <span className="eyebrow block mb-2">Community</span>
          <h2 className="text-[1.5rem]">Comments &amp; Ratings</h2>
        </div>
        {count > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <Stars value={Math.round(average)} size={18} />
              <span className="font-sans font-semibold text-ink">{average.toFixed(1)}</span>
            </div>
            <p className="font-sans text-[0.8rem] text-ink-soft mt-1">
              {count} {count === 1 ? "review" : "reviews"}
            </p>
          </div>
        )}
      </div>

      {/* Existing reviews */}
      <div className="space-y-5 mb-10">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white border border-[color:var(--line)] rounded-lg p-5"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="font-sans font-semibold text-ink">{r.name}</p>
              <p className="font-sans text-[0.76rem] text-ink-soft whitespace-nowrap">
                {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
            <Stars value={r.rating} />
            {r.comment && (
              <p className="text-[0.92rem] text-ink-soft leading-relaxed mt-3">{r.comment}</p>
            )}
          </div>
        ))}
        {count === 0 && (
          <p className="font-sans text-[0.9rem] text-ink-soft">
            No reviews yet. Be the first to share your thoughts on this {noun}.
          </p>
        )}
      </div>

      {/* Submission form */}
      {submitted ? (
        <div className="bg-forest text-cream rounded-lg p-6 text-center">
          <p className="font-medium">Thank you for your feedback!</p>
          <p className="text-cream/70 text-[0.85rem] mt-1">Your review has been posted.</p>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            const formData = new FormData(e.currentTarget);
            formData.set("rating", String(rating));
            setLoading(true);
            const result = await submitReview(refType, refSlug, refTitle, formData);
            setLoading(false);
            if (result.ok) {
              setSubmitted(true);
              router.refresh();
            } else {
              setError(result.error);
            }
          }}
          className="bg-cream-dim rounded-lg p-6 space-y-4"
        >
          <h3 className="text-[1.1rem]">Leave a review</h3>
          {error && (
            <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
              {error}
            </p>
          )}
          <div>
            <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  className="p-0.5"
                  aria-label={`Rate ${n} ${n === 1 ? "star" : "stars"}`}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill={n <= (hover || rating) ? "#E3C077" : "none"}
                    stroke="#E3C077"
                    strokeWidth="1.4"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] bg-white focus:outline-none focus:border-wine"
              />
            </div>
            <div>
              <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
                Email <span className="font-normal text-ink-soft/70">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] bg-white focus:outline-none focus:border-wine"
              />
            </div>
          </div>
          <div>
            <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
              Comment <span className="font-normal text-ink-soft/70">(optional)</span>
            </label>
            <textarea
              name="comment"
              rows={4}
              className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] bg-white focus:outline-none focus:border-wine resize-y"
              placeholder={`Share what this ${noun} meant to you...`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary justify-center disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Review"}
          </button>
        </form>
      )}
    </div>
  );
}
