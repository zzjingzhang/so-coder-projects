import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendChartProps } from '../../types';

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  width = 150,
  height = 80,
  color = '#0ea5e9',
  showGrid = true,
  showTooltip = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex ${className}`}>
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          {showTooltip && <Tooltip />}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
