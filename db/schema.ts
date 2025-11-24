import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  iam: text("iam").notNull(),
  purpose: text("purpose").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});   