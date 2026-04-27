import { useParams, useNavigate } from 'react-router-dom';
import { useGameState } from '../hooks/useGameState';
import { Direction, GameStatus, CellType } from '../types';
import { getDirectionArrow, getCellType } from '../utils/gameUtils';

const GamePage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  
  const {
    currentLevel,
    robotPos,
    robotDirection,
    arrows,
    collectedCoins,
    gameStatus,
    selectedArrow,
    usedArrowCount,
    totalCoins,
    setSelectedArrow,
    placeArrow,
    removeArrow,
    startGame,
    resetGame,
    changeLevel
  } = useGameState(parseInt(levelId) || 1);

  const handleCellClick = (row, col) => {
    if (gameStatus !== GameStatus.READY) return;
    
    const existingArrow = arrows.find((a) => a.row === row && a.col === col);
    if (existingArrow) {
      if (selectedArrow) {
        placeArrow(row, col);
      } else {
        removeArrow(row, col);
      }
    } else if (selectedArrow) {
      placeArrow(row, col);
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    removeArrow(row, col);
  };

  const getCellStyle = (row, col) => {
    const cellType = getCellType(row, col, currentLevel);
    const isCollected = collectedCoins.some((c) => c.row === row && c.col === col);
    const hasArrow = arrows.find((a) => a.row === row && a.col === col);
    
    let bgColor = 'var(--pixel-color-bg-light)';
    let borderColor = 'var(--pixel-color-border)';
    
    switch (cellType) {
      case CellType.START:
        bgColor = 'var(--pixel-color-success)';
        break;
      case CellType.END:
        bgColor = 'var(--pixel-color-primary)';
        break;
      case CellType.OBSTACLE:
        bgColor = 'var(--pixel-color-danger)';
        borderColor = 'var(--pixel-color-danger)';
        break;
      case CellType.COIN:
        if (!isCollected) {
          bgColor = 'var(--pixel-color-bg-light)';
        }
        break;
    }
    
    return {
      backgroundColor: bgColor,
      border: `2px solid ${borderColor}`,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
    };
  };

  const getRobotRotation = () => {
    switch (robotDirection) {
      case Direction.UP:
        return 0;
      case Direction.RIGHT:
        return 90;
      case Direction.DOWN:
        return 180;
      case Direction.LEFT:
        return 270;
      default:
        return 0;
    }
  };

  const nextLevel = () => {
    const nextLevelId = currentLevel.id + 1;
    const maxLevelId = 5;
    if (nextLevelId <= maxLevelId) {
      changeLevel(nextLevelId);
      navigate(`/game/${nextLevelId}`);
    } else {
      navigate('/levels');
    }
  };

  const renderCellContent = (row, col) => {
    const cellType = getCellType(row, col, currentLevel);
    const isRobotHere = robotPos.row === row && robotPos.col === col;
    const arrowHere = arrows.find((a) => a.row === row && a.col === col);
    const isCollected = collectedCoins.some((c) => c.row === row && c.col === col);

    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        {cellType === CellType.START && !isRobotHere && (
          <div 
            className="pixel-font"
            style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: 'var(--pixel-color-bg)' 
            }}
          >
            起
          </div>
        )}

        {cellType === CellType.END && (
          <div style={{ fontSize: '32px' }}>
            🏁
          </div>
        )}

        {cellType === CellType.OBSTACLE && (
          <div style={{ fontSize: '32px' }}>
            🧱
          </div>
        )}

        {cellType === CellType.COIN && !isCollected && (
          <div className="coin-animation" style={{ fontSize: '24px' }}>
            💰
          </div>
        )}

        {arrowHere && !isRobotHere && (
          <div 
            className="pixel-font"
            style={{ 
              fontSize: '32px', 
              fontWeight: 'bold',
              color: 'var(--pixel-color-secondary)',
              textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
            }}
          >
            {getDirectionArrow(arrowHere.direction)}
          </div>
        )}

        {isRobotHere && (
          <div 
            className={gameStatus === GameStatus.RUNNING ? 'robot-animation' : ''}
            style={{
              fontSize: '32px',
              transform: `rotate(${getRobotRotation()}deg)`,
              transition: 'transform 0.2s ease'
            }}
          >
            🤖
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ padding: '32px' }}>
      <div style={{ maxWidth: '1400px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            gap: '24px'
          }}
        >
          <div style={{ order: 2 }}>
            <button
              className="pixel-button pixel-button-secondary pixel-font"
              onClick={() => navigate('/levels')}
            >
              ← 返回关卡选择
            </button>
          </div>
          
          <div style={{ textAlign: 'center', order: 1 }}>
            <h1 
              className="pixel-font"
              style={{ 
                fontSize: '36px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'var(--pixel-color-primary)',
                textDecoration: 'none'
              }}
            >
              关卡 {currentLevel.id}: {currentLevel.name}
            </h1>
            <p 
              className="pixel-font"
              style={{ 
                fontSize: '14px',
                color: 'var(--pixel-color-text)',
                textDecoration: 'none'
              }}
            >
              {currentLevel.description}
            </p>
          </div>
          
          <div 
            className="pixel-font"
            style={{ 
              textAlign: 'right',
              color: 'var(--pixel-color-text)',
              order: 3,
              textDecoration: 'none'
            }}
          >
            <div style={{ marginBottom: '8px' }}>💰 金币: {collectedCoins.length}/{totalCoins}</div>
            <div>📍 箭头: {usedArrowCount}/{currentLevel.maxArrows || '∞'}</div>
          </div>
        </div>

        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '32px'
          }}
        >
          <div 
            style={{ 
              padding: '24px',
              flexShrink: 0,
              backgroundColor: 'var(--pixel-color-bg-light)',
              border: '4px solid var(--pixel-color-border)',
              boxShadow: '4px 4px 0px var(--pixel-color-border)',
              borderRadius: '8px'
            }}
          >
            <div 
              style={{ 
                display: 'grid',
                gap: '4px',
                gridTemplateColumns: `repeat(${currentLevel.gridSize.cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${currentLevel.gridSize.rows}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: currentLevel.gridSize.rows }).map((_, row) =>
                Array.from({ length: currentLevel.gridSize.cols }).map((_, col) => (
                  <div
                    key={`${row}-${col}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (gameStatus === GameStatus.READY) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    style={getCellStyle(row, col)}
                    onClick={() => handleCellClick(row, col)}
                    onContextMenu={(e) => handleRightClick(e, row, col)}
                  >
                    {renderCellContent(row, col)}
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div 
              style={{ 
                padding: '24px',
                marginBottom: '32px',
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)',
                borderRadius: '8px'
              }}
            >
              <h3 
                className="pixel-font"
                style={{ 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: 'var(--pixel-color-accent)',
                  textDecoration: 'none'
                }}
              >
                选择箭头方向
              </h3>
              <p 
                className="pixel-font"
                style={{ 
                  fontSize: '14px',
                  marginBottom: '24px',
                  color: 'var(--pixel-color-text)',
                  textDecoration: 'none'
                }}
              >
                选择方向后点击地图放置箭头，右键点击移除箭头
              </p>
              
              <div 
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  maxWidth: '200px'
                }}
              >
                <div></div>
                <button
                  className="pixel-button pixel-font"
                  style={{
                    fontSize: '32px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    backgroundColor: selectedArrow === Direction.UP 
                      ? 'var(--pixel-color-accent)' 
                      : 'var(--pixel-color-primary)'
                  }}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.UP ? null : Direction.UP)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ↑
                </button>
                <div></div>
                
                <button
                  className="pixel-button pixel-font"
                  style={{
                    fontSize: '32px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    backgroundColor: selectedArrow === Direction.LEFT 
                      ? 'var(--pixel-color-accent)' 
                      : 'var(--pixel-color-primary)'
                  }}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.LEFT ? null : Direction.LEFT)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ←
                </button>
                <button
                  className="pixel-button pixel-font"
                  style={{
                    fontSize: '32px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    backgroundColor: selectedArrow === Direction.DOWN 
                      ? 'var(--pixel-color-accent)' 
                      : 'var(--pixel-color-primary)'
                  }}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.DOWN ? null : Direction.DOWN)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ↓
                </button>
                <button
                  className="pixel-button pixel-font"
                  style={{
                    fontSize: '32px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    backgroundColor: selectedArrow === Direction.RIGHT 
                      ? 'var(--pixel-color-accent)' 
                      : 'var(--pixel-color-primary)'
                  }}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.RIGHT ? null : Direction.RIGHT)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  →
                </button>
              </div>
              
              {selectedArrow && (
                <div 
                  className="pixel-font"
                  style={{ 
                    marginTop: '24px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    borderRadius: '4px',
                    color: 'var(--pixel-color-accent)',
                    backgroundColor: 'rgba(255, 217, 61, 0.1)',
                    textDecoration: 'none'
                  }}
                >
                  已选择: {getDirectionArrow(selectedArrow)}
                </div>
              )}
            </div>

            <div 
              style={{ 
                padding: '24px',
                marginBottom: '32px',
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)',
                borderRadius: '8px'
              }}
            >
              <h3 
                className="pixel-font"
                style={{ 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: 'var(--pixel-color-accent)',
                  textDecoration: 'none'
                }}
              >
                游戏控制
              </h3>
              
              <div 
                style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '24px'
                }}
              >
                {gameStatus === GameStatus.READY && (
                  <button
                    className="pixel-button pixel-button-success pixel-font"
                    style={{ fontSize: '18px' }}
                    onClick={startGame}
                  >
                    🚀 开始游戏
                  </button>
                )}
                
                {gameStatus === GameStatus.RUNNING && (
                  <div 
                    className="pixel-font"
                    style={{ 
                      fontSize: '18px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      paddingLeft: '32px',
                      paddingRight: '32px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--pixel-color-primary)',
                      color: 'var(--pixel-color-bg)',
                      boxShadow: '0 0 20px var(--pixel-color-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    🏃 游戏运行中...
                  </div>
                )}
                
                <button
                  className="pixel-button pixel-button-secondary pixel-font"
                  style={{ fontSize: '18px' }}
                  onClick={resetGame}
                >
                  🔄 重置
                </button>
              </div>
              
              <div 
                className="pixel-font"
                style={{ 
                  padding: '16px',
                  borderRadius: '4px',
                  color: 'var(--pixel-color-text)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  textDecoration: 'none'
                }}
              >
                <div>当前状态: 
                  <span 
                    style={{ 
                      marginLeft: '12px',
                      fontWeight: 'bold',
                      fontSize: '20px',
                      color: gameStatus === GameStatus.WON 
                        ? 'var(--pixel-color-success)' 
                        : gameStatus === GameStatus.LOST 
                          ? 'var(--pixel-color-danger)' 
                          : 'var(--pixel-color-primary)'
                    }}
                  >
                    {gameStatus === GameStatus.READY && '准备就绪'}
                    {gameStatus === GameStatus.RUNNING && '运行中'}
                    {gameStatus === GameStatus.WON && '🎉 胜利!'}
                    {gameStatus === GameStatus.LOST && '💀 失败'}
                  </span>
                </div>
              </div>
            </div>

            {gameStatus === GameStatus.WON && (
              <div 
                style={{ 
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  backgroundColor: 'var(--pixel-color-success)',
                  border: '4px solid var(--pixel-color-success)',
                  boxShadow: '0 0 30px var(--pixel-color-success)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
                <h3 
                  className="pixel-font"
                  style={{ 
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: 'var(--pixel-color-bg)',
                    textDecoration: 'none'
                  }}
                >
                  恭喜通关！
                </h3>
                <p 
                  className="pixel-font"
                  style={{ 
                    fontSize: '18px',
                    marginBottom: '24px',
                    color: 'var(--pixel-color-bg)',
                    textDecoration: 'none'
                  }}
                >
                  收集金币: {collectedCoins.length}/{totalCoins}
                </p>
                <div 
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '16px'
                  }}
                >
                  <button
                    className="pixel-button pixel-font"
                    style={{ 
                      fontSize: '18px',
                      backgroundColor: 'var(--pixel-color-bg)', 
                      color: 'var(--pixel-color-primary)' 
                    }}
                    onClick={resetGame}
                  >
                    🔄 再玩一次
                  </button>
                  <button
                    className="pixel-button pixel-font"
                    style={{ 
                      fontSize: '18px',
                      backgroundColor: 'var(--pixel-color-bg)', 
                      color: 'var(--pixel-color-primary)' 
                    }}
                    onClick={nextLevel}
                  >
                    ➡️ 下一关
                  </button>
                </div>
              </div>
            )}

            {gameStatus === GameStatus.LOST && (
              <div 
                style={{ 
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  backgroundColor: 'var(--pixel-color-danger)',
                  border: '4px solid var(--pixel-color-danger)',
                  boxShadow: '0 0 30px var(--pixel-color-danger)',
                  borderRadius: '8px'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>💀</div>
                <h3 
                  className="pixel-font"
                  style={{ 
                    fontSize: '36px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    color: 'var(--pixel-color-bg)',
                    textDecoration: 'none'
                  }}
                >
                  游戏失败
                </h3>
                <p 
                  className="pixel-font"
                  style={{ 
                    fontSize: '18px',
                    marginBottom: '24px',
                    color: 'var(--pixel-color-bg)',
                    textDecoration: 'none'
                  }}
                >
                  机器人碰到了障碍物或掉出了地图
                </p>
                <button
                  className="pixel-button pixel-font"
                  style={{ 
                    fontSize: '18px',
                    backgroundColor: 'var(--pixel-color-bg)', 
                    color: 'var(--pixel-color-danger)' 
                  }}
                  onClick={resetGame}
                >
                  🔄 重新尝试
                </button>
              </div>
            )}

            <div 
              style={{ 
                padding: '24px',
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)',
                borderRadius: '8px'
              }}
            >
              <h3 
                className="pixel-font"
                style={{ 
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                  color: 'var(--pixel-color-accent)',
                  textDecoration: 'none'
                }}
              >
                图例
              </h3>
              <div 
                className="pixel-font"
                style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px',
                  fontSize: '14px',
                  color: 'var(--pixel-color-text)',
                  textDecoration: 'none'
                }}
              >
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '12px' }}>🤖</span>
                  <span>机器人</span>
                </div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '12px' }}>🏁</span>
                  <span>终点</span>
                </div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '12px' }}>💰</span>
                  <span>金币</span>
                </div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '12px' }}>🧱</span>
                  <span>障碍物</span>
                </div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      marginRight: '12px', 
                      borderRadius: '4px',
                      backgroundColor: 'var(--pixel-color-success)' 
                    }}
                  ></div>
                  <span>起点</span>
                </div>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    backgroundColor: 'rgba(255,255,255,0.05)' 
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '12px' }}>↑↓←→</span>
                  <span>方向箭头</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
