import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Select, Tag, Modal, Form, message,
  Popconfirm, Typography, Drawer, Descriptions, Avatar, Tooltip, Badge,
  Checkbox, Empty, Divider, Row, Col, Statistic
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, DownloadOutlined, FilterOutlined, UserOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import type { User } from '../types';
import { mockUsers, mockRoles } from '../mock';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { confirm } = Modal;

const Users: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let result = [...users];
    
    if (searchText) {
      result = result.filter(u => 
        u.username.toLowerCase().includes(searchText.toLowerCase()) ||
        u.email.toLowerCase().includes(searchText.toLowerCase()) ||
        u.phone.includes(searchText)
      );
    }
    
    if (statusFilter) {
      result = result.filter(u => u.status === statusFilter);
    }
    
    if (roleFilter) {
      result = result.filter(u => u.roleId === roleFilter);
    }
    
    setFilteredUsers(result);
  }, [users, searchText, statusFilter, roleFilter]);

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge 
          status="success" 
          text={<Tag color="success">启用</Tag>}
        />
      );
    }
    return (
      <Badge 
        status="error" 
        text={<Tag color="default">禁用</Tag>}
      />
    );
  };

  const handleAdd = () => {
    setCurrentUser(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active' });
    setIsModalOpen(true);
  };

  const handleEdit = (record: User) => {
    setCurrentUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleView = (record: User) => {
    setCurrentUser(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (record: User) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除用户 "${record.username}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setUsers(users.filter(u => u.id !== record.id));
        message.success('删除成功');
      },
    });
  };

  const handleBatchDelete = () => {
    confirm({
      title: '批量删除确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setUsers(users.filter(u => !selectedRowKeys.includes(u.id)));
        setSelectedRowKeys([]);
        message.success('批量删除成功');
      },
    });
  };

  const handleToggleStatus = (record: User) => {
    const newStatus = record.status === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(u => 
      u.id === record.id ? { ...u, status: newStatus as 'active' | 'inactive' } : u
    );
    setUsers(updatedUsers);
    message.success(`用户已${newStatus === 'active' ? '启用' : '禁用'}`);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentUser) {
        const updatedUsers = users.map(u => 
          u.id === currentUser.id ? { ...u, ...values } : u
        );
        setUsers(updatedUsers);
        message.success('更新成功');
      } else {
        const newUser: User = {
          ...values,
          id: (users.length + 1).toString(),
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
          createTime: new Date().toISOString(),
          lastLoginTime: '-',
        };
        setUsers([newUser, ...users]);
        message.success('添加成功');
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleReset = () => {
    setSearchText('');
    setStatusFilter('');
    setRoleFilter('');
  };

  const columns = [
    {
      title: '用户信息',
      dataIndex: 'username',
      key: 'username',
      render: (_: string, record: User) => (
        <Space>
          <Avatar size={40} icon={<UserOutlined />} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.username}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: User) => (
        <Popconfirm
          title={`确定要${status === 'active' ? '禁用' : '启用'}该用户吗？`}
          onConfirm={() => handleToggleStatus(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>
            {status === 'active' 
              ? <Tag icon={<CheckCircleOutlined />} color="success">启用</Tag>
              : <Tag icon={<CloseCircleOutlined />} color="default">禁用</Tag>
            }
          </a>
        </Popconfirm>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: User) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button 
              type="text" 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除">
              <Button 
                type="text" 
                size="small" 
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const activeCount = users.filter(u => u.status === 'active').length;
  const inactiveCount = users.filter(u => u.status === 'inactive').length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>用户管理</Title>
        <Text type="secondary">管理系统中的所有用户账户</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="总用户数"
              value={users.length}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="活跃用户"
              value={activeCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="禁用用户"
              value={inactiveCount}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="今日新增"
              value={3}
              prefix={<PlusOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Search
            placeholder="搜索用户名/邮箱/手机号"
            allowClear
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="状态筛选"
            allowClear
            style={{ width: 150 }}
            value={statusFilter || undefined}
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="active">启用</Option>
            <Option value="inactive">禁用</Option>
          </Select>
          <Select
            placeholder="角色筛选"
            allowClear
            style={{ width: 150 }}
            value={roleFilter || undefined}
            onChange={(value) => setRoleFilter(value)}
          >
            {mockRoles.map(role => (
              <Option key={role.id} value={role.id}>{role.name}</Option>
            ))}
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
          <Button icon={<FilterOutlined />}>高级筛选</Button>
        </Space>
      </Card>

      {/* 表格区域 */}
      <Card
        extra={
          <Space>
            {selectedRowKeys.length > 0 && (
              <>
                <Text>已选择 {selectedRowKeys.length} 项</Text>
                <Button 
                  danger 
                  onClick={handleBatchDelete}
                  icon={<DeleteOutlined />}
                >
                  批量删除
                </Button>
                <Divider type="vertical" />
              </>
            )}
            <Button icon={<DownloadOutlined />}>导出</Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增用户
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredUsers}
          loading={loading}
          rowSelection={rowSelection}
          pagination={{
            showTotal: (total) => `共 ${total} 条记录`,
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          locale={{
            emptyText: <EmptyState description="暂无用户数据" actionText="添加用户" onAction={handleAdd} />,
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentUser ? '编辑用户' : '新增用户'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
        width={640}
      >
        <Form
          form={form}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[
                  { required: true, message: '请输入用户名' },
                  { min: 2, max: 20, message: '用户名长度为 2-20 个字符' },
                ]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="手机号"
                rules={[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="roleId"
                label="角色"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select placeholder="请选择角色">
                  {mockRoles.map(role => (
                    <Option key={role.id} value={role.id}>{role.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="状态"
                rules={[{ required: true, message: '请选择状态' }]}
              >
                <Select placeholder="请选择状态">
                  <Option value="active">启用</Option>
                  <Option value="inactive">禁用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {!currentUser && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, max: 20, message: '密码长度为 6-20 个字符' },
                  ]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="确认密码"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: '请确认密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="请再次输入密码" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title="用户详情"
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {currentUser && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <Avatar 
                size={100} 
                icon={<UserOutlined />} 
                src={currentUser.avatar}
              />
              <Title level={4} style={{ marginTop: 16, marginBottom: 8 }}>
                {currentUser.username}
              </Title>
              <Tag color={currentUser.status === 'active' ? 'success' : 'default'}>
                {currentUser.status === 'active' ? '启用' : '禁用'}
              </Tag>
            </div>

            <Divider>基本信息</Divider>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="用户ID">{currentUser.id}</Descriptions.Item>
              <Descriptions.Item label="用户名">{currentUser.username}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{currentUser.email}</Descriptions.Item>
              <Descriptions.Item label="手机号">{currentUser.phone}</Descriptions.Item>
              <Descriptions.Item label="角色">
                <Tag color="blue">{currentUser.role}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={currentUser.status === 'active' ? 'success' : 'default'}>
                  {currentUser.status === 'active' ? '启用' : '禁用'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentUser.createTime}</Descriptions.Item>
              <Descriptions.Item label="最后登录">{currentUser.lastLoginTime}</Descriptions.Item>
            </Descriptions>

            <Divider>安全信息</Divider>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="登录设备">
                <Text type="secondary">Chrome / macOS</Text>
              </Descriptions.Item>
              <Descriptions.Item label="登录IP">
                <Text type="secondary">192.168.1.100</Text>
              </Descriptions.Item>
              <Descriptions.Item label="是否绑定手机号">
                <Tag color="success">已绑定</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="是否绑定邮箱">
                <Tag color="success">已绑定</Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider>操作记录</Divider>
            <List
              dataSource={[
                { time: '2024-01-01 10:30:00', action: '登录系统', ip: '192.168.1.100' },
                { time: '2024-01-01 09:00:00', action: '修改个人信息', ip: '192.168.1.100' },
                { time: '2024-01-01 08:30:00', action: '登录系统', ip: '192.168.1.101' },
              ]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.action}
                    description={`${item.time} | IP: ${item.ip}`}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Drawer>
    </div>
  );
};

const EmptyState: React.FC<{ description: string; actionText: string; onAction: () => void }> = ({
  description,
  actionText,
  onAction,
}) => (
  <div style={{ padding: '40px 0', textAlign: 'center' }}>
    <Empty 
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={<Text type="secondary">{description}</Text>}
    >
      <Button type="primary" icon={<PlusOutlined />} onClick={onAction}>
        {actionText}
      </Button>
    </Empty>
  </div>
);

export default Users;
