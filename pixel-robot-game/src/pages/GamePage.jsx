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
      <div className="relative w-full h-full flex items-center justify-center">
        {cellType === CellType.START && !isRobotHere && (
          <div className="text-2xl pixel-font font-bold" style={{ color: 'var(--pixel-color-bg)' }}>
            起
          </div>
        )}

        {cellType === CellType.END && (
          <div className="text-3xl">
            🏁
          </div>
        )}

        {cellType === CellType.OBSTACLE && (
          <div className="text-3xl">
            🧱
          </div>
        )}

        {cellType === CellType.COIN && !isCollected && (
          <div className="text-2xl coin-animation">
            💰
          </div>
        )}

        {arrowHere && !isRobotHere && (
          <div 
            className="text-3xl font-bold pixel-font"
            style={{ 
              color: 'var(--pixel-color-secondary)',
              textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
            }}
          >
            {getDirectionArrow(arrowHere.direction)}
          </div>
        )}

        {isRobotHere && (
          <div 
            className={`text-3xl ${gameStatus === GameStatus.RUNNING ? 'robot-animation' : ''}`}
            style={{
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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <div className="order-2 lg:order-1">
            <button
              className="pixel-button pixel-button-secondary pixel-font"
              onClick={() => navigate('/levels')}
            >
              ← 返回关卡选择
            </button>
          </div>
          
          <div className="text-center order-1 lg:order-2">
            <h1 
              className="text-3xl font-bold mb-2 pixel-font"
              style={{ color: 'var(--pixel-color-primary)' }}
            >
              关卡 {currentLevel.id}: {currentLevel.name}
            </h1>
            <p 
              className="pixel-font text-sm"
              style={{ color: 'var(--pixel-color-text)' }}
            >
              {currentLevel.description}
            </p>
          </div>
          
          <div className="text-right pixel-font order-3" style={{ color: 'var(--pixel-color-text)' }}>
            <div className="mb-2">💰 金币: {collectedCoins.length}/{totalCoins}</div>
            <div>📍 箭头: {usedArrowCount}/{currentLevel.maxArrows || '∞'}</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div 
            className="p-6 rounded-lg flex-shrink-0"
            style={{ 
              backgroundColor: 'var(--pixel-color-bg-light)',
              border: '4px solid var(--pixel-color-border)',
              boxShadow: '4px 4px 0px var(--pixel-color-border)'
            }}
          >
            <div 
              className="grid gap-1"
              style={{ 
                gridTemplateColumns: `repeat(${currentLevel.gridSize.cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${currentLevel.gridSize.rows}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: currentLevel.gridSize.rows }).map((_, row) =>
                Array.from({ length: currentLevel.gridSize.cols }).map((_, col) => (
                  <div
                    key={`${row}-${col}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer transition-transform hover:scale-105"
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

          <div className="flex-1 space-y-8">
            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)'
              }}
            >
              <h3 
                className="text-xl font-bold mb-6 pixel-font"
                style={{ color: 'var(--pixel-color-accent)' }}
              >
                选择箭头方向
              </h3>
              <p 
                className="text-sm mb-6 pixel-font"
                style={{ color: 'var(--pixel-color-text)' }}
              >
                选择方向后点击地图放置箭头，右键点击移除箭头
              </p>
              
              <div className="grid grid-cols-3 gap-3 max-w-xs">
                <div></div>
                <button
                  className={`pixel-button pixel-font text-2xl py-4 ${selectedArrow === Direction.UP ? 'pixel-button-accent' : ''}`}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.UP ? null : Direction.UP)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ↑
                </button>
                <div></div>
                
                <button
                  className={`pixel-button pixel-font text-2xl py-4 ${selectedArrow === Direction.LEFT ? 'pixel-button-accent' : ''}`}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.LEFT ? null : Direction.LEFT)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ←
                </button>
                <button
                  className={`pixel-button pixel-font text-2xl py-4 ${selectedArrow === Direction.DOWN ? 'pixel-button-accent' : ''}`}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.DOWN ? null : Direction.DOWN)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  ↓
                </button>
                <button
                  className={`pixel-button pixel-font text-2xl py-4 ${selectedArrow === Direction.RIGHT ? 'pixel-button-accent' : ''}`}
                  onClick={() => setSelectedArrow(selectedArrow === Direction.RIGHT ? null : Direction.RIGHT)}
                  disabled={gameStatus !== GameStatus.READY}
                >
                  →
                </button>
              </div>
              
              {selectedArrow && (
                <div 
                  className="mt-6 text-center pixel-font font-bold p-3 rounded"
                  style={{ 
                    color: 'var(--pixel-color-accent)',
                    backgroundColor: 'rgba(255, 217, 61, 0.1)'
                  }}
                >
                  已选择: {getDirectionArrow(selectedArrow)}
                </div>
              )}
            </div>

            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)'
              }}
            >
              <h3 
                className="text-xl font-bold mb-6 pixel-font"
                style={{ color: 'var(--pixel-color-accent)' }}
              >
                游戏控制
              </h3>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {gameStatus === GameStatus.READY && (
                  <button
                    className="pixel-button pixel-button-success pixel-font text-lg px-8 py-4"
                    onClick={startGame}
                  >
                    🚀 开始游戏
                  </button>
                )}
                
                {gameStatus === GameStatus.RUNNING && (
                  <div 
                    className="pixel-font text-lg px-8 py-4 rounded"
                    style={{ 
                      backgroundColor: 'var(--pixel-color-primary)',
                      color: 'var(--pixel-color-bg)',
                      boxShadow: '0 0 20px var(--pixel-color-primary)'
                    }}
                  >
                    🏃 游戏运行中...
                  </div>
                )}
                
                <button
                  className="pixel-button pixel-button-secondary pixel-font text-lg px-8 py-4"
                  onClick={resetGame}
                >
                  🔄 重置
                </button>
              </div>
              
              <div 
                className="pixel-font p-4 rounded"
                style={{ 
                  color: 'var(--pixel-color-text)',
                  backgroundColor: 'rgba(255,255,255,0.05)'
                }}
              >
                <div>当前状态: 
                  <span 
                    className="ml-3 font-bold text-lg"
                    style={{ 
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
                className="p-8 rounded-lg text-center"
                style={{ 
                  backgroundColor: 'var(--pixel-color-success)',
                  border: '4px solid var(--pixel-color-success)',
                  boxShadow: '0 0 30px var(--pixel-color-success)'
                }}
              >
                <div className="text-6xl mb-6">🎉</div>
                <h3 
                  className="text-3xl font-bold mb-4 pixel-font"
                  style={{ color: 'var(--pixel-color-bg)' }}
                >
                  恭喜通关！
                </h3>
                <p 
                  className="mb-6 pixel-font text-lg"
                  style={{ color: 'var(--pixel-color-bg)' }}
                >
                  收集金币: {collectedCoins.length}/{totalCoins}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    className="pixel-button pixel-font text-lg px-6 py-3"
                    style={{ backgroundColor: 'var(--pixel-color-bg)', color: 'var(--pixel-color-primary)' }}
                    onClick={resetGame}
                  >
                    🔄 再玩一次
                  </button>
                  <button
                    className="pixel-button pixel-font text-lg px-6 py-3"
                    style={{ backgroundColor: 'var(--pixel-color-bg)', color: 'var(--pixel-color-primary)' }}
                    onClick={nextLevel}
                  >
                    ➡️ 下一关
                  </button>
                </div>
              </div>
            )}

            {gameStatus === GameStatus.LOST && (
              <div 
                className="p-8 rounded-lg text-center"
                style={{ 
                  backgroundColor: 'var(--pixel-color-danger)',
                  border: '4px solid var(--pixel-color-danger)',
                  boxShadow: '0 0 30px var(--pixel-color-danger)'
                }}
              >
                <div className="text-6xl mb-6">💀</div>
                <h3 
                  className="text-3xl font-bold mb-4 pixel-font"
                  style={{ color: 'var(--pixel-color-bg)' }}
                >
                  游戏失败
                </h3>
                <p 
                  className="mb-6 pixel-font text-lg"
                  style={{ color: 'var(--pixel-color-bg)' }}
                >
                  机器人碰到了障碍物或掉出了地图
                </p>
                <button
                  className="pixel-button pixel-font text-lg px-8 py-4"
                  style={{ backgroundColor: 'var(--pixel-color-bg)', color: 'var(--pixel-color-danger)' }}
                  onClick={resetGame}
                >
                  🔄 重新尝试
                </button>
              </div>
            )}

            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: 'var(--pixel-color-bg-light)',
                border: '4px solid var(--pixel-color-border)',
                boxShadow: '4px 4px 0px var(--pixel-color-border)'
              }}
            >
              <h3 
                className="text-xl font-bold mb-6 pixel-font"
                style={{ color: 'var(--pixel-color-accent)' }}
              >
                图例
              </h3>
              <div className="grid grid-cols-2 gap-4 pixel-font text-sm" style={{ color: 'var(--pixel-color-text)' }}>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl mr-3">🤖</span>
                  <span>机器人</span>
                </div>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl mr-3">🏁</span>
                  <span>终点</span>
                </div>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl mr-3">💰</span>
                  <span>金币</span>
                </div>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl mr-3">🧱</span>
                  <span>障碍物</span>
                </div>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <div 
                    className="w-8 h-8 mr-3 rounded"
                    style={{ backgroundColor: 'var(--pixel-color-success)' }}
                  ></div>
                  <span>起点</span>
                </div>
                <div className="flex items-center p-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="text-2xl mr-3">↑↓←→</span>
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
