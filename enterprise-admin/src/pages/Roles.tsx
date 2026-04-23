import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Tag, Modal, Form, message,
  Popconfirm, Typography, Drawer, Descriptions, Tooltip, Empty,
  Divider, Row, Col, Tree, Switch, Checkbox, Tabs, Statistic
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, TeamOutlined, LockOutlined, MenuOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';
import type { Role, Permission } from '../types';
import { mockRoles } from '../mock';

const { Title, Text } = Typography;
const { Search } = Input;
const { confirm } = Modal;
const { DirectoryTree } = Tree;
const { TabPane } = Tabs;

const menuPermissions: Permission[] = [
  {
    id: '1',
    name: '仪表盘',
    code: 'dashboard',
    type: 'menu',
    parentId: null,
    path: '/',
    icon: 'DashboardOutlined',
    children: [
      {
        id: '1-1',
        name: '查看仪表盘',
        code: 'dashboard:view',
        type: 'button',
        parentId: '1',
      },
      {
        id: '1-2',
        name: '导出报表',
        code: 'dashboard:export',
        type: 'button',
        parentId: '1',
      },
    ],
  },
  {
    id: '2',
    name: '用户管理',
    code: 'users',
    type: 'menu',
    parentId: null,
    path: '/users',
    icon: 'UserOutlined',
    children: [
      {
        id: '2-1',
        name: '查看用户',
        code: 'users:view',
        type: 'button',
        parentId: '2',
      },
      {
        id: '2-2',
        name: '新增用户',
        code: 'users:add',
        type: 'button',
        parentId: '2',
      },
      {
        id: '2-3',
        name: '编辑用户',
        code: 'users:edit',
        type: 'button',
        parentId: '2',
      },
      {
        id: '2-4',
        name: '删除用户',
        code: 'users:delete',
        type: 'button',
        parentId: '2',
      },
      {
        id: '2-5',
        name: '分配角色',
        code: 'users:assignRole',
        type: 'button',
        parentId: '2',
      },
    ],
  },
  {
    id: '3',
    name: '角色权限',
    code: 'roles',
    type: 'menu',
    parentId: null,
    path: '/roles',
    icon: 'TeamOutlined',
    children: [
      {
        id: '3-1',
        name: '查看角色',
        code: 'roles:view',
        type: 'button',
        parentId: '3',
      },
      {
        id: '3-2',
        name: '新增角色',
        code: 'roles:add',
        type: 'button',
        parentId: '3',
      },
      {
        id: '3-3',
        name: '编辑角色',
        code: 'roles:edit',
        type: 'button',
        parentId: '3',
      },
      {
        id: '3-4',
        name: '删除角色',
        code: 'roles:delete',
        type: 'button',
        parentId: '3',
      },
    ],
  },
  {
    id: '4',
    name: '商品管理',
    code: 'products',
    type: 'menu',
    parentId: null,
    path: '/products',
    icon: 'ShopOutlined',
    children: [
      {
        id: '4-1',
        name: '查看商品',
        code: 'products:view',
        type: 'button',
        parentId: '4',
      },
      {
        id: '4-2',
        name: '新增商品',
        code: 'products:add',
        type: 'button',
        parentId: '4',
      },
      {
        id: '4-3',
        name: '编辑商品',
        code: 'products:edit',
        type: 'button',
        parentId: '4',
      },
      {
        id: '4-4',
        name: '删除商品',
        code: 'products:delete',
        type: 'button',
        parentId: '4',
      },
      {
        id: '4-5',
        name: '上下架',
        code: 'products:toggle',
        type: 'button',
        parentId: '4',
      },
    ],
  },
  {
    id: '5',
    name: '订单管理',
    code: 'orders',
    type: 'menu',
    parentId: null,
    path: '/orders',
    icon: 'ShoppingCartOutlined',
    children: [
      {
        id: '5-1',
        name: '查看订单',
        code: 'orders:view',
        type: 'button',
        parentId: '5',
      },
      {
        id: '5-2',
        name: '发货',
        code: 'orders:ship',
        type: 'button',
        parentId: '5',
      },
      {
        id: '5-3',
        name: '退款',
        code: 'orders:refund',
        type: 'button',
        parentId: '5',
      },
      {
        id: '5-4',
        name: '导出订单',
        code: 'orders:export',
        type: 'button',
        parentId: '5',
      },
    ],
  },
  {
    id: '6',
    name: '内容管理',
    code: 'content',
    type: 'menu',
    parentId: null,
    path: '/content',
    icon: 'FileTextOutlined',
    children: [
      {
        id: '6-1',
        name: '查看内容',
        code: 'content:view',
        type: 'button',
        parentId: '6',
      },
      {
        id: '6-2',
        name: '新增内容',
        code: 'content:add',
        type: 'button',
        parentId: '6',
      },
      {
        id: '6-3',
        name: '编辑内容',
        code: 'content:edit',
        type: 'button',
        parentId: '6',
      },
      {
        id: '6-4',
        name: '删除内容',
        code: 'content:delete',
        type: 'button',
        parentId: '6',
      },
      {
        id: '6-5',
        name: '发布内容',
        code: 'content:publish',
        type: 'button',
        parentId: '6',
      },
    ],
  },
  {
    id: '7',
    name: '系统设置',
    code: 'settings',
    type: 'menu',
    parentId: null,
    path: '/settings',
    icon: 'SettingOutlined',
    children: [
      {
        id: '7-1',
        name: '查看设置',
        code: 'settings:view',
        type: 'button',
        parentId: '7',
      },
      {
        id: '7-2',
        name: '修改设置',
        code: 'settings:edit',
        type: 'button',
        parentId: '7',
      },
      {
        id: '7-3',
        name: '查看日志',
        code: 'settings:logs',
        type: 'button',
        parentId: '7',
      },
    ],
  },
];

const Roles: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState('menu');
  const [checkedMenuKeys, setCheckedMenuKeys] = useState<React.Key[]>([]);
  const [checkedButtonKeys, setCheckedButtonKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    setLoading(true);
    setTimeout(() => {
      setRoles(mockRoles);
      setFilteredRoles(mockRoles);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let result = [...roles];
    
    if (searchText) {
      result = result.filter(r => 
        r.name.toLowerCase().includes(searchText.toLowerCase()) ||
        r.code.toLowerCase().includes(searchText.toLowerCase()) ||
        r.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (statusFilter) {
      result = result.filter(r => r.status === statusFilter);
    }
    
    setFilteredRoles(result);
  }, [roles, searchText, statusFilter]);

  const handleAdd = () => {
    setCurrentRole(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active' });
    setCheckedMenuKeys([]);
    setCheckedButtonKeys([]);
    setIsModalOpen(true);
  };

  const handleEdit = (record: Role) => {
    setCurrentRole(record);
    form.setFieldsValue(record);
    setCheckedMenuKeys(record.menuPermissions);
    setCheckedButtonKeys(record.buttonPermissions);
    setIsModalOpen(true);
  };

  const handleView = (record: Role) => {
    setCurrentRole(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (record: Role) => {
    if (record.code === 'admin') {
      message.error('超级管理员角色不可删除');
      return;
    }
    
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除角色 "${record.name}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setRoles(roles.filter(r => r.id !== record.id));
        message.success('删除成功');
      },
    });
  };

  const handleToggleStatus = (record: Role) => {
    if (record.code === 'admin') {
      message.error('超级管理员角色不可禁用');
      return;
    }
    
    const newStatus = record.status === 'active' ? 'inactive' : 'active';
    const updatedRoles = roles.map(r => 
      r.id === record.id ? { ...r, status: newStatus as 'active' | 'inactive' } : r
    );
    setRoles(updatedRoles);
    message.success(`角色已${newStatus === 'active' ? '启用' : '禁用'}`);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentRole) {
        const updatedRoles = roles.map(r => 
          r.id === currentRole.id ? { 
            ...r, 
            ...values,
            menuPermissions: checkedMenuKeys as string[],
            buttonPermissions: checkedButtonKeys as string[],
            permissions: [...checkedMenuKeys, ...checkedButtonKeys] as string[],
          } : r
        );
        setRoles(updatedRoles);
        message.success('更新成功');
      } else {
        const newRole: Role = {
          ...values,
          id: (roles.length + 1).toString(),
          menuPermissions: checkedMenuKeys as string[],
          buttonPermissions: checkedButtonKeys as string[],
          permissions: [...checkedMenuKeys, ...checkedButtonKeys] as string[],
          createTime: new Date().toISOString(),
        };
        setRoles([...roles, newRole]);
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
  };

  const onCheckMenu = (checked: any) => {
    setCheckedMenuKeys(checked.checked);
  };

  const onCheckButton = (checked: any) => {
    setCheckedButtonKeys(checked.checked);
  };

  const getStatusTag = (status: string) => {
    if (status === 'active') {
      return <Tag color="success">启用</Tag>;
    }
    return <Tag color="default">禁用</Tag>;
  };

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Role) => (
        <Space>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: record.code === 'admin' ? '#ff4d4f15' : '#1890ff15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: record.code === 'admin' ? '#ff4d4f' : '#1890ff',
            }}
          >
            <TeamOutlined />
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.code}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '权限数量',
      key: 'permissionCount',
      render: (_: unknown, record: Role) => (
        <Space>
          <Tag color="blue">菜单: {record.menuPermissions.length}</Tag>
          <Tag color="purple">按钮: {record.buttonPermissions.length}</Tag>
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Role) => (
        <Popconfirm
          title={`确定要${status === 'active' ? '禁用' : '启用'}该角色吗？`}
          onConfirm={() => handleToggleStatus(record)}
          okText="确定"
          cancelText="取消"
        >
          <a>{getStatusTag(status)}</a>
        </Popconfirm>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: Role) => (
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
          {record.code !== 'admin' && (
            <Popconfirm
              title="确定要删除该角色吗？"
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
          )}
        </Space>
      ),
    },
  ];

  const activeCount = roles.filter(r => r.status === 'active').length;
  const totalPermissions = roles.reduce((sum, r) => sum + r.permissions.length, 0);

  const convertToTreeData = (permissions: Permission[], type: 'menu' | 'button') => {
    return permissions.map(p => {
      const children = p.children?.filter(c => c.type === type).map(c => ({
        title: c.name,
        key: c.code,
      }));

      return {
        title: p.name,
        key: p.code,
        children: children?.length ? children : undefined,
      };
    });
  };

  const menuTreeData = convertToTreeData(menuPermissions, 'menu');
  const buttonTreeData = convertToTreeData(menuPermissions, 'button');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>角色权限管理</Title>
        <Text type="secondary">管理系统角色和权限配置</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="总角色数"
              value={roles.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="活跃角色"
              value={activeCount}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="总权限数"
              value={totalPermissions}
              prefix={<LockOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="菜单项"
              value={menuPermissions.length}
              prefix={<MenuOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Search
            placeholder="搜索角色名称/编码/描述"
            allowClear
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Space>
            <Text type="secondary">状态:</Text>
            <Switch
              checked={statusFilter === 'active'}
              onChange={(checked) => setStatusFilter(checked ? 'active' : '')}
              checkedChildren="启用"
              unCheckedChildren="全部"
            />
          </Space>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </Card>

      {/* 表格区域 */}
      <Card
        extra={
          <Space>
            <Button icon={<SettingOutlined />}>权限预览</Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              新增角色
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredRoles}
          loading={loading}
          pagination={{
            showTotal: (total) => `共 ${total} 条记录`,
            showSizeChanger: true,
            showQuickJumper: true,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50'],
          }}
          locale={{
            emptyText: <EmptyState description="暂无角色数据" actionText="添加角色" onAction={handleAdd} />,
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentRole ? '编辑角色' : '新增角色'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="确定"
        cancelText="取消"
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          size="large"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="角色名称"
                rules={[
                  { required: true, message: '请输入角色名称' },
                  { min: 2, max: 20, message: '角色名称长度为 2-20 个字符' },
                ]}
              >
                <Input placeholder="请输入角色名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="code"
                label="角色编码"
                rules={[
                  { required: true, message: '请输入角色编码' },
                  { pattern: /^[a-zA-Z_]+$/, message: '角色编码只能包含字母和下划线' },
                ]}
              >
                <Input placeholder="请输入角色编码，如: admin" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="角色描述"
                rules={[{ required: true, message: '请输入角色描述' }]}
              >
                <Input.TextArea 
                  placeholder="请输入角色描述" 
                  rows={3}
                  maxLength={200}
                  showCount
                />
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
                  <Select.Option value="active">启用</Select.Option>
                  <Select.Option value="inactive">禁用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider>权限配置</Divider>
          
          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab}
            items={[
              {
                key: 'menu',
                label: (
                  <span>
                    <MenuOutlined /> 菜单权限
                  </span>
                ),
                children: (
                  <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 16, maxHeight: 400, overflow: 'auto' }}>
                    <Checkbox.Group
                      options={menuTreeData}
                      value={checkedMenuKeys}
                      onChange={onCheckMenu}
                    />
                  </div>
                ),
              },
              {
                key: 'button',
                label: (
                  <span>
                    <SettingOutlined /> 按钮权限
                  </span>
                ),
                children: (
                  <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 16, maxHeight: 400, overflow: 'auto' }}>
                    <Checkbox.Group
                      options={buttonTreeData}
                      value={checkedButtonKeys}
                      onChange={onCheckButton}
                    />
                  </div>
                ),
              },
            ]}
          />

          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Text type="secondary">
              已选择 <Tag color="blue">{checkedMenuKeys.length}</Tag> 个菜单权限，
              <Tag color="purple">{checkedButtonKeys.length}</Tag> 个按钮权限
            </Text>
          </div>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title="角色详情"
        width={600}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {currentRole && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  background: currentRole.code === 'admin' ? '#ff4d4f15' : '#1890ff15',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  color: currentRole.code === 'admin' ? '#ff4d4f' : '#1890ff',
                  margin: '0 auto 16px',
                }}
              >
                <TeamOutlined />
              </div>
              <Title level={4} style={{ marginBottom: 8 }}>
                {currentRole.name}
              </Title>
              <Space>
                <Tag color="blue">{currentRole.code}</Tag>
                {getStatusTag(currentRole.status)}
              </Space>
            </div>

            <Divider>基本信息</Divider>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="角色ID">{currentRole.id}</Descriptions.Item>
              <Descriptions.Item label="角色名称">{currentRole.name}</Descriptions.Item>
              <Descriptions.Item label="角色编码">
                <Tag color="blue">{currentRole.code}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="角色描述">{currentRole.description}</Descriptions.Item>
              <Descriptions.Item label="状态">
                {getStatusTag(currentRole.status)}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentRole.createTime}</Descriptions.Item>
            </Descriptions>

            <Divider>权限信息</Divider>
            
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="菜单权限" extra={
                  <Tag color="blue">{currentRole.menuPermissions.length} 个</Tag>
                }>
                  {currentRole.menuPermissions.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {currentRole.menuPermissions.map(perm => (
                        <Tag key={perm} color="blue">{perm}</Tag>
                      ))}
                    </div>
                  ) : (
                    <Text type="secondary">暂无菜单权限</Text>
                  )}
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="按钮权限" extra={
                  <Tag color="purple">{currentRole.buttonPermissions.length} 个</Tag>
                }>
                  {currentRole.buttonPermissions.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {currentRole.buttonPermissions.map(perm => (
                        <Tag key={perm} color="purple">{perm}</Tag>
                      ))}
                    </div>
                  ) : (
                    <Text type="secondary">暂无按钮权限</Text>
                  )}
                </Card>
              </Col>
            </Row>
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

export default Roles;
