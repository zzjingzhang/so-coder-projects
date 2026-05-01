import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  MessageSquare,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="text-[120px] sm:text-[160px] lg:text-[200px] font-black text-gray-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              页面未找到
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              抱歉，页面走丢了
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
              您访问的页面可能已被移除、重命名，或者暂时不可用。
              让我们带您回到正轨。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              <Home className="w-5 h-5" />
              <span>返回首页</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回上一页</span>
            </button>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                您可能在找这些页面
              </h2>
              <p className="text-gray-600">
                浏览我们的热门页面，继续探索 Avana LLC
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '首页', icon: Home, path: '/', description: '了解我们的服务' },
                { title: '关于我们', icon: ArrowRight, path: '/about', description: '认识我们的团队' },
                { title: '博客', icon: MessageSquare, path: '/blog', description: '阅读最新文章' },
                { title: '联系我们', icon: ArrowRight, path: '/contact', description: '开始您的项目' },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={cn(
                    'group relative bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-primary/50 transition-all duration-300 text-left',
                    'hover:shadow-lg hover:shadow-primary/5'
                  )}
                >
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>

                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-100">
            <div className="inline-flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">
                网站状态：<span className="text-green-600 font-medium">正常运行中</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              如果问题持续存在，请联系我们的技术支持：support@avana-llc.com
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default NotFound;
