import React from 'react'
import { Bell, MessageSquare, Plus } from 'lucide-react'
import { Button } from './ui/button'

const RightSidebar = () => {
  return (
    <div className="w-20 bg-gray-800 text-white flex flex-col items-center py-6 space-y-6">
      <Button className="bg-green-600 hover:bg-green-700 w-12 h-12 rounded-full p-0">
        <Plus size={20} />
      </Button>
      
      <div className="text-sm text-center text-gray-400">
        <span>创建</span>
        <br />
        <span>订单</span>
      </div>

      <div className="flex-1" />

      <Button variant="ghost" className="relative">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
      </Button>

      <Button variant="ghost" className="relative">
        <MessageSquare size={20} />
        <span className="absolute -top-1 -right-1 bg-blue-500 text-xs w-4 h-4 rounded-full flex items-center justify-center">5</span>
      </Button>
    </div>
  )
}

export default RightSidebar
