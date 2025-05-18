import { 
  Program, InsertProgram, 
  Subject, InsertSubject, 
  Chapter, InsertChapter, 
  AudioLesson, InsertAudioLesson,
} from "@shared/schema";

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
// Serve static files
app.use('/audio', express.static(path.join(dirname, 'public/audio')));


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
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Textile Technology",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Man Made Textile Technology",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Technical Textiles",
      imageUrl: "",
      subjectsCount: 5,
      totalAudioCount: 30
      },
      {
      name: "Fashion Technology",
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
        imageUrl: "",
        chaptersCount: 6
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
        audioCount: 5,
        durationMinutes: 30
      },
      {
        subjectId: 1,
        name: "Unit 02. Textile Fibres",
        audioCount: 7,
        durationMinutes: 37,
      },
      {
        subjectId: 1,
        name: "Unit 03. Cotton Fibre",
        audioCount: 7,
        durationMinutes: 108,
      },
      {
        subjectId: 1,
        name: "Unit 04. Unconventional Natural Fibres",
        audioCount: 9,
        durationMinutes: 90,
      },
      {
        subjectId: 1,
        name: "Unit 05. Wool Fibre",
        audioCount: 6,
        durationMinutes: 120,
      },
      {
        subjectId: 1,
        name: "Unit 06. Silk Fibre",
        audioCount: 7,
        durationMinutes: 120,
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
        audioUrl: "/audio/program1/subject1/chapter1/yarn_manufacturing_audio.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF WEAVING",
        audioUrl: "/audio/program1/subject1/chapter1/weaving_process.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF CHEMICAL PROCESSING",
        audioUrl: "/audio/program1/subject1/chapter1/chemical_processing.mp3"
      },
      {
        chapterId: 1,
        title: "FLOW CHART OF GARMENT MANUFACTURING PROCESS",
        audioUrl: "/audio/program1/subject1/chapter1/garment_manufacturing.mp3"
      },
      {
        chapterId: 1,
        title: "INTRODUCTION TO TEXTILES",
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
        audioUrl: "/audio/program1/subject1/chapter2/yarn_manufacturing_audiodegree_of_polymerization.mp3"
      },
      {
        chapterId: 2,
        title: "02. Cohesive Energy Density",
        audioUrl: "/audio/program1/subject1/chapter2/cohesive_energy_density.mp3"
      },
      {
        chapterId: 2,
        title: "03. MOISTURE REGAIN AND MOISTURE CONTENT",
        audioUrl: "/audio/program1/subject1/chapter2/moisture_regan_moisture_content.mp3"
      },
      {
        chapterId: 2,
        title: "04. Classification of textile Fibres",
        audioUrl: "/audio/program1/subject1/chapter2/classification_of_textile_fibres.mp3"
      },
      {
        chapterId: 2,
        title: "05. ESSENTIAL PROPERTIES OF FIBRE",
        audioUrl: "/audio/program1/subject1/chapter2/essential_properties_fibre.mp3"
      },
      {
        chapterId: 2,
        title: "06. Desirable Properties of fibre",
        audioUrl: "/audio/program1/subject1/chapter2/client/public/audio/program1/subject1/chapter2/desirable_properties_of_fibre.mp3"
      },
      {
        chapterId: 2,
        title: "07. ORIENTATION",
        audioUrl: "/audio/program1/subject1/chapter2/orientation.mp3"
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
        audioUrl: "/audio/program1/subject1/chapter3/cultivation_of_cotton.mp3"
      },
      {
        chapterId: 3,
        title: "02. BOTANICAL CLASSIFICATION OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter3/botanical_classification.mp3"
      },
      {
        chapterId: 3,
        title: "03. MORPHOLOGICAL STRUCTURE OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter3/morphological_structure.mp3"
      },
      {
        chapterId: 3,
        title: "04. CHEMICAL COMPOSITION OF COTTON",
        audioUrl: "/audio/program1/subject1/chapter3/chemical_compostion.mp3"
      },
      {
        chapterId: 3,
        title: "05. Crystal structure of cellulose",
        audioUrl: "/audio/program1/subject1/chapter3/crystal_structure.mp3"
      },
      {
        chapterId: 3,
        title: "06. REACTIONS OF CELLULOSE",
        audioUrl: "/audio/program1/subject1/chapter3/reaction.mp3"
      },
      {
        chapterId: 3,
        title: "07. Physical and chemical properties of Cotton",
        audioUrl: "/audio/program1/subject1/chapter3/properties.mp3"
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
        audioUrl: "/audio/program1/subject1/chapter4/general_information.mp3"
      },
      {
        chapterId: 4,
        title: "02. Chemical Composition of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/chemical_composition.mp3"
      },
      {
        chapterId: 4,
        title: "03. Cultivation of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/cultivation.mp3"
      },
      {
        chapterId: 4,
        title: "04. Retting of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/retting.mp3"
      },
      {
        chapterId: 4,
        title: "05. Morphological Structure of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/morphological_structure.mp3"
      },
      {
        chapterId: 4,
        title: "06. Physical and Chemical Properties of Jute Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/properties.mp3"
      },
      {
        chapterId: 4,
        title: "07. History of Flax Fibres",
        audioUrl: "/audio/program1/subject1/chapter4/history.mp3"
      },
      {
        chapterId: 4,
        title: "08. Cultivation and Retting of Flax Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/cultivation_and_retting_of_flax_fibre.mp3"
      },
      {
        chapterId: 4,
        title: "09. Physical and Chemical Properties of Flax Fibre",
        audioUrl: "/audio/program1/subject1/chapter4/properties_of_flax_fibre.mp3"
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
        audioUrl: "/audio/program1/subject1/chapter5/grading.mp3"
      },
      {
        chapterId: 5,
        title: "02. Morphological Structure of wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter5/morphological_structure.mp3"
      },
      {
        chapterId: 5,
        title: "03. Chemical Composition of wool fibre",
        audioUrl: "/audio/program1/subject1/chapter5/chemical_composition.mp3"
      },
      {
        chapterId: 5,
        title: "04. Chemical Structure of Wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter5/chemical_structure.mp3"
      },
      {
        chapterId: 5,
        title: "05. Different types of forces are present in wool fibres",
        audioUrl: "/audio/program1/subject1/chapter5/force.mp3"
      },
      {
        chapterId: 5,
        title: "06. Physical and Chemical Properties of Wool Fibre",
        audioUrl: "/audio/program1/subject1/chapter5/properties.mp3"
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
        audioUrl: "/audio/program1/subject1/chapter6/varieties.mp3"
      },
      {
        chapterId: 6,
        title: "02. Sericulture of Silk",
        audioUrl: "/audio/program1/subject1/chapter6/sericulture.mp3"
      },
      {
        chapterId: 6,
        title: "03. Production Of Raw Silk",
        audioUrl: "/audio/program1/subject1/chapter6/production.mp3"
      },
      {
        chapterId: 6,
        title: "04. Morphological Structure Of Silk",
        audioUrl: "/audio/program1/subject1/chapter6/morphological_structure.mp3"
      },
      {
        chapterId: 6,
        title: "05. Chemical composition and chemical structure of Silk",
        audioUrl: "/audio/program1/subject1/chapter6/chemical_composition_and_chemical_structure.mp3"
      },
      {
        chapterId: 6,
        title: "06. Different types of forces are present in silk fibres",
        audioUrl: "/audio/program1/subject1/chapter6/diff_types.mp3"
      },
      {
        chapterId: 6,
        title: "07. Physical and Chemical Properties of Silk",
        audioUrl: "/audio/program1/subject1/chapter6/properties.mp3"
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
