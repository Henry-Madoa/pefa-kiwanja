"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups, isNavLinkActive, visibleNavGroups } from "./adminNav";

export default function Sidebar({ permissions }: { permissions: string[] }) {
  const pathname = usePathname();
  const groups = visibleNavGroups(navGroups, permissions);

  return (
    <aside className="w-[240px] shrink-0 bg-wine-deeper text-cream min-h-screen hidden md:flex flex-col">
      <div className="px-6 py-6 border-b border-cream/10">
        <div className="font-display font-semibold text-cream text-[1.05rem] leading-tight">
          PBKC
          <span className="block font-sans text-[0.62rem] font-semibold tracking-[0.16em] text-gold uppercase">
            Admin Portal
          </span>
        </div>
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
                    className={`block px-3 py-2 rounded-md font-sans text-[0.88rem] transition-colors ${
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
        <Link href="/" className="font-sans text-[0.82rem] text-cream/60 hover:text-gold-bright">
          &larr; Back to site
        </Link>
      </div>
    </aside>
  );
}
