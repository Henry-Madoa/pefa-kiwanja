"use client";

import { useState } from "react";
import { submitPrayerRequest } from "@/lib/actions/public";

const categories = [
  "Healing",
  "Family",
  "Finances",
  "Guidance",
  "Salvation",
  "Thanksgiving",
  "Other",
];

export default function PrayerRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="bg-forest text-cream rounded-lg p-8 text-center">
        <p className="font-display text-[1.2rem] mb-2">Your request has been received</p>
        <p className="text-cream/70 text-[0.9rem]">
          Our prayer team will be lifting this up. Thank you for trusting us with it.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await submitPrayerRequest(new FormData(e.currentTarget));
        setLoading(false);
        if (result.ok) {
          setSubmitted(true);
        } else {
          setError(result.error);
        }
      }}
      className="space-y-5 bg-white border border-[color:var(--line)] rounded-lg p-8"
    >
      {error && (
        <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
            Name {anonymous && "(optional)"}
          </label>
          <input
            type="text"
            name="name"
            required={!anonymous}
            className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
          />
        </div>
        <div>
          <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
          />
        </div>
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Phone (Optional)
        </label>
        <input
          type="tel"
          name="phone"
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Prayer Category
        </label>
        <select
          name="category"
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Prayer Request
        </label>
        <textarea
          name="request"
          required
          rows={5}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <label className="flex items-center gap-2.5 font-sans text-[0.86rem] text-ink-soft">
        <input
          type="checkbox"
          name="anonymous"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="w-4 h-4 accent-wine"
        />
        Submit this request anonymously
      </label>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full sm:w-auto justify-center disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Prayer Request"}
      </button>
    </form>
  );
}
