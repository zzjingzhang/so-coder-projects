import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Page: React.FC<PageProps> = ({ title, children, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {showBackButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </motion.button>
            )}
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {showBackButton && <div className="w-16" />}
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </motion.div>
  );
};

export default Page;
