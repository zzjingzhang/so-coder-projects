import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId?: string) => {
    e.preventDefault();
    
    // 在移动端点击链接后关闭菜单
    setIsMenuOpen(false);
    
    // 如果有目标 ID，滚动到对应的部分
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>Shortly</h2>
        </div>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <a 
              href="#features" 
              className="navbar-link"
              onClick={(e) => handleLinkClick(e, 'features')}
            >
              Features
            </a>
            <a 
              href="#" 
              className="navbar-link"
              onClick={(e) => handleLinkClick(e)}
            >
              Pricing
            </a>
            <a 
              href="#resources" 
              className="navbar-link"
              onClick={(e) => handleLinkClick(e, 'resources')}
            >
              Resources
            </a>
          </div>
          
          <div className="navbar-actions">
            <button className="navbar-login-btn">Login</button>
            <button className="navbar-signup-btn">Sign Up</button>
          </div>
        </div>
        
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
