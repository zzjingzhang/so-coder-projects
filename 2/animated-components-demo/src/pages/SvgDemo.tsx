import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import LogoTitle from '../components/LogoTitle';

const SvgDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const topLineVariants = {
    closed: { d: 'M 2 6.5 L 22 6.5' },
    open: { d: 'M 3 20 L 21 3' },
  };

  const middleLineVariants = {
    closed: { opacity: 1, x: 0 },
    open: { opacity: 0, x: -20 },
  };

  const bottomLineVariants = {
    closed: { d: 'M 2 17.5 L 22 17.5' },
    open: { d: 'M 3 3 L 21 20' },
  };

  const [activeTab, setActiveTab] = useState<'rotate' | 'path' | 'draw'>('rotate');

  return (
    <Page title="SVG Animations">
      <div className="space-y-8">
        <LogoTitle
          title="SVG Morphing & Animations"
          subtitle="Watch hamburger menu transform into close icon with smooth animations"
          size="md"
        />

        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg width="60" height="40" viewBox="0 0 24 24">
                <motion.path
                  d={topLineVariants.closed.d}
                  stroke={isOpen ? '#ef4444' : '#374151'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={topLineVariants}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.4, type: 'spring' }}
                />
                <motion.path
                  d="M 2 12 L 22 12"
                  stroke={isOpen ? '#ef4444' : '#374151'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={middleLineVariants}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.3 }}
                />
                <motion.path
                  d={bottomLineVariants.closed.d}
                  stroke={isOpen ? '#ef4444' : '#374151'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={bottomLineVariants}
                  animate={isOpen ? 'open' : 'closed'}
                  transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                />
              </svg>
            </motion.div>
            <p className="text-gray-500 text-center">
              Click the icon to toggle between hamburger menu and close icon
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Current: {isOpen ? 'Close Icon' : 'Hamburger Menu'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Styles</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('rotate')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'rotate'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rotate Lines
            </button>
            <button
              onClick={() => setActiveTab('path')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'path'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Path Morph
            </button>
            <button
              onClick={() => setActiveTab('draw')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'draw'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draw Effect
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl">
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('rotate')}
              >
                <svg width="60" height="40" viewBox="0 0 24 24">
                  <motion.path
                    d="M 2 6.5 L 22 6.5"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      rotate: activeTab === 'rotate' ? (isOpen ? 45 : 0) : 0,
                      y: activeTab === 'rotate' ? (isOpen ? 5.5 : 0) : 0,
                    }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  />
                  <motion.path
                    d="M 2 12 L 22 12"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      opacity: activeTab === 'rotate' ? (isOpen ? 0 : 1) : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d="M 2 17.5 L 22 17.5"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      rotate: activeTab === 'rotate' ? (isOpen ? -45 : 0) : 0,
                      y: activeTab === 'rotate' ? (isOpen ? -5.5 : 0) : 0,
                    }}
                    transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                  />
                </svg>
              </motion.div>
              <p className="text-sm font-medium text-gray-700 text-center">Rotate Lines</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl">
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('path')}
              >
                <svg width="60" height="40" viewBox="0 0 24 24">
                  <motion.path
                    d={isOpen ? 'M 3 20 L 21 3' : 'M 2 6.5 L 22 6.5'}
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ d: isOpen ? 'M 3 20 L 21 3' : 'M 2 6.5 L 22 6.5' }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  />
                  <motion.path
                    d="M 2 12 L 22 12"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d={isOpen ? 'M 3 3 L 21 20' : 'M 2 17.5 L 22 17.5'}
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ d: isOpen ? 'M 3 3 L 21 20' : 'M 2 17.5 L 22 17.5' }}
                    transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                  />
                </svg>
              </motion.div>
              <p className="text-sm font-medium text-gray-700 text-center">Path Morph</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-xl">
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('draw')}
              >
                <svg width="60" height="40" viewBox="0 0 24 24">
                  <motion.path
                    d="M 2 6.5 L 22 6.5"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: isOpen ? 0 : 1,
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.path
                    d="M 2 12 L 22 12"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: isOpen ? 0 : 1,
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.path
                    d="M 2 17.5 L 22 17.5"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: isOpen ? 0 : 1,
                      opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                  <motion.path
                    d="M 3 20 L 21 3"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: isOpen ? 1 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.path
                    d="M 3 3 L 21 20"
                    stroke="#374151"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{
                      pathLength: isOpen ? 1 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  />
                </svg>
              </motion.div>
              <p className="text-sm font-medium text-gray-700 text-center">Draw Effect</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 14l2 1M12 4v2.5M4 7v2.5m0 5L4 14v2.5m0 0l2-1m-2 1l2 1M20 7v2.5m0 5l-2-1m2 1l2-1m-2 1v-2.5M12 12l-2 1m2-1l2 1m-2-1v2.5"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Path Morphing</h4>
                <p className="text-sm text-gray-500">
                  Smoothly animate between different SVG paths
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
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
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Rotate & Transform</h4>
                <p className="text-sm text-gray-500">
                  Animate rotation, position, and scale of SVG elements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Spring Physics</h4>
                <p className="text-sm text-gray-500">
                  Natural-looking animations with spring easing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SvgDemo;
