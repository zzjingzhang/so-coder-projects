import { useNavigate } from 'react-router-dom';
import levels from '../data/levels';
import { getDirectionArrow } from '../utils/gameUtils';

const LevelSelectPage = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (level) => {
    if (level.maxArrows <= 2) return 'var(--pixel-color-success)';
    if (level.maxArrows <= 4) return 'var(--pixel-color-accent)';
    return 'var(--pixel-color-danger)';
  };

  const getDifficultyText = (level) => {
    if (level.maxArrows <= 2) return '简单';
    if (level.maxArrows <= 4) return '中等';
    return '困难';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <button
            className="pixel-button pixel-button-secondary pixel-font mb-4"
            onClick={() => navigate('/')}
          >
            ← 返回主页
          </button>
          <h1 
            className="text-5xl font-bold mb-2 pixel-font"
            style={{ color: 'var(--pixel-color-primary)', textShadow: '3px 3px 0px var(--pixel-color-border)' }}
          >
            选择关卡
          </h1>
          <p 
            className="text-lg pixel-font"
            style={{ color: 'var(--pixel-color-text)' }}
          >
            选择一个关卡开始游戏
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.id}
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => navigate(`/game/${level.id}`)}
            >
              <div 
                className="p-6 rounded-lg h-full"
                style={{ 
                  backgroundColor: 'var(--pixel-color-bg-light)',
                  border: '4px solid var(--pixel-color-border)',
                  boxShadow: '4px 4px 0px var(--pixel-color-border)'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="text-4xl font-bold pixel-font"
                    style={{ color: 'var(--pixel-color-primary)' }}
                  >
                    {level.id}
                  </div>
                  <div 
                    className="px-3 py-1 rounded pixel-font text-sm font-bold"
                    style={{ 
                      backgroundColor: getDifficultyColor(level),
                      color: 'var(--pixel-color-bg)'
                    }}
                  >
                    {getDifficultyText(level)}
                  </div>
                </div>

                <h2 
                  className="text-2xl font-bold mb-2 pixel-font"
                  style={{ color: 'var(--pixel-color-accent)' }}
                >
                  {level.name}
                </h2>

                <p 
                  className="mb-4 pixel-font text-sm"
                  style={{ color: 'var(--pixel-color-text)' }}
                >
                  {level.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4 pixel-font text-sm">
                    <div className="flex items-center">
                      <span className="mr-2">📐</span>
                      <span style={{ color: 'var(--pixel-color-text)' }}>
                        {level.gridSize.rows} x {level.gridSize.cols}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">💰</span>
                      <span style={{ color: 'var(--pixel-color-text)' }}>
                        {level.coins.length} 金币
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pixel-font text-sm">
                    <div className="flex items-center">
                      <span className="mr-2">➡️</span>
                      <span style={{ color: 'var(--pixel-color-text)' }}>
                        初始方向: {getDirectionArrow(level.startDirection)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      <span style={{ color: 'var(--pixel-color-text)' }}>
                        最多 {level.maxArrows || '∞'} 个箭头
                      </span>
                    </div>
                  </div>
                </div>

                <div 
                  className="mt-4 text-center pixel-font font-bold"
                  style={{ color: 'var(--pixel-color-primary)' }}
                >
                  点击开始 →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex justify-center space-x-4 text-3xl">
            <span className="robot-animation">🤖</span>
            <span className="coin-animation">💰</span>
            <span className="robot-animation" style={{ animationDelay: '0.3s' }}>🤖</span>
            <span className="coin-animation" style={{ animationDelay: '0.5s' }}>💰</span>
            <span className="robot-animation" style={{ animationDelay: '0.6s' }}>🤖</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelectPage;
