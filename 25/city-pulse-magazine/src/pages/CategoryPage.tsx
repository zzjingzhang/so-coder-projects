import { useParams, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { articles } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || '');

  const filteredArticles = articles.filter(
    (article) => article.category === decodedCategory
  );

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    艺术: { bg: 'from-neon-pink/20 to-transparent', text: '#ff00ff', border: '#ff00ff' },
    音乐: { bg: 'from-neon-blue/20 to-transparent', text: '#00ffff', border: '#00ffff' },
    时尚: { bg: 'from-neon-green/20 to-transparent', text: '#00ff00', border: '#00ff00' },
    电影: { bg: 'from-neon-yellow/20 to-transparent', text: '#ffff00', border: '#ffff00' },
    文学: { bg: 'from-neon-orange/20 to-transparent', text: '#ff6600', border: '#ff6600' },
    生活方式: { bg: 'from-neon-pink/20 to-transparent', text: '#ff00ff', border: '#ff00ff' },
    美食: { bg: 'from-neon-green/20 to-transparent', text: '#00ff00', border: '#00ff00' },
  };

  const colorConfig = categoryColors[decodedCategory] || categoryColors['艺术'];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '6rem 0 5rem',
          paddingTop: '8rem',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '384px',
            height: '384px',
            borderRadius: '9999px',
            opacity: 0.1,
            filter: 'blur(64px)',
            backgroundColor: colorConfig.text,
          }}
        />
        
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem',
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#9ca3af',
              textDecoration: 'none',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
            }}
          >
            <ArrowLeftOutlined />
            <span>返回首页</span>
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: `1px solid ${colorConfig.text}66`,
              backgroundColor: `${colorConfig.text}22`,
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: colorConfig.text,
              }}
            >
              分类浏览
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Orbitron', system-ui, sans-serif",
              color: '#ffffff',
              marginBottom: '1rem',
              textShadow: `0 0 30px ${colorConfig.text}44`,
              lineHeight: 1.2,
            }}
          >
            {decodedCategory}
          </h1>

          <p
            style={{
              fontSize: '1.125rem',
              color: '#9ca3af',
              maxWidth: '640px',
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            探索 {decodedCategory} 领域的最新文章和深度报道
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#6b7280' }}>共</span>
            <span
              style={{
                fontSize: '2.25rem',
                fontWeight: 700,
                color: colorConfig.text,
              }}
            >
              {filteredArticles.length}
            </span>
            <span style={{ color: '#6b7280' }}>篇文章</span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '3rem 1rem 5rem',
          width: '100%',
        }}
      >
        {filteredArticles.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              width: '100%',
            }}
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 0',
            }}
          >
            <div
              style={{
                width: '96px',
                height: '96px',
                margin: '0 auto 1.5rem',
                borderRadius: '9999px',
                backgroundColor: `${colorConfig.text}22`,
                border: `2px solid ${colorConfig.text}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}
            >
              📚
            </div>
            <h3
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.75rem',
              }}
            >
              暂无相关文章
            </h3>
            <p
              style={{
                color: '#6b7280',
                marginBottom: '2rem',
                fontSize: '1rem',
              }}
            >
              该分类下暂时没有文章，请稍后再来查看
            </p>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '0.5rem',
                backgroundColor: colorConfig.text,
                color: '#000000',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colorConfig.text;
              }}
            >
              返回首页
            </Link>
          </div>
        )}
      </div>

      <section
        style={{
          padding: '3rem 0 4rem',
          backgroundColor: '#000000',
          width: '100%',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem',
            width: '100%',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 700,
              fontFamily: "'Orbitron', system-ui, sans-serif",
              color: '#ffffff',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            探索其他分类
          </h2>
          
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            {['艺术', '音乐', '时尚', '电影', '文学', '生活方式', '美食']
              .filter((cat) => cat !== decodedCategory)
              .map((cat) => {
                const catColorConfig = categoryColors[cat] || categoryColors['艺术'];
                return (
                  <Link
                    key={cat}
                    to={`/category/${encodeURIComponent(cat)}`}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '9999px',
                      border: `1px solid ${catColorConfig.text}66`,
                      backgroundColor: `${catColorConfig.text}11`,
                      textDecoration: 'none',
                      color: catColorConfig.text,
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.borderColor = catColorConfig.text;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = `${catColorConfig.text}66`;
                    }}
                  >
                    {cat}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
