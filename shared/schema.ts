import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  companyName: text("company_name"),
  role: text("role").notNull().default("client"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  scope: jsonb("scope"),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  clientId: true,
  title: true,
  description: true,
  status: true,
  scope: true,
});

// Project files table
export const projectFiles = pgTable("project_files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileUrl: text("file_url").notNull(),
  isDeliverable: boolean("is_deliverable").default(false),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  uploadedById: integer("uploaded_by_id").notNull(),
});

export const insertProjectFileSchema = createInsertSchema(projectFiles).pick({
  projectId: true,
  fileName: true,
  fileType: true,
  fileUrl: true,
  isDeliverable: true,
  uploadedById: true,
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  senderId: integer("sender_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  projectId: true,
  senderId: true,
  content: true,
});

// Onboarding data table
export const onboardingData = pgTable("onboarding_data", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  brandIdentity: jsonb("brand_identity"),
  targetAudience: jsonb("target_audience"),
  visualStyle: jsonb("visual_style"),
  brandVoice: jsonb("brand_voice"),
  projectGoals: jsonb("project_goals"),
  completedSteps: integer("completed_steps").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOnboardingDataSchema = createInsertSchema(onboardingData).pick({
  clientId: true,
  brandIdentity: true,
  targetAudience: true,
  visualStyle: true,
  brandVoice: true,
  projectGoals: true,
  completedSteps: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectFile = z.infer<typeof insertProjectFileSchema>;
export type ProjectFile = typeof projectFiles.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertOnboardingData = z.infer<typeof insertOnboardingDataSchema>;
export type OnboardingData = typeof onboardingData.$inferSelect;
