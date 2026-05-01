import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Briefcase, 
  Award,
  Quote,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useScrollAnimationMulti } from '@/hooks/useScrollAnimation';
import { blogs } from '@/data/blogs';
import { portfolioItems } from '@/data/portfolio';
import BlogCard from '@/components/BlogCard';
import PortfolioCard from '@/components/PortfolioCard';

// 服务数据
const services = [
  {
    icon: 'web-design',
    title: '网页设计',
    description: '为您的品牌创建现代、美观且功能完善的网站，确保在所有设备上都能提供出色的用户体验。',
    features: ['响应式设计', '用户体验优化', '性能优化']
  },
  {
    icon: 'brand-design',
    title: '品牌设计',
    description: '从Logo到完整的视觉识别系统，我们帮助您建立独特且令人难忘的品牌形象。',
    features: ['Logo设计', '视觉识别系统', '品牌策略']
  },
  {
    icon: 'ui-ux',
    title: 'UI/UX设计',
    description: '以用户为中心的设计方法，创造直观、易用且令人愉悦的数字产品体验。',
    features: ['用户研究', '交互设计', '原型测试']
  },
  {
    icon: 'development',
    title: '前端开发',
    description: '使用最新的技术栈，将设计转化为高性能、可维护的前端代码。',
    features: ['React开发', 'TypeScript', '现代CSS']
  }
];

// 客户评价数据
const testimonials = [
  {
    name: '李明',
    role: 'CEO, 创新科技有限公司',
    content: 'Avana LLC 团队为我们重新设计了官网，不仅提升了品牌形象，还显著提高了用户转化率。他们的专业能力和创造力令人印象深刻。',
    rating: 5
  },
  {
    name: '王芳',
    role: '市场总监, 优品商城',
    content: '与 Avana LLC 合作是一次非常愉快的经历。他们不仅理解我们的需求，还能提出创新的解决方案。强烈推荐！',
    rating: 5
  },
  {
    name: '张伟',
    role: '创始人, 创意工作室',
    content: 'Avana LLC 帮助我们建立了完整的品牌识别系统。从Logo到网站，每一个细节都体现了他们的专业精神和对品质的追求。',
    rating: 5
  }
];

// 统计数据
const stats = [
  { value: '150+', label: '完成项目', icon: Briefcase },
  { value: '120+', label: '满意客户', icon: Users },
  { value: '8+', label: '行业经验', icon: Award },
  { value: '98%', label: '客户满意度', icon: Star }
];

const Home = () => {
  // 滚动动画
  const heroRef = useScrollAnimation({ threshold: 0.1 });
  const servicesRef = useScrollAnimation({ threshold: 0.1 });
  const portfolioRef = useScrollAnimation({ threshold: 0.1 });
  const statsRef = useScrollAnimation({ threshold: 0.1 });
  const testimonialsRef = useScrollAnimation({ threshold: 0.1 });
  const blogRef = useScrollAnimation({ threshold: 0.1 });
  const ctaRef = useScrollAnimation({ threshold: 0.1 });

  // 博客卡片的滚动动画
  const { getItemRef: getBlogItemRef, isItemVisible: isBlogItemVisible } = useScrollAnimationMulti(
    blogs.length,
    { threshold: 0.1 }
  );

  // 作品集卡片的滚动动画
  const { getItemRef: getPortfolioItemRef, isItemVisible: isPortfolioItemVisible } = useScrollAnimationMulti(
    portfolioItems.length,
    { threshold: 0.1 }
  );

  // 服务卡片的滚动动画
  const { getItemRef: getServiceItemRef, isItemVisible: isServiceItemVisible } = useScrollAnimationMulti(
    services.length,
    { threshold: 0.1 }
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div 
              ref={heroRef.ref}
              className={cn(
                "transition-all duration-700",
                heroRef.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                打造卓越数字体验
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                创意设计
                <br />
                <span className="text-primary">驱动未来</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                Avana LLC 是一家专注于创意设计和数字体验的专业团队。我们致力于为客户打造独特、现代且具有影响力的品牌形象和数字产品。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <span>开始您的项目</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/portfolio/web-design"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all"
                >
                  <span>查看作品集</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">值得信赖的合作伙伴</p>
                <div className="flex flex-wrap items-center gap-8 opacity-50">
                  <span className="text-xl font-bold text-gray-400">TechCorp</span>
                  <span className="text-xl font-bold text-gray-400">InnovateLab</span>
                  <span className="text-xl font-bold text-gray-400">DigitalPro</span>
                  <span className="text-xl font-bold text-gray-400">CreativeStudio</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20creative%20agency%20team%20working%20on%20digital%20design%20projects%20with%20laptops%20and%20design%20tools%20professional%20office%20environment%20red%20accent%20colors&image_size=landscape_16_9"
                  alt="Creative team working"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg z-20 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">项目交付</p>
                    <p className="text-xs text-green-600 font-medium">100% 准时</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg z-20 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">专业团队</p>
                    <p className="text-xs text-gray-500">15+ 设计师</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef.ref}
        className={cn(
          "py-16 bg-white border-y border-gray-100 transition-all duration-700",
          statsRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-gray-50 transition-all duration-700",
          servicesRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              我们的服务
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              全方位创意解决方案
            </h2>
            <p className="text-gray-600 text-lg">
              从品牌策略到产品开发，我们提供一站式创意服务，帮助您的品牌在数字时代脱颖而出。
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={getServiceItemRef(index)}
                className={cn(
                  "bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group",
                  isServiceItemVisible(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Briefcase className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={`/services/${service.icon}`}
                  className="inline-flex items-center gap-2 mt-6 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  <span>了解更多</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section 
        ref={portfolioRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-white transition-all duration-700",
          portfolioRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                精选作品
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                我们的项目案例
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                探索我们为客户创造的成功案例，每一个项目都体现了我们对品质和创新的追求。
              </p>
            </div>
            <Link 
              to="/portfolio/web-design"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20 whitespace-nowrap"
            >
              <span>查看全部作品</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Featured Portfolio Item */}
          {portfolioItems[0] && (
            <div 
              ref={getPortfolioItemRef(0)}
              className={cn(
                "mb-12 transition-all duration-700",
                isPortfolioItemVisible(0)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <PortfolioCard item={portfolioItems[0]} variant="featured" />
            </div>
          )}

          {/* Other Portfolio Items */}
          <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.slice(1).map((item, index) => (
              <div 
                key={item.id}
                ref={getPortfolioItemRef(index + 1)}
                className={cn(
                  "transition-all duration-700",
                  isPortfolioItemVisible(index + 1)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              >
                <PortfolioCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-gray-50 transition-all duration-700",
          testimonialsRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              客户评价
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              客户的声音
            </h2>
            <p className="text-gray-600 text-lg">
              听听我们的客户怎么说，他们的成功就是我们最大的成就。
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/20" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Content */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section 
        ref={blogRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-white transition-all duration-700",
          blogRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                最新动态
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                博客文章
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl">
                分享设计见解、技术趋势和行业动态，与我们一起成长。
              </p>
            </div>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all shadow-md shadow-primary/20 whitespace-nowrap"
            >
              <span>查看全部文章</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog, index) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef.ref}
        className={cn(
          "py-20 lg:py-32 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden transition-all duration-700",
          ctaRef.isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
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
              <span>免费咨询</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/portfolio/web-design"
              className="inline-flex items-center gap-2 px-10 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all"
            >
              <span>了解更多</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm mb-6">超过 120 家企业选择了我们</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              <span className="text-lg font-bold text-white">TechCorp</span>
              <span className="text-lg font-bold text-white">InnovateLab</span>
              <span className="text-lg font-bold text-white">DigitalPro</span>
              <span className="text-lg font-bold text-white">CreativeStudio</span>
              <span className="text-lg font-bold text-white">GlobalTech</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
