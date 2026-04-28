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
    <AntLayout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="shadow-lg">
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-blue-600 to-purple-600">
          {collapsed ? (
            <span className="text-white text-xl font-bold">S</span>
          ) : (
            <span className="text-white text-xl font-bold">薪资管理系统</span>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          className="border-none"
        />
      </Sider>
      <AntLayout>
        <Header className="bg-white shadow-sm flex items-center justify-between px-4 h-16">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="mr-4"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800">企业订阅级 SaaS 平台</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge count={3} showZero>
              <Button type="text" icon={<BellOutlined className="text-gray-600" />} size="large" />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <div className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <Avatar size={32} icon={<UserOutlined />} className="bg-blue-500" />
                <span className="ml-2 text-gray-700 font-medium hidden md:block">管理员</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-white rounded-lg shadow-sm min-h-[calc(100vh-112px)]">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
