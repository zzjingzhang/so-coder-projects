import React from 'react';
import { heroData } from '../mock';

const WaveSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 1440 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 32L48 37.3C96 43 192 53 288 58.7C384 64 480 64 576 58.7C672 53 768 43 864 42.7C960 43 1056 53 1152 58.7C1248 64 1344 64 1392 64L1440 64V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V32Z"
      fill="url(#wave-gradient)"
      fillOpacity="0.3"
    />
    <defs>
      <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0">
        <stop stopColor="#8B5CF6" />
        <stop offset="0.5" stopColor="#EC4899" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);

const AnimatedWave: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute bottom-0 left-0 right-0">
      <WaveSVG className="w-full h-24 animate-pulse" />
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        className="w-full h-32 opacity-20"
        viewBox="0 0 1440 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 192L60 176C120 160 240 128 360 133.3C480 139 600 181 720 202.7C840 224 960 224 1080 213.3C1200 203 1320 181 1380 170.7L1440 160V320H1380C1320 320 1200 320 1080 320C960 320 840 320 720 320C600 320 480 320 360 320C240 320 120 320 60 320H0V192Z"
          fill="url(#wave-gradient-2)"
        />
        <defs>
          <linearGradient id="wave-gradient-2" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#EC4899" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
      <div className="flex items-end space-x-1 h-16">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-bounce"
            style={{
              height: `${20 + i * 8}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>

    <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2">
      <div className="flex items-end space-x-1 h-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-1.5 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse"
            style={{
              height: `${15 + (7 - i) * 6}px`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const { title, subtitle, ctaPrimary, ctaSecondary } = heroData;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <AnimatedWave />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2" />
            <span className="text-sm text-gray-300">探索音乐的无限可能</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="block text-white">{title.split('')[0]}</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse" style={{ animationDuration: '3s' }}>
              {title.slice(1)}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center">
                {ctaPrimary}
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group px-8 py-4 border-2 border-gray-600 rounded-xl font-semibold text-gray-300 transition-all duration-300 hover:border-purple-500 hover:text-white hover:bg-gray-800/50">
              <span className="flex items-center">
                {ctaSecondary}
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-gray-500 mt-1">精选唱片</div>
            </div>
            <div className="text-center border-x border-gray-700">
              <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-500 mt-1">品牌合作</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-500 mt-1">在线客服</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
