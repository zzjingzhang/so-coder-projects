import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Home = () => {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef(null);

  const techStack = [
    { name: 'React', description: 'Building user interfaces with React' },
    { name: 'TypeScript', description: 'Type-safe JavaScript development' },
    { name: 'Node.js', description: 'Server-side JavaScript runtime' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Next.js', description: 'React framework for production' },
    { name: 'Docker', description: 'Containerization and deployment' },
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTechIndex((prev) => (prev + 1) % techStack.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [techStack.length]);

  const goToSlide = (index) => {
    if (index === currentTechIndex) return;
    
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTechIndex(index);
      setIsVisible(true);
    }, 300);
    
    startAutoPlay();
  };

  const goToNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techStack.length);
      setIsVisible(true);
    }, 300);
    
    startAutoPlay();
  };

  const goToPrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTechIndex((prev) => (prev - 1 + techStack.length) % techStack.length);
      setIsVisible(true);
    }, 300);
    
    startAutoPlay();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20developer%20avatar%20minimalist%20style&image_size=square_hd"
                alt="Developer Avatar"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-xl border-4 border-purple-500"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Hi, I'm a{' '}
            <span className="text-purple-600 dark:text-purple-400">
              Full Stack Developer
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            I craft beautiful, performant web applications with modern technologies.
            Passionate about clean code, great user experiences, and continuous learning.
          </motion.p>

          {/* Tech Stack Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg relative"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tech Stack & Frameworks
            </h2>

            <div className="relative h-32 flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 z-10"
                aria-label="Previous technology"
              >
                <FiChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
              </button>

              <div className="flex-1 flex items-center justify-center px-12">
                <AnimatePresence mode="wait">
                  {isVisible && (
                    <motion.div
                      key={currentTechIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <div className="text-5xl md:text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                        {techStack[currentTechIndex].name}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        {techStack[currentTechIndex].description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 z-10"
                aria-label="Next technology"
              >
                <FiChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {/* Tech Indicators - Clickable */}
            <div className="flex justify-center space-x-3 mt-6">
              {techStack.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentTechIndex
                      ? 'bg-purple-600 dark:bg-purple-400 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to ${techStack[index].name}`}
                />
              ))}
            </div>
          </motion.div>

          {/* All Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm border transition-all duration-200 cursor-pointer ${
                    index === currentTechIndex
                      ? 'bg-purple-600 dark:bg-purple-600 text-white border-purple-600 dark:border-purple-600'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500'
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
