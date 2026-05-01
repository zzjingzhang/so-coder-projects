import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'

const data = [
  { name: 'Mon', value1: 400, value2: 240, value3: 450 },
  { name: 'Tue', value1: 300, value2: 139, value3: 500 },
  { name: 'Wed', value1: 200, value2: 980, value3: 400 },
  { name: 'Thu', value1: 278, value2: 390, value3: 350 },
  { name: 'Fri', value1: 189, value2: 480, value3: 600 },
  { name: 'Sat', value1: 239, value2: 380, value3: 550 },
  { name: 'Sun', value1: 349, value2: 430, value3: 480 },
]

const Charts: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Charts</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Interactive data visualization examples</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Line Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value1" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="value2" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Area Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value3" stroke="#8B5CF6" fillOpacity={0.3} fill="#8B5CF6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Bar Chart Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value1" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="value2" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Charts
