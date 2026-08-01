// Seeds the default RBAC roles and migrates existing admin accounts to the
// Super Administrator role. Non-destructive and idempotent — safe to re-run.
// Run with: npm run seed:rbac   (requires DATABASE_URL in .env.local)

import mongoose from "mongoose";
import RoleModel from "../models/Role";
import AdminUserModel from "../models/AdminUser";
import { DEFAULT_ROLES, SUPER_ADMIN_ROLE } from "../lib/rbac/default-roles";

async function seedRbac() {
  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL) throw new Error("DATABASE_URL is not set. Add it to .env.local first.");

  console.log("Connecting to MongoDB...");
  await mongoose.connect(DATABASE_URL);

  console.log("Upserting default roles...");
  for (const r of DEFAULT_ROLES) {
    await RoleModel.findOneAndUpdate(
      { name: r.name },
      {
        $set: {
          description: r.description,
          permissions: r.permissions,
          isSystem: r.isSystem,
        },
      },
      { upsert: true }
    );
    console.log(`  ✓ ${r.name}`);
  }

  const superAdmin = await RoleModel.findOne({ name: SUPER_ADMIN_ROLE }).lean<{ _id: unknown }>();

  console.log("Migrating legacy admin accounts → Super Administrator...");
  const legacyAdmins = await AdminUserModel.find({
    role: "admin",
    $or: [{ roles: { $exists: false } }, { roles: { $size: 0 } }],
  });
  for (const u of legacyAdmins) {
    u.roles = [superAdmin!._id] as unknown as typeof u.roles;
    if (u.isActive === undefined) u.isActive = true;
    await u.save();
    console.log(`  ✓ ${u.email}`);
  }

  console.log(`Done. ${DEFAULT_ROLES.length} roles, ${legacyAdmins.length} account(s) migrated.`);
  await mongoose.disconnect();
  process.exit(0);
}

seedRbac().catch((err) => {
  console.error(err);
  process.exit(1);
});
