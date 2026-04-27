interface GameStatusProps {
  paint: number;
  maxPaint: number;
  lives: number;
  maxLives: number;
  score: number;
  waveIndex: number;
  totalWaves: number;
  levelName: string;
}

export function GameStatus({
  paint,
  maxPaint,
  lives,
  maxLives,
  score,
  waveIndex,
  totalWaves,
  levelName,
}: GameStatusProps) {
  const paintPercentage = (paint / maxPaint) * 100;

  return (
    <div className="doodle-card p-4 mb-4">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold">🎮 {levelName}</h3>
          <p className="text-sm text-gray-600">
            波次: {waveIndex + 1} / {totalWaves}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-600">⭐ {score}</p>
          <p className="text-xs text-gray-500">得分</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold">🎨 颜料</span>
            <span>{Math.round(paint)} / {maxPaint}</span>
          </div>
          <div className="paint-bar">
            <div
              className="paint-bar-fill"
              style={{
                width: `${paintPercentage}%`,
                background: paintPercentage > 30 
                  ? 'linear-gradient(90deg, #8b5cf6, #ec4899)' 
                  : 'linear-gradient(90deg, #ef4444, #f97316)',
              }}
            />
            <span className="paint-bar-text">
              {Math.round(paintPercentage)}%
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold">❤️ 生命</span>
            <span>{lives} / {maxLives}</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: maxLives }).map((_, i) => (
              <span
                key={i}
                className={`text-2xl transition-all duration-200 ${
                  i < lives ? 'scale-100' : 'scale-75 opacity-30 grayscale'
                }`}
              >
                {i < lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
