import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramId: text("telegram_id").notNull().unique(),
  username: text("username").notNull(),
  role: text("role"),
  balance: integer("balance").notNull().default(0),
  rating: integer("rating").notNull().default(0),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budget: integer("budget").notNull(),
  deadline: timestamp("deadline").notNull(),
  createdBy: integer("created_by").notNull(),
  status: text("status").notNull().default("open"),
  assignedTo: integer("assigned_to"),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").notNull(),
  userId: integer("user_id").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").notNull().default(new Date()),
});

export const insertUserSchema = createInsertSchema(users).pick({
  telegramId: true,
  username: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  role: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  budget: true,
  deadline: true,
  createdBy: true,
});

export const insertProposalSchema = createInsertSchema(proposals).pick({
  taskId: true,
  userId: true,
  message: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  taskId: true,
  userId: true,
  content: true,
});

export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;