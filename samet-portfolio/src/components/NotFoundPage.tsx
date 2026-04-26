import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="bg-animated">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
          {t.notFound.title}
        </h2>
        
        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
          {t.notFound.message}
        </p>

        {/* Glass Card */}
        <div className="max-w-md mx-auto p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mb-8">
          <div className="flex items-center justify-center gap-4 text-gray-400 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <Home size={20} />
            {t.notFound.backHome}
          </button>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${['#60a5fa', '#a78bfa', '#f472b6', '#a78bfa', '#60a5fa'][i]}, ${['#3b82f6', '#8b5cf6', '#ec4899', '#8b5cf6', '#3b82f6'][i]})`,
                opacity: 0.3 + i * 0.15,
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
