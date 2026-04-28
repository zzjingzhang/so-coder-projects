import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Progress, Tag, Divider, List, Avatar } from 'antd';
import {
  TrophyOutlined,
  SmileOutlined,
  FrownOutlined,
  MehOutlined,
  HomeOutlined,
  RedoOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { getScoresFromLocalStorage } from '../utils';
import { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

const Result = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const score = parseInt(searchParams.get('score') || '0');
  const totalQuestions = parseInt(searchParams.get('total') || '0');
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const [historyScores, setHistoryScores] = useState([]);

  useEffect(() => {
    const scores = getScoresFromLocalStorage();
    setHistoryScores(scores.slice(-5).reverse());
  }, []);

  const getResultEmoji = () => {
    if (percentage >= 80) return <TrophyOutlined className="text-6xl text-yellow-500" />;
    if (percentage >= 60) return <SmileOutlined className="text-6xl text-green-500" />;
    if (percentage >= 40) return <MehOutlined className="text-6xl text-orange-500" />;
    return <FrownOutlined className="text-6xl text-red-500" />;
  };

  const getResultMessage = () => {
    if (percentage >= 80) return '太棒了！你是知识达人！';
    if (percentage >= 60) return '不错！继续加油！';
    if (percentage >= 40) return '还需要多多练习哦！';
    return '别灰心，再来一次！';
  };

  const getProgressColor = () => {
    if (percentage >= 80) return '#52c41a';
    if (percentage >= 60) return '#1890ff';
    if (percentage >= 40) return '#faad14';
    return '#ff4d4f';
  };

  const getPerformanceTag = () => {
    if (percentage >= 80) return <Tag color="gold" className="text-base px-4 py-1">优秀</Tag>;
    if (percentage >= 60) return <Tag color="green" className="text-base px-4 py-1">良好</Tag>;
    if (percentage >= 40) return <Tag color="orange" className="text-base px-4 py-1">及格</Tag>;
    return <Tag color="red" className="text-base px-4 py-1">需要加油</Tag>;
  };

  const handleTryAgain = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl border-0 mb-6">
          <div className="text-center mb-8">
            <div className="mb-4">{getResultEmoji()}</div>
            <Title level={3} className="!mb-2">
              练习完成！
            </Title>
            <Paragraph className="!text-gray-600 !text-lg">
              {getResultMessage()}
            </Paragraph>
          </div>

          <div className="flex justify-center mb-8">
            <Progress
              type="circle"
              percent={percentage}
              strokeColor={getProgressColor()}
              strokeWidth={12}
              width={160}
              format={(percent) => (
                <div className="text-center">
                  <div className="text-3xl font-bold">{score}</div>
                  <div className="text-gray-500 text-sm">/ {totalQuestions}</div>
                </div>
              )}
            />
          </div>

          <div className="flex justify-center mb-8">
            {getPerformanceTag()}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-gray-500 text-sm">答对题数</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - score}</div>
              <div className="text-gray-500 text-sm">答错题数</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{percentage}%</div>
              <div className="text-gray-500 text-sm">正确率</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="primary"
              size="large"
              block
              onClick={handleTryAgain}
              icon={<RedoOutlined />}
              className="h-12 text-lg bg-gradient-to-r from-indigo-500 to-purple-500 border-0 hover:from-indigo-600 hover:to-purple-600"
            >
              再来一次
            </Button>
            <Button
              size="large"
              block
              onClick={handleGoHome}
              icon={<HomeOutlined />}
              className="h-12 text-lg"
            >
              返回首页
            </Button>
          </div>
        </Card>

        {historyScores.length > 0 && (
          <Card className="shadow-2xl border-0" title="📊 最近练习记录">
            <List
              dataSource={historyScores}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          item.percentage >= 60 ? (
                            <CheckCircleOutlined className="text-green-500" />
                          ) : (
                            <CloseCircleOutlined className="text-red-500" />
                          )
                        }
                        className={item.percentage >= 60 ? 'bg-green-100' : 'bg-red-100'}
                      />
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span>第 {historyScores.length - index} 次练习</span>
                        <Tag color={item.percentage >= 60 ? 'success' : 'error'}>
                          {item.percentage}%
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="flex items-center gap-4 text-gray-500">
                        <span>得分：{item.score} / {item.totalQuestions}</span>
                        <span>分类：{item.category || '全部'}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Result;
