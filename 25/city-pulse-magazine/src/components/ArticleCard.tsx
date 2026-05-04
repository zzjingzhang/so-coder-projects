import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { Article } from '../data/articles';

interface ArticleCardProps {
  article: Article;
  index?: number;
  featured?: boolean;
}

const ArticleCard = ({ article, index = 0, featured = false }: ArticleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  if (featured) {
    return (
      <Link
        to={`/article/${article.id}`}
        style={{
          display: 'block',
          overflow: 'hidden',
          borderRadius: '1rem',
          backgroundColor: '#111111',
          border: `1px solid ${isHovered ? neonColor : '#222222'}`,
          transition: 'all 0.3s ease',
          boxShadow: isHovered ? `0 0 30px ${neonColor}33` : 'none',
          textDecoration: 'none',
          width: '100%',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
          }}
          className="md:grid"
        >
          <div
            style={{
              position: 'relative',
              height: '260px',
              overflow: 'hidden',
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.7s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent, transparent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                borderRadius: '9999px',
                backgroundColor: `${neonColor}22`,
                color: neonColor,
                border: `1px solid ${neonColor}66`,
              }}
            >
              热门精选
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '9999px',
                  marginBottom: '0.75rem',
                  backgroundColor: `${neonColor}22`,
                  color: neonColor,
                }}
              >
                {article.category}
              </span>
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.75rem',
                  textShadow: isHovered ? `0 0 20px ${neonColor}66` : 'none',
                  transition: 'all 0.3s ease',
                  lineHeight: 1.3,
                }}
              >
                {article.title}
              </h3>
            </div>

            <p
              style={{
                color: '#9ca3af',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {article.excerpt}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.875rem',
                color: '#6b7280',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}
              >
                <span style={{ color: neonColor }}>
                  <UserOutlined />
                </span>
                {article.author}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                }}
              >
                <span style={{ color: neonColor }}>
                  <ClockCircleOutlined />
                </span>
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                color: neonColor,
                transition: 'all 0.3s ease',
              }}
            >
              阅读文章
              <ArrowRightOutlined />
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '4px',
            width: isHovered ? '100%' : '0%',
            backgroundColor: neonColor,
            boxShadow: `0 0 10px ${neonColor}`,
            transition: 'width 0.5s ease',
          }}
        />
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${article.id}`}
      style={{
        display: 'block',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        backgroundColor: '#111111',
        border: `1px solid ${isHovered ? neonColor : '#222222'}`,
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? `0 0 20px ${neonColor}22` : 'none',
        textDecoration: 'none',
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: 'relative',
          height: '220px',
          overflow: 'hidden',
        }}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2), transparent)',
          }}
        />

        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            padding: '0.25rem 0.625rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: '9999px',
            backgroundColor: `${neonColor}33`,
            color: neonColor,
            border: `1px solid ${neonColor}44`,
          }}
        >
          {article.category}
        </span>

        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            width: '12px',
            height: '12px',
            borderRadius: '9999px',
            backgroundColor: neonColor,
            opacity: isHovered ? 1 : 0.5,
            boxShadow: isHovered ? `0 0 15px ${neonColor}` : `0 0 5px ${neonColor}66`,
            transition: 'all 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          padding: '1.25rem',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '0.75rem',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textShadow: isHovered ? `0 0 15px ${neonColor}44` : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            color: '#9ca3af',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#6b7280',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span style={{ color: neonColor, opacity: 0.7 }}>
                <UserOutlined />
              </span>
              {article.author}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              <span style={{ color: neonColor, opacity: 0.7 }}>
                <ClockCircleOutlined />
              </span>
              {article.readTime}
            </span>
          </div>
          <span>{article.date}</span>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          bottom: 0,
          left: 0,
          height: '2px',
          width: isHovered ? '100%' : '0%',
          backgroundColor: neonColor,
          transition: 'width 0.5s ease',
        }}
      />
    </Link>
  );
};

export default ArticleCard;
