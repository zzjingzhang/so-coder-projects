import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="text-white text-2xl">🌤️</div>
            <h1 className="text-white text-xl font-bold tracking-wide">
              实时天气监控仪表盘
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-100 text-sm">
              {new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
