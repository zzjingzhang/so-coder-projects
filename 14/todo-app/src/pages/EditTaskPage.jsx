import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Select, Button, Card, Row, Col, message, DatePicker, Spin } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useTodo } from '../context/TodoContext';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const fontOptions = [
  { label: '默认字体', value: 'inherit' },
  { label: '宋体', value: 'SimSun, serif' },
  { label: '黑体', value: 'SimHei, sans-serif' },
  { label: '微软雅黑', value: 'Microsoft YaHei, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Times New Roman', value: 'Times New Roman, serif' },
  { label: 'Courier New', value: 'Courier New, monospace' },
  { label: 'Georgia', value: 'Georgia, serif' },
];

const presetColors = [
  '#ffffff', '#f0f9ff', '#f0fdf4', '#fefce8', '#fff1f2',
  '#f5f3ff', '#ecfeff', '#fef3c7', '#fce7f3', '#dbeafe',
  '#d1fae5', '#fef9c3', '#fee2e2', '#e0e7ff', '#cffafe'
];

const textColors = [
  '#1a1a1a', '#333333', '#4a4a4a', '#6b7280',
  '#065f46', '#1e3a8a', '#7c2d12', '#581c87',
  '#991b1b', '#1e40af', '#047857', '#b45309'
];

const EditTaskPage = () => {
  const [form] = Form.useForm();
  const { getTodoById, updateTodo } = useTodo();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewCardColor, setPreviewCardColor] = useState('#ffffff');
  const [previewTextColor, setPreviewTextColor] = useState('#333333');
  const [previewFont, setPreviewFont] = useState('inherit');

  useEffect(() => {
    const loadTodo = async () => {
      setLoading(true);
      try {
        const todo = getTodoById(id);
        if (todo) {
          form.setFieldsValue({
            title: todo.title,
            description: todo.description || '',
            priority: todo.priority || 'medium',
            status: todo.status || 'pending',
            dueDate: todo.dueDate ? dayjs(todo.dueDate) : null,
            cardColor: todo.cardColor || '#ffffff',
            textColor: todo.textColor || '#333333',
            fontFamily: todo.fontFamily || 'inherit',
          });
          setPreviewCardColor(todo.cardColor || '#ffffff');
          setPreviewTextColor(todo.textColor || '#333333');
          setPreviewFont(todo.fontFamily || 'inherit');
        } else {
          message.error('任务不存在');
          navigate('/');
        }
      } catch (error) {
        message.error('加载任务失败');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id, getTodoById, form, navigate]);

  const onFinish = async (values) => {
    setSaving(true);
    try {
      const todoData = {
        title: values.title,
        description: values.description || '',
        priority: values.priority || 'medium',
        status: values.status || 'pending',
        dueDate: values.dueDate ? values.dueDate.toISOString() : null,
        cardColor: values.cardColor || '#ffffff',
        textColor: values.textColor || '#333333',
        fontFamily: values.fontFamily || 'inherit',
      };
      
      updateTodo(id, todoData);
      message.success('任务更新成功');
      navigate('/');
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setSaving(false);
    }
  };

  const handleCardColorChange = (color) => {
    form.setFieldValue('cardColor', color);
    setPreviewCardColor(color);
  };

  const handleTextColorChange = (color) => {
    form.setFieldValue('textColor', color);
    setPreviewTextColor(color);
  };

  const handleFontChange = (font) => {
    form.setFieldValue('fontFamily', font);
    setPreviewFont(font);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/')}
        className="mb-6"
      >
        返回任务列表
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="编辑任务" className="shadow-md">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
            >
              <Form.Item
                name="title"
                label="任务标题"
                rules={[{ required: true, message: '请输入任务标题' }]}
              >
                <Input placeholder="请输入任务标题" maxLength={100} />
              </Form.Item>

              <Form.Item
                name="description"
                label="任务描述"
              >
                <TextArea
                  placeholder="请输入任务描述（可选）"
                  rows={4}
                  maxLength={500}
                  showCount
                />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="priority"
                    label="优先级"
                  >
                    <Select>
                      <Option value="low">低</Option>
                      <Option value="medium">中</Option>
                      <Option value="high">高</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="status"
                    label="状态"
                  >
                    <Select>
                      <Option value="pending">待处理</Option>
                      <Option value="in_progress">进行中</Option>
                      <Option value="completed">已完成</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="dueDate"
                label="截止日期"
              >
                <DatePicker
                  showTime
                  placeholder="选择截止日期和时间"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item label="卡片背景颜色" name="cardColor">
                <div className="flex flex-wrap gap-2 mb-2">
                  {presetColors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                        previewCardColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleCardColorChange(color)}
                    />
                  ))}
                </div>
              </Form.Item>

              <Form.Item label="文字颜色" name="textColor">
                <div className="flex flex-wrap gap-2 mb-2">
                  {textColors.map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform hover:scale-110 ${
                        previewTextColor === color ? 'border-blue-500 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleTextColorChange(color)}
                    />
                  ))}
                </div>
              </Form.Item>

              <Form.Item
                name="fontFamily"
                label="字体样式"
              >
                <Select
                  options={fontOptions}
                  onChange={handleFontChange}
                  optionLabelProp="label"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={saving}
                  size="large"
                  icon={<SaveOutlined />}
                  className="w-full h-12 text-lg"
                >
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="实时预览" className="shadow-md sticky top-24">
            <Card
              className="shadow-sm"
              style={{ 
                backgroundColor: previewCardColor,
                borderLeft: `4px solid ${previewCardColor === '#ffffff' ? '#1890ff' : previewCardColor}`
              }}
              bodyStyle={{ 
                fontFamily: previewFont,
                color: previewTextColor
              }}
            >
              <h3 
                className="text-lg font-bold mb-2"
                style={{ color: previewTextColor }}
              >
                {form.getFieldValue('title') || '示例任务标题'}
              </h3>
              <p 
                className="text-sm mb-3 opacity-90"
                style={{ color: previewTextColor }}
              >
                {form.getFieldValue('description') || '这是任务描述的示例内容，您可以在这里查看文字显示效果。'}
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                  优先级: {form.getFieldValue('priority') === 'high' ? '高' : form.getFieldValue('priority') === 'low' ? '低' : '中'}
                </span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                  状态: {form.getFieldValue('status') === 'completed' ? '已完成' : form.getFieldValue('status') === 'in_progress' ? '进行中' : '待处理'}
                </span>
              </div>
            </Card>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>提示：</strong>调整左侧的颜色和字体选项，可以在此处实时预览任务卡片的显示效果。
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditTaskPage;
