import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { mockSearchApi } from '../services/mockSearchApi';
import type { SearchResult } from '../types/search';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await mockSearchApi(searchTerm);
      setResults(response.results);
      setTotalResults(response.totalResults);
      setSearchTime(response.searchTime);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlQuery = searchParams.get('q');
    const initialQuery = urlQuery || searchQuery;
    
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchQuery(initialQuery);
      fetchResults(initialQuery);
    } else {
      navigate('/');
    }
  }, [searchParams, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      fetchResults(query.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center px-4 md:px-8 py-4 gap-4 md:gap-8">
          <a href="/" className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-normal">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </h1>
          </a>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 hover:shadow-md focus-within:shadow-md border-gray-200">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 outline-none text-base"
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
                  <button type="submit" className="p-1 hover:bg-gray-100 rounded-full">
                    <i className="pi pi-search text-blue-500"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <i className="pi pi-cog text-gray-600"></i>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <i className="pi pi-th-large text-gray-600"></i>
            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-blue-600">
              登录
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 px-4 md:px-8 pb-2 overflow-x-auto">
          <div className="flex items-center gap-1 text-sm text-blue-600 border-b-2 border-blue-600 pb-2">
            <i className="pi pi-search text-xs"></i>
            <span>全部</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 pb-2 hover:text-blue-600 cursor-pointer">
            <i className="pi pi-image text-xs"></i>
            <span>图片</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 pb-2 hover:text-blue-600 cursor-pointer">
            <i className="pi pi-video text-xs"></i>
            <span>视频</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 pb-2 hover:text-blue-600 cursor-pointer">
            <i className="pi pi-book text-xs"></i>
            <span>新闻</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 pb-2 hover:text-blue-600 cursor-pointer">
            <i className="pi pi-map-marker text-xs"></i>
            <span>地图</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 pb-2 hover:text-blue-600 cursor-pointer">
            <i className="pi pi-ellipsis-v text-xs"></i>
            <span>更多</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 md:px-8 py-4 max-w-4xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600 mb-6">
              找到约 <span className="font-medium">{totalResults.toLocaleString()}</span> 条结果 
              （用时 <span className="font-medium">{searchTime}</span> 秒）
            </div>

            <div className="space-y-8">
              {results.map((result, index) => (
                <article key={index} className="max-w-2xl">
                  <div className="flex items-start gap-4">
                    {result.thumbnail && (
                      <div className="hidden md:block flex-shrink-0">
                        <img
                          src={result.thumbnail}
                          alt=""
                          className="w-28 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                          <i className="pi pi-globe text-gray-500 text-sm"></i>
                        </div>
                        <div>
                          <div className="text-sm text-gray-800">{result.displayLink}</div>
                          <div className="text-xs text-gray-600 truncate max-w-xs">{result.url}</div>
                        </div>
                      </div>

                      <a
                        href={result.url}
                        className="text-xl text-blue-700 hover:underline block mb-1"
                        onClick={(e) => e.preventDefault()}
                      >
                        {result.title}
                      </a>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {result.snippet}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {results.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                <div className="flex items-center">
                  <span className="text-4xl font-normal">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">o</span>
                    <span className="text-green-500">o</span>
                    <span className="text-red-500">o</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <span className="text-sm text-gray-600">1</span>
                  <span className="text-sm text-blue-600 cursor-pointer hover:underline">2</span>
                  <span className="text-sm text-blue-600 cursor-pointer hover:underline">3</span>
                  <span className="text-sm text-blue-600 cursor-pointer hover:underline">4</span>
                  <span className="text-sm text-blue-600 cursor-pointer hover:underline">5</span>
                  <span className="text-sm text-blue-600 cursor-pointer hover:underline">下一页</span>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-100 text-sm text-gray-600 mt-auto">
        <div className="px-8 py-3 border-b border-gray-300">
          <span>中国</span>
        </div>
        <div className="px-8 py-3 flex flex-col md:flex-row justify-between">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            <a href="#" className="hover:underline">帮助</a>
            <a href="#" className="hover:underline">发送反馈</a>
            <a href="#" className="hover:underline">隐私权</a>
            <a href="#" className="hover:underline">条款</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
