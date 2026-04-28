import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Card, Typography, Alert } from 'antd';
import { PlayCircleOutlined, HistoryOutlined } from '@ant-design/icons';
import { categories } from '../data/mockData';
import { getProgressFromLocalStorage } from '../utils';

const { Title, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const [questionCount, setQuestionCount] = useState(5);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    const savedProgress = getProgressFromLocalStorage();
    setHasSavedProgress(!!savedProgress);
  }, []);

  const handleStartQuiz = () => {
    navigate(`/quiz?category=${category}&count=${questionCount}`);
  };

  const handleResumeQuiz = () => {
    navigate('/quiz?resume=true');
  };

  const countOptions = [
    { value: 3, label: '3 题' },
    { value: 5, label: '5 题' },
    { value: 8, label: '8 题' },
    { value: 10, label: '10 题' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2 !text-indigo-600">
            📝 在线习题练习工具
          </Title>
          <Text type="secondary" className="text-base">
            测试你的前端知识，提升编程技能
          </Text>
        </div>

        {hasSavedProgress && (
          <Alert
            message="检测到未完成的练习"
            description="你有一个未完成的练习，是否继续上次的进度？"
            type="info"
            showIcon
            className="mb-6"
            action={
              <Button
                type="primary"
                size="small"
                onClick={handleResumeQuiz}
                icon={<HistoryOutlined />}
              >
                继续练习
              </Button>
            }
          />
        )}

        <div className="space-y-6 mb-8">
          <div>
            <Text strong className="block mb-2 text-gray-700">
              选择题库分类
            </Text>
            <Select
              value={category}
              onChange={setCategory}
              options={categories}
              className="w-full"
              size="large"
            />
          </div>

          <div>
            <Text strong className="block mb-2 text-gray-700">
              选择题目数量
            </Text>
            <Select
              value={questionCount}
              onChange={setQuestionCount}
              options={countOptions}
              className="w-full"
              size="large"
            />
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handleStartQuiz}
          icon={<PlayCircleOutlined />}
          className="h-12 text-lg font-medium bg-gradient-to-r from-indigo-500 to-purple-500 border-0 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          开始练习
        </Button>

        <div className="mt-6 text-center">
          <Text type="secondary" className="text-sm">
            💡 提示：题目随机生成，避免重复
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Home;
