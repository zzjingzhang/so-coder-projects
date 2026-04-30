import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LogoTitle from '../components/LogoTitle';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const demos = [
    {
      id: 'button',
      title: 'Button States',
      description: 'Animated buttons with loading, success, and error states',
      color: 'from-indigo-500 to-purple-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      ),
    },
    {
      id: 'page-transition',
      title: 'Page Transitions',
      description: 'Expandable cards with smooth animations',
      color: 'from-emerald-500 to-teal-600',
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      id: 'heart',
      title: 'Heart Animation',
      description: 'Interactive heart with scale and bounce effects',
      color: 'from-rose-500 to-pink-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      id: 'scroll-animation',
      title: 'Scroll Animations',
      description: 'Trigger animations as elements enter the viewport',
      color: 'from-blue-500 to-cyan-600',
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
    },
    {
      id: 'svg',
      title: 'SVG Animations',
      description: 'Hamburger menu morphing into close icon',
      color: 'from-amber-500 to-orange-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 text-center">
            Animation Demo App
          </h1>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <LogoTitle
          title="Welcome to Animation Demo"
          subtitle="Explore beautiful animations built with Framer Motion"
          size="lg"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="cursor-pointer"
              onClick={() => navigate(`/${demo.id}`)}
            >
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center text-white mb-4`}
                >
                  {demo.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {demo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {demo.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
