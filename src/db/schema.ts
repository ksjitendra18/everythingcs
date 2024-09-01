import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const queries = sqliteTable("queries", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  blogPostLink: text("blog_post_link"),
  isResolved: integer("is_resolved", { mode: "boolean" })
    .notNull()
    .default(false),
  hasReplied: integer("has_replied", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const feedbacks = sqliteTable("feedbacks", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  rating: integer("rating").notNull(),
  message: text("message"),
  slug: text("slug").notNull(),
  isResolved: integer("is_resolved", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const events = sqliteTable("events", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  hash: text("hash").notNull(),
  type: text("type", {
    enum: ["load", "scroll", "end", "exit", "10s", "30s", "60s"],
  }).notNull(),
  slug: text("slug").notNull(),
  referrer: text("referrer").notNull(),
  city: text("country").notNull(),
  country: text("country").notNull(),
  os: text("os"),
  device: text("device"),
  browser: text("browser"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const tokens = sqliteTable("tokens", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  token: text("token").notNull(),
  expiresAt: integer("timestamp", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
