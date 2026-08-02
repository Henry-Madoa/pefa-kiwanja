// Creates (or updates) the first admin user. Run with: npm run seed
// Requires DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD (and optionally ADMIN_NAME)
// in .env.local.
//
// Site content (sermons, events, blog posts, leadership, ministries, gallery)
// now lives in MongoDB and is managed through the admin portal, so it is no
// longer seeded from source. This script is deliberately non-destructive: it
// only upserts the admin account and never deletes content.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUserModel from "../models/AdminUser";

async function seed() {
  const { DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local first.");
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local first.");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(DATABASE_URL);

  console.log("Seeding admin user...");
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await AdminUserModel.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase().trim() },
    {
      name: ADMIN_NAME || "Admin",
      email: ADMIN_EMAIL.toLowerCase().trim(),
      passwordHash,
      role: "admin",
    },
    { upsert: true }
  );

  console.log("\nDone.");
  console.log(`  Admin login: ${ADMIN_EMAIL}`);
  console.log("  Site content is managed in the admin portal (not seeded).");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
