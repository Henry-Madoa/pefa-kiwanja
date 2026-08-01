// Seeds MongoDB with the sample content from lib/data.ts and creates the first
// admin user. Run with: npm run seed
// Requires MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD (and optionally ADMIN_NAME)
// in .env.local.

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { sermons, events, blogPosts, leadership, ministries } from "../lib/data";
import AdminUserModel from "../models/AdminUser";
import SermonModel from "../models/Sermon";
import EventModel from "../models/Event";
import BlogPostModel from "../models/BlogPost";
import LeaderModel from "../models/Leader";
import MinistryModel from "../models/Ministry";

async function seed() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local first.");
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local first.");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);

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

  console.log("Seeding sermons...");
  await SermonModel.deleteMany({});
  await SermonModel.insertMany(sermons);

  console.log("Seeding events...");
  await EventModel.deleteMany({});
  await EventModel.insertMany(events);

  console.log("Seeding blog posts...");
  await BlogPostModel.deleteMany({});
  await BlogPostModel.insertMany(blogPosts);

  console.log("Seeding leadership...");
  await LeaderModel.deleteMany({});
  await LeaderModel.insertMany(
    leadership.map((l, i) => ({
      name: l.name,
      position: l.position,
      bio: l.bio,
      responsibilities: l.responsibilities,
      order: i,
    }))
  );

  console.log("Seeding ministries...");
  await MinistryModel.deleteMany({});
  await MinistryModel.insertMany(ministries.map((m, i) => ({ ...m, order: i })));

  console.log("\nDone.");
  console.log(`  Admin login: ${ADMIN_EMAIL}`);
  console.log(`  Sermons: ${sermons.length}`);
  console.log(`  Events: ${events.length}`);
  console.log(`  Blog posts: ${blogPosts.length}`);
  console.log(`  Leaders: ${leadership.length}`);
  console.log(`  Ministries: ${ministries.length}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
