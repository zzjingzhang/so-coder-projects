import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import Header from './components/Header';
import ChannelList from './components/ChannelList';
import LivePlayer from './components/LivePlayer';
import RealTimeMonitor from './components/RealTimeMonitor';
import LiveProgressBar from './components/LiveProgressBar';
import { mockChannels, initialRealTimeData } from './data/mockData';
import type { Channel, RealTimeData, LiveProgress } from './types';

const { Content } = Layout;

const App: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [realTimeData, setRealTimeData] = useState<RealTimeData>(initialRealTimeData);
  const [liveProgress, setLiveProgress] = useState<LiveProgress>({
    currentTime: 3600,
    totalTime: 57600,
    progress: 6.25
  });

  useEffect(() => {
    const dataInterval = setInterval(() => {
      setRealTimeData(prev => {
        const viewerChange = Math.floor(Math.random() * 20000) - 10000;
        const bandwidthChange = (Math.random() - 0.5) * 50;
        const latencyChange = (Math.random() - 0.5) * 20;
        const frameRateChange = Math.floor(Math.random() * 3) - 1;

        return {
          ...prev,
          totalViewers: Math.max(5000000, prev.totalViewers + viewerChange),
          bandwidth: Math.max(1000, Math.min(1500, prev.bandwidth + bandwidthChange)),
          latency: Math.max(80, Math.min(200, prev.latency + latencyChange)),
          frameRate: Math.max(25, Math.min(60, prev.frameRate + frameRateChange))
        };
      });
    }, 3000);

    return () => clearInterval(dataInterval);
  }, []);

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    if (channel.status === 'live') {
      const randomProgress = Math.random() * 100;
      const currentTime = (randomProgress / 100) * 57600;
      setLiveProgress({
        currentTime,
        totalTime: 57600,
        progress: randomProgress
      });
    }
  };

  const isChannelLive = selectedChannel?.status === 'live';

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header />
      <Content className="p-6">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <ChannelList
              channels={mockChannels}
              selectedChannel={selectedChannel}
              onSelectChannel={handleSelectChannel}
            />
          </Col>
          <Col xs={24} lg={16}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <LivePlayer channel={selectedChannel} />
              </Col>
              {selectedChannel && (
                <Col span={24}>
                  <LiveProgressBar
                    channelName={selectedChannel.name}
                    progress={liveProgress}
                    isLive={isChannelLive}
                  />
                </Col>
              )}
              <Col span={24}>
                <RealTimeMonitor data={realTimeData} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
