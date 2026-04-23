import React, { useCallback, useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { generateInitialMovies } from '../utils/movieGenerator';
import {
  updateMovies,
  sortMoviesByBoxOffice,
  filterMovies,
  maybeAddNewMovie,
} from '../utils/movieService';
import { MovieRow } from './MovieRow';

export const MovieRanking: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const initialMovies = generateInitialMovies(8);
    const sorted = sortMoviesByBoxOffice(initialMovies);
    setMovies(sorted);
  }, []);

  const updateMovieData = useCallback(() => {
    setMovies(prevMovies => {
      let updated = updateMovies(prevMovies);
      updated = maybeAddNewMovie(updated);
      updated = filterMovies(updated);
      const sorted = sortMoviesByBoxOffice(updated);
      return sorted;
    });
    setLastUpdate(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateMovieData();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateMovieData]);

  const maxBoxOffice = movies.length > 0 
    ? Math.max(...movies.map(m => Math.max(m.actualBoxOffice, m.predictedBoxOffice)))
    : 10000;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          电影票房排行榜
        </h1>
        <p className="text-white/80 text-sm">
          最后更新: {lastUpdate.toLocaleTimeString('zh-CN')}
        </p>
      </div>

      <div className="bg-white/95 rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold">
          <div className="col-span-1 text-center">排名</div>
          <div className="col-span-3">电影名称</div>
          <div className="col-span-8">票房情况</div>
        </div>

        <div className="p-4 space-y-3">
          {movies.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              加载中...
            </div>
          ) : (
            movies.map((movie, index) => (
              <MovieRow
                key={movie.id}
                movie={movie}
                rank={index + 1}
                maxBoxOffice={maxBoxOffice}
              />
            ))
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded" />
              <span>实际票房</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 border-t-2 border-dashed border-blue-400" />
              <span>预测票房</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                剩余 N 天
              </span>
              <span>热映中</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-gray-300 text-gray-600 px-2 py-0.5 rounded">
                已下映
              </span>
              <span>票房不再增长</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-white/70 text-sm">
        <p>排行榜每 3 秒自动更新，模拟真实票房数据变化</p>
        <p className="mt-1">新电影有 20% 概率随机添加，高票房电影可能推出续集</p>
      </div>
    </div>
  );
};
