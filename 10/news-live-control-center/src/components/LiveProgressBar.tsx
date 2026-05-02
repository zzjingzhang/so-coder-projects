import React, { useState, useEffect } from 'react';
import { Card, Progress, Typography, Space, Tag, Button } from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  SoundOutlined,
  MutedOutlined
} from '@ant-design/icons';
import type { LiveProgress } from '../types';

const { Text, Title } = Typography;

interface LiveProgressBarProps {
  channelName: string;
  progress: LiveProgress;
  isLive: boolean;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const LiveProgressBar: React.FC<LiveProgressBarProps> = ({
  channelName,
  progress,
  isLive
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progress);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!isPlaying || !isLive) return;

    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newCurrentTime = prev.currentTime + 1;
        if (newCurrentTime >= prev.totalTime) {
          return {
            ...prev,
            currentTime: prev.totalTime,
            progress: 100
          };
        }
        return {
          currentTime: newCurrentTime,
          totalTime: prev.totalTime,
          progress: (newCurrentTime / prev.totalTime) * 100
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isLive]);

  const handleProgressChange = (value: number) => {
    const newCurrentTime = (value / 100) * currentProgress.totalTime;
    setCurrentProgress({
      currentTime: newCurrentTime,
      totalTime: currentProgress.totalTime,
      progress: value
    });
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Tag color={isLive ? 'red' : 'default'} className="text-base px-4 py-1">
            {isLive ? '● 直播中' : '已结束'}
          </Tag>
          <Title level={4} className="!m-0 !text-white">
            {channelName}
          </Title>
        </div>
        <Text type="secondary" className="text-lg">
          {formatTime(currentProgress.currentTime)} / {formatTime(currentProgress.totalTime)}
        </Text>
      </div>

      <div className="mb-4">
        <div
          className="cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
            handleProgressChange(percent);
          }}
        >
          <Progress
            percent={currentProgress.progress}
            strokeColor={{
              '0%': '#1890ff',
              '100%': '#722ed1'
            }}
            trailColor="#333"
            strokeWidth={12}
            showInfo={false}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Space size="middle">
          <Button
            type="text"
            icon={isPlaying ? <PauseCircleOutlined className="text-3xl" /> : <PlayCircleOutlined className="text-3xl" />}
            className="text-white hover:text-blue-400 transition-colors !text-3xl"
            onClick={() => setIsPlaying(!isPlaying)}
          />
          <Button
            type="text"
            icon={<ReloadOutlined className="text-2xl" />}
            className="text-white hover:text-blue-400 transition-colors"
            onClick={() => {
              setCurrentProgress({
                currentTime: 0,
                totalTime: currentProgress.totalTime,
                progress: 0
              });
              setIsPlaying(true);
            }}
          />
          <Button
            type="text"
            icon={isMuted ? <MutedOutlined className="text-2xl" /> : <SoundOutlined className="text-2xl" />}
            className="text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsMuted(!isMuted)}
          />
        </Space>

        <Space size="middle">
          <Tag color="blue" className="text-sm">
            HD 1080p
          </Tag>
          <Tag color="purple" className="text-sm">
            60 fps
          </Tag>
          <Button
            type="text"
            icon={<FullscreenOutlined className="text-2xl" />}
            className="text-white hover:text-blue-400 transition-colors"
          />
        </Space>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Text type="secondary" className="text-gray-400">
          直播开始时间: 今天 08:00
        </Text>
        <Text type="secondary" className="text-gray-400">
          预计结束时间: 今天 24:00
        </Text>
      </div>
    </Card>
  );
};

export default LiveProgressBar;
