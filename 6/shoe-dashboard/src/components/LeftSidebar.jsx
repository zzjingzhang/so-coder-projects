import React, { useState } from 'react'
import { Home, ShoppingCart, Store, Calendar, Grid3X3, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

const LeftSidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { icon: Home, label: '首页', active: true },
    { icon: ShoppingCart, label: '购物车' },
    { icon: Store, label: '店铺' },
    { icon: Calendar, label: '日历' },
    { icon: Grid3X3, label: '应用' },
  ]

  return (
    <div className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">鞋类销售</h1>}
        <Button variant="ghost" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? 'default' : 'ghost'}
            className={`w-full justify-start ${item.active ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="ml-3">{item.label}</span>}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="font-bold">JD</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-400">管理员</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar
