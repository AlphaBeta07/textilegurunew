import { Upload, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

type VisualSearchProps = {
  onSearch?: (file: File) => void;
};

export function VisualSearch({ onSearch }: VisualSearchProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onSearch) {
      onSearch(files[0]);
    }
  };

  return (
    <section id="visualSearch" className="mb-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-gray-900 mb-2">
        Find Learning Programs Visually
      </h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Discover educational content through our visual search - simply upload an image or use our camera to find relevant programs.
      </p>
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Search by Image</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02, borderColor: '#3B82F6' }}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-primary transition cursor-pointer bg-gray-50"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mb-3" />
              <p className="text-gray-600 text-center font-medium">Upload an image</p>
              <p className="text-gray-500 text-sm text-center mt-1">Drag & drop or click to browse</p>
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02, borderColor: '#3B82F6' }}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-primary transition cursor-pointer bg-gray-50"
            >
              <Camera className="h-8 w-8 text-gray-400 mb-3" />
              <p className="text-gray-600 text-center font-medium">Take a photo</p>
              <p className="text-gray-500 text-sm text-center mt-1">Use your device camera</p>
            </motion.div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Popular search categories</h3>
          <div className="flex flex-wrap gap-2">
            {['Mathematics', 'Language Learning', 'Science', 'Programming', 'Business', 'Music'].map((category) => (
              <motion.span
                key={category}
                whileHover={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm hover:bg-primary hover:text-white transition cursor-pointer"
              >
                {category}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
