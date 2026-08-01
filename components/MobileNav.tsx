"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };

export default function MobileNav({
  links,
  isAdmin,
}: {
  links: NavLink[];
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 -mr-1 text-wine hover:text-wine-dark"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute top-full left-0 w-full bg-page border-b border-[color:var(--line)] shadow-lg"
        >
          <nav className="container-page flex flex-col py-3 font-sans text-[0.95rem] font-medium text-ink-soft">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-[color:var(--line)] last:border-0 hover:text-wine transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAdmin ? "/admin" : "/login"}
              onClick={() => setOpen(false)}
              className="py-3 border-t border-[color:var(--line)] text-wine font-semibold hover:text-wine-dark transition-colors"
            >
              {isAdmin ? "Admin" : "Login"}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
