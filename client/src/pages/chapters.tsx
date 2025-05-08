import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AudioLessonItem } from '@/components/audio-lesson-item';
import { AudioPlayer } from '@/components/ui/audio-player';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import type { Program, Subject, Chapter, AudioLesson } from '@shared/schema';

export default function Chapters() {
  const { programId, subjectId, chapterId } = useParams<{ 
    programId: string; 
    subjectId: string;
    chapterId: string;
  }>();
  
  const [currentLesson, setCurrentLesson] = useState<AudioLesson | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: program } = useQuery<Program>({
    queryKey: [`/api/programs/${programId}`],
  });
  
  const { data: subject } = useQuery<Subject>({
    queryKey: [`/api/subjects/${subjectId}`],
    enabled: !!subjectId,
  });
  
  const { data: chapter, isLoading: chapterLoading } = useQuery<Chapter>({
    queryKey: [`/api/chapters/${chapterId}`],
    enabled: !!chapterId,
  });
  
  const { data: audioLessons, isLoading: lessonsLoading } = useQuery<AudioLesson[]>({
    queryKey: [`/api/chapters/${chapterId}/audio-lessons`],
    enabled: !!chapterId,
    onSuccess: (data) => {
      if (data.length > 0 && !currentLesson) {
        setCurrentLesson(data[0]);
      }
    }
  });
  
  const markLessonCompleted = useMutation({
    mutationFn: async (lessonId: number) => {
      const res = await apiRequest('PATCH', `/api/audio-lessons/${lessonId}/complete`, {});
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`/api/chapters/${chapterId}/audio-lessons`] });
      queryClient.invalidateQueries({ queryKey: [`/api/chapters/${chapterId}`] });
    }
  });
  
  const isLoading = chapterLoading || lessonsLoading;
  
  const handleLessonClick = (lesson: AudioLesson) => {
    setCurrentLesson(lesson);
  };
  
  const handleLessonComplete = () => {
    if (currentLesson && !currentLesson.completed) {
      markLessonCompleted.mutate(currentLesson.id);
    }
    
    // Auto-play next lesson if available
    if (audioLessons && currentLesson) {
      const currentIndex = audioLessons.findIndex(lesson => lesson.id === currentLesson.id);
      if (currentIndex < audioLessons.length - 1) {
        setCurrentLesson(audioLessons[currentIndex + 1]);
      }
    }
  };
  
  const handleNextTrack = () => {
    if (audioLessons && currentLesson) {
      const currentIndex = audioLessons.findIndex(lesson => lesson.id === currentLesson.id);
      if (currentIndex < audioLessons.length - 1) {
        setCurrentLesson(audioLessons[currentIndex + 1]);
      }
    }
  };
  
  const handlePreviousTrack = () => {
    if (audioLessons && currentLesson) {
      const currentIndex = audioLessons.findIndex(lesson => lesson.id === currentLesson.id);
      if (currentIndex > 0) {
        setCurrentLesson(audioLessons[currentIndex - 1]);
      }
    }
  };

  const breadcrumbItems = {
    program: program ? { id: program.id, name: program.name, path: `/programs/${program.id}` } : undefined,
    subject: subject ? { id: subject.id, name: subject.name, path: `/programs/${programId}/subjects/${subject.id}` } : undefined,
    chapter: chapter ? { id: chapter.id, name: chapter.name, path: `/programs/${programId}/subjects/${subjectId}/chapters/${chapter.id}` } : undefined
  };

  return (
    <>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbNavigation items={breadcrumbItems} />
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fade-in"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-sans font-bold text-gray-900">
                {chapterLoading ? 'Loading...' : chapter?.name}
              </h2>
              {chapter && (
                <p className="text-gray-600">{chapter.description}</p>
              )}
            </div>
            <Link href={`/programs/${programId}/subjects/${subjectId}`}>
              <a className="flex items-center text-primary hover:text-primary/80 transition">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chapters
              </a>
            </Link>
          </div>
          
          {/* Audio Player */}
          {currentLesson && (
            <AudioPlayer
              title={currentLesson.title}
              description={currentLesson.description}
              audioUrl={currentLesson.audioUrl}
              onNextTrack={audioLessons && audioLessons.length > 1 ? handleNextTrack : undefined}
              onPreviousTrack={audioLessons && audioLessons.length > 1 ? handlePreviousTrack : undefined}
              onComplete={handleLessonComplete}
            />
          )}
          
          {/* Audio Lessons List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : !audioLessons?.length ? (
            <div className="p-4 bg-blue-50 text-blue-600 rounded-md">
              No audio lessons found for this chapter.
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {audioLessons.map((lesson) => (
                  <AudioLessonItem 
                    key={lesson.id} 
                    lesson={lesson} 
                    onClick={handleLessonClick}
                    isActive={currentLesson?.id === lesson.id}
                  />
                ))}
              </ul>
            </div>
          )}
        </motion.section>
      </main>
      
      <Footer />
    </>
  );
}
