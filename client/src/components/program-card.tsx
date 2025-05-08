import { Link } from 'wouter';
import { Headphones } from 'lucide-react';
import type { Program } from '@shared/schema';
import { motion } from 'framer-motion';

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/programs/${program.id}`}>
        <a className="block h-full">
          <div className="program-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
            <img 
              src={program.imageUrl} 
              alt={program.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{program.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {program.subjectsCount} Subjects
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Headphones className="mr-2 h-4 w-4" />
                  {program.totalAudioCount} Audio Lessons
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
