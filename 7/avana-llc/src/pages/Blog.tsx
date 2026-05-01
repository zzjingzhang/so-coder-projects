import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Tag, 
  ArrowRight,
  ChevronRight,
  Home,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useScrollAnimationMulti } from '@/hooks/useScrollAnimation';
import { blogs } from '@/data/blogs';
import BlogCard from '@/components/BlogCard';

// 分类数据
const categories = [
  { name: '全部', value: 'all' },
  { name: '设计', value: '设计' },
  { name: '开发', value: '开发' },
  { name: '技术', value: '技术' },
  { name: '商业', value: '商业' }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // 滚动动画
  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const contentRef = useScrollAnimation({ threshold: 0.1 });

  // 博客卡片的滚动动画
  const { getItemRef: getBlogItemRef, isItemVisible: isBlogItemVisible } = useScrollAnimationMulti(
    filteredBlogs.length,
    { threshold: 0.1 }
  );

  // 过滤博客
  useEffect(() => {
    let result = blogs;

    // 按分类过滤
    if (selectedCategory !== 'all') {
      result = result.filter(blog => blog.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        blog => 
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.category.toLowerCase().includes(query) ||
          blog.author.toLowerCase().includes(query)
      );
    }

    setFilteredBlogs(result);
  }, [selectedCategory, searchQuery]);

  // 获取热门博客（前3篇）
  const popularBlogs = blogs.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div 
            ref={heroRef.ref}
            className={cn(
              "text-center max-w-3xl mx-auto transition-all duration-700",
              heroRef.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary">博客</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              博客文章
            </h1>
            
            <p className="text-xl text-gray-600 mb-10">
              分享设计见解、技术趋势和行业动态，与我们一起成长。
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Content Section */}
      <section 
        ref={contentRef.ref}
        className={cn(
          "py-16 lg:py-24 bg-white transition-all duration-700",
          contentRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-3 mb-10">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={cn(
                      "px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
                      selectedCategory === category.value
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    )}
                  >
                    {category.name}
                    {category.value === 'all' && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {blogs.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Results Info */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  显示 <span className="font-semibold text-gray-900">{filteredBlogs.length}</span> 篇文章
                </p>
                {searchQuery && (
                  <p className="text-sm text-gray-500">
                    搜索关键词: "<span className="text-primary">{searchQuery}</span>"
                  </p>
                )}
              </div>

              {/* Blog Grid */}
              {filteredBlogs.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredBlogs.map((blog, index) => (
                    <div 
                      key={blog.id}
                      ref={getBlogItemRef(index)}
                      className={cn(
                        "transition-all duration-700",
                        isBlogItemVisible(index)
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      )}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                // No Results
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    未找到相关文章
                  </h3>
                  <p className="text-gray-600 mb-6">
                    请尝试其他搜索关键词或分类
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all"
                  >
                    <span>查看全部文章</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Popular Posts */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  热门文章
                </h3>
                <div className="space-y-4">
                  {popularBlogs.map((blog, _index) => (
                    <Link
                      key={blog.id}
                      to={`/blog/${blog.id}`}
                      className="flex gap-4 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-20 h-20 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-primary font-medium mb-1 block">
                          {blog.category}
                        </span>
                        <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {blog.date}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  文章分类
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const count = category.value === 'all' 
                      ? blogs.length 
                      : blogs.filter(blog => blog.category === category.value).length;
                    
                    return (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all",
                          selectedCategory === category.value
                            ? "bg-primary text-white"
                            : "hover:bg-white hover:shadow-sm"
                        )}
                      >
                        <span>{category.name}</span>
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs",
                          selectedCategory === category.value
                            ? "bg-white/20"
                            : "bg-gray-200 text-gray-600"
                        )}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl text-white">
                <h3 className="text-lg font-semibold mb-3">
                  订阅我们的通讯
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  获取最新的设计趋势、技术洞察和公司动态。
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="输入您的邮箱"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    订阅
                  </button>
                </form>
                <p className="text-white/60 text-xs mt-4">
                  我们尊重您的隐私，不会向第三方分享您的信息。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            想要分享您的见解？
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            我们欢迎 guest post 和行业专家的分享。联系我们，让您的声音被更多人听到。
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
          >
            <span>联系我们</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
