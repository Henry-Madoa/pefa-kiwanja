import Link from "next/link";
import type { AdminReviewStats } from "@/lib/reviews";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex align-middle" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="12"
          height="12"
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

export default function AdminReviewsCell({
  refType,
  refSlug,
  stats,
}: {
  refType: "blog" | "sermon";
  refSlug: string;
  stats?: AdminReviewStats;
}) {
  if (!stats || stats.count === 0) {
    return <span className="text-ink-soft/60">—</span>;
  }

  return (
    <Link
      href={`/admin/reviews?refType=${refType}&refSlug=${refSlug}`}
      className="inline-flex items-center gap-2 group"
    >
      <Stars value={Math.round(stats.average)} />
      <span className="font-medium text-ink group-hover:text-wine">
        {stats.average.toFixed(1)}
      </span>
      <span className="text-ink-soft group-hover:text-wine">
        · {stats.count} {stats.count === 1 ? "review" : "reviews"}
      </span>
      {stats.pending > 0 && (
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-gold-bright bg-gold/15 px-2 py-0.5 rounded-full">
          {stats.pending} pending
        </span>
      )}
    </Link>
  );
}
