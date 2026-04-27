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
    <div 
      className="min-h-screen"
      style={{ padding: '32px' }}
    >
      <div style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div 
          className="text-center"
          style={{ marginBottom: '48px' }}
        >
          <div style={{ marginBottom: '24px' }}>
            <button
              className="pixel-button pixel-button-secondary pixel-font"
              onClick={() => navigate('/')}
            >
              ← 返回主页
            </button>
          </div>
          <h1 
            className="pixel-font"
            style={{ 
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: 'var(--pixel-color-primary)', 
              textShadow: '3px 3px 0px var(--pixel-color-border)'
            }}
          >
            选择关卡
          </h1>
          <p 
            className="pixel-font"
            style={{ 
              fontSize: '18px',
              color: 'var(--pixel-color-text)'
            }}
          >
            选择一个关卡开始游戏
          </p>
        </div>

        <div 
          style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '48px'
          }}
        >
          {levels.map((level) => (
            <div
              key={level.id}
              style={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onClick={() => navigate(`/game/${level.id}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div 
                style={{ 
                  padding: '32px',
                  height: '100%',
                  backgroundColor: 'var(--pixel-color-bg-light)',
                  border: '4px solid var(--pixel-color-border)',
                  boxShadow: '4px 4px 0px var(--pixel-color-border)',
                  borderRadius: '8px'
                }}
              >
                <div 
                  style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '24px'
                  }}
                >
                  <div 
                    className="pixel-font"
                    style={{ 
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: 'var(--pixel-color-primary)'
                    }}
                  >
                    {level.id}
                  </div>
                  <div 
                    className="pixel-font"
                    style={{ 
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      backgroundColor: getDifficultyColor(level),
                      color: 'var(--pixel-color-bg)'
                    }}
                  >
                    {getDifficultyText(level)}
                  </div>
                </div>

                <h2 
                  className="pixel-font"
                  style={{ 
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: 'var(--pixel-color-accent)',
                    textDecoration: 'none'
                  }}
                >
                  {level.name}
                </h2>

                <p 
                  className="pixel-font"
                  style={{ 
                    fontSize: '14px',
                    marginBottom: '24px',
                    color: 'var(--pixel-color-text)',
                    textDecoration: 'none'
                  }}
                >
                  {level.description}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <div 
                    className="pixel-font"
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      marginBottom: '16px',
                      fontSize: '14px',
                      color: 'var(--pixel-color-text)',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px' }}>📐</span>
                      <span>{level.gridSize.rows} x {level.gridSize.cols}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px' }}>💰</span>
                      <span>{level.coins.length} 金币</span>
                    </div>
                  </div>

                  <div 
                    className="pixel-font"
                    style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      fontSize: '14px',
                      color: 'var(--pixel-color-text)',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px' }}>➡️</span>
                      <span>初始方向: {getDirectionArrow(level.startDirection)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '8px' }}>📍</span>
                      <span>最多 {level.maxArrows || '∞'} 个箭头</span>
                    </div>
                  </div>
                </div>

                <div 
                  className="pixel-font"
                  style={{ 
                    marginTop: '16px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    borderRadius: '4px',
                    color: 'var(--pixel-color-primary)',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    textDecoration: 'none'
                  }}
                >
                  点击开始 →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="text-center"
          style={{ marginTop: '48px' }}
        >
          <div 
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              fontSize: '36px'
            }}
          >
            <span className="robot-animation">🤖</span>
            <span className="coin-animation">💰</span>
            <span 
              className="robot-animation"
              style={{ animationDelay: '0.3s' }}
            >
              🤖
            </span>
            <span 
              className="coin-animation"
              style={{ animationDelay: '0.5s' }}
            >
              💰
            </span>
            <span 
              className="robot-animation"
              style={{ animationDelay: '0.6s' }}
            >
              🤖
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelectPage;
