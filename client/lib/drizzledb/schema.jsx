import { sql } from "drizzle-orm";
import { integer, varchar, pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core";

// users schema
export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  phoneNo: varchar("phone_no").notNull(),
  address: text("address").notNull(),
  avatar: varchar("avatar").notNull(), // URL or path to profile image
  dateOfBirth: date("date_of_birth").notNull(),
  gender: varchar("gender").notNull(), // Store gender as a string
  medicalHistory: text("medical_history"),
  bloodGroup: varchar("blood_group"),
  age: integer("age").notNull(),
  location: varchar("location").notNull(),
  folders: text("folders")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  folder: text("folder")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  createdBy: varchar("created_by").notNull(),
});
// records schema
export const Records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  recordName: varchar("record_name").notNull(),
  analysisResult: varchar("analysis_result").notNull(),
  kanbanRecords: varchar("kanban_records").notNull(),
  createdBy: varchar("created_by").notNull(),
});

export const ChatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)  // Reference to Users table
    .notNull(),
  messageType: varchar("message_type").notNull(), // 'user' or 'bot'
  messageContent: text("message_content").notNull(),
  timestamp: timestamp("timestamp").default(sql`CURRENT_TIMESTAMP`).notNull(), // Time when the message was sent
});