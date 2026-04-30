import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartDataPoint {
  n: number
  [key: string]: number
}

interface BigOChartProps {
  data: ChartDataPoint[]
  dataKey: string
  title: string
  color: string
}

const BigOChart: React.FC<BigOChartProps> = ({ data, dataKey, title, color }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="n" 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            label={{ value: 'n', position: 'insideBottomRight', fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF" 
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value > 1e6) return value.toExponential(1)
              if (value > 1000) return (value / 1000).toFixed(0) + 'k'
              return value
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB',
            }}
            formatter={(value: number) => {
              if (value > 1e15) return value.toExponential(2)
              if (value > 1e6) return value.toExponential(2)
              return [Number.isInteger(value) ? value : value.toFixed(4), dataKey]
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BigOChart
