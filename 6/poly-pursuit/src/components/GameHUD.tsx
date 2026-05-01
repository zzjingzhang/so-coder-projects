import React from 'react';
import { Button } from 'antd';
import { PauseOutlined, HomeOutlined, ReloadOutlined } from '@ant-design/icons';

interface GameHUDProps {
  score: number;
  health: number;
  maxHealth: number;
  collectedCount: number;
  totalCount: number;
  levelName: string;
  onPause: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  health,
  maxHealth,
  collectedCount,
  totalCount,
  levelName,
  onPause,
  onRestart,
  onHome,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
      <div className="flex flex-col gap-2 pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <div className="text-sm text-gray-300">关卡</div>
          <div className="text-lg font-bold text-poly-blue">{levelName}</div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <div className="text-sm text-gray-300">得分</div>
          <div className="text-xl font-bold text-yellow-400">{score}</div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <div className="text-sm text-gray-300 mb-1">生命值</div>
          <div className="flex gap-1">
            {Array.from({ length: maxHealth }).map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-sm transition-all ${
                  i < health
                    ? 'bg-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
          <div className="text-sm text-gray-300">能量碎片</div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-yellow-400 rotate-45 shadow-lg shadow-yellow-400/50" />
            <span className="text-lg font-bold">
              {collectedCount}/{totalCount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pointer-events-auto">
        <Button
          type="text"
          icon={<PauseOutlined />}
          onClick={onPause}
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 rounded-lg w-12 h-12 flex items-center justify-center text-xl"
        />
        <Button
          type="text"
          icon={<ReloadOutlined />}
          onClick={onRestart}
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 rounded-lg w-12 h-12 flex items-center justify-center text-xl"
        />
        <Button
          type="text"
          icon={<HomeOutlined />}
          onClick={onHome}
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 rounded-lg w-12 h-12 flex items-center justify-center text-xl"
        />
      </div>
    </div>
  );
};

export default GameHUD;
