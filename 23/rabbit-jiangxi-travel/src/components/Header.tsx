import { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      label: '首页',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: '专栏列表',
      icon: 'pi pi-list',
      command: () => navigate('/episodes')
    },
    {
      label: '长图海报',
      icon: 'pi pi-image',
      command: () => navigate('/episodes?type=long_poster')
    },
    {
      label: '横屏视频',
      icon: 'pi pi-play-circle',
      command: () => navigate('/episodes?type=landscape_video')
    },
    {
      label: 'H5作品',
      icon: 'pi pi-mobile',
      command: () => navigate('/episodes?type=h5_work')
    }
  ];

  const start = (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
      <span className="text-2xl">🐰</span>
      <span className="font-serif-sc text-xl font-bold text-[#2d5a3d]">小兔子江西游记</span>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="hidden md:block">
          <Menubar 
            model={menuItems} 
            start={start}
            className="border-none bg-transparent shadow-none py-1"
          />
        </div>
        
        <div className="md:hidden flex items-center justify-between py-2">
          {start}
          <Button
            icon="pi pi-bars"
            className="p-button-text p-button-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 mt-3 border-t border-gray-100 pt-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg"
                onClick={() => {
                  item.command?.();
                  setMobileMenuOpen(false);
                }}
              >
                <i className={`${item.icon} text-[#2d5a3d]`}></i>
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
