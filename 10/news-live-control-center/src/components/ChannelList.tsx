import React from 'react';
import { Card, List, Tag, Typography, Avatar } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import type { Channel } from '../types';

const { Text } = Typography;

interface ChannelListProps {
  channels: Channel[];
  selectedChannel: Channel | null;
  onSelectChannel: (channel: Channel) => void;
}

const statusConfig = {
  live: {
    color: 'red',
    icon: <PlayCircleOutlined />,
    text: '直播中'
  },
  offline: {
    color: 'default',
    icon: <PauseCircleOutlined />,
    text: '已结束'
  },
  scheduled: {
    color: 'orange',
    icon: <ClockCircleOutlined />,
    text: '即将开播'
  }
};

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  onSelectChannel
}) => {
  return (
    <Card title="频道列表" className="h-full">
      <List
        dataSource={channels}
        renderItem={(channel) => {
          const status = statusConfig[channel.status];
          const isSelected = selectedChannel?.id === channel.id;
          
          return (
            <List.Item
              key={channel.id}
              onClick={() => onSelectChannel(channel)}
              className={`cursor-pointer transition-all duration-200 hover:bg-blue-50 rounded-lg px-2 ${
                isSelected ? 'bg-blue-100 border-blue-500 border' : ''
              }`}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={channel.thumbnail}
                    size={64}
                    className="rounded-lg object-cover"
                  />
                }
                title={
                  <div className="flex items-center justify-between">
                    <Text strong className="text-base">
                      {channel.name}
                    </Text>
                    <Tag color={status.color} icon={status.icon}>
                      {status.text}
                    </Tag>
                  </div>
                }
                description={
                  <div className="mt-1">
                    <Text type="secondary" className="block text-sm">
                      {channel.description}
                    </Text>
                    <div className="flex items-center mt-2 space-x-4">
                      <Text type="secondary" className="text-xs">
                        👁️ {channel.viewers.toLocaleString()} 观看
                      </Text>
                      <Text type="secondary" className="text-xs">
                        🕐 {channel.startTime} - {channel.endTime}
                      </Text>
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default ChannelList;
