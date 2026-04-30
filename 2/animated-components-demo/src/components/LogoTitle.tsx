import React from 'react';
import { motion } from 'framer-motion';

interface LogoTitleProps {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

const LogoTitle: React.FC<LogoTitleProps> = ({
  title,
  subtitle,
  size = 'md',
  centered = false,
}) => {
  const sizeClasses = {
    sm: {
      title: 'text-2xl',
      subtitle: 'text-sm',
    },
    md: {
      title: 'text-3xl',
      subtitle: 'text-base',
    },
    lg: {
      title: 'text-4xl',
      subtitle: 'text-lg',
    },
  };

  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-2"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className={`${sizeClasses[size].title} font-bold text-gray-900`}>
          {title}
        </h1>
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${sizeClasses[size].subtitle} text-gray-600`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default LogoTitle;
