import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import AddressAutocomplete from './components/AddressAutocomplete';
import AddressEditDialog from './components/AddressEditDialog';
import { Address } from './types';
import './App.css';

const App: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setIsDialogOpen(true);
  };

  const handleAddressSave = (updatedAddress: Address) => {
    setSelectedAddress(updatedAddress);
  };

  const handleEditClick = () => {
    if (selectedAddress) {
      setIsDialogOpen(true);
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <div className="container header-content">
            <div className="header-left">
              <div className="logo">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h1 className="app-title">地址自动完成</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <section className="hero-section">
              <h2 className="hero-title">快速查找并编辑您的地址</h2>
              <p className="hero-description">
                输入地址关键词，从建议列表中选择，然后根据需要进行修改
              </p>
            </section>

            <section className="search-section">
              <div className="search-card">
                <h3 className="search-label">搜索地址</h3>
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  placeholder="输入地址关键词，如：北京、上海、中关村..."
                />
              </div>
            </section>

            {selectedAddress && (
              <section className="result-section">
                <div className="result-card">
                  <div className="result-header">
                    <h3 className="result-title">已选择的地址</h3>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={handleEditClick}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      编辑
                    </button>
                  </div>

                  <div className="address-display">
                    <div className="address-full">
                      <span className="label">完整地址：</span>
                      <span className="value">{selectedAddress.fullAddress}</span>
                    </div>

                    <div className="address-grid">
                      <div className="address-item">
                        <span className="label">省份</span>
                        <span className="value">{selectedAddress.province}</span>
                      </div>
                      <div className="address-item">
                        <span className="label">城市</span>
                        <span className="value">{selectedAddress.city}</span>
                      </div>
                      <div className="address-item">
                        <span className="label">区县</span>
                        <span className="value">{selectedAddress.district}</span>
                      </div>
                      <div className="address-item">
                        <span className="label">街道</span>
                        <span className="value">{selectedAddress.street || '-'}</span>
                      </div>
                      <div className="address-item">
                        <span className="label">详细地址</span>
                        <span className="value">{selectedAddress.detail || '-'}</span>
                      </div>
                      <div className="address-item">
                        <span className="label">邮政编码</span>
                        <span className="value">{selectedAddress.postalCode || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="features-section">
              <h3 className="features-title">功能特点</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </div>
                  <h4 className="feature-name">智能搜索</h4>
                  <p className="feature-desc">
                    输入关键词即可获取地址建议列表，支持拼音和汉字搜索
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="feature-name">离线支持</h4>
                  <p className="feature-desc">
                    内置mock数据，没有网络也能正常使用和开发
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h4 className="feature-name">主题切换</h4>
                  <p className="feature-desc">
                    支持亮/暗主题切换，使用CSS变量实现统一配色
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h4 className="feature-name">表单校验</h4>
                  <p className="feature-desc">
                    编辑地址时提供实时表单验证，确保数据格式正确
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <p>地址自动完成组件 © 2024 | 使用 React + Vite + Element Plus 构建</p>
          </div>
        </footer>

        <AddressEditDialog
          isOpen={isDialogOpen}
          address={selectedAddress}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleAddressSave}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
