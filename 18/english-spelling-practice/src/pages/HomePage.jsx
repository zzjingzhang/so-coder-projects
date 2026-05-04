import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { BookOutlined, SettingOutlined } from '@ant-design/icons';
import { usePractice } from '../context/PracticeContext';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const { words, resetPractice } = usePractice();

  const handleStartImport = () => {
    resetPractice();
    navigate('/import');
  };

  const handleStartPractice = () => {
    resetPractice();
    navigate('/setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border-0">
        <div className="text-center py-8">
          <Title level={1} className="!text-4xl !font-bold !text-blue-600 !mb-2">
            📚 英语单词拼写练习
          </Title>
          <Paragraph className="text-gray-500 text-lg mb-8">
            让单词拼写变得有趣，帮助孩子们更好地掌握英语单词
          </Paragraph>

          <Divider className="!my-8" />

          <Space orientation="vertical" className="w-full" size="large">
            <Button
              type="primary"
              size="large"
              block
              icon={<BookOutlined />}
              onClick={handleStartImport}
              className="!h-16 !text-xl !font-medium !rounded-xl !bg-blue-500 !hover:bg-blue-600"
            >
              导入单词
            </Button>

            {words.length > 0 && (
              <Button
                type="primary"
                size="large"
                block
                icon={<SettingOutlined />}
                onClick={handleStartPractice}
                className="!h-16 !text-xl !font-medium !rounded-xl !bg-green-500 !hover:bg-green-600"
              >
                开始练习 (已导入 {words.length} 个单词)
              </Button>
            )}
          </Space>

          <Divider className="!my-8" />

          <div className="bg-blue-50 rounded-xl p-6 text-left">
            <Title level={4} className="!text-blue-600 !mb-3">
              🎯 如何使用
            </Title>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">1️⃣</span>
                <span>导入课本单词（支持粘贴文本或Excel导入）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2️⃣</span>
                <span>设置练习时间（如5分钟）</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3️⃣</span>
                <span>根据中文提示，一个字母一个字母地拼写出英文单词</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4️⃣</span>
                <span>练习结束后查看正确率和用时</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
