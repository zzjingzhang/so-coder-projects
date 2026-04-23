import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Select, Tag, Modal, Form, message,
  Popconfirm, Typography, Drawer, Descriptions, Avatar, Tooltip, Empty,
  Divider, Row, Col, Statistic, Upload, Image, Badge, Switch, List,
  InputNumber, Slider
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, DownloadOutlined, FilterOutlined, ShopOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined,
  UploadOutlined, InboxOutlined, ArrowUpOutlined, ArrowDownOutlined,
  PauseCircleOutlined, PlayCircleOutlined
} from '@ant-design/icons';
import type { Product } from '../types';
import { mockProducts } from '../mock';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { Dragger } = Upload;

const categories = ['全部', '电子产品', '服装', '家居', '美妆', '食品', '运动', '图书'];

const Products: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let result = [...products];
    
    if (searchText) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== '全部') {
      result = result.filter(p => p.category === categoryFilter);
    }
    
    if (statusFilter) {
      result = result.filter(p => p.status === statusFilter);
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    setFilteredProducts(result);
  }, [products, searchText, categoryFilter, statusFilter, priceRange]);

  const handleAdd = () => {
    setCurrentProduct(null);
    form.resetFields();
    form.setFieldsValue({ status: 'on', stock: 100 });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Product) => {
    setCurrentProduct(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleView = (record: Product) => {
    setCurrentProduct(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (record: Product) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除商品 "${record.name}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setProducts(products.filter(p => p.id !== record.id));
        message.success('删除成功');
      },
    });
  };

  const handleBatchDelete = () => {
    confirm({
      title: '批量删除确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除选中的 ${selectedRowKeys.length} 个商品吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setProducts(products.filter(p => !selectedRowKeys.includes(p.id)));
        setSelectedRowKeys([]);
        message.success('批量删除成功');
      },
    });
  };

  const handleToggleStatus = (record: Product) => {
    const newStatus = record.status === 'on' ? 'off' : 'on';
    const updatedProducts = products.map(p => 
      p.id === record.id ? { ...p, status: newStatus as 'on' | 'off' } : p
    );
    setProducts(updatedProducts);
    message.success(`商品已${newStatus === 'on' ? '上架' : '下架'}`);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentProduct) {
        const updatedProducts = products.map(p => 
          p.id === currentProduct.id ? { ...p, ...values } : p
        );
        setProducts(updatedProducts);
        message.success('更新成功');
      } else {
        const newProduct: Product = {
          ...values,
          id: (products.length + 1000).toString(),
          images: ['https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now()],
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
        };
        setProducts([newProduct, ...products]);
        message.success('添加成功');
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleReset = () => {
    setSearchText('');
    setCategoryFilter('');
    setStatusFilter('');
    setPriceRange([0, 10000]);
  };

  const getStatusTag = (status: string) => {
    if (status === 'on') {
      return <Tag icon={<CheckCircleOutlined />} color="success">上架</Tag>;
    }
    return <Tag icon={<CloseCircleOutlined />} color="default">下架</Tag>;
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return <Tag color="red">缺货</Tag>;
    }
    if (stock < 100) {
      return <Tag color="orange">库存紧张</Tag>;
    }
    return <Tag color="green">库存充足</Tag>;
  };

  const columns = [
    {
      title: '商品信息',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, record: Product) => (
        <Space>
          <Image
            width={60}
            height={60}
            src={record.images[0] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=product'}
            style={{ borderRadius: 8, objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 500, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {record.name}
            </div>
            <Space style={{ marginTop: 4 }}>
              <Tag color="blue">{record.category}</Tag>
              {getStockStatus(record.stock)}
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: '价格',
      key: 'price',
      render: (_: unknown, record: Product) => (
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#ff4d4f' }}>
            ¥{record.price.toFixed(2)}
          </div>
          {record.originalPrice > record.price && (
            <Text delete type="secondary" style={{ fontSize: 12 }}>
              ¥{record.originalPrice.toFixed(2)}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <div>
          <div style={{ fontWeight: 500 }}>{stock}</div>
          {getStockStatus(stock)}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Product) => (
        <Popconfirm
          title={`确定要${status === 'on' ? '下架' : '上架'}该商品吗？`}
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
      render: (_: unknown, record: Product) => (
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
            title="确定要删除该商品吗？"
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

  const onCount = products.filter(p => p.status === 'on').length;
  const offCount = products.filter(p => p.status === 'off').length;
  const lowStockCount = products.filter(p => p.stock < 100).length;

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ marginBottom: 4 }}>商品管理</Title>
        <Text type="secondary">管理商品信息、库存和上下架状态</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="商品总数"
              value={products.length}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="已上架"
              value={onCount}
              prefix={<PlayCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="已下架"
              value={offCount}
              prefix={<PauseCircleOutlined />}
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="库存紧张"
              value={lowStockCount}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Search
            placeholder="搜索商品名称/描述"
            allowClear
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          <Select
            placeholder="分类筛选"
            allowClear
            style={{ width: 150 }}
            value={categoryFilter || undefined}
            onChange={(value) => setCategoryFilter(value)}
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
          <Select
            placeholder="状态筛选"
            allowClear
            style={{ width: 120 }}
            value={statusFilter || undefined}
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="on">上架</Option>
            <Option value="off">下架</Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={handleReset}>
            重置
          </Button>
        </Space>
        
        <Divider style={{ margin: '16px 0' }} />
        
        <Space wrap size="middle" align="center">
          <Text type="secondary">价格区间:</Text>
          <Slider
            range
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            style={{ width: 300 }}
            tooltip={{ formatter: (value) => `¥${value}` }}
          />
          <Tag color="blue">
            ¥{priceRange[0]} - ¥{priceRange[1]}
          </Tag>
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
              新增商品
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredProducts}
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
            emptyText: <EmptyState description="暂无商品数据" actionText="添加商品" onAction={handleAdd} />,
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentProduct ? '编辑商品' : '新增商品'}
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
            <Col span={16}>
              <Form.Item
                name="name"
                label="商品名称"
                rules={[
                  { required: true, message: '请输入商品名称' },
                  { min: 2, max: 100, message: '商品名称长度为 2-100 个字符' },
                ]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="商品分类"
                rules={[{ required: true, message: '请选择商品分类' }]}
              >
                <Select placeholder="请选择商品分类">
                  {categories.filter(c => c !== '全部').map(cat => (
                    <Option key={cat} value={cat}>{cat}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="price"
                label="销售价格"
                rules={[
                  { required: true, message: '请输入销售价格' },
                  { type: 'number', min: 0, message: '价格不能为负数' },
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  placeholder="请输入销售价格"
                  prefix="¥"
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="originalPrice"
                label="原价"
                rules={[
                  { type: 'number', min: 0, message: '价格不能为负数' },
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  placeholder="请输入原价"
                  prefix="¥"
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stock"
                label="库存数量"
                rules={[
                  { required: true, message: '请输入库存数量' },
                  { type: 'number', min: 0, message: '库存不能为负数' },
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  placeholder="请输入库存数量"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="商品描述"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <Input.TextArea 
              placeholder="请输入商品描述" 
              rows={4}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="status"
            label="上架状态"
            valuePropName="checked"
            rules={[{ required: true, message: '请选择上架状态' }]}
          >
            <Switch 
              checkedChildren="上架" 
              unCheckedChildren="下架"
              checkedValue="on"
              unCheckedValue="off"
            />
          </Form.Item>

          <Divider>商品图片</Divider>
          
          <Form.Item
            name="images"
            label="商品图片"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到这个区域上传</p>
              <p className="ant-upload-hint">
                支持 JPG、PNG、GIF 格式，单张图片不超过 5MB
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title="商品详情"
        width={700}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {currentProduct && (
          <div>
            {/* 商品主图 */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Image.PreviewGroup>
                <Image
                  width={300}
                  height={300}
                  src={currentProduct.images[0] || 'https://api.dicebear.com/7.x/avataaars/svg?seed=product'}
                  style={{ borderRadius: 12, objectFit: 'cover' }}
                />
                {currentProduct.images.slice(1).map((img, idx) => (
                  <Image
                    key={idx}
                    width={60}
                    height={60}
                    src={img}
                    style={{ display: 'none' }}
                  />
                ))}
              </Image.PreviewGroup>
            </div>

            {/* 商品信息 */}
            <Title level={4} style={{ marginBottom: 16 }}>{currentProduct.name}</Title>
            
            <Space wrap style={{ marginBottom: 16 }}>
              <Tag color="blue">{currentProduct.category}</Tag>
              {getStatusTag(currentProduct.status)}
              {getStockStatus(currentProduct.stock)}
            </Space>

            <div style={{ marginBottom: 24 }}>
              <Space align="end">
                <span style={{ fontSize: 28, fontWeight: 600, color: '#ff4d4f' }}>
                  ¥{currentProduct.price.toFixed(2)}
                </span>
                {currentProduct.originalPrice > currentProduct.price && (
                  <Text delete type="secondary" style={{ fontSize: 16 }}>
                    ¥{currentProduct.originalPrice.toFixed(2)}
                  </Text>
                )}
              </Space>
            </div>

            <Divider>基本信息</Divider>
            <Descriptions column={1} bordered size="small">
              <Descriptions.Item label="商品ID">{currentProduct.id}</Descriptions.Item>
              <Descriptions.Item label="商品分类">{currentProduct.category}</Descriptions.Item>
              <Descriptions.Item label="库存数量">
                <Space>
                  {currentProduct.stock}
                  {getStockStatus(currentProduct.stock)}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="上架状态">
                {getStatusTag(currentProduct.status)}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{currentProduct.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{currentProduct.updateTime}</Descriptions.Item>
            </Descriptions>

            <Divider>商品描述</Divider>
            <Card size="small">
              <Text>{currentProduct.description}</Text>
            </Card>

            <Divider>商品图片</Divider>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={currentProduct.images}
              renderItem={item => (
                <List.Item>
                  <Image
                    width={100}
                    height={100}
                    src={item}
                    style={{ borderRadius: 8, objectFit: 'cover' }}
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

export default Products;
