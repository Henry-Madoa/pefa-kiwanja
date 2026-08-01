"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={async () => {
        // Sign out without NextAuth's own redirect (which resolves against
        // NEXTAUTH_URL and can wrongly send prod users to localhost). Then
        // navigate client-side so the browser uses the real current origin.
        await signOut({ redirect: false });
        window.location.href = "/login";
      }}
      className="font-sans text-[0.85rem] font-medium text-ink-soft hover:text-wine transition-colors"
    >
      Sign Out
    </button>
  );
}
