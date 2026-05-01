import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { MenuItem } from '../types'

const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: 'pi pi-home', path: '/' },
  { label: 'Charts', icon: 'pi pi-chart-bar', path: '/charts' },
  { label: 'Calendar', icon: 'pi pi-calendar', path: '/calendar' },
  { label: 'Data Table', icon: 'pi pi-table', path: '/table' },
  { label: 'Forms', icon: 'pi pi-file-edit', path: '/forms' },
  { label: 'Icons', icon: 'pi pi-star', path: '/icons' },
]

const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <div className="w-64 bg-gray-900 dark:bg-gray-950 text-white h-screen fixed left-0 top-0 flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <i className="pi pi-th-large" />
          Admin Dashboard
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <i className={item.icon} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
