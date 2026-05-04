import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, MailOutlined, TeamOutlined, BulbOutlined } from '@ant-design/icons';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#ff00ff' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: '#00ffff' }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 mb-8"
          >
            <ArrowLeftOutlined />
            <span>返回首页</span>
          </Link>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
            <span className="text-neon-pink text-shadow-neon-pink">关于</span>
            <span className="text-white"> </span>
            <span className="text-neon-blue text-shadow-neon-blue">CITY PULSE</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            探索城市文化的无限可能，记录城市脉搏的每一次跳动
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
                我们是谁
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                CITY PULSE 是一本专注于城市文化的在线杂志。我们相信，每一座城市都有其独特的文化脉搏，而我们的使命就是捕捉并记录这些脉搏。
              </p>
              <p className="text-gray-400 leading-relaxed">
                从东京涩谷的霓虹灯到纽约布鲁克林的街头艺术，从上海的咖啡馆文化到柏林的地下音乐场景，我们致力于探索全球城市文化的多样性和活力。
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
                我们的使命
              </h2>
              <p className="text-gray-400 leading-relaxed">
                我们希望成为城市文化爱好者的首选目的地，为他们提供深度报道、独家专访和独特视角。无论是艺术、音乐、时尚还是电影，我们都致力于呈现城市文化最真实、最动人的一面。
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-6">
                我们关注的领域
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎨', label: '视觉艺术', color: '#ff00ff' },
                  { icon: '🎵', label: '音乐场景', color: '#00ffff' },
                  { icon: '👗', label: '时尚文化', color: '#00ff00' },
                  { icon: '🎬', label: '电影电视', color: '#ffff00' },
                  { icon: '📖', label: '文学创作', color: '#ff6600' },
                  { icon: '☕', label: '生活方式', color: '#ff00ff' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-dark-card border border-dark-border transition-all duration-300 hover:border-opacity-50"
                    style={{
                      borderColor: item.color + '44',
                    }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div
                      className="font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-8 text-center">
            为什么选择 CITY PULSE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BulbOutlined />,
                title: '独特视角',
                description: '我们不只是报道新闻，更是挖掘文化背后的故事和意义。每一篇文章都经过精心策划，呈现独特的视角和深度。',
                color: '#ff00ff',
              },
              {
                icon: <TeamOutlined />,
                title: '专业团队',
                description: '我们的团队由资深文化记者、艺术评论家和城市观察家组成。他们深入现场，为您带来第一手的文化资讯。',
                color: '#00ffff',
              },
              {
                icon: <MailOutlined />,
                title: '社区互动',
                description: '我们相信文化是一种对话。加入我们的社区，与志同道合的文化爱好者交流，分享您的见解和体验。',
                color: '#00ff00',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-dark-card border border-dark-border transition-all duration-500 hover:border-opacity-50"
                style={{
                  borderColor: feature.color + '44',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{
                    backgroundColor: feature.color + '22',
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ color: feature.color }}
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

        <div
          className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-2xl border"
          style={{
            backgroundColor: 'rgba(255, 0, 255, 0.05)',
            borderColor: 'rgba(255, 0, 255, 0.3)',
          }}
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              加入我们的社区
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              订阅我们的通讯，第一时间获取最新的城市文化资讯和独家内容。您也可以通过社交媒体与我们互动，分享您的城市文化体验。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: '#ff00ff',
                  color: '#000000',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.3)',
                }}
              >
                立即订阅
              </button>
              <button
                className="px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #00ffff',
                  color: '#00ffff',
                }}
              >
                联系我们
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
