import type { Region, Bridge } from '../types';
import './GameBoard.css';

interface GameBoardProps {
  currentPosition: Region | null;
  visitedBridges: number[];
  bridges: Bridge[];
  onRegionClick: (region: Region) => void;
  onBridgeClick: (bridgeId: number) => void;
  gameStarted: boolean;
}

const regionPositions: Record<Region, { x: number; y: number; label: string }> = {
  A: { x: 50, y: 50, label: 'A岛' },
  B: { x: 50, y: 85, label: 'B岛' },
  C: { x: 15, y: 50, label: 'C岸' },
  D: { x: 85, y: 50, label: 'D岸' },
};

const GameBoard = ({
  currentPosition,
  visitedBridges,
  bridges,
  onRegionClick,
  onBridgeClick,
  gameStarted,
}: GameBoardProps) => {
  const getBridgePath = (bridge: Bridge): string => {
    const from = regionPositions[bridge.from];
    const to = regionPositions[bridge.to];

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const bridgeCount = bridges.filter(
      (b) =>
        (b.from === bridge.from && b.to === bridge.to) ||
        (b.from === bridge.to && b.to === bridge.from)
    ).length;

    const bridgeIndex = bridges
      .filter(
        (b) =>
          (b.from === bridge.from && b.to === bridge.to) ||
          (b.from === bridge.to && b.to === bridge.from)
      )
      .indexOf(bridge);

    if (bridgeCount === 1) {
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;

      const perpX = -dy / distance;
      const perpY = dx / distance;

      const curveX = midX + perpX * 5;
      const curveY = midY + perpY * 5;

      return `M ${from.x} ${from.y} Q ${curveX} ${curveY} ${to.x} ${to.y}`;
    } else {
      const offset = (bridgeIndex - (bridgeCount - 1) / 2) * 6;

      const perpX = -dy / distance;
      const perpY = dx / distance;

      const startX = from.x + perpX * offset;
      const startY = from.y + perpY * offset;
      const endX = to.x + perpX * offset;
      const endY = to.y + perpY * offset;

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      const curveX = midX + perpX * 3;
      const curveY = midY + perpY * 3;

      return `M ${startX} ${startY} Q ${curveX} ${curveY} ${endX} ${endY}`;
    }
  };

  const isBridgeClickable = (bridge: Bridge): boolean => {
    if (!gameStarted || !currentPosition) return false;
    if (visitedBridges.includes(bridge.id)) return false;
    return bridge.from === currentPosition || bridge.to === currentPosition;
  };

  return (
    <div className="game-board">
      <svg viewBox="0 0 100 100" className="game-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="waterGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </radialGradient>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b4513" />
            <stop offset="50%" stopColor="#a0522d" />
            <stop offset="100%" stopColor="#8b4513" />
          </linearGradient>
          <linearGradient id="visitedBridgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="100" height="100" fill="url(#waterGradient)" rx="2" />

        {bridges.map((bridge) => {
          const isVisited = visitedBridges.includes(bridge.id);
          const isClickable = isBridgeClickable(bridge);

          return (
            <g key={bridge.id}>
              <path
                d={getBridgePath(bridge)}
                fill="none"
                stroke={isVisited ? 'url(#visitedBridgeGradient)' : 'url(#bridgeGradient)'}
                strokeWidth={isVisited ? 2.5 : 3.5}
                strokeLinecap="round"
                className={`bridge-path ${isVisited ? 'visited' : ''} ${isClickable ? 'clickable' : ''}`}
                onClick={() => isClickable && onBridgeClick(bridge.id)}
                style={{
                  cursor: isClickable ? 'pointer' : 'default',
                  opacity: isVisited ? 0.5 : 1,
                  transition: 'all 0.3s ease',
                }}
              />
              {isVisited && (
                <path
                  d={getBridgePath(bridge)}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  className="dashed-animation"
                  style={{
                    opacity: 0.6,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </g>
          );
        })}

        {Object.entries(regionPositions).map(([region, pos]) => {
          const isCurrentPosition = currentPosition === region;
          const isClickable = !gameStarted;

          const regionSize = region === 'A' || region === 'B' ? 14 : 16;
          const cornerRadius = region === 'A' || region === 'B' ? 7 : 4;

          return (
            <g
              key={region}
              onClick={() => isClickable && onRegionClick(region as Region)}
              style={{
                cursor: isClickable ? 'pointer' : 'default',
              }}
              className="region-group"
            >
              <rect
                x={pos.x - regionSize / 2}
                y={pos.y - regionSize / 2}
                width={regionSize}
                height={regionSize}
                fill="url(#landGradient)"
                rx={cornerRadius}
                stroke={isCurrentPosition ? '#ef4444' : '#166534'}
                strokeWidth={isCurrentPosition ? 1.5 : 0.8}
                filter={isCurrentPosition ? 'url(#glow)' : undefined}
                className={`region ${isCurrentPosition ? 'current' : ''} ${isClickable ? 'clickable' : ''}`}
              />

              {isCurrentPosition && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="#ef4444"
                  className="player-marker pulse-animation"
                  filter="url(#glow)"
                />
              )}

              <text
                x={pos.x}
                y={pos.y + (isCurrentPosition ? -10 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#14532d"
                fontSize={region === 'A' || region === 'B' ? 3.5 : 3}
                fontWeight="bold"
                className="region-label"
                style={{
                  pointerEvents: 'none',
                }}
              >
                {pos.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GameBoard;
