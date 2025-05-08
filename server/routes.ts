import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { 
  insertProgramSchema, 
  insertSubjectSchema, 
  insertChapterSchema, 
  insertAudioLessonSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get("/api/programs", async (req: Request, res: Response) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req: Request, res: Response) => {
    try {
      const programId = parseInt(req.params.id);
      const program = await storage.getProgramById(programId);
      
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      
      res.json(program);
    } catch (error) {
      console.error("Error fetching program:", error);
      res.status(500).json({ message: "Failed to fetch program" });
    }
  });

  app.get("/api/programs/:programId/subjects", async (req: Request, res: Response) => {
    try {
      const programId = parseInt(req.params.programId);
      const subjects = await storage.getSubjectsByProgramId(programId);
      res.json(subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      res.status(500).json({ message: "Failed to fetch subjects" });
    }
  });

  app.get("/api/subjects/:id", async (req: Request, res: Response) => {
    try {
      const subjectId = parseInt(req.params.id);
      const subject = await storage.getSubjectById(subjectId);
      
      if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
      }
      
      res.json(subject);
    } catch (error) {
      console.error("Error fetching subject:", error);
      res.status(500).json({ message: "Failed to fetch subject" });
    }
  });

  app.get("/api/subjects/:subjectId/chapters", async (req: Request, res: Response) => {
    try {
      const subjectId = parseInt(req.params.subjectId);
      const chapters = await storage.getChaptersBySubjectId(subjectId);
      res.json(chapters);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      res.status(500).json({ message: "Failed to fetch chapters" });
    }
  });

  app.get("/api/chapters/:id", async (req: Request, res: Response) => {
    try {
      const chapterId = parseInt(req.params.id);
      const chapter = await storage.getChapterById(chapterId);
      
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      
      res.json(chapter);
    } catch (error) {
      console.error("Error fetching chapter:", error);
      res.status(500).json({ message: "Failed to fetch chapter" });
    }
  });

  app.patch("/api/chapters/:id/progress", async (req: Request, res: Response) => {
    try {
      const chapterId = parseInt(req.params.id);
      const { progress, completedLessons } = req.body;
      
      if (typeof progress !== 'number' || typeof completedLessons !== 'number') {
        return res.status(400).json({ message: "Invalid progress or completedLessons values" });
      }
      
      const updatedChapter = await storage.updateChapterProgress(
        chapterId, 
        progress, 
        completedLessons
      );
      
      res.json(updatedChapter);
    } catch (error) {
      console.error("Error updating chapter progress:", error);
      res.status(500).json({ message: "Failed to update chapter progress" });
    }
  });

  app.get("/api/chapters/:chapterId/audio-lessons", async (req: Request, res: Response) => {
    try {
      const chapterId = parseInt(req.params.chapterId);
      const audioLessons = await storage.getAudioLessonsByChapterId(chapterId);
      res.json(audioLessons);
    } catch (error) {
      console.error("Error fetching audio lessons:", error);
      res.status(500).json({ message: "Failed to fetch audio lessons" });
    }
  });

  app.get("/api/audio-lessons/:id", async (req: Request, res: Response) => {
    try {
      const lessonId = parseInt(req.params.id);
      const audioLesson = await storage.getAudioLessonById(lessonId);
      
      if (!audioLesson) {
        return res.status(404).json({ message: "Audio lesson not found" });
      }
      
      res.json(audioLesson);
    } catch (error) {
      console.error("Error fetching audio lesson:", error);
      res.status(500).json({ message: "Failed to fetch audio lesson" });
    }
  });

  app.patch("/api/audio-lessons/:id/complete", async (req: Request, res: Response) => {
    try {
      const lessonId = parseInt(req.params.id);
      const updatedLesson = await storage.markAudioLessonCompleted(lessonId);
      res.json(updatedLesson);
    } catch (error) {
      console.error("Error marking audio lesson as completed:", error);
      res.status(500).json({ message: "Failed to mark audio lesson as completed" });
    }
  });

  // Create new program
  app.post("/api/programs", async (req: Request, res: Response) => {
    try {
      const programData = insertProgramSchema.parse(req.body);
      const newProgram = await storage.createProgram(programData);
      res.status(201).json(newProgram);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating program:", error);
        res.status(500).json({ message: "Failed to create program" });
      }
    }
  });

  // Create new subject
  app.post("/api/subjects", async (req: Request, res: Response) => {
    try {
      const subjectData = insertSubjectSchema.parse(req.body);
      const newSubject = await storage.createSubject(subjectData);
      res.status(201).json(newSubject);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating subject:", error);
        res.status(500).json({ message: "Failed to create subject" });
      }
    }
  });

  // Create new chapter
  app.post("/api/chapters", async (req: Request, res: Response) => {
    try {
      const chapterData = insertChapterSchema.parse(req.body);
      const newChapter = await storage.createChapter(chapterData);
      res.status(201).json(newChapter);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating chapter:", error);
        res.status(500).json({ message: "Failed to create chapter" });
      }
    }
  });

  // Create new audio lesson
  app.post("/api/audio-lessons", async (req: Request, res: Response) => {
    try {
      const lessonData = insertAudioLessonSchema.parse(req.body);
      const newLesson = await storage.createAudioLesson(lessonData);
      res.status(201).json(newLesson);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating audio lesson:", error);
        res.status(500).json({ message: "Failed to create audio lesson" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
