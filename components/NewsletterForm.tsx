"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/actions/public";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="bg-forest text-cream rounded-lg p-8 text-center">
        <p className="font-display text-[1.2rem] mb-2">You&apos;re subscribed!</p>
        <p className="text-cream/70 text-[0.9rem]">
          Watch your inbox for updates from PBKC.
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
        const result = await subscribeNewsletter(new FormData(e.currentTarget));
        setLoading(false);
        if (result.ok) {
          setSubmitted(true);
        } else {
          setError(result.error);
        }
      }}
      className="bg-white border border-[color:var(--line)] rounded-lg p-8 space-y-5"
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
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
