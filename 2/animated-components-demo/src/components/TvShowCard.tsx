import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextEpisodeBadge from './NextEpisodeBadge';
import type { TvShow } from '../data/tvShowsData';

interface TvShowCardProps {
  show: TvShow;
  isExpanded: boolean;
  onToggle: () => void;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ show, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onToggle}
    >
      <motion.div
        className="p-4"
        animate={{
          backgroundColor: isExpanded ? '#f8fafc' : '#ffffff',
        }}
      >
        <div className={`flex ${isExpanded ? 'flex-col gap-4' : 'items-center gap-4'}`}>
          <motion.div
            className="flex-shrink-0 overflow-hidden bg-gray-200"
            animate={{
              width: isExpanded ? '100%' : 80,
              height: isExpanded ? 200 : 80,
              borderRadius: isExpanded ? 16 : 12,
            }}
          >
            <motion.img
              src={show.image}
              alt={show.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{
                scale: isExpanded ? 1.05 : 1.1,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          <div className={`flex-1 ${isExpanded ? '' : 'min-w-0'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <motion.h3
                  className="text-lg font-bold text-gray-900 truncate"
                  animate={{
                    fontSize: isExpanded ? '1.25rem' : '1.125rem',
                  }}
                >
                  {show.title}
                </motion.h3>
                <p className="text-sm text-gray-500 mt-1">{show.genre}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700">{show.rating}</span>
                </div>
                <NextEpisodeBadge episode={show.nextEpisode} animated={isExpanded} />
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {show.description}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-gray-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-sm text-gray-600 mb-4">
                {show.longDescription || show.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{show.seasons} Seasons</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{show.episodes} Episodes</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-4 flex justify-center"
          animate={{
            rotate: isExpanded ? 180 : 0,
          }}
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TvShowCard;
