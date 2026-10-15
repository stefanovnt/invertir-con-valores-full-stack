import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Next.js reads .env.local; load it first for drizzle-kit too.
config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
