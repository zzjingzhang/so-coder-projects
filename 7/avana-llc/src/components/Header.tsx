import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: '首页',
    path: '/'
  },
  {
    label: '关于我们',
    path: '/about'
  },
  {
    label: '服务',
    children: [
      {
        label: '网页设计',
        path: '/services/web-design'
      },
      {
        label: '品牌设计',
        path: '/services/brand-design'
      },
      {
        label: 'UI/UX设计',
        path: '/services/ui-ux-design'
      },
      {
        label: '前端开发',
        path: '/services/frontend-development'
      }
    ]
  },
  {
    label: '作品集',
    children: [
      {
        label: '网页设计',
        path: '/portfolio/web-design'
      },
      {
        label: '品牌设计',
        path: '/portfolio/brand-design'
      },
      {
        label: 'UI/UX设计',
        path: '/portfolio/ui-ux-design'
      }
    ]
  },
  {
    label: '博客',
    path: '/blog'
  },
  {
    label: '联系我们',
    path: '/contact'
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CLOSE_DELAY = 200;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
  }, [location]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdownMenu = (label: string) => {
    clearCloseTimer();
    setOpenDropdown(label);
  };

  const closeDropdownMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, CLOSE_DELAY);
  };

  const toggleDropdown = (label: string, isMobile: boolean = false) => {
    if (isMobile) {
      setMobileOpenDropdown(mobileOpenDropdown === label ? null : label);
    } else {
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  const renderNavItem = (item: NavItem, isMobile: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = isMobile 
      ? mobileOpenDropdown === item.label 
      : openDropdown === item.label;
    const isActive = item.path && location.pathname === item.path;

    if (isMobile) {
      return (
        <div key={item.label} className="border-b border-gray-100 last:border-0">
          {hasChildren ? (
            <div>
              <button
                onClick={() => toggleDropdown(item.label, true)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
                  isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                )}
              >
                <span className="font-medium">{item.label}</span>
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 bg-gray-50">
                  {item.children!.map(child => (
                    <Link
                      key={child.path}
                      to={child.path || '#'}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors",
                        location.pathname === child.path 
                          ? "text-primary font-medium" 
                          : "text-gray-600 hover:text-primary"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.path || '#'}
              className={cn(
                "block px-4 py-3 font-medium transition-colors",
                isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          )}
        </div>
      );
    }

    return (
      <div 
        key={item.label}
        className="relative"
        onMouseEnter={() => hasChildren && openDropdownMenu(item.label)}
        onMouseLeave={() => hasChildren && closeDropdownMenu()}
      >
        {hasChildren ? (
          <button
            onClick={() => toggleDropdown(item.label)}
            className={cn(
              "flex items-center gap-1 px-4 py-2 font-medium transition-colors group",
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            )}
          >
            <span>{item.label}</span>
            <ChevronDown 
              className={cn(
                "w-4 h-4 transition-transform group-hover:text-primary",
                isDropdownOpen && "rotate-180"
              )}
            />
          </button>
        ) : (
          <Link
            to={item.path || '#'}
            className={cn(
              "block px-4 py-2 font-medium transition-colors relative",
              isActive 
                ? "text-primary" 
                : "text-gray-700 hover:text-primary"
            )}
          >
            {item.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        )}

        {hasChildren && isDropdownOpen && (
          <div 
            className="absolute left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn"
            style={{ top: 'calc(100% + 4px)' }}
            onMouseEnter={() => clearCloseTimer()}
            onMouseLeave={() => closeDropdownMenu()}
          >
            <div className="absolute -top-4 left-0 right-0 h-4" />
            {item.children!.map(child => (
              <Link
                key={child.path}
                to={child.path || '#'}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm transition-colors group",
                  location.pathname === child.path 
                    ? "text-primary bg-primary/5" 
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span>{child.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Avana <span className="text-primary">LLC</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => renderNavItem(item))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
            >
              开始项目
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto animate-slideUp">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            {navItems.map(item => renderNavItem(item, true))}
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link 
                to="/contact" 
                className="block w-full text-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                开始项目
              </Link>
            </div>
          </nav>
        </div>
      )}

      {openDropdown && !isMenuOpen && (
        <div 
          className="fixed inset-0 z-30 hidden lg:block"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </header>
  );
};

export default Header;
