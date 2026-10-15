import "server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Imported lazily (only when DATABASE_URL is set) so the site works without a DB.
// Small pool: on serverless every instance opens its own connections.
// Use a pooled connection string (e.g. Supabase/Neon pooler) in production.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  idleTimeoutMillis: 10_000,
});

export const db = drizzle({ client: pool });
