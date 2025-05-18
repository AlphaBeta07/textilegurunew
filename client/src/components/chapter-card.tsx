import { Link, useLocation } from 'wouter';
import { Headphones, Clock, Book, MessageSquare, BookOpen, Mic, Pen } from 'lucide-react';
import type { Chapter } from '@shared/schema';
import { motion } from 'framer-motion';

type ChapterCardProps = {
  chapter: Chapter;
  programId: number;
  subjectId: number;
};

const IconMap = {
  'book': Book,
  'comment': MessageSquare,
  'book-open': BookOpen,
  'microphone': Mic,
  'pen': Pen,
  'headphones': Headphones
};

export function ChapterCard({ chapter, programId, subjectId }: ChapterCardProps) {
  const Icon = IconMap[chapter.iconType as keyof typeof IconMap] || Book;
  const [, navigate] = useLocation();

  const goToChapter = () => {
    navigate(`/programs/${programId}/subjects/${subjectId}/chapters/${chapter.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="card-hover"
      onClick={goToChapter}
    >
      <div className="chapter-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full border border-border">
        <div className="p-5">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Icon className="text-primary" />
            </div>
            <h3 className="text-lg font-heading font-semibold gradient-text">{chapter.name}</h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-500">
              <Headphones className="mr-2 h-4 w-4" />
              {chapter.audioCount} Audio Lessons
            </span>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}
