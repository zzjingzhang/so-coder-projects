import React, { useState, useEffect } from 'react';
import { navItems } from '@/data/mockData';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--gaming-dark)]/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gaming-neon)] to-[var(--gaming-purple)] flex items-center justify-center animate-glow">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[var(--gaming-neon)] to-[var(--gaming-cyan)] bg-clip-text text-transparent">
                PLAYBOX
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--gaming-neon)] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="p-2 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gaming-neon)] rounded-full text-xs text-white flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>

          <button
            className="md:hidden p-2 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-80 bg-[var(--gaming-dark-secondary)] transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gaming-neon)] to-[var(--gaming-purple)] flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--gaming-neon)] to-[var(--gaming-cyan)] bg-clip-text text-transparent">
                PLAYBOX
              </span>
            </Link>
            <button
              className="p-2 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300"
              onClick={closeMenu}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 font-medium py-3 border-b border-[var(--gaming-muted)]/20 hover:border-[var(--gaming-neon)]"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex items-center justify-around">
            <button className="p-3 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 rounded-lg hover:bg-[var(--gaming-muted)]/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-3 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 rounded-lg hover:bg-[var(--gaming-muted)]/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="p-3 text-[var(--gaming-light)] hover:text-[var(--gaming-neon)] transition-colors duration-300 rounded-lg hover:bg-[var(--gaming-muted)]/10 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--gaming-neon)] rounded-full text-xs text-white flex items-center justify-center font-bold">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;
