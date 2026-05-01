import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col, Tag } from 'antd';
import { ArrowLeftOutlined, LockOutlined, PlayCircleOutlined, StarOutlined } from '@ant-design/icons';
import { useGameContext } from '../context/GameContext';
import { levels } from '../data/levels';

export const LevelSelect: React.FC = () => {
  const navigate = useNavigate();
  const { gameState } = useGameContext();

  const getDifficultyColor = (id: number) => {
    if (id === 1) return 'green';
    if (id === 2) return 'orange';
    return 'red';
  };

  const getDifficultyText = (id: number) => {
    if (id === 1) return '简单';
    if (id === 2) return '中等';
    return '困难';
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
            className="text-white text-lg hover:text-poly-purple transition-colors"
          >
            返回主菜单
          </Button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-poly-blue to-poly-purple">
            关卡选择
          </h1>
          <div className="w-32" />
        </div>

        <Row gutter={[32, 32]}>
          {levels.map((level) => {
            const isUnlocked = gameState.unlockedLevels.includes(level.id);
            const isCurrent = gameState.currentLevel === level.id;

            return (
              <Col xs={24} md={12} lg={8} key={level.id}>
                <Card
                  className={`h-full transition-all duration-300 ${
                    isUnlocked
                      ? 'cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-poly-purple/30'
                      : 'opacity-60 cursor-not-allowed'
                  } ${isCurrent ? 'ring-4 ring-poly-purple' : ''}`}
                  styles={{
                    body: {
                      padding: '24px',
                    },
                  }}
                  onClick={() => isUnlocked && navigate(`/game/${level.id}`)}
                >
                  <div className="relative">
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-10">
                        <LockOutlined className="text-4xl text-white" />
                      </div>
                    )}

                    <div
                      className="h-32 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: level.backgroundColor }}
                    >
                      <div className="absolute inset-0 opacity-20">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute"
                            style={{
                              left: `${10 + i * 20}%`,
                              top: `${20 + (i % 2) * 40}%`,
                              width: 40,
                              height: 40,
                              backgroundColor: level.accentColor,
                              clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
                              animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="text-5xl font-black text-white/90 drop-shadow-lg">
                          {level.id}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {level.name}
                      </h3>
                      <Tag color={getDifficultyColor(level.id)}>
                        {getDifficultyText(level.id)}
                      </Tag>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {level.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <StarOutlined />
                        <span className="text-sm font-medium">
                          需要 {level.requiredEnergy} 能量
                        </span>
                      </div>

                      {isUnlocked && (
                        <Button
                          type="primary"
                          size="small"
                          icon={<PlayCircleOutlined />}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/game/${level.id}`);
                          }}
                          className="bg-gradient-to-r from-poly-blue to-poly-purple border-0"
                        >
                          开始
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded" />
              <span className="text-white text-sm">已解锁</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <LockOutlined className="text-white/60" />
              <span className="text-white/60 text-sm">未解锁</span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            完成当前关卡即可解锁下一关
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
