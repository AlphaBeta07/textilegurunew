import { 
  Program, InsertProgram, programs,
  Subject, InsertSubject, subjects,
  Chapter, InsertChapter, chapters,
  AudioLesson, InsertAudioLesson, audioLessons
} from "@shared/schema";

export interface IStorage {
  // Program methods
  getAllPrograms(): Promise<Program[]>;
  getProgramById(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;

  // Subject methods
  getSubjectsByProgramId(programId: number): Promise<Subject[]>;
  getSubjectById(id: number): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;

  // Chapter methods
  getChaptersBySubjectId(subjectId: number): Promise<Chapter[]>;
  getChapterById(id: number): Promise<Chapter | undefined>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;
  updateChapterProgress(id: number, progress: number, completedLessons: number): Promise<Chapter>;

  // Audio lesson methods
  getAudioLessonsByChapterId(chapterId: number): Promise<AudioLesson[]>;
  getAudioLessonById(id: number): Promise<AudioLesson | undefined>;
  createAudioLesson(audioLesson: InsertAudioLesson): Promise<AudioLesson>;
  markAudioLessonCompleted(id: number): Promise<AudioLesson>;
}

export class MemStorage implements IStorage {
  private programs: Map<number, Program>;
  private subjects: Map<number, Subject>;
  private chapters: Map<number, Chapter>;
  private audioLessons: Map<number, AudioLesson>;
  
  private programsCounter: number;
  private subjectsCounter: number;
  private chaptersCounter: number;
  private audioLessonsCounter: number;

  constructor() {
    this.programs = new Map();
    this.subjects = new Map();
    this.chapters = new Map();
    this.audioLessons = new Map();
    
    this.programsCounter = 1;
    this.subjectsCounter = 1;
    this.chaptersCounter = 1;
    this.audioLessonsCounter = 1;
    
    this.initializeData();
  }

  // Program methods
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async getProgramById(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(program: InsertProgram): Promise<Program> {
    const id = this.programsCounter++;
    const newProgram: Program = { ...program, id };
    this.programs.set(id, newProgram);
    return newProgram;
  }

  // Subject methods
  async getSubjectsByProgramId(programId: number): Promise<Subject[]> {
    return Array.from(this.subjects.values()).filter(
      (subject) => subject.programId === programId
    );
  }

  async getSubjectById(id: number): Promise<Subject | undefined> {
    return this.subjects.get(id);
  }

  async createSubject(subject: InsertSubject): Promise<Subject> {
    const id = this.subjectsCounter++;
    const newSubject: Subject = { ...subject, id };
    this.subjects.set(id, newSubject);
    return newSubject;
  }

  // Chapter methods
  async getChaptersBySubjectId(subjectId: number): Promise<Chapter[]> {
    return Array.from(this.chapters.values()).filter(
      (chapter) => chapter.subjectId === subjectId
    );
  }

  async getChapterById(id: number): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  async createChapter(chapter: InsertChapter): Promise<Chapter> {
    const id = this.chaptersCounter++;
    const newChapter: Chapter = { ...chapter, id };
    this.chapters.set(id, newChapter);
    return newChapter;
  }

  async updateChapterProgress(id: number, progress: number, completedLessons: number): Promise<Chapter> {
    const chapter = this.chapters.get(id);
    if (!chapter) {
      throw new Error(`Chapter with ID ${id} not found`);
    }
    
    const updatedChapter: Chapter = { 
      ...chapter, 
      progress, 
      completedLessons 
    };
    
    this.chapters.set(id, updatedChapter);
    return updatedChapter;
  }

  // Audio lesson methods
  async getAudioLessonsByChapterId(chapterId: number): Promise<AudioLesson[]> {
    return Array.from(this.audioLessons.values()).filter(
      (lesson) => lesson.chapterId === chapterId
    );
  }

  async getAudioLessonById(id: number): Promise<AudioLesson | undefined> {
    return this.audioLessons.get(id);
  }

  async createAudioLesson(audioLesson: InsertAudioLesson): Promise<AudioLesson> {
    const id = this.audioLessonsCounter++;
    const newAudioLesson: AudioLesson = { ...audioLesson, id };
    this.audioLessons.set(id, newAudioLesson);
    return newAudioLesson;
  }

  async markAudioLessonCompleted(id: number): Promise<AudioLesson> {
    const audioLesson = this.audioLessons.get(id);
    if (!audioLesson) {
      throw new Error(`Audio lesson with ID ${id} not found`);
    }
    
    const updatedAudioLesson: AudioLesson = { 
      ...audioLesson, 
      completed: true 
    };
    
    this.audioLessons.set(id, updatedAudioLesson);
    
    // Update chapter progress
    const chapter = await this.getChapterById(audioLesson.chapterId);
    if (chapter) {
      const allLessons = await this.getAudioLessonsByChapterId(chapter.id);
      const completedLessons = allLessons.filter(lesson => lesson.completed || lesson.id === id).length;
      const progress = Math.round((completedLessons / allLessons.length) * 100);
      
      await this.updateChapterProgress(chapter.id, progress, completedLessons);
    }
    
    return updatedAudioLesson;
  }

  // Initialize with sample educational content
  private initializeData() {
    // Create 5 programs
    const programsData: InsertProgram[] = [
      {
        name: "Language Learning",
        description: "Master new languages with our interactive audio-based learning program.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Mathematics",
        description: "From basic arithmetic to advanced calculus with guided audio explanations.",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Science",
        description: "Explore physics, chemistry, and biology through engaging audio content.",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Programming",
        description: "Learn coding with step-by-step audio tutorials and practical examples.",
        imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Business",
        description: "Develop business acumen with comprehensive audio courses and case studies.",
        imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      }
    ];

    programsData.forEach(program => {
      const id = this.programsCounter++;
      this.programs.set(id, { ...program, id });
    });

    // Create 5 subjects for each program
    const languageSubjects: InsertSubject[] = [
      {
        programId: 1,
        name: "English",
        description: "Master English with comprehensive audio lessons covering grammar, vocabulary, and conversation.",
        imageUrl: "https://images.unsplash.com/photo-1546521343-4eb2c01aa44b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 10
      },
      {
        programId: 1,
        name: "Spanish",
        description: "Learn Spanish from beginner to advanced with interactive audio lessons and cultural insights.",
        imageUrl: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 12
      },
      {
        programId: 1,
        name: "French",
        description: "Discover French language and culture through structured audio lessons and practical examples.",
        imageUrl: "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 9
      },
      {
        programId: 1,
        name: "German",
        description: "Build German language skills with audio lessons covering grammar, vocabulary, and pronunciation.",
        imageUrl: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 11
      },
      {
        programId: 1,
        name: "Mandarin Chinese",
        description: "Master Mandarin pronunciation and essential phrases with guided audio lessons.",
        imageUrl: "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 14
      }
    ];

    // Add math subjects
    const mathSubjects: InsertSubject[] = [
      {
        programId: 2,
        name: "Algebra",
        description: "Learn algebraic concepts with step-by-step audio explanations and practice problems.",
        imageUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 8
      },
      {
        programId: 2,
        name: "Geometry",
        description: "Explore shapes, angles, and spatial relationships with audio-guided lessons.",
        imageUrl: "https://images.unsplash.com/photo-1645326904648-0a70329e5828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 7
      },
      {
        programId: 2,
        name: "Calculus",
        description: "Master differentiation, integration, and applications with audio tutorials.",
        imageUrl: "https://images.unsplash.com/photo-1544282618-a997e98ac3af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 10
      },
      {
        programId: 2,
        name: "Statistics",
        description: "Understand data analysis and probability with practical audio examples.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 9
      },
      {
        programId: 2,
        name: "Trigonometry",
        description: "Learn about angles, triangles, and trigonometric functions through audio lessons.",
        imageUrl: "https://images.unsplash.com/photo-1442202326922-55fa63ad1342?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 6
      }
    ];

    // Add all subjects
    [...languageSubjects, ...mathSubjects].forEach(subject => {
      const id = this.subjectsCounter++;
      this.subjects.set(id, { ...subject, id });
    });

    // Create chapters for English subject
    const englishChapters: InsertChapter[] = [
      {
        subjectId: 1,
        name: "Basic Grammar",
        description: "Learn foundational English grammar rules with clear audio explanations.",
        iconType: "book",
        audioCount: 6,
        durationMinutes: 90,
        progress: 35,
        completedLessons: 2
      },
      {
        subjectId: 1,
        name: "Conversation",
        description: "Practice everyday conversations with native speaker audio examples.",
        iconType: "comment",
        audioCount: 6,
        durationMinutes: 120,
        progress: 15,
        completedLessons: 1
      },
      {
        subjectId: 1,
        name: "Vocabulary",
        description: "Build your English vocabulary with themed audio lessons and practice.",
        iconType: "book-open",
        audioCount: 6,
        durationMinutes: 108,
        progress: 50,
        completedLessons: 3
      },
      {
        subjectId: 1,
        name: "Pronunciation",
        description: "Perfect your English pronunciation with detailed audio guidance.",
        iconType: "microphone",
        audioCount: 6,
        durationMinutes: 90,
        progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Writing",
        description: "Develop writing skills with guided audio lessons and practical exercises.",
        iconType: "pen",
        audioCount: 6,
        durationMinutes: 120,
        progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Listening",
        description: "Enhance listening comprehension through diverse audio materials and exercises.",
        iconType: "headphones",
        audioCount: 6,
        durationMinutes: 108,
        progress: 65,
        completedLessons: 4
      }
    ];

    // Add chapters
    englishChapters.forEach(chapter => {
      const id = this.chaptersCounter++;
      this.chapters.set(id, { ...chapter, id });
    });

    // Create audio lessons for Basic Grammar chapter
    const grammarLessons: InsertAudioLesson[] = [
      {
        chapterId: 1,
        title: "Nouns and Articles",
        description: "Understanding noun types and article usage in English",
        durationSeconds: 300,
        completed: true,
        audioUrl: "/audio/grammar/nouns.mp3"
      },
      {
        chapterId: 1,
        title: "Present Tense Verbs",
        description: "How to use present simple and present continuous tenses",
        durationSeconds: 390,
        completed: true,
        audioUrl: "/audio/grammar/present-tense.mp3"
      },
      {
        chapterId: 1,
        title: "Past Tense Verbs",
        description: "Understanding regular and irregular past tense forms",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/grammar/past-tense.mp3"
      },
      {
        chapterId: 1,
        title: "Future Tense",
        description: "Different ways to express future actions in English",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/grammar/future-tense.mp3"
      },
      {
        chapterId: 1,
        title: "Prepositions",
        description: "Using prepositions of time, place and movement correctly",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/grammar/prepositions.mp3"
      },
      {
        chapterId: 1,
        title: "Adjectives and Adverbs",
        description: "Using descriptive words and understanding their placement",
        durationSeconds: 370,
        completed: false,
        audioUrl: "/audio/grammar/adjectives-adverbs.mp3"
      }
    ];

    // Add audio lessons
    grammarLessons.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  }
}

export const storage = new MemStorage();
