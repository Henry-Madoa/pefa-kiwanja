"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type Sermon, type ChurchEvent, type BlogPost, type Ministry } from "@/lib/data";

type Leader = { name: string; position: string };

export default function SearchPage({
  sermons,
  events,
  blogPosts,
  leaders,
  ministries = [],
}: {
  sermons: Sermon[];
  events: ChurchEvent[];
  blogPosts: BlogPost[];
  leaders: Leader[];
  ministries?: Ministry[];
}) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const items: { title: string; type: string; href: string; excerpt: string }[] = [];

    sermons.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q)) {
        items.push({ title: s.title, type: "Sermon", href: `/sermons/${s.slug}`, excerpt: s.speaker });
      }
    });
    events.forEach((e) => {
      if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)) {
        items.push({ title: e.title, type: "Event", href: `/events/${e.slug}`, excerpt: e.description });
      }
    });
    blogPosts.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)) {
        items.push({ title: b.title, type: "Blog", href: `/blog/${b.slug}`, excerpt: b.excerpt });
      }
    });
    ministries.forEach((m) => {
      if (m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)) {
        items.push({ title: m.name, type: "Ministry", href: `/ministries/${m.slug}`, excerpt: m.description });
      }
    });
    leaders.forEach((l) => {
      if (l.name.toLowerCase().includes(q) || l.position.toLowerCase().includes(q)) {
        items.push({ title: l.name, type: "Leadership", href: `/leadership`, excerpt: l.position });
      }
    });

    return items;
  }, [query, sermons, events, blogPosts, leaders, ministries]);

  return (
    <div>
      <input
        type="text"
        autoFocus
        placeholder="Search sermons, events, blog, ministries, leadership..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-[color:var(--line)] rounded-md px-5 py-4 font-sans text-[1rem] bg-white focus:outline-none focus:border-wine mb-8"
      />

      {query && results.length === 0 && (
        <p className="text-ink-soft">No results found for &ldquo;{query}&rdquo;.</p>
      )}

      <div className="space-y-3">
        {results.map((r) => (
          <Link
            href={r.href}
            key={`${r.type}-${r.title}`}
            className="block border border-[color:var(--line)] rounded-md px-6 py-4 bg-white hover:border-wine transition-colors"
          >
            <span className="eyebrow">{r.type}</span>
            <h3 className="text-[1.02rem] mt-1">{r.title}</h3>
            <p className="text-[0.86rem] text-ink-soft mt-1 line-clamp-1">{r.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
