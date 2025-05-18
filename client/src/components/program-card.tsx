import { useLocation } from 'wouter';
import { Headphones, BookOpen } from 'lucide-react';
import type { Program } from '@shared/schema';
import { motion } from 'framer-motion';

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  const [, navigate] = useLocation();

  const goToProgram = () => {
    navigate(`/programs/${program.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className="card-hover"
      onClick={goToProgram}
    >
      <div className="program-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer h-full border border-border">
        <div className="p-5">
          <h3 className="text-lg font-heading font-semibold mb-2 gradient-text">{program.name}</h3>
          <div className="flex items-center justify-between">
            <span className="flex items-center text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
              <BookOpen className="mr-1 h-3 w-3" />
              {program.subjectsCount} Subjects
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Headphones className="mr-2 h-4 w-4" />
              {program.totalAudioCount} Audio Lessons
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
