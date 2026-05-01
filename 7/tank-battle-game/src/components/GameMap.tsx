import React from 'react'
import { TileType } from '../types'
import { TILE_SIZE } from '../utils/gameUtils'

interface GameMapProps {
  tiles: number[][]
}

const GameMap: React.FC<GameMapProps> = ({ tiles }) => {
  const getTileStyle = (tile: number) => {
    switch (tile) {
      case TileType.BRICK:
        return {
          backgroundColor: '#8B4513',
          backgroundImage: `
            linear-gradient(45deg, #A0522D 25%, transparent 25%),
            linear-gradient(-45deg, #A0522D 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #A0522D 75%),
            linear-gradient(-45deg, transparent 75%, #A0522D 75%)
          `,
          backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
          backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px',
          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)'
        }
      case TileType.STEEL:
        return {
          backgroundColor: '#708090',
          backgroundImage: `
            linear-gradient(135deg, #9CA3AF 25%, transparent 25%),
            linear-gradient(225deg, #9CA3AF 25%, transparent 25%),
            linear-gradient(45deg, #9CA3AF 25%, transparent 25%),
            linear-gradient(315deg, #9CA3AF 25%, transparent 25%)
          `,
          backgroundSize: `${TILE_SIZE / 2}px ${TILE_SIZE / 2}px`,
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.4), 0 0 3px rgba(255,255,255,0.3)'
        }
      case TileType.WATER:
        return {
          backgroundColor: '#1E90FF',
          backgroundImage: `
            linear-gradient(0deg, rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px',
          animation: 'waterFlow 2s ease-in-out infinite'
        }
      case TileType.GRASS:
        return {
          backgroundColor: '#228B22',
          backgroundImage: `
            radial-gradient(circle, #32CD32 1px, transparent 1px)
          `,
          backgroundSize: '6px 6px',
          opacity: 0.8
        }
      case TileType.BASE:
        return {
          backgroundColor: '#FFD700',
          border: '2px solid #FF8C00',
          boxShadow: '0 0 10px rgba(255,215,0,0.6), inset 0 0 5px rgba(255,255,255,0.3)'
        }
      default:
        return {
          backgroundColor: '#1a1a2e'
        }
    }
  }

  return (
    <div className="absolute inset-0">
      {tiles.map((row, y) => (
        <div key={y} className="flex">
          {row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                ...getTileStyle(tile)
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes waterFlow {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

export default GameMap