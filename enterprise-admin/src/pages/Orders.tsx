import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Select, Tag, Modal, Form, message,
  Popconfirm, Typography, Drawer, Descriptions, Avatar, Tooltip, Empty,
  Divider, Row, Col, Statistic, Timeline, DatePicker, List,
  InputNumber, Steps, Result
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, DownloadOutlined, FilterOutlined, ShoppingCartOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined,
  InboxOutlined, TruckOutlined, SwapOutlined, FileTextOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import type { Order, OrderItem, Logistics } from '../types';
import { mockOrders } from '../mock';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { RangePicker } = DatePicker;

const orderStatusMap: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
  pending: { text: '待付款', color: 'orange', icon: <ClockCircleOutlined /> },
  paid: { text: '已付款', color: 'blue', icon: <CheckCircleOutlined /> },
  shipped: { text: '已发货', color: 'purple', icon: <TruckOutlined /> },
  completed: { text: '已完成', color: 'green', icon: <CheckCircleOutlined /> },
  cancelled: { text: '已取消', color: 'default', icon: <CloseCircleOutlined /> },
  refunded: { text: '已退款', color: 'red', icon: <SwapOutlined /> },
};

const Orders: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let result = [...orders];
    
    if (searchText) {
      result = result.filter(o => 
        o.orderNo.toLowerCase().includes(searchText.toLowerCase()) ||
        o.username.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (statusFilter) {
      result = result.filter(o => o.status === statusFilter);
    }
    
    setFilteredOrders(result);
  }, [orders, searchText, statusFilter, dateRange]);

  const handleView = (record: Order) => {
    setCurrentOrder(record);
    setIsDrawerOpen(true);
  };

  const handleShip = (record: Order) => {
    confirm({
      title: '确认发货',
      icon: <ExclamationCircleOutlined />,
      content: `确定要对订单 "${record.orderNo}" 进行发货操作吗？`,
      okText: '确认发货',
      okType: 'primary',
      cancelText: '取消',
      onOk() {
        const updatedOrders = orders.map(o => 
          o.id === record.id ? { ...o, status: 'shipped' as const } : o
        );
        setOrders(updatedOrders);
        message.success('发货成功');
      },
    });
  };

  const handleRefund = (record: Order) => {
    confirm({
      title: '确认退款',
      icon: <ExclamationCircleOutlined />,
      content: `确定要对订单 "${record.orderNo}" 进行退款操作吗？此操作不可恢复。`,
      okText: '确认退款',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const updatedOrders = orders.map(o => 
          o.id === record.id ? { ...o, status: 'refunded' as const } : o
        );
        setOrders(updatedOrders);
        message.success('退款成功');
      },
    });
  };

  const handleExport = () => {
    message.info('正在导出订单数据...');
    setTimeout(() => {
      message.success('订单导出成功');
    }, 1500);
  };

  const handleReset = () => {
    setSearchText('');
    setStatusFilter('');
    setDateRange(null);
  };

  const getStatusTag = (status: string) => {
    const info = orderStatusMap[status] || { text: '未知', color: 'default', icon: <ExclamationCircleOutlined /> };
    return (
      <Tag icon={info.icon} color={info.color}>
        {info.text}
      </Tag>
    );
  };

  const getOrderSteps = (order: Order) => {
    const steps = [
      { title: '创建订单', description: order.createTime },
    ];
    
    if (order.payTime) {
      steps.push({ title: '支付成功', description: order.payTime });
    }
    
    if (order.shipTime) {
      steps.push({ title: '商品发货', description: order.shipTime });
    }
    
    if (order.completeTime) {
      steps.push({ title: '订单完成', description: order.completeTime });
    }
    
    return steps;
  };

  const columns = [
    {
      title: '订单信息',
      key: 'orderInfo',
      render: (_: unknown, record: Order) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.orderNo}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.createTime}
          </Text>
        </div>
      ),
    },
    {
      title: '客户信息',
      key: 'customerInfo',
      render: (_: unknown, record: Order) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.username}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.address?.phone || '-'}
          </Text>
        </div>
      ),
    },
    {
      title: '订单金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <div style={{ fontSize: 16, fontWeight: 600, color: '#ff4d4f' }}>
          ¥{amount.toFixed(2)}
        </div>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime',
      render: (payTime: string) => payTime || '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: unknown, record: Order) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          
          {record.status === 'paid' && (
            <Tooltip title="发货">
              <Button 
                type="text" 
                size="small" 
                icon={<TruckOutlined />}
                onClick={() => handleShip(record)}
              >
                发货
              </Button>
            </Tooltip>
          )}
          
          {['paid', 'shipped'].includes(record.status) && (
            <Popconfirm
              title="确定要对该订单进行退款吗？"
              onConfirm={() => handleRefund(record)}
              okText="确定"
              cancelText="取消"
            >
              <Tooltip title="退款">
                <Button 
                  type="text" 
                  size="small" 
                  danger
                  icon={<SwapOutlined />}
                >
                  退款
                </Button>
              </Tooltip>
            </Popconfirm>
          )}
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

  const statusCounts = {
    pending: orders.filter(o => o.status === 'pending').length,
    paid: orders.filter(o => o.status === 'paid').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    total: orders.reduce((sum, o) => sum + o.totalAmount, 0),
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>订单管理</Title>
        <Text type="secondary">管理订单信息、发货和退款操作</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="订单总数"
              value={orders.length}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="待付款"
              value={statusCounts.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="待发货"
              value={statusCounts.paid}
              prefix={<InboxOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="总销售额"
              value={statusCounts.total}
              precision={2}
              prefix="¥"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Search
            placeholder="搜索订单号/用户名"
            allowClear
            style={{ width: 280 }}
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
            {Object.entries(orderStatusMap).map(([key, value]) => (
              <Option key={key} value={key}>{value.text}</Option>
            ))}
          </Select>
          <RangePicker
            style={{ width: 280 }}
            placeholder={['开始日期', '结束日期']}
            onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
          />
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>
      </Card>

      {/* 表格区域 */}
      <Card
        extra={
          <Space>
            {selectedRowKeys.length > 0 && (
              <>
                <Text>已选择 {selectedRowKeys.length} 项</Text>
                <Divider type="vertical" />
              </>
            )}
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              导出订单
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredOrders}
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
            emptyText: <EmptyState description="暂无订单数据" />,
          }}
        />
      </Card>

      {/* 详情抽屉 */}
      <Drawer
        title="订单详情"
        width={800}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {currentOrder && (
          <div>
            {/* 订单状态 */}
            <Card style={{ marginBottom: 24 }}>
              <Steps
                current={
                  currentOrder.status === 'pending' ? 0 :
                  currentOrder.status === 'paid' ? 1 :
                  currentOrder.status === 'shipped' ? 2 : 3
                }
                items={[
                  { title: '创建订单', description: currentOrder.createTime },
                  { title: '支付成功', description: currentOrder.payTime || '-' },
                  { title: '商品发货', description: currentOrder.shipTime || '-' },
                  { title: '订单完成', description: currentOrder.completeTime || '-' },
                ]}
              />
            </Card>

            {/* 订单信息 */}
            <Title level={5} style={{ marginBottom: 16 }}>订单信息</Title>
            <Descriptions column={2} bordered size="small" style={{ marginBottom: 24 }}>
              <Descriptions.Item label="订单号">{currentOrder.orderNo}</Descriptions.Item>
              <Descriptions.Item label="订单状态">{getStatusTag(currentOrder.status)}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentOrder.createTime}</Descriptions.Item>
              <Descriptions.Item label="支付时间">{currentOrder.payTime || '-'}</Descriptions.Item>
              <Descriptions.Item label="发货时间">{currentOrder.shipTime || '-'}</Descriptions.Item>
              <Descriptions.Item label="完成时间">{currentOrder.completeTime || '-'}</Descriptions.Item>
            </Descriptions>

            {/* 收货地址 */}
            {currentOrder.address && (
              <>
                <Title level={5} style={{ marginBottom: 16 }}>收货地址</Title>
                <Card size="small" style={{ marginBottom: 24 }}>
                  <div>
                    <div style={{ fontWeight: 500, marginBottom: 8 }}>
                      {currentOrder.address.name} {currentOrder.address.phone}
                    </div>
                    <Text type="secondary">
                      {currentOrder.address.province} {currentOrder.address.city} {currentOrder.address.district} {currentOrder.address.detail}
                    </Text>
                  </div>
                </Card>
              </>
            )}

            {/* 商品列表 */}
            <Title level={5} style={{ marginBottom: 16 }}>商品列表</Title>
            <List
              dataSource={currentOrder.items}
              renderItem={(item: OrderItem) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        shape="square" 
                        size={64} 
                        src={item.productImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=product'}
                      />
                    }
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{item.productName}</span>
                        <span style={{ color: '#ff4d4f', fontWeight: 600 }}>
                          ¥{item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    }
                    description={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text type="secondary">单价: ¥{item.price.toFixed(2)}</Text>
                        <Text type="secondary">数量: x{item.quantity}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
              style={{ marginBottom: 24 }}
            />

            {/* 订单金额 */}
            <Card size="small" style={{ marginBottom: 24 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary">商品金额: </Text>
                  <Text>¥{currentOrder.totalAmount.toFixed(2)}</Text>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary">运费: </Text>
                  <Text>¥0.00</Text>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary">优惠: </Text>
                  <Text>¥0.00</Text>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <div>
                  <Text type="secondary" style={{ fontSize: 16 }}>实付金额: </Text>
                  <Text style={{ fontSize: 20, fontWeight: 600, color: '#ff4d4f' }}>
                    ¥{currentOrder.totalAmount.toFixed(2)}
                  </Text>
                </div>
              </div>
            </Card>

            {/* 物流信息 */}
            {currentOrder.logistics && currentOrder.logistics.length > 0 && (
              <>
                <Title level={5} style={{ marginBottom: 16 }}>物流信息</Title>
                {currentOrder.logistics.map((logistics: Logistics, idx: number) => (
                  <Card key={idx} size="small" style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <Space>
                        <TruckOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                        <div>
                          <div style={{ fontWeight: 500 }}>{logistics.courier}</div>
                          <Text type="secondary">运单号: {logistics.trackingNo}</Text>
                        </div>
                      </Space>
                      {getStatusTag(currentOrder.status)}
                    </div>
                    
                    <Timeline
                      items={logistics.traces.map((trace, i) => ({
                        color: i === 0 ? 'blue' : 'gray',
                        children: (
                          <div>
                            <div style={{ fontWeight: i === 0 ? 500 : 'normal' }}>{trace.description}</div>
                            <Text type="secondary" style={{ fontSize: 12 }}>{trace.time}</Text>
                          </div>
                        ),
                      }))}
                    />
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </Drawer>
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

export default Orders;
