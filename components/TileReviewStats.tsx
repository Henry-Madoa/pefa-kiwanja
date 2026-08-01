"use client";

import { useRouter } from "next/navigation";

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="13"
          height="13"
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

export default function TileReviewStats({
  href,
  average,
  count,
}: {
  href: string;
  average: number;
  count: number;
}) {
  const router = useRouter();

  if (count === 0) {
    return (
      <div className="flex items-center gap-2 font-sans text-[0.76rem] text-ink-soft">
        <Stars value={0} />
        <span>No reviews yet</span>
      </div>
    );
  }

  const goToComments = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`${href}#reviews`);
  };

  return (
    <div className="flex items-center gap-2 font-sans text-[0.78rem]">
      <Stars value={Math.round(average)} />
      <span className="font-semibold text-ink">{average.toFixed(1)}</span>
      <span className="text-ink-soft">·</span>
      <span
        role="link"
        tabIndex={0}
        onClick={goToComments}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") goToComments(e);
        }}
        className="text-ink-soft hover:text-wine underline-offset-2 hover:underline cursor-pointer"
      >
        {count} {count === 1 ? "comment" : "comments"}
      </span>
    </div>
  );
}
