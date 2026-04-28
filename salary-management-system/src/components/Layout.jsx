import { Layout as AntLayout, Menu, Button, Avatar, Dropdown, Badge } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  BankOutlined,
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/company-profile',
      icon: <HomeOutlined />,
      label: '公司资料',
      onClick: () => navigate('/company-profile'),
    },
    {
      key: '/departments',
      icon: <TeamOutlined />,
      label: '部门管理',
      onClick: () => navigate('/departments'),
    },
    {
      key: '/employees',
      icon: <UserOutlined />,
      label: '员工管理',
      onClick: () => navigate('/employees'),
    },
    {
      key: '/salary',
      icon: <BankOutlined />,
      label: '薪资管理',
      onClick: () => navigate('/salary'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
      onClick: () => navigate('/settings'),
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: '账户设置',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
    },
  ];

  const getSelectedKey = () => {
    if (location.pathname === '/') return '/company-profile';
    return location.pathname;
  };

  return (
    <AntLayout className="min-h-screen bg-gray-50">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light" 
        className="shadow-md border-r border-gray-200"
        width={240}
        style={{ 
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
        }}
      >
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-blue-700">
          {collapsed ? (
            <span className="text-white text-xl font-bold">S</span>
          ) : (
            <span className="text-white text-xl font-bold">薪资管理系统</span>
          )}
        </div>
        <div className="py-2">
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            className="border-none"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      </Sider>
      <AntLayout className="bg-gray-50">
        <Header 
          className="flex items-center justify-between px-6 h-16 shadow-sm border-b border-gray-200"
          style={{ 
            backgroundColor: '#ffffff',
            color: '#1f2937',
          }}
        >
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined className="text-gray-600" /> : <MenuFoldOutlined className="text-gray-600" />}
              onClick={() => setCollapsed(!collapsed)}
              className="mr-4 hover:bg-gray-100"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800">企业订阅级 SaaS 平台</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge count={3} showZero>
              <Button type="text" icon={<BellOutlined className="text-gray-600" />} size="large" className="hover:bg-gray-100" />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
                <Avatar size={32} icon={<UserOutlined />} className="bg-blue-500" />
                <span className="ml-2 text-gray-700 font-medium hidden md:block">管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content 
          className="m-6 p-6 bg-white rounded-xl shadow-sm min-h-[calc(100vh-144px)]"
          style={{ backgroundColor: '#ffffff' }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
