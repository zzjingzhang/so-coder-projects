import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterLink {
  label: string;
  path: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterColumn[] = [
  {
    title: '快速链接',
    links: [
      { label: '首页', path: '/' },
      { label: '关于我们', path: '/about' },
      { label: '作品集', path: '/portfolio/web-design' },
      { label: '博客', path: '/blog' },
      { label: '联系我们', path: '/contact' }
    ]
  },
  {
    title: '服务项目',
    links: [
      { label: '网页设计', path: '/services/web-design' },
      { label: '品牌设计', path: '/services/brand-design' },
      { label: 'UI/UX设计', path: '/services/ui-ux-design' },
      { label: '前端开发', path: '/services/frontend-development' }
    ]
  },
  {
    title: '法律条款',
    links: [
      { label: '隐私政策', path: '/privacy-policy' },
      { label: '服务条款', path: '/terms-of-service' },
      { label: 'Cookie政策', path: '/cookie-policy' }
    ]
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-white">
                Avana <span className="text-primary">LLC</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              我们是一家专注于创意设计和数字体验的专业团队。致力于为客户打造独特、现代且具有影响力的品牌形象和数字产品。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">
                  上海市浦东新区陆家嘴金融中心<br />
                  环球金融中心 28楼
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+86 21 8888 8888</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">hello@avana-llc.com</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold text-lg mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        "inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group",
                        "text-sm"
                      )}
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-white font-semibold text-xl mb-2">订阅我们的通讯</h3>
              <p className="text-gray-400 text-sm">
                获取最新的设计趋势、行业洞察和公司动态。
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="输入您的邮箱地址"
                  className="flex-1 min-w-[240px] px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <span>订阅</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Avana LLC. 保留所有权利。
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Twitter"
              >
                <span className="text-xs font-bold">X</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">Li</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
