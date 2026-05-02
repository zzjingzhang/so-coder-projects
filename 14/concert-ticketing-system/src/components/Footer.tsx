import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-text-primary text-surface pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <i className="pi pi-music text-2xl text-primary"></i>
              <span className="text-xl font-bold">音乐会票务</span>
            </Link>
            <p className="text-gray-400 text-sm">
              为您提供最优质的音乐会票务服务，让每一场演出都成为难忘的回忆。
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="pi pi-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="pi pi-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="pi pi-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <i className="pi pi-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  演出列表
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  热门场馆
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  特别活动
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">客户支持</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  联系我们
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  退票政策
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <i className="pi pi-map-marker"></i>
                <span>北京市朝阳区音乐厅路88号</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <i className="pi pi-phone"></i>
                <span>400-888-8888</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <i className="pi pi-envelope"></i>
                <span>support@concert-ticket.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 音乐会票务系统. 保留所有权利.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
              隐私政策
            </Link>
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
              服务条款
            </Link>
            <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm">
              Cookie 政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
