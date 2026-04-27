import { useState, useCallback, useRef } from 'react';
import type { 
  GameState, 
  Line, 
  Enemy, 
  Particle, 
  Point, 
  LineType,
  Obstacle
} from '@/types';
import { LINE_CONFIG, ENEMY_CONFIG, LEVELS } from '@/types';
import { findPath, simplifyPath } from '@/utils/pathfinding';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function distanceToLineSegment(
  point: Point,
  lineStart: Point,
  lineEnd: Point
): number {
  const A = point.x - lineStart.x;
  const B = point.y - lineStart.y;
  const C = lineEnd.x - lineStart.x;
  const D = lineEnd.y - lineStart.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = lineStart.x;
    yy = lineStart.y;
  } else if (param > 1) {
    xx = lineEnd.x;
    yy = lineEnd.y;
  } else {
    xx = lineStart.x + param * C;
    yy = lineStart.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

function isPointNearLine(point: Point, line: Line, threshold: number): boolean {
  for (let i = 0; i < line.points.length - 1; i++) {
    const dist = distanceToLineSegment(point, line.points[i], line.points[i + 1]);
    if (dist <= threshold) {
      return true;
    }
  }
  return false;
}

function getClosestPointOnLine(point: Point, line: Line): Point | null {
  let closestDist = Infinity;
  let closestPoint: Point | null = null;

  for (let i = 0; i < line.points.length - 1; i++) {
    const lineStart = line.points[i];
    const lineEnd = line.points[i + 1];
    
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }

    const dist = Math.sqrt((point.x - xx) ** 2 + (point.y - yy) ** 2);
    if (dist < closestDist) {
      closestDist = dist;
      closestPoint = { x: xx, y: yy };
    }
  }

  return closestPoint;
}

function createParticles(x: number, y: number, color: string, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    particles.push({
      id: generateId(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color,
      size: Math.random() * 6 + 2,
      life: 1,
      maxLife: 1,
    });
  }
  return particles;
}

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    currentLevel: 0,
    paint: 500,
    maxPaint: 500,
    lives: 5,
    maxLives: 5,
    score: 0,
    waveIndex: 0,
    selectedLineType: 'fire',
    lines: [],
    enemies: [],
    particles: [],
    currentWaveTime: 0,
    spawnedEnemyCount: 0,
  });

  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const spawnTimersRef = useRef<Map<string, number>>(new Map());
  const levelIndexRef = useRef<number>(0);

  const getEnemyPathForLevel = useCallback((
    levelIndex: number,
    obstacles: Obstacle[], 
    existingLines: Line[]
  ): Point[] => {
    const level = LEVELS[levelIndex];
    if (!level) return [];

    const allObstacles: Obstacle[] = [...obstacles];
    
    for (const line of existingLines) {
      if (line.type === 'wall') {
        for (let i = 0; i < line.points.length - 1; i++) {
          const p1 = line.points[i];
          const p2 = line.points[i + 1];
          
          const minX = Math.min(p1.x, p2.x) - line.thickness;
          const maxX = Math.max(p1.x, p2.x) + line.thickness;
          const minY = Math.min(p1.y, p2.y) - line.thickness;
          const maxY = Math.max(p1.y, p2.y) + line.thickness;
          
          allObstacles.push({
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
          });
        }
      }
    }

    const path = findPath(
      level.startPoint,
      level.endPoint,
      allObstacles,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      20
    );

    return simplifyPath(path, 15);
  }, []);

  const gameLoop = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    lastTimeRef.current = currentTime;

    const levelIndex = levelIndexRef.current;
    const level = LEVELS[levelIndex];

    setGameState(prev => {
      if (prev.status !== 'playing' || !level) return prev;

      let newState = { ...prev };
      const now = performance.now();

      newState.currentWaveTime += deltaTime;

      const currentWave = level.enemyWaves[prev.waveIndex];
      
      if (currentWave) {
        let totalEnemiesInWave = 0;
        for (const spawn of currentWave.enemies) {
          totalEnemiesInWave += spawn.count;
        }

        if (prev.currentWaveTime >= currentWave.delay) {
          const spawnTime = prev.currentWaveTime - currentWave.delay;
          
          for (const spawn of currentWave.enemies) {
            for (let i = 0; i < spawn.count; i++) {
              const enemySpawnTime = i * spawn.interval;
              const spawnKey = `${prev.waveIndex}-${spawn.type}-${i}`;
              
              if (spawnTime >= enemySpawnTime && !spawnTimersRef.current.has(spawnKey)) {
                spawnTimersRef.current.set(spawnKey, now);
                
                const path = getEnemyPathForLevel(levelIndex, level.obstacles, prev.lines);
                if (path.length > 0) {
                  const config = ENEMY_CONFIG[spawn.type];
                  const startPoint = path[0];
                  
                  const enemy: Enemy = {
                    id: generateId(),
                    type: spawn.type,
                    x: startPoint.x,
                    y: startPoint.y,
                    health: config.health,
                    maxHealth: config.health,
                    speed: config.speed,
                    baseSpeed: config.speed,
                    pathIndex: 0,
                    path,
                    slowedUntil: 0,
                    burningUntil: 0,
                    burnDamage: 0,
                    attractedTo: null,
                    size: config.size,
                  };
                  
                  newState.enemies = [...newState.enemies, enemy];
                }
              }
            }
          }
        }

        const allSpawned = Array.from(spawnTimersRef.current.keys()).filter(k => 
          k.startsWith(`${prev.waveIndex}-`)
        ).length >= totalEnemiesInWave;

        if (allSpawned && prev.enemies.length === 0) {
          if (prev.waveIndex < level.enemyWaves.length - 1) {
            newState.waveIndex = prev.waveIndex + 1;
            newState.currentWaveTime = 0;
            spawnTimersRef.current.clear();
          } else {
            newState.status = 'won';
          }
        }
      }

      newState.lines = prev.lines.filter(line => {
        const age = now - line.createdAt;
        return age < line.duration && line.durability > 0;
      }).map(line => ({
        ...line,
        durability: line.durability,
      }));

      newState.enemies = prev.enemies.map(enemy => {
        let updatedEnemy = { ...enemy };
        const enemyConfig = ENEMY_CONFIG[enemy.type];

        let currentSpeed = enemy.baseSpeed;
        let isSlowed = false;

        if (now < enemy.slowedUntil) {
          isSlowed = true;
        }

        let attractedTo: Point | null = null;
        let minAttractDist = Infinity;

        for (const line of newState.lines) {
          const lineConfig = LINE_CONFIG[line.type];
          
          if (isPointNearLine(enemy, line, enemy.size / 2 + line.thickness)) {
            switch (line.type) {
              case 'fire':
                const fireDamageMultiplier = 1 - enemyConfig.fireResistance;
                if (fireDamageMultiplier > 0) {
                  updatedEnemy.health -= lineConfig.damage * (deltaTime / 1000) * fireDamageMultiplier;
                  updatedEnemy.burningUntil = now + 2000;
                  updatedEnemy.burnDamage = lineConfig.damage * 0.5 * fireDamageMultiplier;
                }
                line.durability -= deltaTime / 50;
                break;

              case 'slime':
                const slimeSlowFactor = lineConfig.slowFactor * (1 - enemyConfig.iceResistance);
                isSlowed = true;
                updatedEnemy.slowedUntil = now + 500;
                currentSpeed = enemy.baseSpeed * Math.max(0.1, slimeSlowFactor);
                line.durability -= deltaTime / 80;
                break;

              case 'wall':
                line.durability -= deltaTime / 20;
                break;
            }
          }

          if (line.type === 'magnet' && lineConfig.attractRange > 0) {
            const closestPoint = getClosestPointOnLine(enemy, line);
            if (closestPoint) {
              const dist = Math.sqrt(
                (enemy.x - closestPoint.x) ** 2 + 
                (enemy.y - closestPoint.y) ** 2
              );
              if (dist < lineConfig.attractRange && dist < minAttractDist) {
                minAttractDist = dist;
                attractedTo = closestPoint;
              }
            }
          }
        }

        if (isSlowed) {
          const effectiveSlowFactor = 0.4 * (1 - enemyConfig.iceResistance);
          currentSpeed = enemy.baseSpeed * Math.max(0.2, effectiveSlowFactor);
        } else {
          currentSpeed = enemy.baseSpeed;
        }

        if (now < enemy.burningUntil && enemy.burnDamage > 0) {
          updatedEnemy.health -= enemy.burnDamage * (deltaTime / 1000);
        }

        updatedEnemy.attractedTo = attractedTo;

        if (attractedTo) {
          const targetX = attractedTo.x;
          const targetY = attractedTo.y;
          
          const dx = targetX - enemy.x;
          const dy = targetY - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            const moveSpeed = currentSpeed * 0.7;
            updatedEnemy.x += (dx / dist) * moveSpeed * (deltaTime / 16);
            updatedEnemy.y += (dy / dist) * moveSpeed * (deltaTime / 16);
          }
        } else if (enemy.path.length > 0 && enemy.pathIndex < enemy.path.length) {
          const target = enemy.path[enemy.pathIndex];
          const targetX = target.x;
          const targetY = target.y;

          const dx = targetX - enemy.x;
          const dy = targetY - enemy.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 5) {
            updatedEnemy.pathIndex++;
          } else {
            const moveAmount = currentSpeed * (deltaTime / 16);
            updatedEnemy.x += (dx / dist) * moveAmount;
            updatedEnemy.y += (dy / dist) * moveAmount;
          }
        }

        return updatedEnemy;
      });

      let newParticles = [...prev.particles];
      const enemiesToRemove: string[] = [];

      for (const enemy of newState.enemies) {
        if (enemy.health <= 0) {
          enemiesToRemove.push(enemy.id);
          newState.score += ENEMY_CONFIG[enemy.type].score;
          newParticles = [
            ...newParticles,
            ...createParticles(enemy.x, enemy.y, ENEMY_CONFIG[enemy.type].color, 15),
          ];
        }

        if (level) {
          const distToEnd = Math.sqrt(
            (enemy.x - level.endPoint.x) ** 2 +
            (enemy.y - level.endPoint.y) ** 2
          );
          if (distToEnd < 30) {
            enemiesToRemove.push(enemy.id);
            newState.lives--;
            newParticles = [
              ...newParticles,
              ...createParticles(enemy.x, enemy.y, '#ef4444', 10),
            ];
          }
        }
      }

      newState.enemies = newState.enemies.filter(e => !enemiesToRemove.includes(e.id));

      if (newState.lives <= 0) {
        newState.status = 'lost';
      }

      newParticles = newParticles
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1,
          life: p.life - 0.02,
        }))
        .filter(p => p.life > 0);

      newState.particles = newParticles;

      return newState;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [getEnemyPathForLevel]);

  const startGame = useCallback((levelIndex: number) => {
    const level = LEVELS[levelIndex];
    if (!level) return;

    levelIndexRef.current = levelIndex;
    spawnTimersRef.current.clear();
    
    setGameState({
      status: 'playing',
      currentLevel: levelIndex,
      paint: level.initialPaint,
      maxPaint: level.initialPaint,
      lives: 5,
      maxLives: 5,
      score: 0,
      waveIndex: 0,
      selectedLineType: 'fire',
      lines: [],
      enemies: [],
      particles: [],
      currentWaveTime: 0,
      spawnedEnemyCount: 0,
    });
    
    lastTimeRef.current = performance.now();
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: prev.status === 'playing' ? 'paused' : 'playing',
    }));
  }, []);

  const stopGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setGameState(prev => ({
      ...prev,
      status: 'idle',
    }));
  }, []);

  const setSelectedLineType = useCallback((type: LineType) => {
    setGameState(prev => ({
      ...prev,
      selectedLineType: type,
    }));
  }, []);

  const addLine = useCallback((points: Point[], type: LineType) => {
    if (points.length < 2) return;

    const config = LINE_CONFIG[type];
    
    let totalLength = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }

    const cost = totalLength * config.paintCostPerPixel;

    setGameState(prev => {
      if (prev.paint < cost) return prev;

      const newLine: Line = {
        id: generateId(),
        type,
        points,
        thickness: 8,
        createdAt: performance.now(),
        duration: config.duration,
        durability: config.baseDurability,
        maxDurability: config.baseDurability,
      };

      return {
        ...prev,
        paint: prev.paint - cost,
        lines: [...prev.lines, newLine],
      };
    });
  }, []);

  const startGameLoop = useCallback(() => {
    if (!gameLoopRef.current) {
      lastTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameLoop]);

  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  return {
    gameState,
    startGame,
    pauseGame,
    stopGame,
    setSelectedLineType,
    addLine,
    startGameLoop,
    stopGameLoop,
    getEnemyPath: getEnemyPathForLevel,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
  };
}
