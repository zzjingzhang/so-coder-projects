import React from 'react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { PieChartProps } from '../../types';

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 100,
  height = 100,
  innerRadius = 30,
  outerRadius = 45,
  showLegend = false,
  className = '',
}) => {
  const COLORS = data.map((d) => d.color || '#0ea5e9');

  return (
    <div className={`inline-flex ${className}`}>
      <ResponsiveContainer width={width} height={height}>
        <RePieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={showLegend ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`${value}`, 'Value']} />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
