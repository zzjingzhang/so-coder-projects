import React from 'react';
import { Card, Typography } from 'antd';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import type { TemperatureData } from '../types';

const { Title } = Typography;

interface TemperatureChartProps {
  data: TemperatureData[];
  cityName: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
        <p className="text-sm text-red-500">
          温度: <span className="font-bold">{payload[0]?.value}°C</span>
        </p>
        <p className="text-sm text-blue-500">
          湿度: <span className="font-bold">{payload[1]?.value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data, cityName }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <Title level={4} className="mb-4! text-gray-700">
        {cityName} - 温度变化趋势
      </Title>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              yAxisId="left"
              stroke="#ef4444"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: '温度 (°C)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#ef4444' } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#3b82f6"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{ value: '湿度 (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#3b82f6' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTemp)"
              name="温度 (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="湿度 (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TemperatureChart;
