import { Link } from 'react-router-dom'
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">舞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">当代舞蹈学院</span>
                <span className="text-pink-400 text-xs tracking-wider">CONTEMPORARY DANCE</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              释放身心，舞动灵魂。我们致力于为每一位舞者提供专业、个性化的舞蹈教育体验。
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <InstagramOutlined />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <FacebookOutlined />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-all duration-300"
              >
                <YoutubeOutlined />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">快速链接</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/classes" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  课程介绍
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  课程预约
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">热门课程</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                  现代舞基础
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                  爵士舞
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                  街舞
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                  芭蕾舞
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                  中国舞
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <EnvironmentOutlined className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  北京市朝阳区建国路88号<br />艺术中心大厦3层
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneOutlined className="text-pink-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">400-888-9999</span>
              </li>
              <li className="flex items-center space-x-3">
                <MailOutlined className="text-pink-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@dance-academy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} 当代舞蹈学院. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                隐私政策
              </span>
              <span className="text-gray-500 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                服务条款
              </span>
              <span className="text-gray-500 text-sm cursor-pointer hover:text-pink-400 transition-colors">
                网站地图
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
