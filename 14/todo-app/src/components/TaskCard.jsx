import { useNavigate } from 'react-router-dom';
import { Card, Button, Tag, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTodo } from '../context/TodoContext';

const TaskCard = ({ todo }) => {
  const navigate = useNavigate();
  const { deleteTodo } = useTodo();

  const handleDelete = () => {
    deleteTodo(todo.id);
    message.success('任务已删除');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '未设置';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'processing';
      case 'pending':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      case 'pending':
        return '待处理';
      default:
        return '未设置';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card
      className="shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
      style={{ 
        backgroundColor: todo.cardColor || '#ffffff',
        borderLeft: `4px solid ${todo.cardColor || '#1890ff'}`
      }}
      bodyStyle={{ 
        padding: '16px 20px',
        color: todo.textColor || '#333333',
        fontFamily: todo.fontFamily || 'inherit'
      }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 
            className="text-lg font-bold mb-2"
            style={{ color: todo.textColor || '#333333' }}
          >
            {todo.title}
          </h3>
          
          {todo.description && (
            <p 
              className="text-sm mb-3 opacity-90"
              style={{ color: todo.textColor || '#666666' }}
            >
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-3">
            <Tag color={getPriorityColor(todo.priority)}>
              优先级: {getPriorityText(todo.priority)}
            </Tag>
            <Tag color={getStatusColor(todo.status)}>
              状态: {getStatusText(todo.status)}
            </Tag>
            {todo.dueDate && (
              <Tag color="blue">
                截止: {new Date(todo.dueDate).toLocaleDateString('zh-CN')}
              </Tag>
            )}
          </div>

          <p 
            className="text-xs opacity-70"
            style={{ color: todo.textColor || '#999999' }}
          >
            创建于: {formatDate(todo.createdAt)}
          </p>
        </div>

        <div className="flex gap-2 md:flex-col">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit/${todo.id}`)}
            className="flex items-center justify-center"
          >
            编辑
          </Button>
          
          <Popconfirm
            title="确认删除"
            description="确定要删除这个任务吗？此操作不可恢复。"
            onConfirm={handleDelete}
            okText="删除"
            cancelText="取消"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className="flex items-center justify-center"
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
