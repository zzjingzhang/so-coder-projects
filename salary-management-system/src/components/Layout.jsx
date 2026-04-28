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
    <AntLayout 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb' 
      }}
    >
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        theme="light"
        width={240}
        style={{ 
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          boxShadow: '2px 0 4px rgba(0,0,0,0.02)',
        }}
      >
        <div 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '64px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          }}
        >
          {collapsed ? (
            <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>S</span>
          ) : (
            <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>薪资管理系统</span>
          )}
        </div>
        <div style={{ padding: '8px 0' }}>
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            items={menuItems}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          />
        </div>
      </Sider>
      <AntLayout 
        style={{ 
          backgroundColor: '#f9fafb',
          marginLeft: '1px',
        }}
      >
        <Header 
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '64px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined style={{ color: '#4b5563' }} /> : <MenuFoldOutlined style={{ color: '#4b5563' }} />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ marginRight: '16px' }}
            />
            <div style={{ display: 'block' }}>
              <h1 style={{ 
                fontSize: '18px', 
                fontWeight: 600, 
                color: '#1f2937',
                margin: 0,
              }}>
                企业订阅级 SaaS 平台
              </h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Badge count={3} showZero>
              <Button type="text" icon={<BellOutlined style={{ color: '#4b5563' }} />} size="large" />
            </Badge>
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s',
                }}
              >
                <Avatar size={32} icon={<UserOutlined />} style={{ backgroundColor: '#3b82f6' }} />
                <span style={{ 
                  marginLeft: '8px', 
                  color: '#374151', 
                  fontWeight: 500,
                  display: 'block',
                }}>
                  管理员
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content 
          style={{ 
            margin: '24px',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
