import React from 'react';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface EmptyStateProps {
  description?: string;
  image?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  description = '暂无数据',
  image,
  actionText,
  onAction,
}) => {
  return (
    <Empty
      image={image || Empty.PRESENTED_IMAGE_SIMPLE}
      description={<span style={{ color: '#666' }}>{description}</span>}
      style={{ padding: '60px 0' }}
    >
      {actionText && onAction && (
        <Button type="primary" icon={<PlusOutlined />} onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Empty>
  );
};

export default EmptyState;
