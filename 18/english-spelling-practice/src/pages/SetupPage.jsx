import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Select, Radio, Space, Divider, Alert, Empty } from 'antd';
import { ArrowLeftOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { usePractice } from '../context/PracticeContext';

const { Title, Text } = Typography;

const SetupPage = () => {
  const navigate = useNavigate();
  const { words, practiceTime, setPracticeTime } = usePractice();

  const timeOptions = [
    { value: 3, label: '3 分钟' },
    { value: 5, label: '5 分钟' },
    { value: 10, label: '10 分钟' },
    { value: 15, label: '15 分钟' },
    { value: 20, label: '20 分钟' },
  ];

  const handleStartPractice = () => {
    navigate('/practice');
  };

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-xl rounded-2xl border-0">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            className="mb-6"
          >
            返回首页
          </Button>
          <Empty
            description="还没有导入单词"
            className="my-12"
          >
            <Button
              type="primary"
              onClick={() => navigate('/import')}
            >
              去导入单词
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/')}
          className="mb-6"
        >
          返回首页
        </Button>

        <Card className="shadow-xl rounded-2xl border-0">
          <Title level={2} className="!text-center !text-blue-600 !mb-6">
            ⚙️ 练习设置
          </Title>

          <Alert
            message="当前单词"
            description={`已导入 ${words.length} 个单词，准备开始练习吧！`}
            type="success"
            showIcon
            className="mb-8"
          />

          <Divider />

          <div className="mb-8">
            <Title level={4} className="!mb-4">
              ⏰ 练习时间
            </Title>
            <Radio.Group
              value={practiceTime}
              onChange={(e) => setPracticeTime(e.target.value)}
            >
              <Space orientation="vertical" className="w-full">
                {timeOptions.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    className="!text-xl !p-4 !border-2 !border-gray-200 !rounded-xl !w-full !mb-2 hover:!border-blue-300 transition-colors"
                  >
                    <span className="text-lg">{option.label}</span>
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>

          <Divider />

          <div className="mb-8">
            <Title level={4} className="!mb-4">
              📝 练习说明
            </Title>
            <div className="bg-blue-50 rounded-xl p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">①</span>
                  <span className="text-lg">屏幕会显示中文释义</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">②</span>
                  <span className="text-lg">你需要一个字母一个字母地拼写出对应的英文单词</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">③</span>
                  <span className="text-lg">拼对了会自动进入下一个单词</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">④</span>
                  <span className="text-lg">拼错了会有提示，可以重新尝试</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">⑤</span>
                  <span className="text-lg">练习结束后可以查看正确率和用时</span>
                </li>
              </ul>
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            block
            icon={<PlayCircleOutlined />}
            onClick={handleStartPractice}
            className="!h-16 !text-2xl !font-bold !rounded-xl !bg-green-500 !hover:bg-green-600"
          >
            🚀 开始练习
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SetupPage;
