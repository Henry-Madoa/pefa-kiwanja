"use client";

import { useState } from "react";

const givingCategories = [
  "Tithes",
  "Offerings",
  "Missions",
  "Building Fund",
  "Thanksgiving",
  "Special Projects",
];

const paymentMethods = [
  { id: "mobile-money", label: "Mobile Money" },
  { id: "bank-transfer", label: "Bank Transfer" },
  { id: "card", label: "Card Payment" },
  { id: "paypal", label: "PayPal" },
];

const presetAmounts = [500, 1000, 2500, 5000];

export default function GivingForm() {
  const [category, setCategory] = useState(givingCategories[0]);
  const [method, setMethod] = useState(paymentMethods[0].id);
  const [amount, setAmount] = useState<number | "">(1000);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-forest text-cream rounded-lg p-8 text-center">
        <p className="font-display text-[1.2rem] mb-2">Thank you for your generosity!</p>
        <p className="text-cream/70 text-[0.9rem]">
          A receipt for your {category.toLowerCase()} gift of KES {amount || 0} will be sent to
          your email.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="bg-white border border-[color:var(--line)] rounded-lg p-8 space-y-6"
    >
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-2">
          Giving Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        >
          {givingCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-2">
          Amount (KES)
        </label>
        <div className="flex flex-wrap gap-2.5 mb-3">
          {presetAmounts.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => setAmount(a)}
              className={`font-sans text-[0.85rem] font-semibold px-4 py-2 rounded-full border transition-colors ${
                amount === a
                  ? "bg-wine text-cream border-wine"
                  : "border-[color:var(--line)] text-ink-soft hover:border-wine"
              }`}
            >
              {a.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>

      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-2">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`font-sans text-[0.85rem] font-medium px-4 py-3 rounded-md border text-left transition-colors ${
                method === m.id
                  ? "bg-cream-dim border-wine text-wine"
                  : "border-[color:var(--line)] text-ink-soft hover:border-wine"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-full justify-center">
        Give KES {amount || 0} &rarr;
      </button>
      <p className="text-[0.78rem] text-ink-soft text-center">
        Payments are processed securely. A donation receipt will be emailed to you.
      </p>
    </form>
  );
}
