import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import AdminUserModel from "@/models/AdminUser";
import { resolvePermissions, canAccessAdmin } from "@/lib/rbac/resolve";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const user = await AdminUserModel.findOne({
          email: credentials.email.toLowerCase().trim(),
        });
        if (!user) return null;
        // Deactivated accounts cannot sign in.
        if (user.isActive === false) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        const permissions = await resolvePermissions(user);
        user.lastLoginAt = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role ?? "member",
          adminAccess: canAccessAdmin(permissions),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "member";
        token.adminAccess = (user as { adminAccess?: boolean }).adminAccess ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as { id?: string; role?: string; adminAccess?: boolean };
        u.id = token.id as string;
        u.role = (token.role as string) ?? "member";
        u.adminAccess = (token.adminAccess as boolean) ?? false;
      }
      return session;
    },
  },
};
