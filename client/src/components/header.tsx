import { useState } from 'react';
import { Link } from 'wouter';
import { Scissors, Shirt } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Scissors className="text-primary text-2xl transform rotate-45" />
                  <Shirt className="text-primary text-2xl absolute top-0.5 left-0.5 opacity-70" />
                </div>
                <div className="font-sans font-bold text-xl md:text-2xl">
                  <span className="text-primary">Textile</span>
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Guru</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
