import React from 'react';
import type { ProgressChartProps } from '../../types';

export const ProgressChart: React.FC<ProgressChartProps> = ({
  value,
  max = 100,
  color = '#0ea5e9',
  showLabel = true,
  format,
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const displayValue = format ? format(value) : `${Math.round(value)}`;

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {displayValue}
        </span>
      )}
    </div>
  );
};

export default ProgressChart;
