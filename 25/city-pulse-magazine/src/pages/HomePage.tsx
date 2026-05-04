import { articles } from '../data/articles';
import HeroSection from '../components/HeroSection';
import ArticleGrid from '../components/ArticleGrid';

const HomePage = () => {
  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  return (
    <div className="min-h-screen bg-dark-bg">
      <HeroSection featuredArticle={featuredArticle} />
      
      <ArticleGrid
        articles={articles}
        showFeatured={true}
        title="探索 城市文化"
        subtitle="深入探索艺术、音乐、时尚、电影等领域，发现城市文化的无限可能"
      />

      <section className="py-16 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '每日更新',
                description: '每天为您带来最新的城市文化资讯和深度报道',
                icon: '📰',
                color: 'neon-pink',
              },
              {
                title: '独家内容',
                description: '专访城市文化领域的先锋人物，分享独家见解',
                icon: '✨',
                color: 'neon-blue',
              },
              {
                title: '社区互动',
                description: '加入我们的社区，与志同道合的文化爱好者交流',
                icon: '🌐',
                color: 'neon-green',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-2xl bg-dark-card border border-dark-border transition-all duration-500 hover:border-opacity-50"
                style={{
                  borderColor: feature.color === 'neon-pink' ? 'rgba(255, 0, 255, 0.3)' : 
                               feature.color === 'neon-blue' ? 'rgba(0, 255, 255, 0.3)' : 
                               'rgba(0, 255, 0, 0.3)',
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{
                    color: feature.color === 'neon-pink' ? '#ff00ff' : 
                           feature.color === 'neon-blue' ? '#00ffff' : 
                           '#00ff00',
                  }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-dark-bg relative overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#ff00ff' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#00ffff' }}
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white mb-6">
            准备好探索城市文化了吗？
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            加入我们的读者社区，第一时间获取最新的城市文化资讯和独家内容
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              style={{
                backgroundColor: '#ff00ff',
                color: '#000000',
                boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
              }}
            >
              立即订阅
            </button>
            <button
              className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              style={{
                backgroundColor: 'transparent',
                border: '2px solid #00ffff',
                color: '#00ffff',
              }}
            >
              了解更多
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
