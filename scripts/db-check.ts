// Quick connection test — verifies DATABASE_URL can authenticate against Atlas
// without touching any data. Run with: npm run db:check

import mongoose from "mongoose";

async function check() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("✗ DATABASE_URL is not set. Add it to .env.local.");
    process.exit(1);
  }

  // Show where we're connecting (host only — never print credentials).
  const host = uri.replace(/\/\/[^@]*@/, "//***@").replace(/\?.*$/, "");
  console.log(`Connecting to: ${host}`);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    const admin = mongoose.connection.db!.admin();
    await admin.ping();
    console.log("✓ Connection OK — authenticated successfully.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`✗ Connection FAILED: ${msg}`);
    if (/bad auth|Authentication failed/i.test(msg)) {
      console.error(
        "\n  → Wrong username/password. Reset the DB user's password in\n" +
          "    Atlas → Database Access, then update DATABASE_URL in .env AND .env.local."
      );
    } else if (/timed out|ETIMEDOUT|querySrv|ENOTFOUND/i.test(msg)) {
      console.error(
        "\n  → Can't reach the cluster. Check the host is correct and add your IP in\n" +
          "    Atlas → Network Access (or allow 0.0.0.0/0 for testing)."
      );
    }
    process.exit(1);
  }
}

check();
