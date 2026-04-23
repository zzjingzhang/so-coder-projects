import React from 'react';
import { formatBoxOffice } from '../utils/movieService';

interface BoxOfficeChartProps {
  actualBoxOffice: number;
  predictedBoxOffice: number;
  maxBoxOffice: number;
}

export const BoxOfficeChart: React.FC<BoxOfficeChartProps> = ({
  actualBoxOffice,
  predictedBoxOffice,
  maxBoxOffice,
}) => {
  const actualPercentage = Math.min((actualBoxOffice / maxBoxOffice) * 100, 100);
  const predictedPercentage = Math.min((predictedBoxOffice / maxBoxOffice) * 100, 100);

  return (
    <div className="w-full">
      <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        {predictedBoxOffice > actualBoxOffice && (
          <div
            className="absolute top-0 left-0 h-full bg-blue-100 transition-all duration-500"
            style={{ width: `${predictedPercentage}%` }}
          />
        )}
        
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${actualPercentage}%` }}
        />
        
        {predictedBoxOffice > actualBoxOffice && (
          <div
            className="absolute top-0 h-full border-l-4 border-dashed border-blue-400 transition-all duration-500"
            style={{ left: `${predictedPercentage}%` }}
          />
        )}
        
        <div className="absolute inset-0 flex items-center px-4">
          <span className="text-sm font-bold text-white drop-shadow-md">
            {formatBoxOffice(actualBoxOffice)}
          </span>
          {predictedBoxOffice > actualBoxOffice && (
            <span className="ml-2 text-xs text-blue-700">
              (预测: {formatBoxOffice(predictedBoxOffice)})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
