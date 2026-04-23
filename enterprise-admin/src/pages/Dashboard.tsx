import React, { useState, useEffect } from 'react';
import { 
  Row, Col, Card, Statistic, Typography, Table, Tag, List, Button, Space, 
  Progress, Calendar, Badge, Tooltip 
} from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarOutlined,
  PlusOutlined,
  RightOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import type { TrendData, DashboardStat } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [orderData, setOrderData] = useState<TrendData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<TrendData[]>([]);
  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // 模拟数据
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    const trend: TrendData[] = months.map((month, i) => ({
      name: month,
      value: 4000 + Math.random() * 2000 + i * 500,
      value2: 2400 + Math.random() * 1500 + i * 300,
    }));
    
    const userGrowth: TrendData[] = months.map((month, i) => ({
      name: month,
      value: 100 + Math.floor(Math.random() * 50) + i * 20,
    }));

    const categories = [
      { name: '电子产品', value: 35 },
      { name: '服装', value: 25 },
      { name: '家居', value: 15 },
      { name: '美妆', value: 12 },
      { name: '食品', value: 8 },
      { name: '其他', value: 5 },
    ];

    setTrendData(trend);
    setOrderData(trend);
    setUserGrowthData(userGrowth);
    setCategoryData(categories);
  }, []);

  const stats: DashboardStat[] = [
    {
      key: 'totalUsers',
      title: '总用户数',
      value: '12,846',
      change: 12.5,
      changeType: 'up',
      icon: <UserOutlined />,
      color: '#1890ff',
    },
    {
      key: 'totalOrders',
      title: '总订单数',
      value: '8,234',
      change: 8.2,
      changeType: 'up',
      icon: <ShoppingCartOutlined />,
      color: '#52c41a',
    },
    {
      key: 'totalProducts',
      title: '商品总数',
      value: '3,456',
      change: -2.1,
      changeType: 'down',
      icon: <ShoppingOutlined />,
      color: '#faad14',
    },
    {
      key: 'totalRevenue',
      title: '总营收',
      value: '¥1,234,567',
      change: 15.8,
      changeType: 'up',
      icon: <DollarOutlined />,
      color: '#722ed1',
    },
  ];

  const quickActions = [
    { key: 'addUser', label: '新增用户', icon: <UserOutlined /> },
    { key: 'addProduct', label: '新增商品', icon: <ShoppingOutlined /> },
    { key: 'addOrder', label: '新建订单', icon: <ShoppingCartOutlined /> },
    { key: 'addArticle', label: '发布文章', icon: <PlusOutlined /> },
  ];

  const todoItems = [
    { id: '1', title: '审核新用户注册申请', status: 'pending', priority: 'high' },
    { id: '2', title: '处理订单退款申请', status: 'pending', priority: 'high' },
    { id: '3', title: '更新商品库存信息', status: 'in_progress', priority: 'medium' },
    { id: '4', title: '发布系统公告', status: 'pending', priority: 'low' },
    { id: '5', title: '导出本月销售报表', status: 'completed', priority: 'low' },
  ];

  const recentOrders = [
    {
      key: '1',
      orderNo: 'ORD20240101001',
      customer: '张三',
      amount: 1299,
      status: 'paid',
      createTime: '2024-01-01 10:30:00',
    },
    {
      key: '2',
      orderNo: 'ORD20240101002',
      customer: '李四',
      amount: 3599,
      status: 'shipped',
      createTime: '2024-01-01 11:20:00',
    },
    {
      key: '3',
      orderNo: 'ORD20240101003',
      customer: '王五',
      amount: 899,
      status: 'completed',
      createTime: '2024-01-01 12:15:00',
    },
    {
      key: '4',
      orderNo: 'ORD20240101004',
      customer: '赵六',
      amount: 2199,
      status: 'pending',
      createTime: '2024-01-01 14:00:00',
    },
    {
      key: '5',
      orderNo: 'ORD20240101005',
      customer: '孙七',
      amount: 5688,
      status: 'refunded',
      createTime: '2024-01-01 15:45:00',
    },
  ];

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { text: string; color: string }> = {
      pending: { text: '待付款', color: 'orange' },
      paid: { text: '已付款', color: 'blue' },
      shipped: { text: '已发货', color: 'purple' },
      completed: { text: '已完成', color: 'green' },
      cancelled: { text: '已取消', color: 'default' },
      refunded: { text: '已退款', color: 'red' },
    };
    const info = statusMap[status] || { text: '未知', color: 'default' };
    return <Tag color={info.color}>{info.text}</Tag>;
  };

  const getTodoPriority = (priority: string) => {
    const map: Record<string, string> = { high: 'red', medium: 'orange', low: 'green' };
    return map[priority] || 'default';
  };

  const COLORS = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#13c2c2'];

  const tableColumns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '客户',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => `¥${value}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>仪表盘</Title>
        <Text type="secondary">欢迎回来，这是您的数据概览</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map(stat => (
          <Col xs={24} sm={12} lg={6} key={stat.key}>
            <Card hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: 14 }}>{stat.title}</Text>
                  <Statistic
                    value={stat.value}
                    prefix={
                      <span style={{ color: stat.changeType === 'up' ? '#52c41a' : '#ff4d4f', fontSize: 14 }}>
                        {stat.changeType === 'up' ? <RiseOutlined /> : <FallOutlined />}
                        {Math.abs(stat.change)}%
                      </span>
                    }
                    style={{ marginTop: 8 }}
                  />
                </div>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 快捷操作 */}
      <Card title="快捷操作" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {quickActions.map(action => (
            <Col xs={12} sm={6} lg={3} key={action.key}>
              <Button 
                type="dashed" 
                icon={action.icon} 
                block
                style={{ height: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <span style={{ fontSize: 24, marginBottom: 4 }}>{action.icon}</span>
                <span>{action.label}</span>
              </Button>
            </Col>
          ))}
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 访问量趋势图 */}
        <Col xs={24} lg={16}>
          <Card 
            title="访问量趋势"
            extra={
              <Button type="link" size="small">
                查看详情 <RightOutlined />
              </Button>
            }
          >
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52c41a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#8c8c8c" />
                  <YAxis stroke="#8c8c8c" />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1890ff" 
                    fillOpacity={1} 
                    fill="url(#colorVisit)"
                    name="页面浏览量"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value2" 
                    stroke="#52c41a" 
                    fillOpacity={1} 
                    fill="url(#colorUser)"
                    name="独立访客"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 商品分类占比 */}
        <Col xs={24} lg={8}>
          <Card title="商品分类占比">
            <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {categoryData.map((item, index) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[index % COLORS.length] }} />
                  <Text type="secondary" style={{ fontSize: 12 }}>{item.name} ({item.value}%)</Text>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* 订单/用户增长图 */}
        <Col xs={24} lg={16}>
          <Card title="订单/用户增长趋势">
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#8c8c8c" />
                  <YAxis stroke="#8c8c8c" />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="value" name="订单数" fill="#1890ff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="value2" name="用户数" fill="#52c41a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* 待办事项 */}
        <Col xs={24} lg={8}>
          <Card 
            title="待办事项"
            extra={
              <Button type="link" size="small">
                全部 <RightOutlined />
              </Button>
            }
          >
            <List
              dataSource={todoItems}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Tag color={getTodoPriority(item.priority)} key="priority">
                      {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        {item.status === 'completed' && <s>{item.title}</s>}
                        {item.status !== 'completed' && <span>{item.title}</span>}
                      </Space>
                    }
                    description={
                      <Tag 
                        color={
                          item.status === 'completed' ? 'success' : 
                          item.status === 'in_progress' ? 'processing' : 'warning'
                        }
                      >
                        {item.status === 'completed' ? '已完成' : 
                         item.status === 'in_progress' ? '进行中' : '待处理'}
                      </Tag>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* 最近订单 */}
      <Card 
        title="最近订单"
        extra={
          <Button type="link" size="small">
            查看全部 <RightOutlined />
          </Button>
        }
      >
        <Table
          columns={tableColumns}
          dataSource={recentOrders}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default Dashboard;
