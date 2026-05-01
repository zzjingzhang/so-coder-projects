import React from 'react'
import { Tank as TankType, Direction } from '../types'
import { TILE_SIZE } from '../utils/gameUtils'

interface TankProps {
  tank: TankType
}

const Tank: React.FC<TankProps> = ({ tank }) => {
  const getRotation = () => {
    switch (tank.direction) {
      case Direction.UP: return 0
      case Direction.DOWN: return 180
      case Direction.LEFT: return -90
      case Direction.RIGHT: return 90
    }
  }

  const getTankColor = () => {
    if (tank.type === 'player') {
      return tank.color || '#4CAF50'
    }
    return tank.color || '#F44336'
  }

  return (
    <div
      className="absolute transition-transform duration-50"
      style={{
        left: tank.position.x,
        top: tank.position.y,
        width: TILE_SIZE,
        height: TILE_SIZE,
        transform: `rotate(${getRotation()}deg)`
      }}
    >
      <div
        className="relative w-full h-full"
        style={{ backgroundColor: getTankColor() }}
      >
        <div
          className="absolute left-1 top-1 w-2 h-6 bg-gray-800 rounded-sm"
          style={{ boxShadow: 'inset 0 0 3px rgba(0,0,0,0.5)' }}
        />
        <div
          className="absolute right-1 top-1 w-2 h-6 bg-gray-800 rounded-sm"
          style={{ boxShadow: 'inset 0 0 3px rgba(0,0,0,0.5)' }}
        />
        <div
          className="absolute left-3 top-2 w-6 h-4 bg-gray-700 rounded-sm"
          style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.4)' }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-2 h-6 bg-gray-600 rounded-t-full"
          style={{ boxShadow: 'inset 0 0 2px rgba(0,0,0,0.3)' }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-4 h-4 bg-gray-600 rounded-full"
          style={{ boxShadow: 'inset 0 0 4px rgba(0,0,0,0.4)' }}
        />
      </div>
    </div>
  )
}

export default Tank