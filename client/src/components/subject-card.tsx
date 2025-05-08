import { Link } from 'wouter';
import { Clock } from 'lucide-react';
import type { Subject } from '@shared/schema';
import { motion } from 'framer-motion';

type SubjectCardProps = {
  subject: Subject;
  programId: number;
};

export function SubjectCard({ subject, programId }: SubjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/programs/${programId}/subjects/${subject.id}`}>
        <a className="block h-full">
          <div className="subject-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer h-full">
            <img 
              src={subject.imageUrl} 
              alt={subject.name} 
              className="w-full h-40 object-cover" 
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{subject.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  {subject.chaptersCount} Chapters
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {subject.durationHours} Hours
                </span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </motion.div>
  );
}
