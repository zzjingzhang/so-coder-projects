import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      navigate('/search');
    }
  };

  useEffect(() => {
    setQuery('');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-end p-4">
        <nav className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-700 hover:underline">Gmail</a>
          <a href="#" className="text-sm text-gray-700 hover:underline">图片</a>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className="pi pi-th-large text-gray-600"></i>
          </button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-600">
            登录
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center -mt-20">
        <div className="mb-8">
          <h1 className="text-7xl md:text-8xl font-normal">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </h1>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-xl px-4">
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 hover:shadow-md focus-within:shadow-md border-gray-200">
              <i className="pi pi-search text-gray-400 mr-3"></i>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 outline-none text-base"
                placeholder="搜索 Google 或输入网址"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 hover:bg-gray-100 rounded-full mr-2"
                >
                  <i className="pi pi-times text-gray-500"></i>
                </button>
              )}
              <div className="border-l border-gray-300 pl-3 flex items-center gap-3">
                <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
                  <i className="pi pi-microphone text-blue-500"></i>
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded-full">
                  <i className="pi pi-camera text-blue-500"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              type="submit"
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm text-gray-700 border border-transparent hover:border-gray-300"
            >
              Google 搜索
            </button>
            <button
              type="button"
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm text-gray-700 border border-transparent hover:border-gray-300"
            >
              手气不错
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-700">
          Google 提供：
          <a href="#" className="text-blue-700 hover:underline ml-1">English</a>
        </div>
      </main>

      <footer className="bg-gray-100 text-sm text-gray-600">
        <div className="px-8 py-3 border-b border-gray-300">
          <span>中国</span>
        </div>
        <div className="px-8 py-3 flex flex-col md:flex-row justify-between">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a href="#" className="hover:underline">关于 Google</a>
            <a href="#" className="hover:underline">广告</a>
            <a href="#" className="hover:underline">商务</a>
            <a href="#" className="hover:underline">搜索的运作方式</a>
          </div>
          <div className="flex flex-wrap gap-6 justify-center md:justify-end mt-3 md:mt-0">
            <a href="#" className="hover:underline">隐私权</a>
            <a href="#" className="hover:underline">条款</a>
            <a href="#" className="hover:underline">设置</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
