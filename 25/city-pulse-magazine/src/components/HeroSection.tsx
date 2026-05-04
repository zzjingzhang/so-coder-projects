import { Link } from 'react-router-dom';
import { ArrowRightOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import type { Article } from '../data/articles';

interface HeroSectionProps {
  featuredArticle: Article;
}

const HeroSection = ({ featuredArticle }: HeroSectionProps) => {
  const getNeonColor = () => {
    switch (featuredArticle.neonColor) {
      case 'pink': return '#ff00ff';
      case 'blue': return '#00ffff';
      case 'green': return '#00ff00';
      case 'yellow': return '#ffff00';
      case 'orange': return '#ff6600';
      default: return '#ff00ff';
    }
  };

  const neonColor = getNeonColor();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <img
          src={featuredArticle.image}
          alt={featuredArticle.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to top, #0a0a0a, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.4))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to right, rgba(10, 10, 10, 0.6), transparent, rgba(10, 10, 10, 0.6))',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
          padding: '0 1rem',
          textAlign: 'center',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            marginBottom: '1.5rem',
            animation: 'fadeIn 0.6s ease-out',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '9999px',
              border: `2px solid ${neonColor}`,
              backgroundColor: `${neonColor}1a`,
              color: neonColor,
            }}
          >
            <span>✦</span>
            本期主打
          </span>
        </div>

        <h1
          style={{
            marginBottom: '1.5rem',
            animation: 'slideUp 0.6s ease-out',
            animationDelay: '100ms',
            animationFillMode: 'both',
          }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 800,
              fontFamily: "'Orbitron', system-ui, sans-serif",
              lineHeight: 1.2,
              color: '#ffffff',
              textShadow: `0 0 20px ${neonColor}66, 0 0 40px ${neonColor}44`,
              animation: 'neonPulse 2s ease-in-out infinite',
            }}
          >
            {featuredArticle.title}
          </span>
        </h1>

        <p
          style={{
            marginBottom: '2rem',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '1.125rem',
            lineHeight: 1.7,
            color: '#d1d5db',
            animation: 'slideUp 0.6s ease-out',
            animationDelay: '200ms',
            animationFillMode: 'both',
          }}
        >
          {featuredArticle.excerpt}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            fontSize: '0.875rem',
            color: '#9ca3af',
            animation: 'slideUp 0.6s ease-out',
            animationDelay: '300ms',
            animationFillMode: 'both',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: neonColor }}>
              <UserOutlined />
            </span>
            {featuredArticle.author}
          </span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: neonColor }}>
              <ClockCircleOutlined />
            </span>
            {featuredArticle.readTime}
          </span>
          <span
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
            }}
          >
            {featuredArticle.category}
          </span>
        </div>

        <div
          style={{
            animation: 'slideUp 0.6s ease-out',
            animationDelay: '400ms',
            animationFillMode: 'both',
          }}
        >
          <Link
            to={`/article/${featuredArticle.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '0.5rem',
              backgroundColor: neonColor,
              color: '#000000',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: `0 0 20px ${neonColor}44`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.boxShadow = `0 0 30px ${neonColor}66`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = neonColor;
              e.currentTarget.style.boxShadow = `0 0 20px ${neonColor}44`;
            }}
          >
            阅读全文
            <ArrowRightOutlined />
          </Link>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#6b7280',
          }}
        >
          <span
            style={{
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
            }}
          >
            向下滚动探索
          </span>
          <div
            style={{
              width: '24px',
              height: '40px',
              border: `2px solid ${neonColor}44`,
              borderRadius: '9999px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '0.5rem',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '12px',
                backgroundColor: neonColor,
                borderRadius: '9999px',
                animation: 'pulse 2s infinite',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
