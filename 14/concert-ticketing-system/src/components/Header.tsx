import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Badge } from 'primereact/badge'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-surface shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <i className="pi pi-music text-2xl text-primary"></i>
            <span className="text-xl font-bold text-text-primary">音乐会票务</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              首页
            </Link>
            <Link 
              to="/" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              演出
            </Link>
            <Link 
              to="/" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              场馆
            </Link>
            <Link 
              to="/" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              帮助
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              icon="pi pi-shopping-cart" 
              className="p-button-text p-button-rounded"
              severity="secondary"
            >
              <Badge value="2" severity="danger"></Badge>
            </Button>
            <Button 
              label="登录" 
              className="p-button-outlined"
              severity="primary"
            ></Button>
            <Button 
              label="注册" 
              severity="primary"
            ></Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`pi ${mobileMenuOpen ? 'pi-times' : 'pi-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-text-secondary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                to="/" 
                className="text-text-secondary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                演出
              </Link>
              <Link 
                to="/" 
                className="text-text-secondary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                场馆
              </Link>
              <Link 
                to="/" 
                className="text-text-secondary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                帮助
              </Link>
              <div className="flex space-x-2 pt-4">
                <Button 
                  label="登录" 
                  className="p-button-outlined flex-1"
                  severity="primary"
                ></Button>
                <Button 
                  label="注册" 
                  severity="primary"
                  className="flex-1"
                ></Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
