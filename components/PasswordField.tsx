"use client";

import { useEffect, useRef, useState } from "react";
import { checkPassword } from "@/lib/password";

const BAR_COLORS: Record<string, string> = {
  Empty: "transparent",
  Weak: "#B23A48",
  Fair: "#C9A227",
  Good: "#7A9A3B",
  Strong: "#2F8F5B",
};

export default function PasswordField({
  name = "password",
  label = "Password",
  // When set (e.g. reset form with no name/email inputs), used for the
  // "must not contain name/email" check instead of reading sibling inputs.
  identity,
  nameFieldName = "name",
  emailFieldName = "email",
}: {
  name?: string;
  label?: string;
  identity?: { name?: string; email?: string };
  nameFieldName?: string;
  emailFieldName?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  // Read the sibling name/email inputs from the same form (for the identity rule).
  const readIdentity = () => {
    if (identity) return identity;
    const form = inputRef.current?.form;
    const get = (n: string) =>
      (form?.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "";
    return { name: get(nameFieldName), email: get(emailFieldName) };
  };

  const [ident, setIdent] = useState<{ name?: string; email?: string }>(identity ?? {});

  // Keep the identity in sync when the user edits the name/email fields.
  useEffect(() => {
    if (identity) return;
    const form = inputRef.current?.form;
    if (!form) return;
    const update = () => setIdent(readIdentity());
    const nameEl = form.elements.namedItem(nameFieldName) as HTMLElement | null;
    const emailEl = form.elements.namedItem(emailFieldName) as HTMLElement | null;
    nameEl?.addEventListener("input", update);
    emailEl?.addEventListener("input", update);
    update();
    return () => {
      nameEl?.removeEventListener("input", update);
      emailEl?.removeEventListener("input", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const result = checkPassword(value, ident);
  const barWidth = value.length === 0 ? 0 : (result.score / 5) * 100;
  const showFeedback = focused || value.length > 0;

  return (
    <div>
      <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={show ? "text" : "password"}
          name={name}
          required
          autoComplete="new-password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 pr-16 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-[0.76rem] font-semibold text-ink-soft hover:text-wine"
          tabIndex={-1}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {showFeedback && (
        <div className="mt-2.5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-1.5 rounded-full bg-cream-dim overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${barWidth}%`, background: BAR_COLORS[result.label] }}
              />
            </div>
            <span
              className="font-sans text-[0.74rem] font-semibold w-12 text-right"
              style={{ color: result.label === "Empty" ? "#55483D" : BAR_COLORS[result.label] }}
            >
              {result.label === "Empty" ? "" : result.label}
            </span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
            {result.rules.map((r) => (
              <li
                key={r.id}
                className={`flex items-center gap-1.5 font-sans text-[0.76rem] ${
                  r.ok ? "text-forest" : "text-ink-soft"
                }`}
              >
                <span aria-hidden="true" className="w-3.5 shrink-0 text-center">
                  {r.ok ? "✓" : "○"}
                </span>
                {r.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
