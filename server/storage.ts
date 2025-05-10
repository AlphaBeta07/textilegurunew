import { 
  Program, InsertProgram, 
  Subject, InsertSubject, 
  Chapter, InsertChapter, 
  AudioLesson, InsertAudioLesson,
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
  //updateChapterProgress(id: number, //progress: number, completedLessons: number): Promise<Chapter>;

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

  // async updateChapterProgress(id: number, //progress: number, completedLessons: number): Promise<Chapter> {
  //   const chapter = this.chapters.get(id);
  //   if (!chapter) {
  //     throw new Error(`Chapter with ID ${id} not found`);
  //   }
    
  //   const updatedChapter: Chapter = { 
  //     ...chapter, 
  //     progress, 
  //     completedLessons 
  //   };
    
  //   this.chapters.set(id, updatedChapter);
  //   return updatedChapter;
  // }

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
    // const chapter = await this.getChapterById(audioLesson.chapterId);
    // if (chapter) {
    //   const allLessons = await this.getAudioLessonsByChapterId(chapter.id);
    //   const completedLessons = allLessons.filter(lesson => lesson.completed || lesson.id === id).length;
    //   const progress = Math.round((completedLessons / allLessons.length) * 100);
      
    //   await this.updateChapterProgress(chapter.id, progress, completedLessons);
    // }
    
    return updatedAudioLesson;
  }

  // Initialize with sample educational content
  private initializeData() {
    // Create 5 textile programs
    const programsData: InsertProgram[] = [
       {
      name: "Textile Chemistry",
      description: "",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Textile Technology",
      description: "",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Man Made Textile Technology",
      description: "",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Technical Textiles",
      description: "",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Fashion Technology",
      description: "",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      
    ];

    programsData.forEach(program => {
      const id = this.programsCounter++;
      this.programs.set(id, { ...program, id });
    });

    // Create 5 subjects for Textile Chemistry program
    const fiberScienceSubjects: InsertSubject[] = [
      {
        programId: 1,
        name: "Chemistry of Natural Fibers",
        description: "",
        imageUrl: "",
        chaptersCount: 6,
        durationHours: 0.5
      },
      
      // {
      //   programId: 1,
      //   name: "",
      //   description: "",
      //   imageUrl: "",
      //   chaptersCount: 6,
      //   durationHours: 14
      // }
    ];

    // Add fabric construction subjects
    const fabricSubjects: InsertSubject[] = [
      
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
        name: "Unit 01. Introduction to Textiles",
        description: "",
        iconType: "leaf",
        audioCount: 5,
        durationMinutes: 90,
        ////progress: 35,
        completedLessons: 2
      },
      {
        subjectId: 1,
        name: "Unit 02. Textile Fibres",
        description: "",
        iconType: "scissors",
        audioCount: 6,
        durationMinutes: 120,
        ////progress: 15,
        completedLessons: 1
      },
      {
        subjectId: 1,
        name: "Unit 03. Cotton Fibre",
        description: "",
        iconType: "filter",
        audioCount: 6,
        durationMinutes: 108,
        ////progress: 50,
        completedLessons: 3
      },
      {
        subjectId: 1,
        name: "Unit 04. Unconventional Natural Fibres",
        description: "",
        iconType: "flower",
        audioCount: 6,
        durationMinutes: 90,
        //progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Unit 05. Wool Fibre",
        description: "",
        iconType: "sprout",
        audioCount: 6,
        durationMinutes: 120,
        //progress: 0,
        completedLessons: 0
      },
      {
        subjectId: 1,
        name: "Unit 06. Silk Fibre",
        description: "",
        iconType: "",
        audioCount: 6,
        durationMinutes: 120,
        //progress: 0,
        completedLessons: 0
      },
    ];

    // Add chapters
    naturalFibersChapters.forEach(chapter => {
      const id = this.chaptersCounter++;
      this.chapters.set(id, { ...chapter, id });
    });

    // Create audio lessons for Unit 01. Introduction to Textiles chapter
    const cottonLessons: InsertAudioLesson[] = [
      {
        chapterId: 1,
        title: "FLOW CHART OF YARN MANUFACTURING",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF WEAVING",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF CHEMICAL PROCESSING",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF GARMENT MANUFACTURING PROCESS",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 1,
        title: "INTRODUCTION TO TEXTILES",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      
    ];

    // Add audio lessons
    cottonLessons.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  
  // Create audio lessons for Unit 02. Textile Fibres
  const unit2: InsertAudioLesson[] = [
      {
        chapterId: 2,
        title: "01. Degree of Polymerization",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 2,
        title: "02. Cohesive Energy Density",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 2,
        title: "03. MOISTURE REGAIN AND MOISTURE CONTENT",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 2,
        title: "04. Classification of textile Fibres",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 2,
        title: "05. ESSENTIAL PROPERTIES OF FIBRE",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 2,
        title: "06. Desirable Properties of fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 2,
        title: "07. ORIENTATION",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
    ];

    // Add audio lessons
    unit2.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  // Create audio lessons for Unit 03. Cotton Fibre
  const CottonFibre: InsertAudioLesson[] = [
      {
        chapterId: 3,
        title: "01. CULTIVATION OF COTTON",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 3,
        title: "02. BOTANICAL CLASSIFICATION OF COTTON",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 3,
        title: "03. MORPHOLOGICAL STRUCTURE OF COTTON",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 3,
        title: "04. CHEMICAL COMPOSITION OF COTTON",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 3,
        title: "05. Crystal structure of cellulose",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 3,
        title: "06. REACTIONS OF CELLULOSE",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 3,
        title: "07. Physical and chemical properties of Cotton",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
    ];

    // Add audio lessons
    CottonFibre.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    // Create audio lessons for Unit 04. Unconventional Natural Fibres
    const UnconventionalNaturalFibres: InsertAudioLesson[] = [
      {
        chapterId: 4,
        title: "01. General Information About Jute Fibre",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 4,
        title: "02. Chemical Composition of Jute Fibre",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 4,
        title: "03. Cultivation of Jute Fibre",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 4,
        title: "04. Retting of Jute Fibre",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 4,
        title: "05. Morphological Structure of Jute Fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "06. Physical and Chemical Properties of Jute Fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "07. History of Flax Fibres",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "08. Cultivation and Retting of Flax Fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 4,
        title: "09. Physical and Chemical Properties of Flax Fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
    ];

    // Add audio lessons
    UnconventionalNaturalFibres.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    // Create audio lessons for Unit 05. Wool Fibre
    const WoolFibre: InsertAudioLesson[] = [
      {
        chapterId: 5,
        title: "01. Grading of Wool Fibre",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 5,
        title: "02. Morphological Structure of wool Fibre",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 5,
        title: "03. Chemical Composition of wool fibre",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 5,
        title: "04. Chemical Structure of Wool Fibre",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 5,
        title: "05. Different types of forces are present in wool fibres",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 5,
        title: "06. Physical and Chemical Properties of Wool Fibre",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      
    ];

    // Add audio lessons
    WoolFibre.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
    // Create audio lessons for Unit 06. Silk Fibre
    const SilkFibre: InsertAudioLesson[] = [
      {
        chapterId: 6,
        title: "01. Varieties of Silk Fibre",
        description: "",
        durationSeconds: 300,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 6,
        title: "02. Sericulture of Silk",
        description: "",
        durationSeconds: 390,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 6,
        title: "03. Production Of Raw Silk",
        description: "",
        durationSeconds: 435,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 6,
        title: "04. Morphological Structure Of Silk",
        description: "",
        durationSeconds: 405,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 6,
        title: "05. Chemical composition and chemical structure of Silk",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 6,
        title: "06. Different types of forces are present in silk fibres",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
      {
        chapterId: 6,
        title: "07. Physical and Chemical Properties of Silk",
        description: "",
        durationSeconds: 330,
        completed: false,
        audioUrl: "/audio/program1/subject1/chapter1/introduction_to_textiles.mp3"
      },
    ];

    // Add audio lessons
    SilkFibre.forEach(lesson => {
      const id = this.audioLessonsCounter++;
      this.audioLessons.set(id, { ...lesson, id });
    });
  }
}

export const storage = new MemStorage();
