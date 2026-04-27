import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright" data-protected="true">
          © {currentYear} 哥尼斯堡七桥问题 - 图论教育游戏
        </p>
        <p className="footer-subtitle">
          基于欧拉的经典图论问题 | 欧拉路径 (Eulerian Path)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
