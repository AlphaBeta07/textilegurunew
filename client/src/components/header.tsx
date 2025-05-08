import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { GraduationCap, Search, Menu } from 'lucide-react';
import { LanguageSelector } from './language-selector';
import { Input } from '@/components/ui/input';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <a className="flex items-center space-x-2">
                <GraduationCap className="text-primary text-2xl" />
                <span className="font-sans font-bold text-xl md:text-2xl text-primary">EduVision</span>
              </a>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* SearchBar - hidden on mobile */}
            <div className="hidden md:flex items-center relative">
              <Input 
                type="text" 
                placeholder="Search programs..." 
                className="w-64 lg:w-80 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="absolute right-3 text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700" 
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <div className="flex items-center relative mb-4">
              <Input 
                type="text" 
                placeholder="Search programs..." 
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="absolute right-3 text-gray-400">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
