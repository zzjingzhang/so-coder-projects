import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const sectionsRef = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    const navItems = [
      { id: 'about', label: t.nav.about },
      { id: 'experience', label: t.nav.experience },
      { id: 'projects', label: t.nav.projects },
      { id: 'skills', label: t.nav.skills },
      { id: 'contact', label: t.nav.contact },
    ];

    navItems.forEach(item => {
      sectionsRef.current.set(item.id, document.getElementById(item.id));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );

    navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [t]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-black/30 backdrop-blur-lg border-b border-black/10 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SS
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            <VisitorCounter />
            
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-200"
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/20 transition-all duration-200"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/90 dark:bg-black/80 backdrop-blur-lg border-t border-black/10 dark:border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-500 border-l-4 border-blue-500'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center justify-between mb-4">
                <VisitorCounter />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-200"
                >
                  <Globe size={16} />
                  <span className="text-sm">{language.toUpperCase()}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-200"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
