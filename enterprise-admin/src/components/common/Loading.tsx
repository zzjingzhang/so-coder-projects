import React from 'react';
import { Spin, Space } from 'antd';

const Loading: React.FC<{ tip?: string; fullPage?: boolean }> = ({ tip = '加载中...', fullPage = false }) => {
  const containerStyle: React.CSSProperties = fullPage
    ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }
    : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
      };

  return (
    <div style={containerStyle}>
      <Space direction="vertical" align="center">
        <Spin size="large" />
        <span style={{ color: '#666' }}>{tip}</span>
      </Space>
    </div>
  );
};

export default Loading;
