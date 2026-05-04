import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Drawer } from 'antd';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首页', path: '/' },
    { label: '艺术', path: '/category/艺术' },
    { label: '音乐', path: '/category/音乐' },
    { label: '时尚', path: '/category/时尚' },
    { label: '电影', path: '/category/电影' },
    { label: '关于', path: '/about' },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '80px',
              width: '100%',
            }}
          >
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  fontFamily: "'Orbitron', system-ui, sans-serif",
                  letterSpacing: '0.05em',
                }}
              >
                <span
                  style={{
                    color: '#ff00ff',
                    textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff',
                  }}
                >
                  CITY
                </span>
                <span
                  style={{
                    color: '#00ffff',
                    textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
                  }}
                >
                  PULSE
                </span>
              </span>
            </Link>

            <nav
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="hidden md:flex"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#d1d5db',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{
                  padding: '0.5rem',
                  color: '#d1d5db',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '1.125rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <SearchOutlined />
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  padding: '0.5rem',
                  color: '#d1d5db',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  transition: 'all 0.2s ease',
                }}
                className="md:hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <MenuOutlined />
              </button>
            </div>
          </div>

          {searchOpen && (
            <div
              style={{
                padding: '1rem 0',
                borderTop: '1px solid #374151',
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <Input
                placeholder="搜索文章、作者、分类..."
                size="large"
                prefix={<SearchOutlined style={{ color: '#6b7280' }} />}
                style={{
                  width: '100%',
                  backgroundColor: '#111111',
                  borderColor: '#374151',
                  color: '#ffffff',
                  borderRadius: '0.5rem',
                  height: '48px',
                }}
              />
            </div>
          )}
        </div>
      </header>

      <Drawer
        title={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                fontFamily: "'Orbitron', system-ui, sans-serif",
              }}
            >
              <span
                style={{
                  color: '#ff00ff',
                  textShadow: '0 0 10px #ff00ff',
                }}
              >
                CITY
              </span>
              <span
                style={{
                  color: '#00ffff',
                  textShadow: '0 0 10px #00ffff',
                }}
              >
                PULSE
              </span>
            </span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<CloseOutlined style={{ color: '#ffffff' }} />}
        styles={{
          body: {
            backgroundColor: '#0a0a0a',
            padding: 0,
          },
          header: {
            backgroundColor: '#0a0a0a',
            borderBottom: '1px solid #1f2937',
          },
          content: {
            backgroundColor: '#0a0a0a',
          },
        }}
        width={320}
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '1rem 1.5rem',
                color: '#9ca3af',
                textDecoration: 'none',
                borderBottom: '1px solid #1f2937',
                transition: 'all 0.2s ease',
                fontSize: '1rem',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  );
};

export default Header;
