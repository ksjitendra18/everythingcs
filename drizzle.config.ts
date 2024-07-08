import { defineConfig } from "drizzle-kit";

if (
  !process.env.CF_ACCOUNT_ID ||
  !process.env.CF_DATABASE_ID ||
  !process.env.CF_TOKEN
) {
  throw new Error("Missing CF_ACCOUNT_ID, CF_DATABASE_ID or CF_TOKEN");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID,
    databaseId: process.env.CF_DATABASE_ID,
    token: process.env.CF_TOKEN,
  },
});
