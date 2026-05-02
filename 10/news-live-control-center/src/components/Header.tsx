import React from 'react';
import { Layout, Typography, Space, Button, Badge } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader className="bg-gray-900 shadow-lg px-6 flex items-center justify-between" style={{ height: '64px', lineHeight: '64px' }}>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4 shadow-md">
          <span className="text-white font-bold text-lg">N</span>
        </div>
        <Title level={4} className="!m-0 !text-white">
          新闻媒体直播管理中心
        </Title>
      </div>
      <Space size="middle">
        <Badge count={3} dot>
          <Button 
            type="text" 
            className="!text-white hover:!text-blue-300 !text-xl"
            icon={<BellOutlined />} 
          />
        </Badge>
        <Button 
          type="text" 
          className="!text-white hover:!text-blue-300 !text-xl"
          icon={<SettingOutlined />} 
        />
        <Button 
          type="text" 
          className="!text-white hover:!text-blue-300"
          icon={<UserOutlined className="text-xl" />}
        >
          <span className="text-white">管理员</span>
        </Button>
      </Space>
    </AntHeader>
  );
};

export default Header;
