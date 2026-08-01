"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions/public";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (submitted) {
    return (
      <div className="bg-forest text-cream rounded-lg p-8 text-center">
        <p className="font-display text-[1.2rem] mb-2">Message sent!</p>
        <p className="text-cream/70 text-[0.9rem]">
          Thank you for reaching out. Our team will respond within 1–2 business days.
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
        const result = await submitContactMessage(new FormData(e.currentTarget));
        setLoading(false);
        if (result.ok) {
          setSubmitted(true);
        } else {
          setError(result.error);
        }
      }}
      className="space-y-5"
    >
      {error && (
        <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Message
        </label>
        <textarea
          required
          name="message"
          rows={5}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full sm:w-auto justify-center disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
