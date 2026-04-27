import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-3xl">
        <div className="mb-8">
          <h1 
            className="text-6xl font-bold mb-4 pixel-font"
            style={{ color: 'var(--pixel-color-primary)', textShadow: '4px 4px 0px var(--pixel-color-border)' }}
          >
            像素机器人
          </h1>
          <div 
            className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-lg"
            style={{ 
              backgroundColor: 'var(--pixel-color-bg-light)',
              border: '4px solid var(--pixel-color-primary)',
              boxShadow: '0 0 20px var(--pixel-color-primary)'
            }}
          >
            <div className="text-6xl robot-animation">🤖</div>
          </div>
          <p 
            className="text-xl mb-8 pixel-font"
            style={{ color: 'var(--pixel-color-text)' }}
          >
            引导机器人避开障碍物，收集金币，到达终点！
          </p>
        </div>

        <div 
          className="p-6 mb-8 rounded-lg"
          style={{ 
            backgroundColor: 'var(--pixel-color-bg-light)',
            border: '4px solid var(--pixel-color-border)'
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4 pixel-font"
            style={{ color: 'var(--pixel-color-accent)' }}
          >
            游戏说明
          </h2>
          <ul className="text-left space-y-2 pixel-font" style={{ color: 'var(--pixel-color-text)' }}>
            <li>🎯 选择关卡后，观察地图布局</li>
            <li>➡️ 点击方向箭头按钮选择要放置的方向</li>
            <li>📍 在地图格子上点击放置箭头</li>
            <li>🚀 点击开始按钮，机器人将自动移动</li>
            <li>💰 收集金币获得额外分数</li>
            <li>🏁 引导机器人到达终点即可过关</li>
            <li>⚠️ 碰到障碍物或掉出地图则失败</li>
          </ul>
        </div>

        <button
          className="pixel-button pixel-font text-xl px-8 py-4 hover:scale-105 transition-transform"
          onClick={() => navigate('/levels')}
        >
          开始游戏 🎮
        </button>

        <div className="mt-8 flex justify-center space-x-6 text-4xl">
          <span className="coin-animation">💰</span>
          <span className="robot-animation">🤖</span>
          <span className="coin-animation" style={{ animationDelay: '0.5s' }}>💰</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
