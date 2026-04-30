import { useSettings } from '../context/SettingsContext';

export function Header({ onMenuClick }) {
  const { darkMode, setDarkMode } = useSettings();

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="菜单"
        >
          <i className="pi pi-bars text-gray-600 dark:text-gray-300"></i>
        </button>
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Max Todos
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? '切换到浅色模式' : '切换到深色模式'}
        >
          <i className={`pi ${darkMode ? 'pi-moon' : 'pi-sun'} text-gray-600 dark:text-gray-300`}></i>
        </button>
      </div>
    </header>
  );
}