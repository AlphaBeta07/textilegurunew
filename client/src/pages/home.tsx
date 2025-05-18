import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProgramCard } from '@/components/program-card';
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation';
import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Program } from '@shared/schema';

export default function Home() {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  const { data: programs, isLoading, error } = useQuery<Program[]>({
    queryKey: ['/api/programs'],
  });

  return (
    <>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbNavigation items={{}} />
        
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fade-in"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-sans font-bold text-gray-900">Programs</h2>
            <div className="flex space-x-2">
              <button 
                className={`p-2 rounded-lg hover:bg-gray-100 text-gray-600 ${viewType === 'grid' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewType('grid')}
              >
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 rounded-lg hover:bg-gray-100 text-gray-600 ${viewType === 'list' ? 'bg-gray-100' : ''}`}
                onClick={() => setViewType('list')}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              Error loading programs. Please try again later.
            </div>
          ) : (
            <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {programs?.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </motion.section>
      </main>
      
      <Footer />
    </>
  );
}
