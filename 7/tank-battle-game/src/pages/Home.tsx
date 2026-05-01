import React from 'react'
import { Button, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PlayCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-sm border-gray-700 shadow-2xl">
        <div className="text-center mb-8">
          <Title level={1} className="text-white font-bold mb-2 drop-shadow-lg">
            🎮 坦克大战
          </Title>
          <Paragraph className="text-gray-200 text-lg font-medium">
            经典坦克大战游戏，使用键盘控制坦克移动和射击
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800/95 border-gray-500 shadow-lg">
            <Title level={4} className="text-yellow-400 font-bold flex items-center gap-2">
              <InfoCircleOutlined className="text-yellow-400 text-xl" /> 操作说明
            </Title>
            <div className="text-white space-y-3 mt-4">
              <p className="flex items-center gap-2"><span className="text-xl">⬆️</span> <span className="font-medium">上箭头键</span> - 向上移动</p>
              <p className="flex items-center gap-2"><span className="text-xl">⬇️</span> <span className="font-medium">下箭头键</span> - 向下移动</p>
              <p className="flex items-center gap-2"><span className="text-xl">⬅️</span> <span className="font-medium">左箭头键</span> - 向左移动</p>
              <p className="flex items-center gap-2"><span className="text-xl">➡️</span> <span className="font-medium">右箭头键</span> - 向右移动</p>
              <p className="flex items-center gap-2"><span className="text-xl">🔫</span> <span className="font-medium">空格键</span> - 发射炮弹</p>
            </div>
          </Card>

          <Card className="bg-gray-800/95 border-gray-500 shadow-lg">
            <Title level={4} className="text-green-400 font-bold">游戏目标</Title>
            <div className="text-white space-y-3 mt-4">
              <p className="flex items-center gap-2"><span className="text-xl">🎯</span> <span className="font-medium">消灭所有敌方坦克</span></p>
              <p className="flex items-center gap-2"><span className="text-xl">🏠</span> <span className="font-medium">保护基地不被摧毁</span></p>
              <p className="flex items-center gap-2"><span className="text-xl">💎</span> <span className="font-medium">收集道具提升能力</span></p>
              <p className="flex items-center gap-2"><span className="text-xl">🏆</span> <span className="font-medium">完成关卡获得胜利</span></p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={() => navigate('/game')}
            className="h-16 text-xl px-12 bg-blue-600 hover:bg-blue-700 border-none"
          >
            开始游戏
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home