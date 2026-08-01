import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/sermons", label: "Sermons" },
  { href: "/ministries", label: "Ministries" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
  { href: "/search", label: "Search" },
];

export default async function Header() {
  const session = await getServerSession(authOptions);
  const u = session?.user as { role?: string; adminAccess?: boolean } | undefined;
  const isAdmin = u?.role === "admin" || u?.adminAccess === true;

  return (
    <header className="sticky top-0 z-[100] bg-page/90 backdrop-blur-sm border-b border-[color:var(--line)]">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-[10px] bg-purple shrink-0">
            <svg width="26" height="28" viewBox="0 0 52 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g stroke="#D8B878" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                {/* cross */}
                <path d="M26 4V15M21.5 8.5H30.5" />
                {/* steeple roof */}
                <path d="M26 15L38 27H14L26 15Z" />
                {/* nave walls */}
                <path d="M17 27V44H35V27" />
                {/* side aisles */}
                <path d="M17 32L9 38V44H17M35 32L43 38V44H35" />
                {/* arched door */}
                <path d="M22 44V35a4 4 0 0 1 8 0v9" />
              </g>
            </svg>
          </span>
          <div className="font-display text-[1.02rem] font-bold text-wine leading-[1.1]">
            PEFA Branch Kiwanja
            <span className="block font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-gold uppercase">
              Cathedral
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex gap-8 font-sans text-[0.88rem] font-medium text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 hover:text-wine transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle className="-mr-1" />
          {isAdmin ? (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 font-sans text-[0.88rem] font-semibold text-wine hover:text-wine-dark transition-colors"
            >
              Admin
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline font-sans text-[0.88rem] font-medium text-ink-soft hover:text-wine transition-colors"
            >
              Login
            </Link>
          )}
          <Link href="/give" className="btn bg-wine text-cream hover:bg-wine-dark whitespace-nowrap">
            Give Online
          </Link>
          <MobileNav links={navLinks} isAdmin={isAdmin} />
        </div>
      </div>
    </header>
  );
}
