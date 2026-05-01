import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Tag, 
  Copy,
  ArrowLeft,
  ChevronRight,
  Home,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getBlogById, getRelatedBlogs, type Blog } from '@/data/blogs';
import BlogCard from '@/components/BlogCard';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [copied, setCopied] = useState(false);

  // 滚动动画
  const contentRef = useScrollAnimation({ threshold: 0.1 });
  const relatedRef = useScrollAnimation({ threshold: 0.1 });

  // 获取博客数据
  useEffect(() => {
    if (id) {
      const blogData = getBlogById(id);
      if (blogData) {
        setBlog(blogData);
        setRelatedBlogs(getRelatedBlogs(id, 3));
      } else {
        // 博客不存在，跳转到博客列表页
        navigate('/blog', { replace: true });
      }
    }
  }, [id, navigate]);

  // 复制链接
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 分享到社交媒体
  const shareOnSocial = (platform: string) => {
    if (!blog) return;
    
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    );
  }

  // 解析内容为段落
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // 检查是否是标题
      if (paragraph.startsWith('## ')) {
        return (
          <h2 
            key={index} 
            className="text-2xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-100"
          >
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 
            key={index} 
            className="text-xl font-semibold text-gray-900 mt-8 mb-4"
          >
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      
      // 检查是否是列表项
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="space-y-3 my-6 ml-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <span>{item.replace('- ', '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      
      // 普通段落
      return (
        <p 
          key={index} 
          className="text-gray-600 leading-relaxed mb-4"
        >
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary transition-colors">
              博客
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{blog.title}</span>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </button>

          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Tag className="w-4 h-4" />
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {blog.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{blog.author}</p>
                <p className="text-xs text-gray-500">作者</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{blog.readTime}</span>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Featured Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>
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
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                {/* Excerpt */}
                <p className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100">
                  {blog.excerpt}
                </p>

                {/* Main Content */}
                <div className="text-gray-600 leading-relaxed">
                  {renderContent(blog.content)}
                </div>
              </article>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      分享这篇文章
                    </h4>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => shareOnSocial('facebook')}
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <span className="text-xs font-bold">f</span>
                      </button>
                      <button
                        onClick={() => shareOnSocial('twitter')}
                        className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <span className="text-xs font-bold">X</span>
                      </button>
                      <button
                        onClick={() => shareOnSocial('linkedin')}
                        className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <span className="text-xs font-bold">Li</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                          copied
                            ? "bg-green-500 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                        aria-label="Copy link"
                      >
                        {copied ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      标签
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        #{blog.category}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        #设计
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        #前端开发
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Author Card */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  关于作者
                </h3>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">
                      {blog.author.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {blog.author}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    资深设计师 & 开发者
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    热爱设计和技术，致力于创造优秀的用户体验。分享行业见解，与大家一起成长。
                  </p>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  热门文章
                </h3>
                <div className="space-y-4">
                  {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                    <Link
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.id}`}
                      className="flex gap-4 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all group"
                    >
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-primary font-medium mb-1 block">
                          {relatedBlog.category}
                        </span>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedBlog.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section 
          ref={relatedRef.ref}
          className={cn(
            "py-16 lg:py-24 bg-gray-50 transition-all duration-700",
            relatedRef.isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
              <div>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  相关文章
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  您可能还喜欢
                </h2>
              </div>
              <Link 
                to="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                <span>查看全部文章</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Blogs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog, _index) => (
                <div key={relatedBlog.id}>
                  <BlogCard blog={relatedBlog} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            想要分享您的见解？
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            我们欢迎 guest post 和行业专家的分享。联系我们，让您的声音被更多人听到。
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
          >
            <span>联系我们</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
