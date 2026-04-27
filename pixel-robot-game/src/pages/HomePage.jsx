import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ padding: '32px' }}
    >
      <div 
        className="text-center"
        style={{ maxWidth: '800px', width: '100%' }}
      >
        <div style={{ marginBottom: '48px' }}>
          <h1 
            className="pixel-font"
            style={{ 
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'var(--pixel-color-primary)', 
              textShadow: '4px 4px 0px var(--pixel-color-border)',
              marginBottom: '12px',
              textAlign: 'center'
            }}
          >
            像素机器人
          </h1>
          
          <div 
            className="flex items-center justify-center"
            style={{ 
              width: '128px',
              height: '128px',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '12px',
              backgroundColor: 'var(--pixel-color-bg-light)',
              border: '4px solid var(--pixel-color-primary)',
              boxShadow: '0 0 20px var(--pixel-color-primary)',
              borderRadius: '8px'
            }}
          >
            <div 
              className="robot-animation"
              style={{ fontSize: '48px' }}
            >
              🤖
            </div>
          </div>
          
          <p 
            className="pixel-font"
            style={{ 
              fontSize: '20px',
              color: 'var(--pixel-color-text)',
              marginBottom: '12px',
              textAlign: 'center'
            }}
          >
            引导机器人避开障碍物，收集金币，到达终点！
          </p>
        </div>

        <div 
          style={{ 
            padding: '32px',
            marginBottom: '24px',
            backgroundColor: 'var(--pixel-color-bg-light)',
            border: '4px solid var(--pixel-color-border)',
            borderRadius: '8px'
          }}
        >
          <h2 
            className="pixel-font"
            style={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--pixel-color-accent)',
              marginBottom: '20px',
              textAlign: 'left'
            }}
          >
            游戏说明
          </h2>
          <ul style={{ 
            textAlign: 'left',
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              🎯 选择关卡后，观察地图布局
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              ➡️ 点击方向箭头按钮选择要放置的方向
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              📍 在地图格子上点击放置箭头
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              🚀 点击开始按钮，机器人将自动移动
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              💰 收集金币获得额外分数
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                marginBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              🏁 引导机器人到达终点即可过关
            </li>
            <li 
              className="pixel-font"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.05)',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                borderRadius: '4px',
                color: 'var(--pixel-color-text)',
                fontSize: '16px'
              }}
            >
              ⚠️ 碰到障碍物或掉出地图则失败
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <button
            className="pixel-button pixel-font"
            style={{ 
              fontSize: '20px',
              paddingTop: '16px',
              paddingBottom: '16px',
              paddingLeft: '32px',
              paddingRight: '32px'
            }}
            onClick={() => navigate('/levels')}
          >
            开始游戏 🎮
          </button>
        </div>

        <div 
          className="flex justify-center"
          style={{ 
            gap: '32px',
            fontSize: '36px'
          }}
        >
          <span className="coin-animation">💰</span>
          <span className="robot-animation">🤖</span>
          <span 
            className="coin-animation"
            style={{ animationDelay: '0.5s' }}
          >
            💰
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
