import { useState, useEffect, useRef, useCallback } from 'react';
import type { Player, Platform, Collectible, Enemy, Portal, Level, Vector2D } from '../types/game';
import { getLevelById } from '../data/levels';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const PLAYER_SIZE = 40;

interface GameEngineState {
  player: Player;
  platforms: Platform[];
  collectibles: Collectible[];
  enemies: Enemy[];
  portals: Portal[];
  level: Level | null;
  isPaused: boolean;
  isGameOver: boolean;
  isVictory: boolean;
  collectedCount: number;
  totalCount: number;
  score: number;
  gameTime: number;
}

const createInitialPlayer = (startPosition: Vector2D): Player => ({
  id: 'player',
  type: 'player',
  position: { ...startPosition },
  width: PLAYER_SIZE,
  height: PLAYER_SIZE,
  color: '#3B82F6',
  velocity: { x: 0, y: 0 },
  isJumping: false,
  isOnGround: false,
  facingRight: true,
  health: 3,
  maxHealth: 3,
  score: 0,
});

export const useGameEngine = (levelId: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const keysRef = useRef<Set<string>>(new Set());
  const timeRef = useRef<number>(0);

  const [gameState, setGameState] = useState<GameEngineState>({
    player: createInitialPlayer({ x: 100, y: 400 }),
    platforms: [],
    collectibles: [],
    enemies: [],
    portals: [],
    level: null,
    isPaused: false,
    isGameOver: false,
    isVictory: false,
    collectedCount: 0,
    totalCount: 0,
    score: 0,
    gameTime: 0,
  });

  const gameStateRef = useRef<GameEngineState>(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const initLevel = useCallback((id: number) => {
    const level = getLevelById(id);
    if (!level) return;

    const player = createInitialPlayer(level.playerStartPosition);
    const platforms = level.platforms.map((p) => ({
      ...p,
      position: p.startPosition ? { ...p.startPosition } : { ...p.position },
    }));
    const collectibles = level.collectibles.map((c) => ({ ...c, collected: false }));
    const enemies = level.enemies.map((e) => ({
      ...e,
      position: { ...e.startPosition },
    }));
    const portals = level.portals.map((p) => ({ ...p }));

    const totalCount = collectibles.filter((c) => c.subtype === 'energy').length;

    setGameState({
      player,
      platforms,
      collectibles,
      enemies,
      portals,
      level,
      isPaused: false,
      isGameOver: false,
      isVictory: false,
      collectedCount: 0,
      totalCount,
      score: 0,
      gameTime: 0,
    });
  }, []);

  useEffect(() => {
    initLevel(levelId);
  }, [levelId, initLevel]);

  const checkCollision = (
    a: { position: Vector2D; width: number; height: number },
    b: { position: Vector2D; width: number; height: number }
  ) => {
    return (
      a.position.x < b.position.x + b.width &&
      a.position.x + a.width > b.position.x &&
      a.position.y < b.position.y + b.height &&
      a.position.y + a.height > b.position.y
    );
  };

  const updateGame = useCallback((deltaTime: number) => {
    const state = gameStateRef.current;
    if (state.isPaused || state.isGameOver || state.isVictory || !state.level) return;

    const keys = keysRef.current;
    const player = { ...state.player };
    const platforms = [...state.platforms];
    const enemies = [...state.enemies];
    const collectibles = [...state.collectibles];

    if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) {
      player.velocity.x = -MOVE_SPEED;
      player.facingRight = false;
    } else if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) {
      player.velocity.x = MOVE_SPEED;
      player.facingRight = true;
    } else {
      player.velocity.x *= 0.8;
      if (Math.abs(player.velocity.x) < 0.1) player.velocity.x = 0;
    }

    if ((keys.has('ArrowUp') || keys.has('w') || keys.has('W') || keys.has(' ')) && player.isOnGround) {
      player.velocity.y = JUMP_FORCE;
      player.isJumping = true;
      player.isOnGround = false;
    }

    player.velocity.y += GRAVITY;

    timeRef.current += deltaTime;

    platforms.forEach((platform, index) => {
      if (platform.isMoving && platform.startPosition && platform.moveRange && platform.moveSpeed) {
        const offset = Math.sin(timeRef.current * platform.moveSpeed * 0.002) * platform.moveRange;
        platforms[index] = {
          ...platform,
          position: {
            x: platform.startPosition.x + offset,
            y: platform.startPosition.y,
          },
        };
      }
    });

    enemies.forEach((enemy, index) => {
      const newPosition = { ...enemy.position };
      newPosition.x += enemy.velocity.x;

      if (
        newPosition.x > enemy.startPosition.x + enemy.patrolRange ||
        newPosition.x < enemy.startPosition.x - enemy.patrolRange
      ) {
        enemies[index] = {
          ...enemy,
          velocity: { x: -enemy.velocity.x, y: 0 },
        };
      } else {
        enemies[index] = { ...enemy, position: newPosition };
      }
    });

    const newX = player.position.x + player.velocity.x;
    const newY = player.position.y + player.velocity.y;

    if (newX < 0) {
      player.position.x = 0;
      player.velocity.x = 0;
    } else if (newX > CANVAS_WIDTH - player.width) {
      player.position.x = CANVAS_WIDTH - player.width;
      player.velocity.x = 0;
    } else {
      player.position.x = newX;
    }

    let horizontalCollision = false;
    platforms.forEach((platform) => {
      if (checkCollision({ ...player, position: { ...player.position, y: newY } }, platform)) {
        horizontalCollision = true;
      }
    });

    if (!horizontalCollision) {
      player.position.y = newY;
    }

    player.isOnGround = false;

    platforms.forEach((platform) => {
      const playerBottom = player.position.y + player.height;
      const playerRight = player.position.x + player.width;
      const platformBottom = platform.position.y + platform.height;
      const platformRight = platform.position.x + platform.width;

      if (checkCollision(player, platform)) {
        if (
          player.velocity.y > 0 &&
          playerBottom > platform.position.y &&
          player.position.y < platform.position.y
        ) {
          player.position.y = platform.position.y - player.height;
          player.velocity.y = 0;
          player.isOnGround = true;
          player.isJumping = false;
        }
        else if (
          player.velocity.y < 0 &&
          player.position.y < platformBottom &&
          playerBottom > platformBottom
        ) {
          player.position.y = platformBottom;
          player.velocity.y = 0;
        }
        else if (
          player.velocity.x > 0 &&
          playerRight > platform.position.x &&
          player.position.x < platform.position.x
        ) {
          player.position.x = platform.position.x - player.width;
          player.velocity.x = 0;
        }
        else if (
          player.velocity.x < 0 &&
          player.position.x < platformRight &&
          playerRight > platformRight
        ) {
          player.position.x = platformRight;
          player.velocity.x = 0;
        }
      }
    });

    let newCollectedCount = state.collectedCount;
    let newScore = state.score;
    let collectedRelics: string[] = [];

    collectibles.forEach((collectible, index) => {
      if (!collectible.collected && checkCollision(player, collectible)) {
        collectibles[index] = { ...collectible, collected: true };
        if (collectible.subtype === 'energy') {
          newCollectedCount++;
          newScore += collectible.value * 10;
        } else if (collectible.subtype === 'relic') {
          newScore += collectible.value;
          collectedRelics.push(collectible.id);
        }
      }
    });

    enemies.forEach((enemy) => {
      if (checkCollision(player, enemy)) {
        if (player.velocity.y > 0 && player.position.y + player.height < enemy.position.y + enemy.height / 2 + player.velocity.y) {
          player.velocity.y = JUMP_FORCE * 0.6;
          newScore += 25;
        } else {
          player.health--;
          player.velocity.y = JUMP_FORCE * 0.5;
          player.velocity.x = player.position.x < enemy.position.x ? -8 : 8;

          if (player.health <= 0) {
            setGameState((prev) => ({ ...prev, isGameOver: true }));
          }
        }
      }
    });

    state.portals.forEach((portal) => {
      if (portal.isActive && checkCollision(player, portal)) {
        if (portal.targetLevel === 0) {
          setGameState((prev) => ({
            ...prev,
            isVictory: true,
            score: newScore,
          }));
        } else {
          initLevel(portal.targetLevel);
        }
      }
    });

    if (player.position.y > CANVAS_HEIGHT + 100) {
      player.health--;
      if (player.health <= 0) {
        setGameState((prev) => ({ ...prev, isGameOver: true }));
      } else {
        player.position = { ...state.level.playerStartPosition };
        player.velocity = { x: 0, y: 0 };
      }
    }

    setGameState((prev) => ({
      ...prev,
      player,
      platforms,
      enemies,
      collectibles,
      collectedCount: newCollectedCount,
      score: newScore,
      gameTime: prev.gameTime + deltaTime,
    }));
  }, [initLevel]);

  const drawPolygon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    sides: number,
    color: string,
    rotation: number = 0
  ) => {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotation);

    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const radius = Math.min(width, height) / 2;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  };

  const drawPlayer = (ctx: CanvasRenderingContext2D, player: Player) => {
    const { position, width, height, color, facingRight } = player;

    ctx.save();

    if (!facingRight) {
      ctx.translate(position.x + width / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(position.x + width / 2), 0);
    }

    drawPolygon(ctx, position.x, position.y, width, height, 6, color);

    const eyeOffsetX = width * 0.15;
    const eyeY = position.y + height * 0.35;
    const eyeSize = width * 0.12;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(position.x + width / 2 - eyeOffsetX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.arc(position.x + width / 2 + eyeOffsetX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(position.x + width / 2 - eyeOffsetX + 2, eyeY, eyeSize * 0.6, 0, Math.PI * 2);
    ctx.arc(position.x + width / 2 + eyeOffsetX + 2, eyeY, eyeSize * 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    const healthWidth = width;
    const healthHeight = 6;
    const healthY = position.y - 15;

    ctx.fillStyle = '#374151';
    ctx.fillRect(position.x, healthY, healthWidth, healthHeight);

    const healthPercent = player.health / player.maxHealth;
    ctx.fillStyle = healthPercent > 0.5 ? '#10B981' : healthPercent > 0.25 ? '#F59E0B' : '#EF4444';
    ctx.fillRect(position.x, healthY, healthWidth * healthPercent, healthHeight);

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(position.x, healthY, healthWidth, healthHeight);
  };

  const drawPlatform = (ctx: CanvasRenderingContext2D, platform: Platform) => {
    const { position, width, height, color, isMoving } = platform;

    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, width, height);

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(position.x, position.y, width, height * 0.3);

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(position.x, position.y + height - 3, width, 3);

    if (isMoving) {
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(position.x - 2, position.y - 2, width + 4, height + 4);
      ctx.setLineDash([]);
    }
  };

  const drawCollectible = (ctx: CanvasRenderingContext2D, collectible: Collectible, time: number) => {
    if (collectible.collected) return;

    const { position, width, height, color, subtype } = collectible;
    const floatOffset = Math.sin(time * 0.003) * 5;
    const rotation = time * 0.002;

    const y = position.y + floatOffset;

    if (subtype === 'energy') {
      drawPolygon(ctx, position.x, y, width, height, 5, color, rotation);

      ctx.shadowColor = color;
      ctx.shadowBlur = 15;
      drawPolygon(ctx, position.x + 2, y + 2, width - 4, height - 4, 5, 'rgba(255,255,255,0.5)', rotation);
      ctx.shadowBlur = 0;
    } else if (subtype === 'relic') {
      drawPolygon(ctx, position.x, y, width, height, 8, color, rotation);

      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      drawPolygon(ctx, position.x + 5, y + 5, width - 10, height - 10, 8, '#FFFFFF', rotation);
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(position.x + width / 2, y + height / 2, width / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const drawEnemy = (ctx: CanvasRenderingContext2D, enemy: Enemy, time: number) => {
    const { position, width, height, color, velocity } = enemy;
    const facingRight = velocity.x > 0;
    const floatOffset = Math.sin(time * 0.005) * 2;

    ctx.save();

    if (!facingRight) {
      ctx.translate(position.x + width / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(position.x + width / 2), 0);
    }

    drawPolygon(ctx, position.x, position.y + floatOffset, width, height, 3, color);

    const eyeX = position.x + width * 0.6;
    const eyeY = position.y + height * 0.45 + floatOffset;
    const eyeSize = width * 0.15;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(eyeX + 2, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const drawPortal = (ctx: CanvasRenderingContext2D, portal: Portal, time: number) => {
    if (!portal.isActive) return;

    const { position, width, height, color } = portal;
    const pulse = Math.sin(time * 0.005) * 0.2 + 0.8;

    const gradient = ctx.createRadialGradient(
      position.x + width / 2,
      position.y + height / 2,
      0,
      position.x + width / 2,
      position.y + height / 2,
      width / 2
    );

    gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.5, color);
    gradient.addColorStop(1, 'rgba(0,0,0,0.3)');

    ctx.globalAlpha = pulse;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      position.x + width / 2,
      position.y + height / 2,
      width / 2,
      height / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.save();
    ctx.translate(position.x + width / 2, position.y + height / 2);
    ctx.rotate(time * 0.002);

    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, width / 3, 0, Math.PI * 1.5);
    ctx.stroke();

    ctx.rotate(Math.PI);
    ctx.beginPath();
    ctx.arc(0, 0, width / 4, 0, Math.PI * 1.5);
    ctx.stroke();

    ctx.restore();
    ctx.globalAlpha = 1;
  };

  const drawBackground = (ctx: CanvasRenderingContext2D, level: Level | null, time: number) => {
    if (!level) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, level.backgroundColor);
    gradient.addColorStop(1, adjustColor(level.backgroundColor, 30));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 8; i++) {
      const x = (i * 180 + Math.sin(time * 0.0005 + i) * 20) % CANVAS_WIDTH;
      const y = (i * 100 + Math.cos(time * 0.0003 + i) * 15) % CANVAS_HEIGHT;
      const size = 30 + (i % 3) * 20;

      drawPolygon(ctx, x, y, size, size, 3 + (i % 4), level.accentColor);
    }
    ctx.globalAlpha = 1;
  };

  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const r = Math.min(255, Math.max(0, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.min(255, Math.max(0, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.min(255, Math.max(0, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;
    const time = Date.now();

    drawBackground(ctx, state.level, time);

    state.platforms.forEach((platform) => drawPlatform(ctx, platform));

    state.portals.forEach((portal) => drawPortal(ctx, portal, time));

    state.collectibles.forEach((collectible) => drawCollectible(ctx, collectible, time));

    state.enemies.forEach((enemy) => drawEnemy(ctx, enemy, time));

    drawPlayer(ctx, state.player);

    if (state.isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px sans-serif';
      ctx.fillText(`最终得分: ${state.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
      ctx.fillText('按 R 键重新开始', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
    }

    if (state.isVictory) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 64px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('恭喜通关！', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '28px sans-serif';
      ctx.fillText(`最终得分: ${state.score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);
      ctx.font = '20px sans-serif';
      ctx.fillText(`收集能量: ${state.collectedCount}/${state.totalCount}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
      ctx.fillText('按 R 键返回主菜单', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100);
    }

    if (state.isPaused && !state.isGameOver && !state.isVictory) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('游戏暂停', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = '20px sans-serif';
      ctx.fillText('按 ESC 或 P 键继续', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 40);
    }
  }, []);

  const lastTimeRef = useRef<number>(0);

  const gameLoop = useCallback((timestamp: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = timestamp;
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    updateGame(deltaTime);
    render();

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, render]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);

      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
      }

      if ((e.key === 'r' || e.key === 'R') && (gameStateRef.current.isGameOver || gameStateRef.current.isVictory)) {
        if (gameStateRef.current.isVictory) {
          initLevel(1);
        } else {
          initLevel(levelId);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initLevel, levelId]);

  const togglePause = useCallback(() => {
    setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const restartLevel = useCallback(() => {
    initLevel(levelId);
  }, [initLevel, levelId]);

  return {
    canvasRef,
    gameState,
    togglePause,
    restartLevel,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
  };
};
