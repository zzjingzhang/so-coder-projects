import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Divider, Tag, Space, List, Empty } from 'antd';
import { HomeOutlined, RedoOutlined, TrophyOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { usePractice } from '../context/PracticeContext';

const { Title, Text } = Typography;

const ResultPage = () => {
  const navigate = useNavigate();
  const {
    words,
    correctCount,
    incorrectWords,
    startTime,
    endTime,
    practiceTime,
    resetPractice,
  } = usePractice();

  const totalWords = words.length;
  const accuracy = totalWords > 0 ? Math.round((correctCount / totalWords) * 100) : 0;
  const timeTaken = startTime && endTime 
    ? Math.round((endTime - startTime) / 1000) 
    : practiceTime * 60;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: '🌟 优秀', color: 'gold', emoji: '🎉' };
    if (accuracy >= 70) return { level: '👍 良好', color: 'green', emoji: '😊' };
    if (accuracy >= 50) return { level: '💪 继续加油', color: 'orange', emoji: '💪' };
    return { level: '📚 需要多练习', color: 'red', emoji: '📖' };
  };

  const performance = getPerformanceLevel();

  const handleRestart = () => {
    resetPractice();
    navigate('/setup');
  };

  const handleGoHome = () => {
    resetPractice();
    navigate('/');
  };

  const handlePracticeWrong = () => {
    if (incorrectWords.length === 0) return;
    resetPractice();
    navigate('/setup');
  };

  if (totalWords === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-0 text-center">
          <Empty description="还没有练习数据" className="my-12" />
          <Button type="primary" size="large" onClick={() => navigate('/')}>
            去首页
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl rounded-2xl border-0 mb-6">
          <div className="text-center py-8">
            <Title level={1} className="!text-4xl !text-blue-600 !mb-4">
              {performance.emoji} 练习完成！
            </Title>
            <Tag color={performance.color} className="!text-2xl !px-8 !py-2 !rounded-full">
              {performance.level}
            </Tag>
          </div>

          <Divider />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            <div className="text-center p-6 bg-green-50 rounded-2xl">
              <CheckCircleOutlined className="text-5xl text-green-500 mb-4" />
              <Title level={2} className="!text-green-600 !mb-2">
                {correctCount}
              </Title>
              <Text className="text-lg text-gray-600">答对题数</Text>
            </div>

            <div className="text-center p-6 bg-red-50 rounded-2xl">
              <CloseCircleOutlined className="text-5xl text-red-500 mb-4" />
              <Title level={2} className="!text-red-600 !mb-2">
                {totalWords - correctCount}
              </Title>
              <Text className="text-lg text-gray-600">答错题数</Text>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-2xl">
              <TrophyOutlined className="text-5xl text-blue-500 mb-4" />
              <Title level={2} className="!text-blue-600 !mb-2">
                {accuracy}%
              </Title>
              <Text className="text-lg text-gray-600">正确率</Text>
            </div>
          </div>

          <Divider />

          <div className="text-center py-4">
            <Text className="text-xl text-gray-600">
              ⏱️ 用时：<strong className="text-blue-600 text-2xl">{formatTime(timeTaken)}</strong>
              <span className="mx-4 text-gray-300">|</span>
              📝 总题数：<strong className="text-blue-600 text-2xl">{totalWords}</strong> 题
            </Text>
          </div>
        </Card>

        {incorrectWords.length > 0 && (
          <Card className="shadow-xl rounded-2xl border-0 mb-6">
            <Title level={3} className="!text-red-500 !mb-4">
              ❌ 需要复习的单词 ({incorrectWords.length} 个)
            </Title>
            <List
              grid={{ gutter: 16, column: 1, md: 2 }}
              dataSource={incorrectWords}
              renderItem={(item) => (
                <List.Item>
                  <Card className="!bg-red-50 !border-red-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <Text strong className="text-xl text-red-600">
                          {item.word}
                        </Text>
                        <Text type="secondary" className="ml-3">
                          ({item.chinese})
                        </Text>
                      </div>
                      <Tag color="red">需复习</Tag>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        )}

        {correctCount > 0 && (
          <Card className="shadow-xl rounded-2xl border-0 mb-6">
            <Title level={3} className="!text-green-500 !mb-4">
              ✅ 已掌握的单词 ({correctCount} 个)
            </Title>
            <div className="flex flex-wrap gap-3">
              {words.slice(0, correctCount).map((word, index) => (
                <Tag key={index} color="green" className="!text-base !px-4 !py-2 !rounded-full">
                  {word.english}
                </Tag>
              ))}
            </div>
          </Card>
        )}

        <Card className="shadow-xl rounded-2xl border-0">
          <Space orientation="vertical" className="w-full" size="large">
            <Button
              type="primary"
              size="large"
              block
              icon={<RedoOutlined />}
              onClick={handleRestart}
              className="!h-14 !text-xl !rounded-xl !bg-blue-500 !hover:bg-blue-600"
            >
              🔄 再练一次
            </Button>

            {incorrectWords.length > 0 && (
              <Button
                size="large"
                block
                icon={<CloseCircleOutlined />}
                onClick={handlePracticeWrong}
                className="!h-14 !text-xl !rounded-xl !border-orange-400 !text-orange-500 !hover:bg-orange-50"
              >
                📚 只练错题
              </Button>
            )}

            <Button
              size="large"
              block
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="!h-14 !text-xl !rounded-xl"
            >
              🏠 返回首页
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ResultPage;
