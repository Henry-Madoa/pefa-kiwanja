"use client";

import { useState } from "react";

const swatches = [
  "#6E1423", "#B8923F", "#1F3A2B", "#430B15", "#55483D", "#8a6c2d",
  "#2E070E", "#E3C077", "#6E1423", "#1F3A2B", "#B8923F", "#430B15",
];

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {swatches.map((color, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="aspect-square rounded-md hover:opacity-80 transition-opacity"
            style={{ background: color }}
            aria-label={`Open photo ${i + 1}`}
          />
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-[600px] aspect-video rounded-lg"
            style={{ background: swatches[active] }}
          />
        </div>
      )}
    </>
  );
}
