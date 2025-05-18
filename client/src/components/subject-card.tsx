import { Link, useLocation } from 'wouter';
import { Clock, BookText } from 'lucide-react';
import type { Subject } from '@shared/schema';
import { motion } from 'framer-motion';

type SubjectCardProps = {
  subject: Subject;
  programId: number;
};

export function SubjectCard({ subject, programId }: SubjectCardProps) {
  const [, navigate] = useLocation();

  const goToSubject = () => {
    navigate(`/programs/${programId}/subjects/${subject.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="card-hover"
      onClick={goToSubject}
    >
      <div className="subject-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full border border-border">
        <div className="p-5">
          <h3 className="text-lg font-heading font-semibold mb-2 gradient-text">{subject.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{subject.description}</p>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-xs font-medium bg-accent/10 text-accent px-2.5 py-1 rounded-full">
              <BookText className="mr-1 h-3 w-3" />
              {subject.chaptersCount} Chapters
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
