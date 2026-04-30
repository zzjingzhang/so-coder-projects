import React from 'react';
import { motion } from 'framer-motion';

interface NextEpisodeBadgeProps {
  episode: string;
  animated?: boolean;
}

const NextEpisodeBadge: React.FC<NextEpisodeBadgeProps> = ({
  episode,
  animated = false,
}) => {
  return (
    <motion.div
      className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 px-3 py-1.5 rounded-full text-sm font-medium"
      animate={
        animated
          ? {
              scale: [1, 1.05, 1],
            }
          : {}
      }
      transition={
        animated
          ? {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : {}
      }
    >
      <motion.div
        animate={
          animated
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }
            : {}
        }
        transition={
          animated
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {}
        }
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </motion.div>
      <span>Next: {episode}</span>
    </motion.div>
  );
};

export default NextEpisodeBadge;
