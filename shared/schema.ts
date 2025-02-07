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
  // Profile fields
  fullName: text("full_name"),
  location: text("location"),
  bio: text("bio"),
  hourlyRate: integer("hourly_rate"),
  personalWebsite: text("personal_website"),
  portfolioUrl: text("portfolio_url"),
  calendlyUrl: text("calendly_url"),
  availableForWork: boolean("available_for_work").default(false),
  joinedDate: timestamp("joined_date").defaultNow(),
});

export const workHistory = pgTable("work_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  current: boolean("current").default(false),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  school: text("school").notNull(),
  field: text("field").notNull(),
  year: integer("year").notNull(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
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

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  telegramId: true,
  username: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  role: true,
});

export const updateProfileSchema = createInsertSchema(users).pick({
  fullName: true,
  location: true,
  bio: true,
  hourlyRate: true,
  personalWebsite: true,
  portfolioUrl: true,
  calendlyUrl: true,
  availableForWork: true,
});

export const insertWorkHistorySchema = createInsertSchema(workHistory).pick({
  userId: true,
  title: true,
  company: true,
  startDate: true,
  endDate: true,
  current: true,
});

export const insertEducationSchema = createInsertSchema(education).pick({
  userId: true,
  school: true,
  field: true,
  year: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).pick({
  userId: true,
  title: true,
  description: true,
  imageUrl: true,
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

// Type definitions
export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Proposal = typeof proposals.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type WorkHistory = typeof workHistory.$inferSelect;
export type Education = typeof education.$inferSelect;
export type PortfolioItem = typeof portfolioItems.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type InsertWorkHistory = z.infer<typeof insertWorkHistorySchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;