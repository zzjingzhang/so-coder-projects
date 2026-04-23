import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Space, Input, Select, Tag, Modal, Form, message,
  Popconfirm, Typography, Drawer, Descriptions, Tooltip, Empty,
  Divider, Row, Col, Statistic, DatePicker, Upload, Image,
  Switch, Radio, Input as AntInput
} from 'antd';
import {
  PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  ReloadOutlined, DownloadOutlined, FilterOutlined, FileTextOutlined,
  ExclamationCircleOutlined, CheckCircleOutlined, CloseCircleOutlined,
  UploadOutlined, InboxOutlined, EyeInvisibleOutlined, ScheduleOutlined,
  SendOutlined, SaveOutlined
} from '@ant-design/icons';
import type { Article } from '../types';
import { mockArticles } from '../mock';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const { Dragger } = Upload;

const categories = ['全部', '公告', '新闻', '活动', '帮助', '其他'];
const articleStatusMap: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
  draft: { text: '草稿', color: 'default', icon: <SaveOutlined /> },
  published: { text: '已发布', color: 'green', icon: <SendOutlined /> },
  scheduled: { text: '定时发布', color: 'orange', icon: <ScheduleOutlined /> },
};

const Content: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    setLoading(true);
    setTimeout(() => {
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    let result = [...articles];
    
    if (searchText) {
      result = result.filter(a => 
        a.title.toLowerCase().includes(searchText.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchText.toLowerCase()) ||
        a.author.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (categoryFilter && categoryFilter !== '全部') {
      result = result.filter(a => a.category === categoryFilter);
    }
    
    if (statusFilter) {
      result = result.filter(a => a.status === statusFilter);
    }
    
    setFilteredArticles(result);
  }, [articles, searchText, categoryFilter, statusFilter]);

  const handleAdd = () => {
    setCurrentArticle(null);
    form.resetFields();
    form.setFieldsValue({ status: 'draft', category: '公告' });
    setIsModalOpen(true);
  };

  const handleEdit = (record: Article) => {
    setCurrentArticle(record);
    form.setFieldsValue({
      ...record,
      scheduledTime: record.scheduledTime ? dayjs(record.scheduledTime) : undefined,
    });
    setIsModalOpen(true);
  };

  const handleView = (record: Article) => {
    setCurrentArticle(record);
    setIsDrawerOpen(true);
  };

  const handleDelete = (record: Article) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除文章 "${record.title}" 吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setArticles(articles.filter(a => a.id !== record.id));
        message.success('删除成功');
      },
    });
  };

  const handleBatchDelete = () => {
    confirm({
      title: '批量删除确认',
      icon: <ExclamationCircleOutlined />,
      content: `确定要删除选中的 ${selectedRowKeys.length} 篇文章吗？此操作不可恢复。`,
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setArticles(articles.filter(a => !selectedRowKeys.includes(a.id)));
        setSelectedRowKeys([]);
        message.success('批量删除成功');
      },
    });
  };

  const handlePublish = (record: Article) => {
    const updatedArticles = articles.map(a => 
      a.id === record.id ? { 
        ...a, 
        status: 'published' as const, 
        publishTime: new Date().toISOString() 
      } : a
    );
    setArticles(updatedArticles);
    message.success('文章发布成功');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentArticle) {
        const updatedArticles = articles.map(a => 
          a.id === currentArticle.id ? { 
            ...a, 
            ...values,
            scheduledTime: values.scheduledTime?.toISOString(),
            updateTime: new Date().toISOString(),
          } : a
        );
        setArticles(updatedArticles);
        message.success('更新成功');
      } else {
        const newArticle: Article = {
          ...values,
          id: (articles.length + 1).toString(),
          viewCount: 0,
          cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
          createTime: new Date().toISOString(),
          updateTime: new Date().toISOString(),
          scheduledTime: values.scheduledTime?.toISOString(),
        };
        setArticles([newArticle, ...articles]);
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
  };

  const getStatusTag = (status: string) => {
    const info = articleStatusMap[status] || { text: '未知', color: 'default', icon: <ExclamationCircleOutlined /> };
    return (
      <Tag icon={info.icon} color={info.color}>
        {info.text}
      </Tag>
    );
  };

  const columns = [
    {
      title: '文章信息',
      key: 'articleInfo',
      render: (_: unknown, record: Article) => (
        <Space>
          <Image
            width={60}
            height={40}
            src={record.cover || 'https://api.dicebear.com/7.x/avataaars/svg?seed=article'}
            style={{ borderRadius: 4, objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 500, maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {record.title}
            </div>
            <Space style={{ marginTop: 4 }}>
              <Tag color="blue">{record.category}</Tag>
              {getStatusTag(record.status)}
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <Space wrap size={4}>
          {tags?.slice(0, 3).map((tag, idx) => (
            <Tag key={idx} color="purple">{tag}</Tag>
          ))}
          {tags?.length > 3 && (
            <Tag color="default">+{tags.length - 3}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      render: (count: number) => (
        <div>
          <EyeOutlined style={{ marginRight: 4 }} />
          {count}
        </div>
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
      width: 250,
      render: (_: unknown, record: Article) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button 
              type="text" 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          
          {record.status === 'draft' && (
            <Tooltip title="编辑">
              <Button 
                type="text" 
                size="small" 
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
            </Tooltip>
          )}
          
          {record.status === 'draft' && (
            <Popconfirm
              title="确定要发布这篇文章吗？"
              onConfirm={() => handlePublish(record)}
              okText="确定"
              cancelText="取消"
            >
              <Tooltip title="发布">
                <Button 
                  type="text" 
                  size="small" 
                  icon={<SendOutlined />}
                >
                  发布
                </Button>
              </Tooltip>
            </Popconfirm>
          )}
          
          <Popconfirm
            title="确定要删除这篇文章吗？"
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

  const statusCounts = {
    draft: articles.filter(a => a.status === 'draft').length,
    published: articles.filter(a => a.status === 'published').length,
    scheduled: articles.filter(a => a.status === 'scheduled').length,
    totalViews: articles.reduce((sum, a) => sum + a.viewCount, 0),
  };

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
        <Title level={4} style={{ marginBottom: 4 }}>内容管理</Title>
        <Text type="secondary">管理文章、公告和内容发布</Text>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="文章总数"
              value={articles.length}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="已发布"
              value={statusCounts.published}
              prefix={<SendOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="草稿"
              value={statusCounts.draft}
              prefix={<SaveOutlined />}
              valueStyle={{ color: '#8c8c8c' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card size="small">
            <Statistic
              title="总浏览量"
              value={statusCounts.totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Space wrap size="middle">
          <Search
            placeholder="搜索标题/摘要/作者"
            allowClear
            style={{ width: 280 }}
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
            style={{ width: 150 }}
            value={statusFilter || undefined}
            onChange={(value) => setStatusFilter(value)}
          >
            {Object.entries(articleStatusMap).map(([key, value]) => (
              <Option key={key} value={key}>{value.text}</Option>
            ))}
          </Select>
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
              新建文章
            </Button>
          </Space>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredArticles}
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
            emptyText: <EmptyState description="暂无文章数据" actionText="新建文章" onAction={handleAdd} />,
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={currentArticle ? '编辑文章' : '新建文章'}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="保存"
        cancelText="取消"
        width={900}
      >
        <Form
          form={form}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[
              { required: true, message: '请输入文章标题' },
              { min: 5, max: 200, message: '标题长度为 5-200 个字符' },
            ]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="文章分类"
                rules={[{ required: true, message: '请选择文章分类' }]}
              >
                <Select placeholder="请选择文章分类">
                  {categories.filter(c => c !== '全部').map(cat => (
                    <Option key={cat} value={cat}>{cat}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="发布状态"
                rules={[{ required: true, message: '请选择发布状态' }]}
              >
                <Radio.Group>
                  <Radio.Button value="draft">保存草稿</Radio.Button>
                  <Radio.Button value="published">立即发布</Radio.Button>
                  <Radio.Button value="scheduled">定时发布</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="scheduledTime"
            label="定时发布时间"
            dependencies={['status']}
            rules={[
              ({ getFieldValue }) => ({
                required: getFieldValue('status') === 'scheduled',
                message: '请选择定时发布时间',
              }),
            ]}
          >
            <DatePicker 
              showTime 
              style={{ width: '100%' }}
              placeholder="请选择定时发布时间"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="summary"
            label="文章摘要"
            rules={[
              { required: true, message: '请输入文章摘要' },
              { max: 500, message: '摘要长度不超过 500 个字符' },
            ]}
          >
            <TextArea 
              placeholder="请输入文章摘要" 
              rows={3}
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="文章内容"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <div style={{ border: '1px solid #d9d9d9', borderRadius: 8 }}>
              <div style={{ borderBottom: '1px solid #d9d9d9', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <Button type="text" size="small">B</Button>
                  <Button type="text" size="small">I</Button>
                  <Button type="text" size="small">U</Button>
                  <Divider type="vertical" />
                  <Button type="text" size="small">H1</Button>
                  <Button type="text" size="small">H2</Button>
                  <Button type="text" size="small">H3</Button>
                  <Divider type="vertical" />
                  <Button type="text" size="small">列表</Button>
                  <Button type="text" size="small">有序列表</Button>
                  <Divider type="vertical" />
                  <Button type="text" size="small">链接</Button>
                  <Button type="text" size="small">图片</Button>
                </Space>
                <Radio.Group 
                  value={editorMode} 
                  onChange={(e) => setEditorMode(e.target.value)}
                  size="small"
                >
                  <Radio.Button value="edit">编辑</Radio.Button>
                  <Radio.Button value="preview">预览</Radio.Button>
                </Radio.Group>
              </div>
              {editorMode === 'edit' ? (
                <TextArea 
                  placeholder="请输入文章内容，支持 Markdown 语法..."
                  rows={12}
                  bordered={false}
                  style={{ resize: 'none' }}
                />
              ) : (
                <div style={{ minHeight: 300, padding: 16 }}>
                  <Text type="secondary">预览模式 - 内容将在此处渲染显示</Text>
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="tags"
            label="标签"
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="请输入标签，按回车确认"
              tokenSeparators={[',']}
              options={[
                { value: '重要' },
                { value: '紧急' },
                { value: '推荐' },
                { value: '热门' },
                { value: '置顶' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="cover"
            label="封面图片"
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到这个区域上传封面</p>
              <p className="ant-upload-hint">
                支持 JPG、PNG、GIF 格式，单张图片不超过 5MB，建议尺寸 800x400
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情抽屉 */}
      <Drawer
        title="文章详情"
        width={700}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {currentArticle && (
          <div>
            {/* 文章封面 */}
            <div style={{ marginBottom: 24 }}>
              <Image
                width="100%"
                height={200}
                src={currentArticle.cover || 'https://api.dicebear.com/7.x/avataaars/svg?seed=article'}
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
            </div>

            {/* 文章标题 */}
            <Title level={3} style={{ marginBottom: 16 }}>{currentArticle.title}</Title>
            
            <Space wrap style={{ marginBottom: 24 }}>
              <Tag color="blue">{currentArticle.category}</Tag>
              {getStatusTag(currentArticle.status)}
              {currentArticle.tags?.map((tag, idx) => (
                <Tag key={idx} color="purple">{tag}</Tag>
              ))}
            </Space>

            {/* 作者信息 */}
            <Card size="small" style={{ marginBottom: 24 }}>
              <Space>
                <UserOutlined style={{ fontSize: 24 }} />
                <div>
                  <div style={{ fontWeight: 500 }}>{currentArticle.author}</div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    创建于 {currentArticle.createTime}
                    {currentArticle.publishTime && ` | 发布于 ${currentArticle.publishTime}`}
                  </Text>
                </div>
                <Divider type="vertical" />
                <Space>
                  <EyeOutlined />
                  <Text>{currentArticle.viewCount} 浏览</Text>
                </Space>
              </Space>
            </Card>

            {/* 文章摘要 */}
            <Title level={5} style={{ marginBottom: 8 }}>文章摘要</Title>
            <Card size="small" style={{ marginBottom: 24 }}>
              <Text>{currentArticle.summary}</Text>
            </Card>

            {/* 文章内容 */}
            <Title level={5} style={{ marginBottom: 8 }}>文章内容</Title>
            <Card size="small">
              <div style={{ lineHeight: 2 }}>
                <Text>{currentArticle.content}</Text>
              </div>
            </Card>
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

export default Content;
