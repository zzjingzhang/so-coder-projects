import React from 'react'
import { Bullet as BulletType } from '../types'

interface BulletProps {
  bullet: BulletType
}

const Bullet: React.FC<BulletProps> = ({ bullet }) => {
  const getBulletColor = () => {
    if (bullet.type === 'player') {
      return '#FFD700'
    }
    return '#FF4500'
  }

  return (
    <div
      className="absolute rounded-full"
      style={{
        left: bullet.position.x,
        top: bullet.position.y,
        width: 8,
        height: 8,
        backgroundColor: getBulletColor(),
        boxShadow: `0 0 8px ${getBulletColor()}, 0 0 4px rgba(255,255,255,0.5)`,
      }}
    />
  )
}

export default Bullet