import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/rbac/access";
import { canAccessAdmin } from "@/lib/rbac/resolve";
import Sidebar from "./Sidebar";
import AdminMobileNav from "./AdminMobileNav";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "@/components/ThemeToggle";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }
  // Defense in depth beyond middleware: resolve fresh permissions and require
  // the user to hold at least one admin-scoped permission.
  const user = await getCurrentUser();
  if (!user || !canAccessAdmin(user.permissions)) {
    redirect("/");
  }
  const permissions = user.permissions;

  return (
    <div className="min-h-screen flex bg-cream-dim">
      <Sidebar permissions={permissions} />
      <div className="flex-1 min-w-0">
        <header className="flex items-center justify-between px-6 md:px-10 py-4 bg-page border-b border-[color:var(--line)]">
          <div className="flex items-center gap-2 min-w-0">
            <AdminMobileNav permissions={permissions} />
            <p className="font-sans text-[0.85rem] text-ink-soft truncate">
              Signed in as <span className="font-semibold text-ink">{user.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignOutButton />
          </div>
        </header>
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
