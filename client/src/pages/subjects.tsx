import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChapterCard } from '@/components/chapter-card';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Program, Subject, Chapter } from '@shared/schema';

export default function Subjects() {
  const { programId, subjectId } = useParams<{ programId: string; subjectId: string }>();
  
  const { data: program } = useQuery<Program>({
    queryKey: [`/api/programs/${programId}`],
  });
  
  const { data: subject, isLoading: subjectLoading } = useQuery<Subject>({
    queryKey: [`/api/subjects/${subjectId}`],
    enabled: !!subjectId,
  });
  
  const { data: chapters, isLoading: chaptersLoading } = useQuery<Chapter[]>({
    queryKey: [`/api/subjects/${subjectId}/chapters`],
    enabled: !!subjectId,
  });
  
  const isLoading = subjectLoading || chaptersLoading;

  const breadcrumbItems = {
    program: program ? { id: program.id, name: program.name, path: `/programs/${program.id}` } : undefined,
    subject: subject ? { id: subject.id, name: subject.name, path: `/programs/${programId}/subjects/${subject.id}` } : undefined
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
                {subjectLoading ? 'Loading...' : subject?.name}
              </h2>
              {subject && (
                <p className="text-gray-600">{subject.description}</p>
              )}
            </div>
            <Link href={`/programs/${programId}`}>
              <a className="flex items-center text-primary hover:text-primary/80 transition">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Subjects
              </a>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : !chapters?.length ? (
            <div className="p-4 bg-blue-50 text-blue-600 rounded-md">
              No chapters found for this subject.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {chapters.map((chapter) => (
                <ChapterCard 
                  key={chapter.id} 
                  chapter={chapter} 
                  programId={parseInt(programId)}
                  subjectId={parseInt(subjectId)} 
                />
              ))}
            </div>
          )}
        </motion.section>
      </main>
      
      <Footer />
    </>
  );
}
