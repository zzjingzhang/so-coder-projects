import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button, Card, Modal, Typography, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  PauseOutlined,
  PlayCircleOutlined,
  HomeOutlined,
  ReloadOutlined,
  TrophyOutlined,
  FrownOutlined
} from '@ant-design/icons'
import {
  Tank as TankType,
  Bullet as BulletType,
  Explosion as ExplosionType,
  Direction,
  TankType as TankTypeEnum,
  TileType,
  GameState
} from '../types'
import {
  generateMap,
  generateId,
  moveTank,
  createBullet,
  moveBullet,
  isBulletOutOfBounds,
  checkCollision,
  TILE_SIZE,
  GAME_WIDTH,
  GAME_HEIGHT,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../utils/gameUtils'
import Tank from '../components/Tank'
import Bullet from '../components/Bullet'
import GameMap from '../components/GameMap'
import Explosion from '../components/Explosion'

const { Title, Text } = Typography

const Game: React.FC = () => {
  const navigate = useNavigate()
  const gameLoopRef = useRef<number | null>(null)
  const keysPressed = useRef<Set<string>>(new Set())
  const lastUpdateTime = useRef<number>(0)

  const [gameState, setGameState] = useState<GameState>({
    isPlaying: true,
    isPaused: false,
    isGameOver: false,
    isVictory: false,
    score: 0,
    lives: 3,
    level: 1,
    enemiesLeft: 4
  })

  const [mapTiles, setMapTiles] = useState<number[][]>(() => generateMap())
  const [playerTank, setPlayerTank] = useState<TankType>({
    id: 'player',
    type: TankTypeEnum.PLAYER,
    position: { x: TILE_SIZE * 9, y: GAME_HEIGHT - TILE_SIZE * 2 },
    direction: Direction.UP,
    health: 1,
    speed: 3,
    color: '#4CAF50',
    canShoot: true,
    lastShotTime: 0
  })

  const [enemyTanks, setEnemyTanks] = useState<TankType[]>([])
  const [bullets, setBullets] = useState<BulletType[]>([])
  const [explosions, setExplosions] = useState<ExplosionType[]>([])
  const [showPauseModal, setShowPauseModal] = useState(false)
  const [showGameOverModal, setShowGameOverModal] = useState(false)

  const spawnEnemies = useCallback(() => {
    const spawnPoints = [
      { x: 0, y: 0 },
      { x: (MAP_WIDTH / 2 - 1) * TILE_SIZE, y: 0 },
      { x: (MAP_WIDTH - 1) * TILE_SIZE, y: 0 },
      { x: 0, y: (MAP_HEIGHT / 2) * TILE_SIZE }
    ]

    const enemies: TankType[] = spawnPoints.map((point, index) => ({
      id: `enemy-${index}`,
      type: TankTypeEnum.ENEMY,
      position: { x: point.x, y: point.y },
      direction: Direction.DOWN,
      health: 1,
      speed: 2,
      color: ['#F44336', '#9C27B0', '#FF9800', '#795548'][index],
      canShoot: true,
      lastShotTime: 0
    }))

    setEnemyTanks(enemies)
  }, [])

  useEffect(() => {
    spawnEnemies()
  }, [spawnEnemies])

  const createExplosion = useCallback((x: number, y: number, size: number = 32) => {
    const explosion: ExplosionType = {
      id: generateId(),
      position: { x, y },
      size,
      life: 30
    }
    setExplosions(prev => [...prev, explosion])
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keysPressed.current.add(e.code)

    if (e.code === 'Space' && gameState.isPlaying && !gameState.isPaused) {
      e.preventDefault()
      setPlayerTank(prev => {
        const now = Date.now()
        if (now - prev.lastShotTime > 300) {
          const bullet = createBullet(prev)
          setBullets(bullets => [...bullets, bullet])
          return { ...prev, lastShotTime: now }
        }
        return prev
      })
    }

    if (e.code === 'Escape' && gameState.isPlaying) {
      setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }))
      setShowPauseModal(prev => !prev)
    }
  }, [gameState.isPlaying, gameState.isPaused])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keysPressed.current.delete(e.code)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused || gameState.isGameOver) {
      return
    }

    const gameLoop = (currentTime: number) => {
      if (currentTime - lastUpdateTime.current < 16) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
        return
      }
      lastUpdateTime.current = currentTime

      setPlayerTank(prev => {
        let newTank = { ...prev }
        const allTanks = [newTank, ...enemyTanks]

        if (keysPressed.current.has('ArrowUp')) {
          newTank = moveTank(newTank, Direction.UP, allTanks, mapTiles)
        }
        if (keysPressed.current.has('ArrowDown')) {
          newTank = moveTank(newTank, Direction.DOWN, allTanks, mapTiles)
        }
        if (keysPressed.current.has('ArrowLeft')) {
          newTank = moveTank(newTank, Direction.LEFT, allTanks, mapTiles)
        }
        if (keysPressed.current.has('ArrowRight')) {
          newTank = moveTank(newTank, Direction.RIGHT, allTanks, mapTiles)
        }

        return newTank
      })

      setEnemyTanks(prev => {
        return prev.map(enemy => {
          let newEnemy = { ...enemy }
          const allTanks = [playerTank, ...prev]

          if (Math.random() < 0.02) {
            const directions = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
            newEnemy.direction = directions[Math.floor(Math.random() * 4)]
          }

          if (Math.random() < 0.03) {
            newEnemy.direction = Math.random() > 0.5 ? Direction.DOWN :
              Math.random() > 0.5 ? Direction.LEFT : Direction.RIGHT
          }

          newEnemy = moveTank(newEnemy, newEnemy.direction, allTanks, mapTiles)

          const now = Date.now()
          if (now - enemy.lastShotTime > 1000 && Math.random() < 0.03) {
            const bullet = createBullet(newEnemy)
            setBullets(bullets => [...bullets, bullet])
            newEnemy.lastShotTime = now
          }

          return newEnemy
        })
      })

      setBullets(prev => {
        const newBullets: BulletType[] = []
        const bulletsToRemove: string[] = []

        for (const bullet of prev) {
          const movedBullet = moveBullet(bullet)

          if (isBulletOutOfBounds(movedBullet)) {
            bulletsToRemove.push(bullet.id)
            continue
          }

          const bulletRect = {
            x: movedBullet.position.x,
            y: movedBullet.position.y,
            width: 8,
            height: 8
          }

          const tileX = Math.floor(movedBullet.position.x / TILE_SIZE)
          const tileY = Math.floor(movedBullet.position.y / TILE_SIZE)

          if (tileX >= 0 && tileX < MAP_WIDTH && tileY >= 0 && tileY < MAP_HEIGHT) {
            const tile = mapTiles[tileY][tileX]

            if (tile === TileType.BRICK) {
              setMapTiles(prevTiles => {
                const newTiles = [...prevTiles]
                newTiles[tileY] = [...newTiles[tileY]]
                newTiles[tileY][tileX] = TileType.EMPTY
                return newTiles
              })
              createExplosion(tileX * TILE_SIZE + TILE_SIZE / 2, tileY * TILE_SIZE + TILE_SIZE / 2, 24)
              bulletsToRemove.push(bullet.id)
              continue
            }

            if (tile === TileType.STEEL) {
              createExplosion(tileX * TILE_SIZE + TILE_SIZE / 2, tileY * TILE_SIZE + TILE_SIZE / 2, 20)
              bulletsToRemove.push(bullet.id)
              continue
            }

            if (tile === TileType.BASE) {
              createExplosion(tileX * TILE_SIZE + TILE_SIZE / 2, tileY * TILE_SIZE + TILE_SIZE / 2, 64)
              bulletsToRemove.push(bullet.id)
              setGameState(prev => ({ ...prev, isGameOver: true, isPlaying: false }))
              setShowGameOverModal(true)
              continue
            }
          }

          if (bullet.type === 'player') {
            let hitEnemy = false
            setEnemyTanks(enemies => {
              const newEnemies: TankType[] = []
              for (const enemy of enemies) {
                const enemyRect = {
                  x: enemy.position.x,
                  y: enemy.position.y,
                  width: TILE_SIZE,
                  height: TILE_SIZE
                }

                if (checkCollision(bulletRect, enemyRect)) {
                  hitEnemy = true
                  createExplosion(
                    enemy.position.x + TILE_SIZE / 2,
                    enemy.position.y + TILE_SIZE / 2,
                    48
                  )
                  setGameState(gs => ({
                    ...gs,
                    score: gs.score + 100,
                    enemiesLeft: gs.enemiesLeft - 1
                  }))
                } else {
                  newEnemies.push(enemy)
                }
              }
              return newEnemies
            })

            if (hitEnemy) {
              bulletsToRemove.push(bullet.id)
              continue
            }
          }

          if (bullet.type === 'enemy') {
            const playerRect = {
              x: playerTank.position.x,
              y: playerTank.position.y,
              width: TILE_SIZE,
              height: TILE_SIZE
            }

            if (checkCollision(bulletRect, playerRect)) {
              createExplosion(
                playerTank.position.x + TILE_SIZE / 2,
                playerTank.position.y + TILE_SIZE / 2,
                48
              )
              bulletsToRemove.push(bullet.id)

              setGameState(gs => {
                if (gs.lives <= 1) {
                  setShowGameOverModal(true)
                  return { ...gs, lives: 0, isGameOver: true, isPlaying: false }
                }
                return { ...gs, lives: gs.lives - 1 }
              })

              setPlayerTank(prev => ({
                ...prev,
                position: { x: TILE_SIZE * 9, y: GAME_HEIGHT - TILE_SIZE * 2 },
                direction: Direction.UP
              }))
              continue
            }
          }

          newBullets.push(movedBullet)
        }

        return newBullets.filter(b => !bulletsToRemove.includes(b.id))
      })

      setExplosions(prev => {
        return prev
          .map(exp => ({ ...exp, life: exp.life - 1 }))
          .filter(exp => exp.life > 0)
      })

      setGameState(gs => {
        if (gs.enemiesLeft <= 0 && !gs.isVictory) {
          setShowGameOverModal(true)
          return { ...gs, isVictory: true, isPlaying: false }
        }
        return gs
      })

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying, gameState.isPaused, gameState.isGameOver, enemyTanks, playerTank, mapTiles, createExplosion])

  const handlePause = () => {
    setGameState(prev => ({ ...prev, isPaused: true }))
    setShowPauseModal(true)
  }

  const handleResume = () => {
    setGameState(prev => ({ ...prev, isPaused: false }))
    setShowPauseModal(false)
  }

  const handleRestart = () => {
    setGameState({
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      isVictory: false,
      score: 0,
      lives: 3,
      level: 1,
      enemiesLeft: 4
    })
    setMapTiles(generateMap())
    setPlayerTank({
      id: 'player',
      type: TankTypeEnum.PLAYER,
      position: { x: TILE_SIZE * 9, y: GAME_HEIGHT - TILE_SIZE * 2 },
      direction: Direction.UP,
      health: 1,
      speed: 3,
      color: '#4CAF50',
      canShoot: true,
      lastShotTime: 0
    })
    setBullets([])
    setExplosions([])
    setShowGameOverModal(false)
    setShowPauseModal(false)
    spawnEnemies()
  }

  const handleGoHome = () => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mb-4">
        <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
          <div className="flex justify-between items-center">
            <Space size="large">
              <div>
                <Text type="secondary" className="text-sm">分数</Text>
                <div className="text-2xl font-bold text-yellow-400">{gameState.score}</div>
              </div>
              <div>
                <Text type="secondary" className="text-sm">生命值</Text>
                <div className="text-2xl font-bold text-red-400">{'❤️'.repeat(gameState.lives)}</div>
              </div>
              <div>
                <Text type="secondary" className="text-sm">关卡</Text>
                <div className="text-2xl font-bold text-blue-400">{gameState.level}</div>
              </div>
              <div>
                <Text type="secondary" className="text-sm">剩余敌人</Text>
                <div className="text-2xl font-bold text-orange-400">{gameState.enemiesLeft}</div>
              </div>
            </Space>
            <Space>
              <Button
                icon={<PauseOutlined />}
                onClick={handlePause}
                disabled={gameState.isGameOver}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                暂停
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRestart}
                className="bg-blue-600 border-blue-500 text-white hover:bg-blue-500"
              >
                重新开始
              </Button>
              <Button
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                主页
              </Button>
            </Space>
          </div>
        </Card>
      </div>

      <div
        className="relative border-4 border-gray-600 shadow-2xl"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          backgroundColor: '#1a1a2e'
        }}
      >
        <GameMap tiles={mapTiles} />

        {explosions.map(explosion => (
          <Explosion key={explosion.id} explosion={explosion} />
        ))}

        <Tank tank={playerTank} />

        {enemyTanks.map(enemy => (
          <Tank key={enemy.id} tank={enemy} />
        ))}

        {bullets.map(bullet => (
          <Bullet key={bullet.id} bullet={bullet} />
        ))}

        {gameState.isPaused && !showPauseModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Title level={2} className="text-white">游戏暂停</Title>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mt-4">
        <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
          <div className="flex justify-center items-center gap-8 text-gray-300">
            <div className="text-center">
              <div className="text-2xl mb-1">⬆️ ⬇️ ⬅️ ➡️</div>
              <Text type="secondary">移动</Text>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔫 空格</div>
              <Text type="secondary">发射</Text>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⏸️ ESC</div>
              <Text type="secondary">暂停</Text>
            </div>
          </div>
        </Card>
      </div>

      <Modal
        title={<Title level={3} className="m-0">游戏暂停</Title>}
        open={showPauseModal}
        onCancel={handleResume}
        footer={[
          <Button key="resume" type="primary" onClick={handleResume} icon={<PlayCircleOutlined />}>
            继续游戏
          </Button>,
          <Button key="restart" onClick={handleRestart} icon={<ReloadOutlined />}>
            重新开始
          </Button>,
          <Button key="home" onClick={handleGoHome} icon={<HomeOutlined />}>
            返回主页
          </Button>
        ]}
      >
        <div className="text-center py-8">
          <Title level={4} className="text-gray-600">游戏已暂停</Title>
          <p className="text-gray-500 mt-4">按 ESC 键或点击继续游戏按钮恢复游戏</p>
        </div>
      </Modal>

      <Modal
        title={
          <Title level={3} className="m-0 flex items-center gap-2">
            {gameState.isVictory ? <TrophyOutlined className="text-yellow-500" /> : <FrownOutlined className="text-red-500" />}
            {gameState.isVictory ? '胜利！' : '游戏结束'}
          </Title>
        }
        open={showGameOverModal}
        footer={null}
        closable={false}
      >
        <div className="text-center py-8">
          {gameState.isVictory ? (
            <>
              <div className="text-6xl mb-4">🏆</div>
              <Title level={2} className="text-green-500">恭喜获胜！</Title>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">💥</div>
              <Title level={2} className="text-red-500">游戏结束</Title>
            </>
          )}

          <div className="my-8 space-y-2">
            <p className="text-xl">
              最终得分: <span className="text-yellow-500 font-bold">{gameState.score}</span>
            </p>
            <p className="text-lg text-gray-500">
              关卡 {gameState.level}
            </p>
          </div>

          <Space size="middle">
            <Button
              type="primary"
              size="large"
              icon={<ReloadOutlined />}
              onClick={handleRestart}
              className="h-12 px-8 bg-blue-600 hover:bg-blue-500"
            >
              再来一局
            </Button>
            <Button
              size="large"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
              className="h-12 px-8"
            >
              返回主页
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  )
}

export default Game