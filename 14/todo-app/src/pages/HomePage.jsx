import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Select, Input, Row, Col, Statistic, Card } from 'antd';
import { PlusOutlined, SearchOutlined, UnorderedListOutlined, CheckCircleOutlined, ClockCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useTodo } from '../context/TodoContext';
import TaskCard from '../components/TaskCard';

const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
  const { todos } = useTodo();
  const navigate = useNavigate();
  
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          (todo.description && todo.description.toLowerCase().includes(searchText.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || todo.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.status === 'completed').length,
    inProgress: todos.filter(t => t.status === 'in_progress').length,
    pending: todos.filter(t => t.status === 'pending').length,
  };

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 m-0">
            我的任务
          </h1>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => navigate('/create')}
            className="flex items-center justify-center h-12 text-lg"
          >
            新建任务
          </Button>
        </div>

        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={12} sm={6}>
            <Card className="shadow-sm">
              <Statistic
                title="总任务"
                value={stats.total}
                prefix={<UnorderedListOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="shadow-sm">
              <Statistic
                title="已完成"
                value={stats.completed}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="shadow-sm">
              <Statistic
                title="进行中"
                value={stats.inProgress}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="shadow-sm">
              <Statistic
                title="待处理"
                value={stats.pending}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        </Row>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Search
              placeholder="搜索任务标题或描述..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1"
            />
            
            <Select
              placeholder="状态筛选"
              allowClear
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full md:w-40"
            >
              <Option value="all">全部状态</Option>
              <Option value="pending">待处理</Option>
              <Option value="in_progress">进行中</Option>
              <Option value="completed">已完成</Option>
            </Select>

            <Select
              placeholder="优先级筛选"
              allowClear
              size="large"
              value={priorityFilter}
              onChange={setPriorityFilter}
              className="w-full md:w-40"
            >
              <Option value="all">全部优先级</Option>
              <Option value="high">高</Option>
              <Option value="medium">中</Option>
              <Option value="low">低</Option>
            </Select>
          </div>
        </div>
      </div>

      {sortedTodos.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-500">
              {searchText || statusFilter !== 'all' || priorityFilter !== 'all' 
                ? '没有找到匹配的任务' 
                : '暂无任务，点击上方按钮创建第一个任务'}
            </span>
          }
        >
          {!searchText && statusFilter === 'all' && priorityFilter === 'all' && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/create')}
              className="flex items-center justify-center"
            >
              新建任务
            </Button>
          )}
        </Empty>
      ) : (
        <div>
          <p className="text-gray-500 mb-4">
            共找到 {sortedTodos.length} 个任务
          </p>
          {sortedTodos.map(todo => (
            <TaskCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
