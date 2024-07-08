import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, int } from "drizzle-orm/sqlite-core";

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

export const queries = sqliteTable("queries", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
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
  ip: text("ip").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const feedbacks = sqliteTable("feedbacks", {
  id: integer("id").primaryKey(),
  rating: integer("rating").notNull(),
  message: text("message"),
  slug: text("slug").notNull(),
  isResolved: integer("is_resolved", { mode: "boolean" })
    .notNull()
    .default(false),
  ip: text("ip").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const events = sqliteTable("events", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  type: text("type").notNull(),
  slug: text("slug").notNull(),
  referrer: text("referrer").notNull(),
  city: text("country").notNull(),
  country: text("country").notNull(),
  os: text("os"),
  browser: text("browser"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const tokens = sqliteTable("tokens", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  expiresAt: int("timestamp", { mode: "timestamp" }).notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
