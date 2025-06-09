import React, { useState } from 'react';
import { Flame, Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'dashboard', label: t('nav.dashboard') },
    { id: 'incidents', label: t('nav.incidents') },
    { id: 'teams', label: t('nav.teams') },
    { id: 'vehicles', label: t('nav.vehicles') },
    { id: 'employees', label: t('nav.employees') },
    { id: 'map', label: t('nav.map') },
    { id: 'statistics', label: t('nav.statistics') }
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg transition-all duration-500 border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 group">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg transition-all duration-300 group-hover:bg-red-200 group-hover:scale-110">
                <Flame className="h-8 w-8 text-red-600 transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
                  {t('dashboard.title')}
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block animate-fade-in">
                  Emergency Response System
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white shadow-lg animate-pulse-gentle'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50 hover:shadow-md'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bg' : 'en')}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 flex items-center space-x-1 hover:scale-110 hover:text-red-600"
              title={`Switch to ${language === 'en' ? 'Bulgarian' : 'English'}`}
            >
              <Languages className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
              <span className="text-xs font-medium uppercase transition-colors duration-300">
                {language}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 pb-4 transform translate-y-0' 
            : 'max-h-0 opacity-0 overflow-hidden transform -translate-y-4'
        }`}>
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-200">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isMobileMenuOpen ? 'slideInUp 0.3s ease-out forwards' : ''
                }}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;