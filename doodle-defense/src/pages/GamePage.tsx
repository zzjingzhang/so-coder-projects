import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameCanvas } from '@/components/GameCanvas';
import { Toolbar } from '@/components/Toolbar';
import { GameStatus } from '@/components/GameStatus';
import { useGameLogic } from '@/hooks/useGameLogic';
import { LEVELS } from '@/types';
import type { Point, LineType } from '@/types';

export function GamePage() {
  const navigate = useNavigate();
  const { levelId } = useParams<{ levelId: string }>();
  const levelIndex = levelId ? parseInt(levelId, 10) - 1 : 0;
  
  const [showModal, setShowModal] = useState(false);
  
  const {
    gameState,
    startGame,
    pauseGame,
    stopGame,
    setSelectedLineType,
    addLine,
    canvasWidth,
    canvasHeight,
  } = useGameLogic();

  const currentLevel = LEVELS[levelIndex] || LEVELS[0];

  useEffect(() => {
    startGame(levelIndex);
  }, [levelIndex, startGame]);

  useEffect(() => {
    if (gameState.status === 'won' || gameState.status === 'lost') {
      setShowModal(true);
    }
  }, [gameState.status]);

  const handleDrawLine = (points: Point[], type: LineType) => {
    addLine(points, type);
  };

  const handleRestart = () => {
    setShowModal(false);
    startGame(levelIndex);
  };

  const handleBackToMenu = () => {
    stopGame();
    navigate('/');
  };

  const handleNextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setShowModal(false);
      navigate(`/game/${levelIndex + 2}`);
    } else {
      handleBackToMenu();
    }
  };

  const isPlaying = gameState.status === 'playing';

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-4">
          <button
            onClick={handleBackToMenu}
            className="doodle-button text-sm"
          >
            ← 返回菜单
          </button>
          <h1 className="text-2xl font-bold">🎨 涂鸦防线</h1>
          <div className="flex gap-2">
            <button
              onClick={pauseGame}
              disabled={!isPlaying && gameState.status !== 'paused'}
              className="doodle-button text-sm"
            >
              {gameState.status === 'paused' ? '▶ 继续' : '⏸ 暂停'}
            </button>
            <button
              onClick={handleRestart}
              className="doodle-button text-sm bg-amber-500 hover:bg-amber-600"
            >
              🔄 重新开始
            </button>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-72">
            <GameStatus
              paint={gameState.paint}
              maxPaint={gameState.maxPaint}
              lives={gameState.lives}
              maxLives={gameState.maxLives}
              score={gameState.score}
              waveIndex={gameState.waveIndex}
              totalWaves={currentLevel.enemyWaves.length}
              levelName={currentLevel.name}
            />
            <Toolbar
              selectedLineType={gameState.selectedLineType}
              onSelectLineType={setSelectedLineType}
              isPlaying={isPlaying}
            />
          </div>

          <div className="flex-1">
            <div className="doodle-card p-3 inline-block">
              <GameCanvas
                width={canvasWidth}
                height={canvasHeight}
                lines={gameState.lines}
                enemies={gameState.enemies}
                particles={gameState.particles}
                selectedLineType={gameState.selectedLineType}
                isPlaying={isPlaying}
                obstacles={currentLevel.obstacles}
                startPoint={currentLevel.startPoint}
                endPoint={currentLevel.endPoint}
                onDrawLine={handleDrawLine}
              />
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="doodle-card p-8 max-w-md w-full mx-4 text-center">
              {gameState.status === 'won' ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">胜利！</h2>
                  <p className="text-lg mb-2">恭喜你成功保卫了基地！</p>
                  <p className="text-2xl font-bold text-purple-600 mb-6">
                    最终得分: ⭐ {gameState.score}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">💔</div>
                  <h2 className="text-3xl font-bold text-red-600 mb-4">失败</h2>
                  <p className="text-lg mb-2">敌人突破了防线...</p>
                  <p className="text-2xl font-bold text-purple-600 mb-6">
                    得分: ⭐ {gameState.score}
                  </p>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleRestart}
                  className="doodle-button"
                >
                  🔄 再试一次
                </button>
                {gameState.status === 'won' && levelIndex < LEVELS.length - 1 && (
                  <button
                    onClick={handleNextLevel}
                    className="doodle-button bg-green-500 hover:bg-green-600"
                  >
                    ➡ 下一关
                  </button>
                )}
                <button
                  onClick={handleBackToMenu}
                  className="doodle-button bg-gray-500 hover:bg-gray-600"
                >
                  🏠 返回菜单
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState.status === 'paused' && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40 pointer-events-none">
            <div className="doodle-card p-6 text-center pointer-events-auto">
              <div className="text-4xl mb-2">⏸</div>
              <h2 className="text-2xl font-bold mb-2">游戏暂停</h2>
              <p className="text-gray-600">点击"继续"按钮恢复游戏</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
