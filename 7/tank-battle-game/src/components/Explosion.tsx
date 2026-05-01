import React from 'react'
import { Explosion as ExplosionType } from '../types'

interface ExplosionProps {
  explosion: ExplosionType
}

const Explosion: React.FC<ExplosionProps> = ({ explosion }) => {
  const opacity = explosion.life / 30
  const scale = 1 + (1 - opacity) * 0.5

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: explosion.position.x - explosion.size / 2,
        top: explosion.position.y - explosion.size / 2,
        width: explosion.size,
        height: explosion.size,
        opacity: opacity,
        transform: `scale(${scale})`,
        transition: 'all 0.1s ease-out'
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: `radial-gradient(circle, #FFD700 0%, #FF8C00 40%, #FF4500 70%, transparent 100%)`,
          boxShadow: `0 0 ${explosion.size / 2}px #FF4500, 0 0 ${explosion.size}px rgba(255,69,0,0.5)`
        }}
      />
    </div>
  )
}

export default Explosion