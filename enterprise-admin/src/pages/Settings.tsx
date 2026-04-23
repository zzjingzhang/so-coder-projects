import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Select, Tag, Modal, Form, message,
  Typography, Drawer, Descriptions, Tooltip, Empty,
  Divider, Row, Col, Statistic, Tabs, Switch,
  List, Timeline, Badge
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, DownloadOutlined, FilterOutlined, SettingOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined,
  SaveOutlined, BellOutlined, LockOutlined, FileTextOutlined,
  SafetyOutlined, NotificationOutlined, GlobalOutlined, DatabaseOutlined,
  InfoCircleOutlined, ClockCircleOutlined, ApiOutlined, UserOutlined
} from '@ant-design/icons';
import type { SystemLog, SystemConfig } from '../types';
import { mockConfigs, mockOperationLogs, mockLoginLogs, mockApiLogs } from '../mock';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [operationLogs, setOperationLogs] = useState<SystemLog[]>([]);
  const [loginLogs, setLoginLogs] = useState<SystemLog[]>([]);
  const [apiLogs, setApiLogs] = useState<SystemLog[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setConfigs(mockConfigs);
      setOperationLogs(mockOperationLogs);
      setLoginLogs(mockLoginLogs);
      setApiLogs(mockApiLogs);
      setLoading(false);
    }, 500);
  };

  const getStatusTag = (status: string) => {
    if (status === 'success') {
      return <Tag icon={<CheckCircleOutlined />} color="success">成功</Tag>;
    }
    return <Tag icon={<CloseCircleOutlined />} color="error">失败</Tag>;
  };

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'operation':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      case 'login':
        return <UserOutlined style={{ color: '#52c41a' }} />;
      case 'api':
        return <ApiOutlined style={{ color: '#722ed1' }} />;
      default:
        return <InfoCircleOutlined />;
    }
  };

  const configCards = [
    {
      key: 'site',
      title: '站点配置',
      icon: <GlobalOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      items: [
        { key: 'site.name', label: '站点名称', value: 'Enterprise Admin', type: 'input' },
        { key: 'site.logo', label: '站点Logo', value: '/logo.png', type: 'upload' },
        { key: 'site.description', label: '站点描述', value: '企业级后台管理系统', type: 'textarea' },
        { key: 'site.keywords', label: '站点关键词', value: '后台管理,React,Ant Design', type: 'input' },
      ],
    },
    {
      key: 'notification',
      title: '通知设置',
      icon: <BellOutlined style={{ fontSize: 24, color: '#faad14' }} />,
      items: [
        { key: 'notification.email', label: '邮件通知', value: 'true', type: 'switch' },
        { key: 'notification.sms', label: '短信通知', value: 'false', type: 'switch' },
      ],
    },
    {
      key: 'security',
      title: '安全设置',
      icon: <LockOutlined style={{ fontSize: 24, color: '#f5222d' }} />,
      items: [
        { key: 'security.sessionTimeout', label: '会话超时时间(分钟)', value: '30', type: 'number' },
        { key: 'security.loginRetryLimit', label: '登录重试次数限制', value: '5', type: 'number' },
        { key: 'security.forceLogout', label: '强制退出登录', value: 'false', type: 'switch' },
      ],
    },
    {
      key: 'system',
      title: '系统信息',
      icon: <DatabaseOutlined style={{ fontSize: 24, color: '#722ed1' }} />,
      items: [
        { key: 'system.version', label: '系统版本号', value: '1.0.0', type: 'readonly' },
      ],
    },
  ];

  const logColumns = [
    {
      title: '操作时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '操作人',
      dataIndex: 'username',
      key: 'username',
      width: 120,
    },
    {
      title: '操作模块',
      dataIndex: 'module',
      key: 'module',
      width: 120,
    },
    {
      title: '操作动作',
      dataIndex: 'action',
      key: 'action',
      width: 200,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 140,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => getStatusTag(status),
    },
  ];

  const apiLogColumns = [
    ...logColumns,
    {
      title: '请求方法',
      dataIndex: 'requestMethod',
      key: 'requestMethod',
      width: 100,
      render: (method: string) => (
        <Tag color={
          method === 'GET' ? 'blue' :
          method === 'POST' ? 'green' :
          method === 'PUT' ? 'orange' :
          method === 'DELETE' ? 'red' : 'default'
        }>
          {method}
        </Tag>
      ),
    },
    {
      title: '请求URL',
      dataIndex: 'requestUrl',
      key: 'requestUrl',
      width: 200,
      ellipsis: true,
    },
    {
      title: '耗时(ms)',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration: number) => (
        <Text color={
          duration < 100 ? 'green' :
          duration < 500 ? 'orange' : 'red'
        }>
          {duration}
        </Text>
      ),
    },
  ];

  const stats = {
    configs: configs.length,
    operationLogs: operationLogs.length,
    loginLogs: loginLogs.length,
    apiLogs: apiLogs.length,
    successLogs: [...operationLogs, ...loginLogs, ...apiLogs].filter(l => l.status === 'success').length,
    failLogs: [...operationLogs, ...loginLogs, ...apiLogs].filter(l => l.status === 'fail').length,
  };

  const renderBasicSettings = () => (
    <Row gutter={[16, 16]}>
      {configCards.map(card => (
        <Col xs={24} lg={12} key={card.key}>
          <Card
            title={
              <Space>
                {card.icon}
                <span>{card.title}</span>
              </Space>
            }
            extra={
              <Button type="link" size="small">
                <EditOutlined /> 编辑
              </Button>
            }
          >
            <List
              dataSource={card.items}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text>{item.label}</Text>
                        {item.type === 'switch' ? (
                          <Switch 
                            size="small" 
                            checked={item.value === 'true'}
                            onChange={(checked) => {
                              message.success(`${item.label}已${checked ? '开启' : '关闭'}`);
                            }}
                          />
                        ) : null}
                      </Space>
                    }
                    description={
                      item.type === 'switch' ? null :
                      item.type === 'textarea' ? (
                        <Text type="secondary" ellipsis={{ rows: 2 }}>
                          {item.value}
                        </Text>
                      ) : (
                        <Text>{item.value}</Text>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderLogs = (logs: SystemLog[], columns: any, logType: string) => (
    <Card>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={logs}
        loading={loading}
        pagination={{
          showTotal: (total) => `共 ${total} 条记录`,
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        locale={{
          emptyText: <EmptyState description={`暂无${logType}记录`} />,
        }}
      />
    </Card>
  );

  const tabItems = [
    {
      key: 'basic',
      label: (
        <span>
          <SettingOutlined /> 基础配置
        </span>
      ),
      children: renderBasicSettings(),
    },
    {
      key: 'operation',
      label: (
        <span>
          <FileTextOutlined /> 操作日志
          <Badge count={stats.operationLogs} style={{ marginLeft: 8 }} />
        </span>
      ),
      children: renderLogs(operationLogs, logColumns, '操作'),
    },
    {
      key: 'login',
      label: (
        <span>
          <UserOutlined /> 登录日志
          <Badge count={stats.loginLogs} style={{ marginLeft: 8 }} />
        </span>
      ),
      children: renderLogs(loginLogs, logColumns, '登录'),
    },
    {
      key: 'api',
      label: (
        <span>
          <ApiOutlined /> 接口日志
          <Badge count={stats.apiLogs} style={{ marginLeft: 8 }} />
        </span>
      ),
      children: renderLogs(apiLogs, apiLogColumns, '接口'),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>系统设置</Title>
        <Text type="secondary">管理系统配置和查看日志记录</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="配置项"
              value={stats.configs}
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="操作日志"
              value={stats.operationLogs}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="成功次数"
              value={stats.successLogs}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="失败次数"
              value={stats.failLogs}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 快速操作 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap>
          <Button icon={<SaveOutlined />} onClick={() => message.success('配置已保存')}>
            保存配置
          </Button>
          <Button icon={<DownloadOutlined />} onClick={() => message.success('配置已导出')}>
            导出配置
          </Button>
          <Button icon={<ReloadOutlined />} onClick={loadData}>
            刷新数据
          </Button>
          <Button danger icon={<ExclamationCircleOutlined />} onClick={() => {
            Modal.confirm({
              title: '确认清空日志',
              content: '确定要清空所有日志记录吗？此操作不可恢复。',
              okText: '确认清空',
              okType: 'danger',
              cancelText: '取消',
              onOk() {
                setOperationLogs([]);
                setLoginLogs([]);
                setApiLogs([]);
                message.success('日志已清空');
              },
            });
          }}>
            清空日志
          </Button>
        </Space>
      </Card>

      {/* Tab 内容 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
      />

      {/* 系统信息面板 */}
      <Card 
        title={
          <Space>
            <InfoCircleOutlined />
            系统信息
          </Space>
        }
        style={{ marginTop: 24 }}
      >
        <Row gutter={[32, 16]}>
          <Col xs={24} sm={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="系统名称">Enterprise Admin</Descriptions.Item>
              <Descriptions.Item label="系统版本">1.0.0</Descriptions.Item>
              <Descriptions.Item label="部署环境">Production</Descriptions.Item>
              <Descriptions.Item label="Node.js版本">v18.0.0</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col xs={24} sm={12}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="运行时间">120天 5小时 30分钟</Descriptions.Item>
              <Descriptions.Item label="CPU使用率">23%</Descriptions.Item>
              <Descriptions.Item label="内存使用率">67%</Descriptions.Item>
              <Descriptions.Item label="磁盘使用率">45%</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

const EmptyState: React.FC<{ description: string }> = ({ description }) => (
  <div style={{ padding: '40px 0', textAlign: 'center' }}>
    <Empty 
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<Text type="secondary">{description}</Text>}
    />
  </div>
);

export default Settings;
