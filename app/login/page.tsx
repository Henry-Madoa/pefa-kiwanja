import type { Metadata } from "next";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PageHero from "@/components/PageHero";
import { pageImages } from "@/lib/images";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | NCCI",
  description: "Sign in to your Nahum Christian Church International account.",
};

export default async function LoginPage() {
  // Already signed in? Send admins straight to the dashboard.
  const session = await getServerSession(authOptions);
  if (session) {
    const role = (session.user as { role?: string } | undefined)?.role;
    redirect(role === "admin" ? "/admin" : "/");
  }

  return (
    <>
      <PageHero
        eyebrow="Welcome Back"
        title="Login"
        description="Sign in to your account. Church staff are taken straight to the admin dashboard."
        image={pageImages.contact}
      />
      <section className="section">
        <div className="container-page max-w-[440px]">
          <div className="bg-white border border-[color:var(--line)] rounded-lg p-8">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
