import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Space, ConfigProvider, theme, Switch, Typography } from 'antd';
import {
  HomeOutlined,
  TableOutlined,
  PlayCircleOutlined,
  SoundOutlined,
  SettingOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import MorseCodeTable from './components/MorseCodeTable';
import SimpleMode from './components/SimpleMode';
import TelegraphMode from './components/TelegraphMode';
import Settings from './components/Settings';
import type { MorseSettings } from './types';
import { DEFAULT_SETTINGS } from './utils/morseCode';
import './App.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { key: 'home', label: '首页', icon: <HomeOutlined />, path: '/' },
  { key: 'table', label: '电码对照表', icon: <TableOutlined />, path: '/table' },
  { key: 'simple', label: '简单模式', icon: <PlayCircleOutlined />, path: '/simple' },
  { key: 'telegraph', label: '电报机模式', icon: <SoundOutlined />, path: '/telegraph' },
  { key: 'settings', label: '设置', icon: <SettingOutlined />, path: '/settings' },
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-6">
      <div className="text-center max-w-3xl">
        <Title level={1} className="mb-6 text-4xl md:text-5xl">
          📻 摩尔斯电码练习工具
        </Title>
        <Text className="text-lg text-gray-600 dark:text-gray-400 mb-8 block leading-relaxed">
          专为孩子们设计的摩尔斯电码学习工具，让学习变得有趣又简单！
          通过互动式练习，轻松掌握这门古老而神奇的通信技术。
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mt-12">
        <Link to="/simple" className="block no-underline">
          <div className="home-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-400">
            <div className="flex items-center mb-6">
              <PlayCircleOutlined className="text-4xl text-blue-600 dark:text-blue-400 mr-4" />
              <Title level={3} style={{ margin: 0 }} className="text-blue-700 dark:text-blue-300">
                简单模式
              </Title>
            </div>
            <Text className="text-gray-600 dark:text-gray-400">
              通过按钮轻松输入点(.)和划(-)，适合初学者快速入门。
              支持文字转电码、电码解码，以及语音播放功能。
            </Text>
          </div>
        </Link>

        <Link to="/telegraph" className="block no-underline">
          <div className="home-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-400">
            <div className="flex items-center mb-6">
              <SoundOutlined className="text-4xl text-orange-600 dark:text-orange-400 mr-4" />
              <Title level={3} style={{ margin: 0 }} className="text-orange-700 dark:text-orange-300">
                电报机模式
              </Title>
            </div>
            <Text className="text-gray-600 dark:text-gray-400">
              模拟真实电报机操作，通过按住按键的时间长短来输入点和划。
              体验历史上真实的无线电通信方式！
            </Text>
          </div>
        </Link>

        <Link to="/table" className="block no-underline">
          <div className="home-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-green-400">
            <div className="flex items-center mb-6">
              <TableOutlined className="text-4xl text-green-600 dark:text-green-400 mr-4" />
              <Title level={3} style={{ margin: 0 }} className="text-green-700 dark:text-green-300">
                电码对照表
              </Title>
            </div>
            <Text className="text-gray-600 dark:text-gray-400">
              完整的摩尔斯电码对照表，包含所有字母(A-Z)和数字(0-9)。
              随时查看，方便学习和参考。
            </Text>
          </div>
        </Link>

        <Link to="/settings" className="block no-underline">
          <div className="home-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-purple-400">
            <div className="flex items-center mb-6">
              <SettingOutlined className="text-4xl text-purple-600 dark:text-purple-400 mr-4" />
              <Title level={3} style={{ margin: 0 }} className="text-purple-700 dark:text-purple-300">
                时间设置
              </Title>
            </div>
            <Text className="text-gray-600 dark:text-gray-400">
              自定义调整各种时间参数，包括点持续时间、划持续时间、间隔时间等。
              根据学习进度灵活调整难度。
            </Text>
          </div>
        </Link>
      </div>

      <div className="mt-20 home-card bg-gray-50 dark:bg-gray-800 max-w-3xl w-full">
        <div className="flex items-center mb-6">
          <BulbOutlined className="text-3xl text-yellow-500 mr-4" />
          <Title level={4} style={{ margin: 0 }} className="text-gray-700 dark:text-gray-300">
            什么是摩尔斯电码？
          </Title>
        </div>
        <Text className="text-gray-600 dark:text-gray-400 leading-relaxed block">
          摩尔斯电码（Morse code）是一种时通时断的信号代码，通过不同的排列顺序来表达不同的英文字母、数字和标点符号。
          它由美国人艾尔菲德·维尔于1836年发明，是无线电通信的基础。摩尔斯电码使用两种基本信号：
          <span className="font-semibold text-blue-600 dark:text-blue-400">点（·）</span> 和
          <span className="font-semibold text-orange-600 dark:text-orange-400">划（—）</span>。
        </Text>
      </div>
    </div>
  );
};

interface AppLayoutProps {
  settings: MorseSettings;
  onSettingsChange: (settings: MorseSettings) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  settings,
  onSettingsChange,
  darkMode,
  setDarkMode,
}) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentKey = menuItems.find(item => item.path === location.pathname)?.key || 'home';

  return (
    <Layout className="min-h-screen">
      <Header className="sticky top-0 z-50 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Title level={4} className="m-0 text-gray-800 dark:text-white">
            📻 摩尔斯电码练习工具
          </Title>
        </div>
        <Space>
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          />
        </Space>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          theme={darkMode ? 'dark' : 'light'}
          breakpoint="lg"
          collapsedWidth="0"
          className="border-r border-gray-200 dark:border-gray-700"
        >
          <Menu
            mode="inline"
            selectedKeys={[currentKey]}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems.map(item => ({
              key: item.key,
              icon: item.icon,
              label: <Link to={item.path}>{item.label}</Link>,
            }))}
          />
        </Sider>
        <Content className="m-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/table" element={<MorseCodeTable />} />
            <Route path="/simple" element={<SimpleMode settings={settings} />} />
            <Route path="/telegraph" element={<TelegraphMode settings={settings} />} />
            <Route
              path="/settings"
              element={<Settings settings={settings} onSettingsChange={onSettingsChange} />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<MorseSettings>(DEFAULT_SETTINGS);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('morseSettings');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse saved settings:', e);
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('morseSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const handleSettingsChange = (newSettings: MorseSettings) => {
    setSettings(newSettings);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: '#1677ff',
        },
      }}
    >
      <BrowserRouter>
        <AppLayout
          settings={settings}
          onSettingsChange={handleSettingsChange}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
