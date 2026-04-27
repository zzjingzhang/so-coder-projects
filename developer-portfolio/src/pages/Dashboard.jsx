import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiMusic, FiExternalLink, FiLoader } from 'react-icons/fi';

const Dashboard = () => {
  const [githubFollowers, setGithubFollowers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const musicCollection = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20music%20album%20cover%20synthwave%20style&image_size=square_hd',
    },
    {
      id: 2,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pop%20music%20album%20cover%20colorful&image_size=square_hd',
    },
    {
      id: 3,
      title: 'Starboy',
      artist: 'The Weeknd ft. Daft Punk',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=electronic%20music%20album%20cover%20dark%20neon&image_size=square_hd',
    },
    {
      id: 4,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=romantic%20music%20album%20cover%20warm%20tones&image_size=square_hd',
    },
    {
      id: 5,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alternative%20music%20album%20cover%20minimalist%20dark&image_size=square_hd',
    },
    {
      id: 6,
      title: 'Watermelon Sugar',
      artist: 'Harry Styles',
      link: 'https://open.spotify.com',
      cover:
        'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=summer%20music%20album%20cover%20bright%20colorful&image_size=square_hd',
    },
  ];

  useEffect(() => {
    const fetchGithubFollowers = async () => {
      try {
        setIsLoading(true);
        // Using a placeholder for demonstration
        // In a real app, you would use your actual GitHub username
        // For example: https://api.github.com/users/yourusername
        // Since we don't have a specific username, we'll use a placeholder
        // and show a mock value
        
        // To make it more realistic, let's try to fetch from a sample
        setTimeout(() => {
          setGithubFollowers(1234);
          setIsLoading(false);
        }, 1500);
        
        // If you want to use real GitHub API, uncomment below:
        // const response = await fetch('https://api.github.com/users/octocat');
        // if (!response.ok) throw new Error('Failed to fetch');
        // const data = await response.json();
        // setGithubFollowers(data.followers);
        // setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch GitHub followers');
        setIsLoading(false);
      }
    };

    fetchGithubFollowers();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into my social presence and personal interests
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Social Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* GitHub Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <FiGithub size={32} className="text-gray-900 dark:text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    GitHub
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Followers</p>
                </div>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                <FiExternalLink size={20} />
              </a>
            </div>

            <div className="text-center py-8">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FiLoader size={24} className="animate-spin text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-400">Loading...</span>
                </div>
              ) : error ? (
                <p className="text-red-600 dark:text-red-400">{error}</p>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                    {githubFollowers?.toLocaleString()}
                  </span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Twitter Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <FiTwitter size={32} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Twitter/X
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">Followers</p>
                </div>
              </div>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                <FiExternalLink size={20} />
              </a>
            </div>

            <div className="text-center py-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-5xl font-bold text-blue-500">892</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Placeholder - Connect your Twitter account
              </p>
            </div>
          </div>
        </motion.div>

        {/* Music Collection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <FiMusic size={28} className="text-purple-600 dark:text-purple-400" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                My Music Collection
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Some of my favorite tracks I listen to while coding
            </p>
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicCollection.map((music, index) => (
              <motion.div
                key={music.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img
                    src={music.cover}
                    alt={music.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {music.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {music.artist}
                  </p>
                  <a
                    href={music.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    <span>Listen</span>
                    <FiExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
