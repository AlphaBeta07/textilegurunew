import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Program schema
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  //description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  subjectsCount: integer("subjects_count").notNull().default(5),
  totalAudioCount: integer("total_audio_count").notNull().default(0),
});

export const insertProgramSchema = createInsertSchema(programs).omit({
  id: true,
});

// Subject schema
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  chaptersCount: integer("chapters_count").notNull().default(6),
  //durationHours: integer("duration_hours").notNull(),
});

export const insertSubjectSchema = createInsertSchema(subjects).omit({
  id: true,
});

// Chapter schema
export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull(),
  name: text("name").notNull(),
  //description: text("description").notNull(),
  //iconType: text("icon_type").notNull(),
  audioCount: integer("audio_count").notNull().default(6),
  durationMinutes: integer("duration_minutes").notNull(),
  progress: integer("progress").notNull().default(0), // 0-100 percent
  completedLessons: integer("completed_lessons").notNull().default(0),
});

export const insertChapterSchema = createInsertSchema(chapters).omit({
  id: true,
});

// Audio Lesson schema
export const audioLessons = pgTable("audio_lessons", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").notNull(),
  title: text("title").notNull(),
  //description: text("description").notNull(),
  //durationSeconds: integer("duration_seconds").notNull(),
  //completed: boolean("completed").notNull().default(false),
  audioUrl: text("audio_url").notNull(),
});

export const insertAudioLessonSchema = createInsertSchema(audioLessons).omit({
  id: true,
});

// Types based on schemas
export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Subject = typeof subjects.$inferSelect;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;

export type Chapter = typeof chapters.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;

export type AudioLesson = typeof audioLessons.$inferSelect;
export type InsertAudioLesson = z.infer<typeof insertAudioLessonSchema>;
