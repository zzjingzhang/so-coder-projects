import React from 'react';
import { Card, Row, Col, Statistic, Typography, Progress, Badge } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  GlobalOutlined,
  RocketOutlined
} from '@ant-design/icons';
import type { RealTimeData } from '../types';

const { Text } = Typography;

interface RealTimeMonitorProps {
  data: RealTimeData;
}

const RealTimeMonitor: React.FC<RealTimeMonitorProps> = ({ data }) => {
  const metrics = [
    {
      title: '总观看人数',
      value: data.totalViewers,
      icon: <UserOutlined />,
      prefix: '👥',
      suffix: '人',
      color: '#1890ff'
    },
    {
      title: '活跃频道数',
      value: data.activeChannels,
      icon: <VideoCameraOutlined />,
      prefix: '📺',
      suffix: '个',
      color: '#52c41a'
    },
    {
      title: '网络带宽',
      value: data.bandwidth.toFixed(2),
      icon: <GlobalOutlined />,
      prefix: '🌐',
      suffix: 'Mbps',
      color: '#722ed1'
    },
    {
      title: '视频码率',
      value: data.bitrate,
      icon: <RocketOutlined />,
      prefix: '⚡',
      suffix: 'Mbps',
      color: '#fa8c16'
    }
  ];

  const technicalMetrics = [
    {
      title: '直播延迟',
      value: data.latency,
      unit: 'ms',
      threshold: 200,
      goodThreshold: 150
    },
    {
      title: '帧率',
      value: data.frameRate,
      unit: 'fps',
      threshold: 25,
      goodThreshold: 30
    },
    {
      title: '系统 uptime',
      value: data.uptime,
      unit: '%',
      threshold: 99.5,
      goodThreshold: 99.9
    },
    {
      title: '错误数',
      value: data.errors,
      unit: '个',
      threshold: 5,
      goodThreshold: 0
    }
  ];

  const getStatusColor = (value: number, threshold: number, goodThreshold: number): string => {
    if (value >= goodThreshold) return '#52c41a';
    if (value >= threshold) return '#faad14';
    return '#ff4d4f';
  };

  const getProgressPercent = (value: number, unit: string): number => {
    if (unit === '%') return value;
    if (unit === 'ms') return Math.min((value / 300) * 100, 100);
    if (unit === 'fps') return Math.min((value / 60) * 100, 100);
    return Math.min((value / 10) * 100, 100);
  };

  return (
    <Card title="实时数据监测" className="h-full">
      <Row gutter={[16, 16]}>
        {metrics.map((metric, index) => (
          <Col span={6} key={index}>
            <Card
              bordered
              className="text-center hover:shadow-lg transition-shadow duration-200"
              style={{ backgroundColor: `${metric.color}08` }}
            >
              <Statistic
                title={metric.title}
                value={metric.value}
                prefix={<span className="text-2xl">{metric.prefix}</span>}
                suffix={metric.suffix}
                valueStyle={{ color: metric.color, fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-6">
        <Text strong className="text-lg mb-4 block">技术指标监控</Text>
        <Row gutter={[16, 16]}>
          {technicalMetrics.map((metric, index) => {
            const color = getStatusColor(metric.value, metric.threshold, metric.goodThreshold);
            const isGood = metric.value >= metric.goodThreshold;
            
            return (
              <Col span={6} key={index}>
                <Card
                  bordered
                  className="hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Text strong>{metric.title}</Text>
                    <Badge
                      status={isGood ? 'success' : metric.value >= metric.threshold ? 'warning' : 'error'}
                      text={
                        <Text style={{ color }}>
                          {metric.value} {metric.unit}
                        </Text>
                      }
                    />
                  </div>
                  <Progress
                    percent={getProgressPercent(metric.value, metric.unit)}
                    strokeColor={color}
                    showInfo={false}
                    strokeWidth={8}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </Card>
  );
};

export default RealTimeMonitor;
