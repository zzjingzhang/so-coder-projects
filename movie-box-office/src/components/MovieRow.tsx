import React from 'react';
import type { Movie } from '../types/movie';
import { BoxOfficeChart } from './BoxOfficeChart';

interface MovieRowProps {
  movie: Movie;
  rank: number;
  maxBoxOffice: number;
}

const getRankStyle = (rank: number): string => {
  if (rank === 1) return 'bg-yellow-500 text-white';
  if (rank === 2) return 'bg-gray-400 text-white';
  if (rank === 3) return 'bg-amber-700 text-white';
  return 'bg-gray-200 text-gray-700';
};

export const MovieRow: React.FC<MovieRowProps> = ({ movie, rank, maxBoxOffice }) => {
  return (
    <div
      className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-all duration-300 ${
        movie.isReleased
          ? 'bg-gray-50 opacity-80'
          : 'bg-white hover:shadow-md'
      }`}
    >
      <div className="col-span-1 flex justify-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankStyle(rank)}`}
        >
          {rank}
        </div>
      </div>
      
      <div className="col-span-3">
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${
            movie.isReleased ? 'text-gray-500' : 'text-gray-800'
          }`}>
            {movie.name}
          </span>
          {movie.isReleased && (
            <span className="text-xs bg-gray-300 text-gray-600 px-2 py-0.5 rounded">
              已下映
            </span>
          )}
          {!movie.isReleased && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
              剩余 {movie.remainingDays} 天
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          口碑: {movie.reputation} 分
        </div>
      </div>
      
      <div className="col-span-8">
        <BoxOfficeChart
          actualBoxOffice={movie.actualBoxOffice}
          predictedBoxOffice={movie.predictedBoxOffice}
          maxBoxOffice={maxBoxOffice}
        />
      </div>
    </div>
  );
};
