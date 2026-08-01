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
          <svg width="36" height="40" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2C11 2 4 10 4 20V42H36V20C36 10 29 2 20 2Z"
              stroke="#B8923F"
              strokeWidth="1.6"
            />
            <path d="M20 10V34M12 22H28" stroke="#6E1423" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="font-display text-[1.05rem] font-bold text-wine leading-tight">
            Nahum Christian Church
            <span className="block font-sans text-[0.6rem] font-semibold tracking-[0.16em] text-ink-soft uppercase">
              International
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
