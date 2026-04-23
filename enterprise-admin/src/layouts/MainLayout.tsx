import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, Button, Space, Badge, Drawer } from 'antd';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  ProfileOutlined,
  DownOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, hasMenuPermission } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link to="/">仪表盘</Link>,
      permission: 'dashboard',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: <Link to="/users">用户管理</Link>,
      permission: 'users',
    },
    {
      key: '/roles',
      icon: <TeamOutlined />,
      label: <Link to="/roles">角色权限</Link>,
      permission: 'roles',
    },
    {
      key: '/products',
      icon: <ShopOutlined />,
      label: <Link to="/products">商品管理</Link>,
      permission: 'products',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/orders">订单管理</Link>,
      permission: 'orders',
    },
    {
      key: '/content',
      icon: <FileTextOutlined />,
      label: <Link to="/content">内容管理</Link>,
      permission: 'content',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">系统设置</Link>,
      permission: 'settings',
    },
  ];

  const filteredMenuItems = menuItems.filter(item => hasMenuPermission(item.permission));

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: '个人信息',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      logout();
      navigate('/login');
    }
  };

  const selectedKeys = [location.pathname];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <div className="demo-logo-vertical" style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 18 : 20,
          fontWeight: 'bold',
        }}>
          {collapsed ? 'E' : 'Enterprise Admin'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={filteredMenuItems}
        />
      </Sider>

      <Drawer
        title="菜单"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={filteredMenuItems}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>

      <Layout style={{ marginLeft: collapsed ? 0 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileMenuOpen(!mobileMenuOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          <Space size="middle">
            <Button
              type="text"
              icon={isDark ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleTheme}
            />
            <Badge count={3} dot>
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleMenuClick }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />} 
                  src={user?.avatar}
                />
                <span>{user?.username || '用户'}</span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
