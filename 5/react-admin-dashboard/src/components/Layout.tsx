import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Topbar />
      <main className="ml-64 pt-16 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
