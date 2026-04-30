import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { darkMode } = useSettings();

  const navItems = [
    { path: '/', label: '主页', icon: 'pi pi-home' },
    { path: '/settings', label: '设置', icon: 'pi pi-cog' },
    { path: '/about', label: '关于', icon: 'pi pi-info-circle' },
  ];

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'sidebar-dark' : ''}`}>
        <div className="flex flex-col h-full p-4">
          <h2 className="text-xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
            Max Todos
          </h2>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className={`overlay ${isOpen ? 'active' : ''}`}
          onClick={onClose}
        />
      )}
    </>
  );
}