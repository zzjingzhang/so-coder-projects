import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Page from '../components/Page';
import LogoTitle from '../components/LogoTitle';

interface HeartState {
  id: number;
  isLiked: boolean;
  likeCount: number;
}

const HeartDemo: React.FC = () => {
  const [hearts, setHearts] = useState<HeartState[]>([
    { id: 1, isLiked: false, likeCount: 42 },
    { id: 2, isLiked: true, likeCount: 156 },
    { id: 3, isLiked: false, likeCount: 89 },
    { id: 4, isLiked: false, likeCount: 234 },
  ]);

  const [mainHeartLiked, setMainHeartLiked] = useState(false);
  const [mainHeartCount, setMainHeartCount] = useState(1024);

  const toggleHeart = (id: number) => {
    setHearts((prev) =>
      prev.map((heart) =>
        heart.id === id
          ? {
              ...heart,
              isLiked: !heart.isLiked,
              likeCount: heart.isLiked ? heart.likeCount - 1 : heart.likeCount + 1,
            }
          : heart
      )
    );
  };

  const toggleMainHeart = () => {
    setMainHeartLiked((prev) => !prev);
    setMainHeartCount((prev) => (mainHeartLiked ? prev - 1 : prev + 1));
  };

  const heartPath = 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';

  const particles = [
    { angle: 0, distance: 50 },
    { angle: 45, distance: 45 },
    { angle: 90, distance: 55 },
    { angle: 135, distance: 40 },
    { angle: 180, distance: 50 },
    { angle: 225, distance: 45 },
    { angle: 270, distance: 55 },
    { angle: 315, distance: 40 },
  ];

  return (
    <Page title="Heart Animation">
      <div className="space-y-8">
        <LogoTitle
          title="Interactive Heart Icons"
          subtitle="Click on the hearts to see smooth scale and bounce animations"
          size="md"
        />

        <motion.div
          className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg border border-rose-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <motion.button
                className="relative p-4 rounded-full focus:outline-none"
                onClick={toggleMainHeart}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: mainHeartLiked ? [1, 1.3, 0.9, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.2, 0.4, 0.6, 1],
                  ease: 'easeInOut',
                }}
              >
                <AnimatePresence>
                  {mainHeartLiked && (
                    <>
                      <motion.div
                        key="ripple1"
                        className="absolute inset-0 rounded-full bg-rose-300"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                      <motion.div
                        key="ripple2"
                        className="absolute inset-0 rounded-full bg-pink-300"
                        initial={{ scale: 0.5, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                      />
                      {particles.map((particle, index) => (
                        <motion.div
                          key={`particle-${index}`}
                          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: index % 2 === 0 ? '#f43f5e' : '#ec4899',
                          }}
                          initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                          animate={{
                            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                            scale: 0,
                            opacity: 0,
                          }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                <svg className="w-24 h-24" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d={heartPath}
                    stroke={mainHeartLiked ? '#f43f5e' : '#d1d5db'}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      fill: mainHeartLiked ? '#f43f5e' : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>
              </motion.button>
            </div>

            <motion.div
              className="mt-4 text-center"
              animate={{
                scale: mainHeartLiked ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-2xl font-bold text-rose-600">
                {mainHeartCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {mainHeartLiked ? 'You liked this!' : 'Click to like'}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-6">Multiple Hearts Example</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hearts.map((heart, index) => (
              <motion.div
                key={heart.id}
                className="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Item {heart.id}</p>
                    <p className="text-sm text-gray-500">
                      {heart.likeCount} {heart.likeCount === 1 ? 'like' : 'likes'}
                    </p>
                  </div>
                </div>

                <motion.button
                  className="p-2 rounded-full hover:bg-rose-50 transition-colors focus:outline-none"
                  onClick={() => toggleHeart(heart.id)}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heart.isLiked ? 'liked' : 'unliked'}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                        <path
                          d={heartPath}
                          stroke={heart.isLiked ? '#f43f5e' : '#9ca3af'}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill={heart.isLiked ? '#f43f5e' : 'transparent'}
                        />
                      </svg>
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-rose-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Scale Bounce</h4>
                <p className="text-sm text-gray-500">
                  Multi-step scale animation creates a bouncy effect when liking
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Ripple Effect</h4>
                <p className="text-sm text-gray-500">
                  Expanding circles create a splash effect when heart is liked
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Particles</h4>
                <p className="text-sm text-gray-500">
                  Small particles burst outwards in all directions on like
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default HeartDemo;
