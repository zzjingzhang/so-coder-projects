import React from 'react'
import { useAppStore } from '../store/appStore'

const Topbar: React.FC = () => {
  const { theme, toggleTheme, user, logout } = useAppStore()

  return (
    <header className="h-16 bg-white dark:bg-gray-800 shadow-md flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <i className="pi pi-bars text-xl" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
        >
          <i className={`text-xl ${theme === 'light' ? 'pi pi-moon' : 'pi pi-sun'}`} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {user?.name.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-gray-800 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <i className="pi pi-sign-out" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar
