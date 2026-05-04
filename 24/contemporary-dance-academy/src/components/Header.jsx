import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from 'antd'
import {
  MenuOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons'

const navItems = [
  { key: '/', label: '首页', path: '/' },
  { key: '/classes', label: '课程', path: '/classes' },
  { key: '/schedule', label: '课表', path: '/schedule' },
  { key: '/about', label: '关于我们', path: '/about' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-pink-500/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">舞</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-tight">当代舞蹈学院</span>
              <span className="text-pink-400 text-xs tracking-wider">CONTEMPORARY DANCE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-pink-400 bg-pink-500/10'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-pink-500/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="ml-4 pl-4 border-l border-gray-700">
              <Link to="/schedule">
                <Button
                  type="primary"
                  size="large"
                  className="h-10 px-6 font-medium bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg shadow-pink-500/30 transition-all hover:shadow-pink-500/50"
                >
                  预约课程
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-pink-400 hover:bg-pink-500/10 transition-colors"
          >
            {isMobileMenuOpen ? <CloseOutlined style={{ fontSize: '24px' }} /> : <MenuOutlined style={{ fontSize: '24px' }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-pink-400 bg-pink-500/10'
                    : 'text-gray-300 hover:text-pink-400 hover:bg-pink-500/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-800">
              <Link to="/schedule" className="block">
                <Button
                  type="primary"
                  size="large"
                  className="w-full h-12 px-6 font-medium bg-gradient-to-r from-pink-500 to-pink-600"
                >
                  预约课程
                </Button>
              </Link>
            </div>
            <div className="pt-4 space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-pink-400" />
                <span>400-888-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-pink-400" />
                <span>info@dance-academy.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
