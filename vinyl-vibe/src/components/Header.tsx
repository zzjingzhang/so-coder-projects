import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  CategoryIcon,
  HeartIcon,
  CartIcon,
  UserIcon,
  SearchIcon,
  XIcon,
  MenuIcon,
  MusicIcon
} from './Icons';
import { navItems } from '../mock';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  home: HomeIcon,
  category: CategoryIcon,
  heart: HeartIcon,
  cart: CartIcon,
  user: UserIcon,
  search: SearchIcon
};

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <MusicIcon size={24} className="text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              VinylVibe
            </span>
          </button>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 4).map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 group cursor-pointer"
                >
                  <Icon size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2">
            <div
              ref={searchContainerRef}
              className="flex items-center"
            >
              <button
                onClick={handleSearchToggle}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  searchOpen
                    ? 'bg-gray-800 text-purple-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                aria-label="搜索"
              >
                {searchOpen ? (
                  <XIcon size={20} />
                ) : (
                  <SearchIcon size={20} />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  searchOpen ? 'w-48 sm:w-64 lg:w-80 ml-2 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索唱片、耳机、艺术家..."
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    >
                      <XIcon size={16} />
                    </button>
                  )}
                </form>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
              aria-label="菜单"
            >
              {mobileMenuOpen ? (
                <XIcon size={24} />
              ) : (
                <MenuIcon size={24} />
              )}
            </button>

            <div className="hidden md:flex items-center">
              <button
                onClick={() => handleNavigation('/profile')}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all cursor-pointer"
              >
                <UserIcon size={20} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 border-t border-gray-800">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.href)}
                    className="flex items-center space-x-3 px-2 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all w-full text-left cursor-pointer"
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
