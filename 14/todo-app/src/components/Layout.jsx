import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = [
    {
      key: '1',
      label: (
        <div className="text-gray-600">
          <strong>{currentUser?.username}</strong>
          <div className="text-sm text-gray-400">{currentUser?.email}</div>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <span onClick={handleLogout} className="text-red-500">
          <LogoutOutlined className="mr-2" />
          退出登录
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <h1 
              className="text-xl md:text-2xl font-bold text-blue-600 cursor-pointer m-0"
              onClick={() => navigate('/')}
            >
              Todo 应用
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/create')}
              className="hidden md:flex items-center justify-center"
            >
              新建任务
            </Button>
            
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/create')}
              className="md:hidden flex items-center justify-center"
              size="small"
            />
            
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space className="cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar icon={<UserOutlined />} className="bg-blue-500" />
                <span className="hidden md:inline text-gray-700 font-medium">
                  {currentUser?.username}
                </span>
              </Space>
            </Dropdown>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="bg-white border-t py-6 text-center text-gray-500">
        <p className="m-0">Todo 应用 ©{new Date().getFullYear()} - 管理你的每一项任务</p>
      </footer>
    </div>
  );
};

export default Layout;
