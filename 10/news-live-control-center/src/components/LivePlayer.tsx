import React from 'react';
import { Card, Empty, Typography, Image, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import type { Channel } from '../types';

const { Text, Title } = Typography;

interface LivePlayerProps {
  channel: Channel | null;
}

const LivePlayer: React.FC<LivePlayerProps> = ({ channel }) => {
  if (!channel) {
    return (
      <Card className="h-full flex items-center justify-center bg-gray-100">
        <Empty
          description={
            <Text type="secondary" className="text-lg">
              请从左侧频道列表选择一个频道
            </Text>
          }
        />
      </Card>
    );
  }

  const statusColors = {
    live: 'red',
    offline: 'default',
    scheduled: 'orange'
  };

  const statusTexts = {
    live: '直播中',
    offline: '已结束',
    scheduled: '即将开播'
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
        <Image
          src={channel.thumbnail}
          alt={channel.name}
          className="w-full h-full object-cover"
          preview={false}
        />
        
        {channel.status === 'live' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-black bg-opacity-60 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition-all duration-200">
              <PlayCircleOutlined className="text-white text-5xl" />
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4">
          <Tag color={statusColors[channel.status]} className="text-base px-4 py-1">
            {channel.status === 'live' && <span className="mr-1">●</span>}
            {statusTexts[channel.status]}
          </Tag>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black bg-opacity-70 p-4 rounded-lg">
            <Title level={4} className="!m-0 !text-white mb-2">
              {channel.name}
            </Title>
            <Text type="secondary" className="text-gray-300 text-sm">
              {channel.description}
            </Text>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-black bg-opacity-60 px-3 py-1 rounded-lg">
            <Text className="text-white text-sm">
              👁️ {channel.viewers.toLocaleString()} 观看
            </Text>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Tag color="blue">HD 1080p</Tag>
          <Tag color="green">60 fps</Tag>
          <Tag color="purple">H.264</Tag>
        </div>
        <Text type="secondary" className="text-sm">
          直播时间: {channel.startTime} - {channel.endTime}
        </Text>
      </div>
    </Card>
  );
};

export default LivePlayer;
