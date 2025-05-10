import { Play } from 'lucide-react';
import type { AudioLesson } from '@shared/schema';
import { motion } from 'framer-motion';

type AudioLessonItemProps = {
  lesson: AudioLesson;
  onClick: (lesson: AudioLesson) => void;
  isActive?: boolean;
};

export function AudioLessonItem({ lesson, onClick, isActive = false }: AudioLessonItemProps) {
  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <motion.li
      whileHover={{ backgroundColor: 'rgba(235, 235, 252, 0.5)' }}
      className={`p-4 transition cursor-pointer flex items-center rounded-lg border ${
        isActive 
          ? 'bg-primary/5 border-primary/20' 
          : 'bg-white border-gray-100 hover:border-primary/10'
      }`}
      onClick={() => onClick(lesson)}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-primary/10 text-primary'
      }`}>
        <Play className="h-4 w-4 ml-0.5" />
      </div>
      <div className="flex-1">
        <h4 className={`font-medium ${isActive ? 'text-primary font-heading' : ''}`}>{lesson.title}</h4>
      </div>
    </motion.li>
  );
}
