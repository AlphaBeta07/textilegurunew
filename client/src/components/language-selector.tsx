import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (language: Language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    // In a real application, this would also update the app's locale
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      setIsOpen(false);
    }
  };

  // Add and remove event listener
  useState(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="relative language-selector" data-implementation="Language selector dropdown">
      <button 
        id="languageSelector" 
        className="flex items-center space-x-1 text-gray-700 hover:text-primary transition"
        onClick={toggleDropdown}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline font-medium">{currentLanguage.name}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      
      {isOpen && (
        <div 
          id="languageMenu" 
          className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              data-lang={lang.code}
              onClick={() => selectLanguage(lang)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
