import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import {
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    探索: [
      { label: '艺术', path: '/category/艺术' },
      { label: '音乐', path: '/category/音乐' },
      { label: '时尚', path: '/category/时尚' },
      { label: '电影', path: '/category/电影' },
    ],
    关于我们: [
      { label: '关于我们', path: '/about' },
      { label: '联系我们', path: '/contact' },
      { label: '投稿指南', path: '/submit' },
      { label: '广告合作', path: '/advertise' },
    ],
    法律: [
      { label: '隐私政策', path: '/privacy' },
      { label: '使用条款', path: '/terms' },
      { label: 'Cookie 政策', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: <TwitterOutlined />, label: 'Twitter', href: '#' },
    { icon: <InstagramOutlined />, label: 'Instagram', href: '#' },
    { icon: <YoutubeOutlined />, label: 'YouTube', href: '#' },
    { icon: <LinkedinOutlined />, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold font-display tracking-wider">
                <span className="text-neon-pink text-shadow-neon-pink">CITY</span>
                <span className="text-neon-blue text-shadow-neon-blue">PULSE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              CITY PULSE 是一本专注于城市文化的在线杂志。我们探索艺术、音乐、时尚、电影等领域，记录城市脉搏的每一次跳动。
            </p>

            <div className="mb-8">
              <h4 className="text-white font-semibold mb-3 text-sm">订阅我们的通讯</h4>
              <div className="flex gap-2">
                <Input
                  placeholder="输入您的邮箱"
                  prefix={<MailOutlined className="text-gray-500" />}
                  className="flex-1"
                  style={{
                    backgroundColor: '#111111',
                    borderColor: '#333333',
                    color: '#ffffff',
                  }}
                  size="large"
                />
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  style={{
                    backgroundColor: '#ff00ff',
                    borderColor: '#ff00ff',
                    color: '#000000',
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                我们尊重您的隐私，不会发送垃圾邮件。
              </p>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white transition-all duration-300 hover:bg-neon-pink/20 hover:border-neon-pink/50 border border-transparent"
                  aria-label={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-neon-blue transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} CITY PULSE. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs">Crafted with</span>
              <span className="text-neon-pink">♥</span>
              <span className="text-gray-600 text-xs">for urban culture lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
