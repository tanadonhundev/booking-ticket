import { sql } from "drizzle-orm";
import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  mysqlEnum,
  int,
  decimal,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  role: mysqlEnum(["user", "admin"]).default("user"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 }).primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { fsp: 3 }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { fsp: 3 }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { fsp: 3 }).notNull(),
  createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const ticket = mysqlTable(
  "ticket",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 100 }).notNull(), // ชื่อตั๋ว เช่น “คอนเสิร์ต A”
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    // จำนวนทั้งหมดที่ขายได้
    total: int("total").notNull(),
    // จำนวนคงเหลือ
    remaining: int("remaining").notNull(),
    // สถานะว่าง / เต็ม
    status: mysqlEnum("status", ["available", "sold_out"])
      .notNull()
      .default("available"),

    // เวลาที่สร้าง
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
  },
  (table) => [primaryKey({ columns: [table.id], name: "ticket_id" })]
);

export const booking = mysqlTable(
  "booking",
  {
    id: int("id").autoincrement().notNull(),
    ticketId: int("ticket_id")
      .notNull()
      .references(() => ticket.id),
    userId: varchar("user_id", { length: 36 }).notNull(),
    quantity: int("quantity").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`(now())`
    ),
  },
  (table) => [primaryKey({ columns: [table.id], name: "booking_id" })]
);
