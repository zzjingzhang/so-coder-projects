import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const links = [
    { label: '首页', path: '/' },
    { label: '专栏列表', path: '/episodes' },
    { label: '关于我们', path: '/' },
  ];

  const categories = [
    { label: '长图海报', count: 4 },
    { label: '横屏视频', count: 4 },
    { label: 'H5作品', count: 4 },
  ];

  return (
    <footer className="bg-[#1a2e1f] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐰</span>
              <span className="font-serif-sc text-2xl font-bold">小兔子江西游记</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              跟随小兔子的脚步，探索江西的山水湖林、特色美食、非物质文化遗产和古建筑。
              物华天宝，人杰地灵，感受江西深厚的文化底蕴与良好生态。
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="pi pi-weibo text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="pi pi-wechat text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i className="pi pi-youtube text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif-sc text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <i className="pi pi-angle-right text-sm"></i>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif-sc text-lg font-semibold mb-4">内容分类</h3>
            <ul className="space-y-3">
              {categories.map((cat, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate('/episodes')}
                    className="text-gray-300 hover:text-white transition-colors flex items-center justify-between w-full"
                  >
                    <span className="flex items-center gap-2">
                      <i className="pi pi-angle-right text-sm"></i>
                      {cat.label}
                    </span>
                    <span className="text-sm bg-white/10 px-2 py-0.5 rounded">{cat.count}期</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} 小兔子江西游记. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <a href="#" className="hover:text-white transition-colors">使用条款</a>
            <a href="#" className="hover:text-white transition-colors">联系我们</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
