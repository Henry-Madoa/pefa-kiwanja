"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[color:var(--line)] border border-[color:var(--line)] rounded-lg overflow-hidden bg-white">
      {faqs.map((faq, i) => (
        <div key={faq.question}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <div>
              <span className="eyebrow block mb-1">{faq.category}</span>
              <span className="font-medium text-ink">{faq.question}</span>
            </div>
            <span className="text-gold text-xl flex-shrink-0">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-ink-soft text-[0.92rem] leading-relaxed">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
