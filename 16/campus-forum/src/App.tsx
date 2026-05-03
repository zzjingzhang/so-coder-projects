import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import PostList from './components/PostList';
import { categories, posts } from './data/mockData';
import type { Post as PostType, Category } from './types';

// 首页组件
const HomePage = () => {
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(posts);
  const [searchValue, setSearchValue] = useState('');

  // 搜索功能
  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (!value.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value.toLowerCase()) ||
        post.content.toLowerCase().includes(value.toLowerCase()) ||
        post.author.nickname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // 分类切换功能
  const handleCategoryChange = (category: Category) => {
    if (category.name === '全部') {
      // 如果有搜索关键词，保留搜索过滤
      if (searchValue) {
        handleSearch(searchValue);
      } else {
        setFilteredPosts(posts);
      }
      return;
    }

    let filtered = posts.filter((post) => post.category === category.name);
    
    // 如果有搜索关键词，进一步过滤
    if (searchValue) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.content.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.author.nickname.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 搜索栏 */}
      <SearchBar onSearch={handleSearch} />
      
      {/* 分类导航栏 */}
      <CategoryNav categories={categories} onCategoryChange={handleCategoryChange} />
      
      {/* 帖子列表 */}
      <div className="max-w-4xl mx-auto px-4">
        <PostList posts={filteredPosts} />
      </div>
      
      {/* 底部留白 */}
      <div className="h-8"></div>
    </div>
  );
};

// 主应用组件
function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
