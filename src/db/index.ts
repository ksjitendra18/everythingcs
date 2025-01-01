import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

if (!import.meta.env.TURSO_DB_URL || !import.meta.env.TURSO_DB_TOKEN) {
  throw new Error("Missing environment variables");
}

const client = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_DB_TOKEN,
});

export const db = drizzle(client, { schema, casing: "snake_case" });
