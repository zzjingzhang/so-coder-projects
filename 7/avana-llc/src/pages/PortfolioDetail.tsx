import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Tag, 
  ArrowLeft,
  ChevronRight,
  Home,
  ArrowRight,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getPortfolioItemById, getRelatedPortfolioItems, type PortfolioItem } from '@/data/portfolio';
import PortfolioCard from '@/components/PortfolioCard';

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<PortfolioItem | undefined>(undefined);
  const [relatedItems, setRelatedItems] = useState<PortfolioItem[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  // 滚动动画
  const contentRef = useScrollAnimation({ threshold: 0.1 });
  const relatedRef = useScrollAnimation({ threshold: 0.1 });

  // 获取作品集数据
  useEffect(() => {
    if (id) {
      const portfolioData = getPortfolioItemById(id);
      if (portfolioData) {
        setItem(portfolioData);
        setRelatedItems(getRelatedPortfolioItems(id, 3));
        setActiveImage(0);
      } else {
        // 项目不存在，跳转到首页
        navigate('/', { replace: true });
      }
    }
  }, [id, navigate]);

  if (!item) {
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
            {items.map((listItem, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-600">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                <span>{listItem.replace('- ', '')}</span>
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
            <Link to="/portfolio/web-design" className="hover:text-primary transition-colors">
              作品集
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary">{item.title}</span>
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
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl">
            {item.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl">
            {item.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">客户: {item.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{item.date}</span>
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6">
          <img
            src={item.gallery[activeImage] || item.image}
            alt={item.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>

        {/* Thumbnails */}
        {item.gallery.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {item.gallery.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={cn(
                  "shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all",
                  activeImage === index
                    ? "border-primary shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <img
                  src={image}
                  alt={`${item.title} - 图片 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
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
                <div className="text-gray-600 leading-relaxed">
                  {renderContent(item.fullDescription)}
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  项目信息
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">客户</p>
                      <p className="font-medium text-gray-900">{item.client}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">分类</p>
                      <p className="font-medium text-gray-900">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">完成时间</p>
                      <p className="font-medium text-gray-900">{item.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  使用技术
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white text-gray-700 text-sm rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  项目特点
                </h3>
                <div className="space-y-3">
                  {item.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl text-white">
                <h3 className="text-lg font-semibold mb-2">
                  想要类似的项目？
                </h3>
                <p className="text-white/80 text-sm mb-6">
                  联系我们，让我们一起为您的品牌创造卓越的数字体验。
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  <span>联系我们</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {relatedItems.length > 0 && (
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
                  相关项目
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  您可能还喜欢
                </h2>
              </div>
              <Link 
                to="/portfolio/web-design"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                <span>查看全部作品</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedItems.map((relatedItem, _index) => (
                <div key={relatedItem.id}>
                  <PortfolioCard item={relatedItem} />
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
            准备好开始您的项目了吗？
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            无论您需要全新的品牌形象、现代化的网站设计，还是创新的数字产品体验，我们都能为您提供专业的解决方案。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl"
            >
              <span>开始您的项目</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/portfolio/web-design"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all"
            >
              <span>查看更多作品</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetail;
