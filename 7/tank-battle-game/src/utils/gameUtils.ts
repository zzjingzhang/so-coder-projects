import { Direction, TileType, Position, GameMap, Tank, Bullet } from '../types'

export const TILE_SIZE = 32
export const MAP_WIDTH = 26
export const MAP_HEIGHT = 26
export const GAME_WIDTH = MAP_WIDTH * TILE_SIZE
export const GAME_HEIGHT = MAP_HEIGHT * TILE_SIZE

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const generateMap = (): number[][] => {
  const map: number[][] = Array(MAP_HEIGHT).fill(null).map(() => Array(MAP_WIDTH).fill(TileType.EMPTY))

  for (let y = 4; y < MAP_HEIGHT - 4; y += 2) {
    for (let x = 4; x < MAP_WIDTH - 4; x += 4) {
      if (Math.random() > 0.3) {
        map[y][x] = TileType.BRICK
        map[y][x + 1] = TileType.BRICK
        map[y + 1][x] = TileType.BRICK
        map[y + 1][x + 1] = TileType.BRICK
      }
    }
  }

  for (let y = 6; y < MAP_HEIGHT - 6; y += 3) {
    for (let x = 6; x < MAP_WIDTH - 6; x += 5) {
      if (Math.random() > 0.7) {
        map[y][x] = TileType.STEEL
        map[y][x + 1] = TileType.STEEL
      }
    }
  }

  const baseX = MAP_WIDTH / 2 - 2
  const baseY = MAP_HEIGHT - 4

  map[baseY][baseX] = TileType.BRICK
  map[baseY][baseX + 1] = TileType.BRICK
  map[baseY][baseX + 2] = TileType.BRICK
  map[baseY][baseX + 3] = TileType.BRICK
  map[baseY + 1][baseX] = TileType.BRICK
  map[baseY + 1][baseX + 3] = TileType.BRICK
  map[baseY + 2][baseX] = TileType.BRICK
  map[baseY + 2][baseX + 3] = TileType.BRICK
  map[baseY + 3][baseX] = TileType.BRICK
  map[baseY + 3][baseX + 3] = TileType.BRICK
  map[baseY + 1][baseX + 1] = TileType.BASE
  map[baseY + 1][baseX + 2] = TileType.BASE
  map[baseY + 2][baseX + 1] = TileType.BASE
  map[baseY + 2][baseX + 2] = TileType.BASE

  return map
}

export const checkCollision = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

export const checkMapCollision = (
  x: number,
  y: number,
  width: number,
  height: number,
  map: number[][]
): boolean => {
  const startTileX = Math.floor(x / TILE_SIZE)
  const startTileY = Math.floor(y / TILE_SIZE)
  const endTileX = Math.floor((x + width - 1) / TILE_SIZE)
  const endTileY = Math.floor((y + height - 1) / TILE_SIZE)

  if (startTileX < 0 || startTileY < 0 || endTileX >= MAP_WIDTH || endTileY >= MAP_HEIGHT) {
    return true
  }

  for (let ty = startTileY; ty <= endTileY; ty++) {
    for (let tx = startTileX; tx <= endTileX; tx++) {
      const tile = map[ty][tx]
      if (
        tile === TileType.BRICK ||
        tile === TileType.STEEL ||
        tile === TileType.WATER ||
        tile === TileType.BASE
      ) {
        return true
      }
    }
  }

  return false
}

export const checkTankCollision = (
  tank: Tank,
  tanks: Tank[],
  excludeId: string
): boolean => {
  const tankRect = {
    x: tank.position.x,
    y: tank.position.y,
    width: TILE_SIZE - 2,
    height: TILE_SIZE - 2
  }

  for (const otherTank of tanks) {
    if (otherTank.id === excludeId) continue

    const otherRect = {
      x: otherTank.position.x,
      y: otherTank.position.y,
      width: TILE_SIZE - 2,
      height: TILE_SIZE - 2
    }

    if (checkCollision(tankRect, otherRect)) {
      return true
    }
  }

  return false
}

export const moveTank = (
  tank: Tank,
  direction: Direction,
  tanks: Tank[],
  map: number[][]
): Tank => {
  const newTank = { ...tank }
  newTank.direction = direction

  let newX = tank.position.x
  let newY = tank.position.y

  switch (direction) {
    case Direction.UP:
      newY -= tank.speed
      break
    case Direction.DOWN:
      newY += tank.speed
      break
    case Direction.LEFT:
      newX -= tank.speed
      break
    case Direction.RIGHT:
      newX += tank.speed
      break
  }

  const testTank = { ...newTank, position: { x: newX, y: newY } }

  if (
    !checkMapCollision(newX, newY, TILE_SIZE - 2, TILE_SIZE - 2, map) &&
    !checkTankCollision(testTank, tanks, tank.id)
  ) {
    newTank.position = { x: newX, y: newY }
  }

  return newTank
}

export const createBullet = (tank: Tank): Bullet => {
  const bulletX = tank.position.x + TILE_SIZE / 2 - 4
  const bulletY = tank.position.y + TILE_SIZE / 2 - 4

  const bullet: Bullet = {
    id: generateId(),
    type: tank.type === 'player' ? 'player' : 'enemy',
    position: { x: bulletX, y: bulletY },
    direction: tank.direction,
    speed: 8
  }

  switch (tank.direction) {
    case Direction.UP:
      bullet.position.y = tank.position.y - 8
      break
    case Direction.DOWN:
      bullet.position.y = tank.position.y + TILE_SIZE
      break
    case Direction.LEFT:
      bullet.position.x = tank.position.x - 8
      break
    case Direction.RIGHT:
      bullet.position.x = tank.position.x + TILE_SIZE
      break
  }

  return bullet
}

export const moveBullet = (bullet: Bullet): Bullet => {
  const newBullet = { ...bullet }

  switch (bullet.direction) {
    case Direction.UP:
      newBullet.position.y -= bullet.speed
      break
    case Direction.DOWN:
      newBullet.position.y += bullet.speed
      break
    case Direction.LEFT:
      newBullet.position.x -= bullet.speed
      break
    case Direction.RIGHT:
      newBullet.position.x += bullet.speed
      break
  }

  return newBullet
}

export const isBulletOutOfBounds = (bullet: Bullet): boolean => {
  return (
    bullet.position.x < 0 ||
    bullet.position.x > GAME_WIDTH ||
    bullet.position.y < 0 ||
    bullet.position.y > GAME_HEIGHT
  )
}