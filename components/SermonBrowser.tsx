"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate, type Sermon } from "@/lib/data";
import TileReviewStats from "@/components/TileReviewStats";
import type { ReviewStats } from "@/lib/reviews";

const categories = ["All", "Sunday Service", "Midweek Service", "Conference", "Special Event"];

export default function SermonBrowser({
  sermons,
  stats = {},
}: {
  sermons: Sermon[];
  stats?: Record<string, ReviewStats>;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.speaker.toLowerCase().includes(q) ||
        s.scripture.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [sermons, query, category]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by title, speaker, or scripture..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.92rem] bg-white focus:outline-none focus:border-wine"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.92rem] bg-white focus:outline-none focus:border-wine"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft">No sermons match your search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((sermon) => (
            <Link
              href={`/sermons/${sermon.slug}`}
              key={sermon.slug}
              className="bg-white border border-[color:var(--line)] rounded-lg overflow-hidden block hover:-translate-y-1 transition-transform"
            >
              <div className="aspect-video bg-wine-deeper flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#E3C077">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="p-6">
                <span className="eyebrow block mb-2">{sermon.category}</span>
                <h3 className="text-[1.05rem] mb-2 leading-snug">{sermon.title}</h3>
                <p className="text-[0.85rem] text-ink-soft mb-1">{sermon.speaker}</p>
                <p className="text-[0.8rem] text-ink-soft">{sermon.scripture}</p>
                <div className="flex justify-between items-center mt-4 font-sans text-[0.76rem] text-gold font-semibold">
                  <span>{formatDate(sermon.date)}</span>
                  <span>{sermon.duration}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-[color:var(--line)]">
                  <TileReviewStats
                    href={`/sermons/${sermon.slug}`}
                    average={stats[sermon.slug]?.average ?? 0}
                    count={stats[sermon.slug]?.count ?? 0}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
