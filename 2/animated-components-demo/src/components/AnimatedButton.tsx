import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ButtonState = 'idle' | 'loading' | 'success' | 'error';

interface AnimatedButtonProps {
  children: React.ReactNode;
  state?: ButtonState;
  onClick?: () => void;
  className?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  state = 'idle',
  onClick,
  className = '',
  loadingText = 'Loading...',
  successText = 'Success!',
  errorText = 'Error!',
}) => {
  const buttonColors = {
    idle: 'bg-indigo-600 hover:bg-indigo-700',
    loading: 'bg-indigo-500',
    success: 'bg-emerald-600',
    error: 'bg-rose-600',
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
    },
  };

  const successAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3,
    },
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${buttonColors[state]} ${className}`}
      disabled={state === 'loading'}
      animate={
        state === 'error'
          ? shakeAnimation
          : state === 'success'
          ? successAnimation
          : {}
      }
      whileHover={state === 'idle' ? { scale: 1.05 } : {}}
      whileTap={state === 'idle' ? { scale: 0.95 } : {}}
    >
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-5 h-5"
            >
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>
            <span>{loadingText}</span>
          </motion.div>
        )}

        {state === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{successText}</span>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{errorText}</span>
          </motion.div>
        )}

        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AnimatedButton;
