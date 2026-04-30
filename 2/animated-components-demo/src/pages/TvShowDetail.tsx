import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import LogoTitle from '../components/LogoTitle';
import NextEpisodeBadge from '../components/NextEpisodeBadge';
import { tvShowsData } from '../data/tvShowsData';

const TvShowDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const show = tvShowsData.find((s) => s.id === parseInt(id || '0'));

  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.5], [20, 0]);

  if (!show) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Show Not Found</h2>
          <button
            onClick={() => navigate('/scroll-animation')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const episodes = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    title: `${show.title} - Episode ${i + 1}`,
    number: `S${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}E${String(i + 1).padStart(2, '0')}`,
    duration: `${Math.floor(Math.random() * 30) + 25} min`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        <motion.div
          className="relative h-[400px] md:h-[500px] overflow-hidden"
          style={{ scale: imageScale, opacity: imageOpacity }}
        >
          <img
            src={show.image}
            alt={show.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        </motion.div>

        <motion.nav
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/scroll-animation')}
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
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
              </button>
              <h2 className="text-lg font-bold text-white truncate max-w-[200px]">
                {show.title}
              </h2>
              <div className="w-16" />
            </div>
          </div>
        </motion.nav>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-6xl mx-auto px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {show.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-semibold">{show.rating}</span>
                </div>
                <span className="text-gray-300">{show.genre}</span>
                <span className="text-gray-300">{show.seasons} Seasons</span>
                <span className="text-gray-300">{show.episodes} Episodes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <LogoTitle
                title="About"
                size="sm"
              />
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <p className="text-gray-600 leading-relaxed">
                  {show.longDescription}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <LogoTitle
                title="Next Episodes"
                size="sm"
              />
              <div className="space-y-4">
                {episodes.map((episode, index) => (
                  <motion.div
                    key={episode.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {episode.number}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{episode.title}</h4>
                          <p className="text-sm text-gray-500">{episode.duration}</p>
                        </div>
                      </div>
                      <NextEpisodeBadge
                        episode={`S${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}E${String(index + 1).padStart(2, '0')}`}
                        animated={index === 0}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Rating</span>
                    <span className="font-semibold text-gray-900">{show.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Seasons</span>
                    <span className="font-semibold text-gray-900">{show.seasons}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Episodes</span>
                    <span className="font-semibold text-gray-900">{show.episodes}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-12 bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Scroll Animation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Scroll Progress</h4>
                <p className="text-sm text-gray-500">
                  Track scroll position to drive animations
                </p>
              </div>
            </div>
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
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Value Transforms</h4>
                <p className="text-sm text-gray-500">
                  Map scroll progress to animated values
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Parallax Effect</h4>
                <p className="text-sm text-gray-500">
                  Image scales and fades as you scroll
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TvShowDetail;
