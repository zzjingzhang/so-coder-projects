import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'antd';
import { useGameEngine } from '../hooks/useGameEngine';
import { GameHUD } from '../components/GameHUD';
import { getLevelById } from '../data/levels';
import { useGameContext } from '../context/GameContext';

export const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { levelId = '1' } = useParams<{ levelId: string }>();
  const { updateGameState, gameState } = useGameContext();

  const currentLevelId = parseInt(levelId, 10) || 1;
  const level = getLevelById(currentLevelId);

  const {
    canvasRef,
    gameState: engineState,
    togglePause,
    restartLevel,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  } = useGameEngine(currentLevelId);

  const handleHome = () => {
    Modal.confirm({
      title: '返回主菜单',
      content: '确定要返回主菜单吗？当前进度将会丢失。',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        navigate('/');
      },
    });
  };

  const handlePause = () => {
    togglePause();
    if (!engineState.isPaused) {
      Modal.info({
        title: '游戏已暂停',
        content: (
          <div className="text-center">
            <p className="mb-2">按 ESC 或 P 键继续游戏</p>
            <p className="text-sm text-gray-500">
              方向键/WASD 移动 | 空格键跳跃
            </p>
          </div>
        ),
        onOk: () => togglePause(),
        okText: '继续',
      });
    }
  };

  React.useEffect(() => {
    if (engineState.isVictory) {
      const newTotalScore = gameState.totalScore + engineState.score;
      const newTotalEnergy = gameState.totalEnergy + engineState.collectedCount;
      const newUnlockedLevels = [...gameState.unlockedLevels];

      if (currentLevelId + 1 <= 3 && !newUnlockedLevels.includes(currentLevelId + 1)) {
        newUnlockedLevels.push(currentLevelId + 1);
      }

      updateGameState({
        totalScore: newTotalScore,
        totalEnergy: newTotalEnergy,
        unlockedLevels: newUnlockedLevels,
      });

      const timer = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [engineState.isVictory, engineState.score, engineState.collectedCount, currentLevelId, gameState, updateGameState, navigate]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-poly-purple/50 rounded-lg shadow-2xl shadow-poly-purple/20"
        />

        <GameHUD
          score={engineState.score}
          health={engineState.player.health}
          maxHealth={engineState.player.maxHealth}
          collectedCount={engineState.collectedCount}
          totalCount={engineState.totalCount}
          levelName={level?.name || `关卡 ${currentLevelId}`}
          onPause={handlePause}
          onRestart={restartLevel}
          onHome={handleHome}
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-6 py-2 text-white text-sm">
          <span className="mr-4">← → / A D 移动</span>
          <span className="mr-4">↑ / W / 空格 跳跃</span>
          <span>ESC / P 暂停</span>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
