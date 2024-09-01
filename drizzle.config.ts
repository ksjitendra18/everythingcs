import { defineConfig } from "drizzle-kit";

if (!process.env.TURSO_DB_URL || !process.env.TURSO_DB_TOKEN) {
  throw new Error("Missing environment variables");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DB_URL,
    authToken: process.env.TURSO_DB_TOKEN,
  },
});
