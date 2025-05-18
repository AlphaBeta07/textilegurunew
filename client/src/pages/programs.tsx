import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SubjectCard } from '@/components/subject-card';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Program, Subject } from '@shared/schema';

export default function Programs() {
  const { programId } = useParams<{ programId: string }>();
  
  const { data: program, isLoading: programLoading } = useQuery<Program>({
    queryKey: [`/api/programs/${programId}`],
  });
  
  const { data: subjects, isLoading: subjectsLoading } = useQuery<Subject[]>({
    queryKey: [`/api/programs/${programId}/subjects`],
    enabled: !!programId,
  });
  
  const isLoading = programLoading || subjectsLoading;

  const breadcrumbItems = {
    program: program ? { id: program.id, name: program.name, path: `/programs/${program.id}` } : undefined
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
            <h2 className="text-2xl font-sans font-bold text-gray-900">
              {programLoading ? 'Loading...' : program?.name}
            </h2>
            <Link href="/">
              <a className="flex items-center text-primary hover:text-primary/80 transition">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </a>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : !subjects?.length ? (
            <div className="p-4 bg-blue-50 text-blue-600 rounded-md">
              No subjects found for this program.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <SubjectCard 
                  key={subject.id} 
                  subject={subject} 
                  programId={parseInt(programId)} 
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
