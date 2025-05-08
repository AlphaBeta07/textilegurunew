import { Play, CheckCircle, Circle } from 'lucide-react';
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
      whileHover={{ backgroundColor: 'rgba(243, 244, 246, 0.8)' }}
      className={`p-4 transition cursor-pointer flex items-center ${isActive ? 'bg-gray-50' : ''}`}
      onClick={() => onClick(lesson)}
    >
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
        <Play className="text-primary h-4 w-4 ml-0.5" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{lesson.title}</h4>
        <p className="text-sm text-gray-600">{lesson.description}</p>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-500">{formatDuration(lesson.durationSeconds)}</span>
        <span className="ml-3">
          {lesson.completed ? (
            <CheckCircle className="text-green-500 h-4 w-4" />
          ) : (
            <Circle className="text-gray-300 h-4 w-4" />
          )}
        </span>
      </div>
    </motion.li>
  );
}
