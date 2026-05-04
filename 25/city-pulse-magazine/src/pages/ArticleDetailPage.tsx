import { useParams, Link } from 'react-router-dom';
import {
  ClockCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  TagOutlined,
  ArrowLeftOutlined,
  ShareAltOutlined,
  HeartOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { articles, getNeonColorClass } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

const ArticleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">文章未找到</h1>
          <p className="text-gray-400 mb-8">您访问的文章不存在或已被移除</p>
          <Link to="/">
            <Button type="primary" size="large">
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const neonClass = getNeonColorClass(article.neonColor);

  const getNeonColor = () => {
    switch (article.neonColor) {
      case 'pink': return '#ff00ff';
      case 'blue': return '#00ffff';
      case 'green': return '#00ff00';
      case 'yellow': return '#ffff00';
      case 'orange': return '#ff6600';
      default: return '#ff00ff';
    }
  };

  const neonColor = getNeonColor();

  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="relative h-96 sm:h-[500px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 via-transparent to-dark-bg/60" />
        
        <Link
          to="/"
          className="absolute top-24 sm:top-28 left-4 sm:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 z-10"
        >
          <ArrowLeftOutlined />
          <span>返回首页</span>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full"
                style={{
                  backgroundColor: `${neonColor}33`,
                  color: neonColor,
                  border: `1px solid ${neonColor}66`,
                }}
              >
                <TagOutlined />
                {article.category}
              </span>
              {article.featured && (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full"
                  style={{
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#ffd700',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                  }}
                >
                  ✦ 精选文章
                </span>
              )}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6 leading-tight"
              style={{
                textShadow: `0 0 30px ${neonColor}44`,
              }}
            >
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base">
              <span className="flex items-center gap-2">
                <UserOutlined style={{ color: neonColor }} />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <CalendarOutlined style={{ color: neonColor }} />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <ClockCircleOutlined style={{ color: neonColor }} />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="sticky top-20 sm:top-24 z-40 mb-8">
          <div className="flex items-center justify-between py-3 px-4 sm:px-6 rounded-xl bg-dark-card/80 backdrop-blur-md border border-dark-border">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <BookOutlined />
              <span>阅读中...</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="text"
                icon={<HeartOutlined />}
                className="text-gray-400 hover:text-neon-pink"
              />
              <Button
                type="text"
                icon={<ShareAltOutlined />}
                className="text-gray-400 hover:text-neon-blue"
              />
            </div>
          </div>
        </div>

        <article className="prose prose-invert max-w-none">
          <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8 font-medium">
            {article.excerpt}
          </p>

          <Divider
            className="my-10 sm:my-12"
            style={{ borderColor: neonColor + '44' }}
          />

          <div className="space-y-6 sm:space-y-8">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-base sm:text-lg text-gray-300 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <Divider className="my-12 sm:my-16" style={{ borderColor: '#222222' }} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 text-sm">标签：</span>
            <span
              className="px-3 py-1 text-sm rounded-full"
              style={{
                backgroundColor: `${neonColor}22`,
                color: neonColor,
              }}
            >
              #城市文化
            </span>
            <span
              className="px-3 py-1 text-sm rounded-full"
              style={{
                backgroundColor: `${neonColor}22`,
                color: neonColor,
              }}
            >
              #{article.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              icon={<ShareAltOutlined />}
              style={{
                backgroundColor: 'transparent',
                borderColor: neonColor,
                color: neonColor,
              }}
            >
              分享文章
            </Button>
            <Button
              type="primary"
              icon={<HeartOutlined />}
              style={{
                backgroundColor: neonColor,
                borderColor: neonColor,
                color: '#000000',
              }}
            >
              喜欢
            </Button>
          </div>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section className="py-12 sm:py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-1 h-8 rounded-full"
                style={{
                  background: `linear-gradient(to bottom, ${neonColor}, transparent)`,
                }}
              />
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                相关文章
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div
          className="p-6 sm:p-8 rounded-2xl border"
          style={{
            backgroundColor: `${neonColor}11`,
            borderColor: `${neonColor}44`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
              style={{
                backgroundColor: `${neonColor}33`,
                border: `2px solid ${neonColor}66`,
              }}
            >
              📧
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-2"
                style={{ color: neonColor }}
              >
                喜欢这篇文章吗？
              </h3>
              <p className="text-gray-400">
                订阅我们的通讯，第一时间获取最新的城市文化资讯和独家内容
              </p>
            </div>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: neonColor,
                borderColor: neonColor,
                color: '#000000',
              }}
            >
              立即订阅
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
