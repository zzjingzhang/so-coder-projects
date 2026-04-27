import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Calendar,
  MessageCircle,
  FileText,
  Pill,
  User,
  AlertTriangle,
  Bell,
  Search,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils';
import { Avatar } from '@/components/ui/Avatar';

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/appointment', label: '医生预约', icon: Calendar },
  { path: '/consultation', label: '在线问诊', icon: MessageCircle },
  { path: '/medical-records', label: '病历管理', icon: FileText },
  { path: '/medicines', label: '药品信息', icon: Pill },
  { path: '/health-records', label: '健康档案', icon: User },
  { path: '/emergency', label: '紧急求助', icon: AlertTriangle },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text">
                智慧医疗
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-background hover:text-text'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-background rounded-lg px-3 py-1.5">
              <Search className="w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="搜索医生、药品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none ml-2 text-sm w-40"
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-background transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>

            <div className="flex items-center space-x-2">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
                alt="用户头像"
                size="sm"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-text">张三</p>
                <p className="text-xs text-text-secondary">普通用户</p>
              </div>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-background"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-background hover:text-text'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};
