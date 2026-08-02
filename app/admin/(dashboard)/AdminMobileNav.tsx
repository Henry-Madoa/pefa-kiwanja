"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, isNavLinkActive, visibleNavGroups } from "./adminNav";

export default function AdminMobileNav({ permissions }: { permissions: string[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const groups = visibleNavGroups(navGroups, permissions);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="admin-mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center w-10 h-10 -ml-2 text-wine hover:text-wine-dark"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[90] bg-ink/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div
            id="admin-mobile-nav"
            className="fixed inset-y-0 left-0 z-[100] w-[260px] bg-wine-deeper text-cream flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-cream/10">
              <div className="font-display font-semibold text-cream text-[1.05rem] leading-tight">
                PBKC
                <span className="block font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  Admin Portal
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-cream/70 hover:text-cream"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-3 py-5 space-y-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="px-3 mb-2 font-sans text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-cream/40">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.links.map((link) => {
                      const active = isNavLinkActive(link.href, pathname);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block px-3 py-2.5 rounded-md font-sans text-[0.9rem] transition-colors ${
                            active
                              ? "bg-gold/15 text-gold-bright font-medium"
                              : "text-cream/75 hover:bg-cream/5 hover:text-cream"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="px-6 py-5 border-t border-cream/10">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-sans text-[0.82rem] text-cream/60 hover:text-gold-bright"
              >
                &larr; Back to site
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
