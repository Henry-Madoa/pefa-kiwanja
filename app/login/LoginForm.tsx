"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setLoading(false);
      setError("Invalid email or password.");
      return;
    }

    // Decide where to land based on the account's admin access.
    const session = await getSession();
    const u = session?.user as { role?: string; adminAccess?: boolean } | undefined;
    const isAdmin = u?.role === "admin" || u?.adminAccess === true;

    let destination: string;
    if (isAdmin) {
      // Admins go to the dashboard (or back to the admin page they wanted).
      destination = callbackUrl.startsWith("/admin") ? callbackUrl : "/admin";
    } else {
      // Members never land on an admin route.
      destination = callbackUrl && !callbackUrl.startsWith("/admin") ? callbackUrl : "/";
    }

    router.push(destination);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="bg-wine/10 border border-wine/30 text-wine rounded-md px-4 py-3 text-[0.85rem] font-sans">
          {error}
        </p>
      )}
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Email
        </label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <div>
        <label className="block font-sans text-[0.82rem] font-semibold text-ink-soft mb-1.5">
          Password
        </label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[color:var(--line)] rounded-md px-4 py-3 font-sans text-[0.9rem] focus:outline-none focus:border-wine"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-full justify-center disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
