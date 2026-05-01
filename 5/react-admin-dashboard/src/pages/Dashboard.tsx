import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const barData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
]

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 300 },
  { name: 'Others', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">12,543</p>
              <p className="text-green-500 text-sm mt-1">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <i className="pi pi-users text-blue-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">$54,320</p>
              <p className="text-green-500 text-sm mt-1">+8.2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <i className="pi pi-dollar text-green-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Orders</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">3,456</p>
              <p className="text-red-500 text-sm mt-1">-2.3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
              <i className="pi pi-shopping-cart text-yellow-500 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Now</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">847</p>
              <p className="text-green-500 text-sm mt-1">+5.4% from last hour</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <i className="pi pi-users text-purple-500 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Device Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
