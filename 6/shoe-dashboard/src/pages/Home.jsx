import React from 'react'
import { Search, Filter, Download, Clock, DollarSign, Activity, Users, CreditCard, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const mockShoes = [
  {
    id: 'SH001',
    name: 'Air Max 90',
    brand: 'Nike',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    time: '2024-01-15 14:30',
    country: '美国',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
  },
  {
    id: 'SH002',
    name: 'Ultraboost',
    brand: 'Adidas',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    time: '2024-01-16 09:15',
    country: '德国',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
  },
  {
    id: 'SH003',
    name: 'Chuck 70',
    brand: 'Converse',
    price: 699,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    time: '2024-01-17 16:45',
    country: '美国',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
  },
  {
    id: 'SH004',
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 899,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    time: '2024-01-18 11:20',
    country: '英国',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
  },
]

const mockOrders = [
  { id: 'OR001', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop', price: 1299 },
  { id: 'OR002', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop', price: 1599 },
  { id: 'OR003', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop', price: 699 },
  { id: 'OR004', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop', price: 899 },
  { id: 'OR005', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop', price: 1999 },
]

const stats = [
  { label: '履约状态', value: '98%', icon: Clock, color: 'bg-blue-500' },
  { label: '实时追踪', value: '1,234', icon: Activity, color: 'bg-green-500' },
  { label: '销售视图', value: '¥128,450', icon: DollarSign, color: 'bg-purple-500' },
  { label: '余额', value: '¥45,678', icon: CreditCard, color: 'bg-orange-500' },
  { label: '交易', value: '567', icon: TrendingUp, color: 'bg-pink-500' },
  { label: '参与率', value: '87%', icon: Users, color: 'bg-cyan-500' },
]

const Home = () => {
  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-950 text-white">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">仪表盘</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input placeholder="搜索..." className="pl-10 bg-gray-900 border-gray-700 text-white w-64" />
            </div>
            <Button variant="outline">
              <Filter size={18} className="mr-2" />
              过滤
            </Button>
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              导出
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="shoes" className="w-full">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger value="shoes">鞋子</TabsTrigger>
            <TabsTrigger value="orders">订单</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shoes" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockShoes.map((shoe) => (
                <Card key={shoe.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="relative">
                    <img src={shoe.image} alt={shoe.name} className="w-full h-48 object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{shoe.name}</h3>
                        <p className="text-sm text-gray-400">{shoe.brand}</p>
                      </div>
                      <span className="text-lg font-bold text-green-400">¥{shoe.price}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={shoe.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-gray-400">{shoe.id}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span>{shoe.country}</span>
                        <span className="mx-1">•</span>
                        <span>{shoe.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <div className="text-center py-12 text-gray-400">
              <p>订单内容即将推出...</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="text-center py-12 text-gray-400">
              <p>分析内容即将推出...</p>
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <h3 className="text-xl font-bold mb-4">最近订单</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <img src={order.image} alt={`Order ${order.id}`} className="w-full h-32 object-cover" />
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{order.id}</span>
                    <span className="font-bold text-green-400">¥{order.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
