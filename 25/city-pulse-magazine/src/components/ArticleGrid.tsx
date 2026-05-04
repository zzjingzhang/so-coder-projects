import { useState, useMemo } from 'react';
import { Button } from 'antd';
import ArticleCard from './ArticleCard';
import type { Article } from '../data/articles';
import { categories } from '../data/articles';

interface ArticleGridProps {
  articles: Article[];
  showFeatured?: boolean;
  title?: string;
  subtitle?: string;
}

const ArticleGrid = ({ articles, showFeatured = true, title, subtitle }: ArticleGridProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const filteredArticles = useMemo(() => {
    let result = articles;
    
    if (activeCategory !== '全部') {
      result = result.filter((article) => article.category === activeCategory);
    }
    
    return result;
  }, [articles, activeCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  const featuredArticle = showFeatured ? articles.find((a) => a.featured) : null;
  const regularArticles = visibleArticles.filter((a) => !a.featured);

  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: '#0a0a0a',
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
        {title && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                fontWeight: 800,
                fontFamily: "'Orbitron', system-ui, sans-serif",
                color: '#ffffff',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  color: '#ff00ff',
                  textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff',
                }}
              >
                {title.split(' ')[0]}
              </span>
              <span style={{ color: '#ffffff' }}>
                {' '}{title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#9ca3af',
                  maxWidth: '640px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '3rem',
          }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  padding: '0.5rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#ff00ff' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#000000' : '#d1d5db',
                  border: isActive ? 'none' : '1px solid #374151',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = '#374151';
                    e.currentTarget.style.color = '#d1d5db';
                  }
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {featuredArticle && activeCategory === '全部' && (
          <div
            style={{
              marginBottom: '3rem',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '32px',
                  background: 'linear-gradient(to bottom, #ff00ff, #00ffff)',
                  borderRadius: '9999px',
                }}
              />
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                本期精选
              </h3>
            </div>
            <ArticleCard article={featuredArticle} featured={true} />
          </div>
        )}

        {regularArticles.length > 0 ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '32px',
                  background: 'linear-gradient(to bottom, #00ffff, #00ff00)',
                  borderRadius: '9999px',
                }}
              />
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                {activeCategory === '全部' ? '最新文章' : `${activeCategory}专题`}
              </h3>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}
              >
                ({filteredArticles.length} 篇)
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gap: '1.5rem',
                width: '100%',
              }}
              className="sm:grid-cols-2 lg:grid-cols-3"
            >
              {regularArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))}
            </div>

            {hasMore && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: '3rem',
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  onClick={handleLoadMore}
                  style={{
                    height: '48px',
                    padding: '0 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '0.5rem',
                    backgroundColor: 'transparent',
                    border: '2px solid #ff00ff',
                    color: '#ff00ff',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ff00ff';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#ff00ff';
                  }}
                >
                  加载更多文章
                </Button>
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 0',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}
            >
              📖
            </div>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}
            >
              暂无相关文章
            </h3>
            <p
              style={{
                color: '#6b7280',
              }}
            >
              该分类下暂时没有文章，请尝试其他分类
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleGrid;
