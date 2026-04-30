import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import LogoTitle from '../components/LogoTitle';
import NextEpisodeBadge from '../components/NextEpisodeBadge';
import { tvShowsData } from '../data/tvShowsData';

const ScrollAnimationDemo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Page title="Scroll Animations">
      <div className="space-y-8">
        <LogoTitle
          title="Scroll-Triggered Animations"
          subtitle="Watch as elements animate into view when you scroll"
          size="md"
        />

        <div className="space-y-6">
          {tvShowsData.map((show, index) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/scroll-animation/${show.id}`)}
            >
              <div className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-200 w-24 h-24">
                    <img
                      src={show.image}
                      alt={show.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {show.title}
                        </h3>
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
                          <span className="text-sm font-semibold text-gray-700">
                            {show.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {show.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                            />
                          </svg>
                          <span>{show.seasons} Seasons</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <svg
                            className="w-4 h-4"
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
                          <span>{show.episodes} Episodes</span>
                        </div>
                      </div>
                      <NextEpisodeBadge episode={show.nextEpisode} animated={false} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Features</h3>
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
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Viewport Trigger</h4>
                <p className="text-sm text-gray-500">
                  Animations start when elements enter the viewport
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Staggered Delay</h4>
                <p className="text-sm text-gray-500">
                  Elements animate in sequence with incremental delays
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Once Only</h4>
                <p className="text-sm text-gray-500">
                  Animations only trigger once, not on every scroll
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ScrollAnimationDemo;
