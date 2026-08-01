"use client";

import { useState } from "react";
import { submitRsvp } from "@/lib/actions/public";

export default function RsvpForm({ eventSlug, eventTitle }: { eventSlug: string; eventTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="bg-forest text-cream rounded-lg p-6 text-center">
        <p className="font-medium">You&apos;re registered for {eventTitle}!</p>
        <p className="text-cream/70 text-[0.85rem] mt-1">
          We&apos;ll send a confirmation to your email shortly.
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
        const result = await submitRsvp(eventSlug, eventTitle, new FormData(e.currentTarget));
        setLoading(false);
        if (result.ok) {
          setSubmitted(true);
        } else {
          setError(result.error);
        }
      }}
      className="space-y-4"
    >
      {error && (
        <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
          {error}
        </p>
      )}
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Full Name
        </label>
        <input
          required
          type="text"
          name="name"
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Email Address
        </label>
        <input
          required
          type="email"
          name="email"
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Number of Guests
        </label>
        <input
          type="number"
          name="guests"
          min={1}
          defaultValue={1}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {loading ? "Submitting..." : `RSVP for ${eventTitle}`}
      </button>
    </form>
  );
}
