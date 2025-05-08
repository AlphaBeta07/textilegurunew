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
    // Create 5 textile programs
    const programsData: InsertProgram[] = [
      {
        name: "Fiber Science",
        description: "Explore the fundamental properties of natural and synthetic textile fibers.",
        imageUrl: "https://images.unsplash.com/photo-1497219055242-93359eeed651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Fabric Construction",
        description: "Learn the principles and techniques of weaving, knitting, and non-woven fabric production.",
        imageUrl: "https://images.unsplash.com/photo-1576437156647-81f4b36affa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Textile Dyeing & Printing",
        description: "Master the art and science of coloration and surface design for textiles.",
        imageUrl: "https://images.unsplash.com/photo-1596464148416-e599dc56f4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Apparel Manufacturing",
        description: "Discover the processes behind garment production from pattern making to assembly.",
        imageUrl: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      },
      {
        name: "Sustainable Textiles",
        description: "Explore eco-friendly materials, processes, and innovations in the textile industry.",
        imageUrl: "https://images.unsplash.com/photo-1572731316712-a2d7c1fdf73c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        subjectsCount: 5,
        totalAudioCount: 30
      }
    ];

    programsData.forEach(program => {
      const id = this.programsCounter++;
      this.programs.set(id, { ...program, id });
    });

    // Create 5 subjects for Fiber Science program
    const fiberScienceSubjects: InsertSubject[] = [
      {
        programId: 1,
        name: "Natural Fibers",
        description: "In-depth exploration of cotton, wool, silk, linen, and other natural textile fibers.",
        imageUrl: "https://images.unsplash.com/photo-1595511890410-3c7d8399226b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 10
      },
      {
        programId: 1,
        name: "Synthetic Fibers",
        description: "Comprehensive study of polyester, nylon, acrylic, and other man-made fibers.",
        imageUrl: "https://images.unsplash.com/photo-1618372063992-8c3d0d451841?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 12
      },
      {
        programId: 1,
        name: "Fiber Properties",
        description: "Analysis of tensile strength, elasticity, absorbency, and other critical fiber characteristics.",
        imageUrl: "https://images.unsplash.com/photo-1606913419156-31cf2822659b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 9
      },
      {
        programId: 1,
        name: "Fiber Identification",
        description: "Methods and techniques for identifying fiber types through microscopy and chemical tests.",
        imageUrl: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 11
      },
      {
        programId: 1,
        name: "Advanced Fibers",
        description: "Exploration of high-performance and specialty fibers used in technical textiles.",
        imageUrl: "https://images.unsplash.com/photo-1620331311520-246422e5a252?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 14
      }
    ];

    // Add fabric construction subjects
    const fabricSubjects: InsertSubject[] = [
      {
        programId: 2,
        name: "Weaving Fundamentals",
        description: "Basic principles of warp and weft interlacement in fabric production.",
        imageUrl: "https://images.unsplash.com/photo-1606830733744-0ad778449672?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 8
      },
      {
        programId: 2,
        name: "Knitting Technology",
        description: "Comprehensive study of weft and warp knitting principles and structures.",
        imageUrl: "https://images.unsplash.com/photo-1620139283213-cff4ddeadb63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 7
      },
      {
        programId: 2,
        name: "Non-woven Textiles",
        description: "Processes and applications of fibrous assemblies bonded by mechanical, chemical, or thermal means.",
        imageUrl: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 10
      },
      {
        programId: 2,
        name: "Textile Testing",
        description: "Methods for evaluating fabric performance, quality, and durability.",
        imageUrl: "https://images.unsplash.com/photo-1598204946632-6a61656096e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 9
      },
      {
        programId: 2,
        name: "Advanced Structures",
        description: "Exploration of complex weaves, 3D fabrics, and technical textile structures.",
        imageUrl: "https://images.unsplash.com/photo-1620628193165-5c9980f3e4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
        chaptersCount: 6,
        durationHours: 6
      }
    ];

    // Add all subjects
    [...fiberScienceSubjects, ...fabricSubjects].forEach(subject => {
      const id = this.subjectsCounter++;
      this.subjects.set(id, { ...subject, id });
    });

    // Create chapters for Natural Fibers subject
    const naturalFibersChapters: InsertChapter[] = [
      {
        subjectId: 1,
        name: "Cotton",
        description: "Comprehensive study of cotton fiber properties, production, and applications.",
        iconType: "leaf",
        audioCount: 6,
        durationMinutes: 90,
        progress: 35,
        completedLessons: 2
      },
      {
        subjectId: 1,
        name: "Wool",
        description: "Detailed exploration of wool fiber characteristics, processing, and end uses.",
        iconType: "scissors",
        audioCount: 6,
        durationMinutes: 120,
        progress: 15,
        completedLessons: 1
      },
      {
        subjectId: 1,
        name: "Silk",
        description: "Deep dive into silk fiber production, properties, and luxury applications.",
        iconType: "filter",
        audioCount: 6,
        durationMinutes: 108,
        progress: 50,
        completedLessons: 3
      },
      {
        subjectId: 1,
        name: "Linen",
        description: "Comprehensive study of flax fibers, linen production, and textile applications.",
        iconType: "flower",
        audioCount: 6,
        durationMinutes: 90,
        progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Hemp and Jute",
        description: "Analysis of bast fibers, their properties, and industrial applications.",
        iconType: "sprout",
        audioCount: 6,
        durationMinutes: 120,
        progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Emerging Natural Fibers",
        description: "Introduction to novel natural fibers and their potential in sustainable textiles.",
        iconType: "globe",
        audioCount: 6,
        durationMinutes: 108,
        progress: 65,
        completedLessons: 4
      }
    ];

    // Add chapters
    naturalFibersChapters.forEach(chapter => {
      const id = this.chaptersCounter++;
      this.chapters.set(id, { ...chapter, id });
    });

    // Create audio lessons for Cotton chapter
    const cottonLessons: InsertAudioLesson[] = [
      {
        chapterId: 1,
        title: "Cotton Cultivation",
        description: "Global cotton farming practices and sustainable agricultural methods",
        durationSeconds: 300,
        completed: true,
        audioUrl: "/audio/cotton/cultivation.mp3"
      },
      {
        chapterId: 1,
        title: "Fiber Structure",
        description: "Microscopic analysis of cotton fiber morphology and cellular structure",
        durationSeconds: 390,
        completed: true,
        audioUrl: "/audio/cotton/structure.mp3"
      },
      {
        chapterId: 1,
        title: "Physical Properties",
        description: "Tensile strength, elasticity, and absorbency characteristics of cotton",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/cotton/properties.mp3"
      },
      {
        chapterId: 1,
        title: "Cotton Processing",
        description: "From harvesting to ginning and bale formation in the cotton industry",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/cotton/processing.mp3"
      },
      {
        chapterId: 1,
        title: "Cotton Varieties",
        description: "Exploring different species and varieties of cotton grown worldwide",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/cotton/varieties.mp3"
      },
      {
        chapterId: 1,
        title: "Organic Cotton",
        description: "Sustainable practices in organic cotton farming and certification",
        durationSeconds: 370,
        completed: false,
        audioUrl: "/audio/cotton/organic.mp3"
      }
    ];

    // Add audio lessons
    cottonLessons.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  }
}

export const storage = new MemStorage();
