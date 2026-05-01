import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { Home, Info } from 'lucide-react'

const TopNav = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/about', label: '关于', icon: Info },
  ]

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-3">
      <div className="flex items-center space-x-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            asChild
            className={location.pathname === item.path ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            <Link to={item.path}>
              <item.icon size={18} className="mr-2" />
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TopNav
