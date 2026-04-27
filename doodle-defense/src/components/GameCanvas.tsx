import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Point, Line, Enemy, Particle, LineType, Obstacle } from '@/types';
import { LINE_CONFIG, ENEMY_CONFIG } from '@/types';

interface GameCanvasProps {
  width: number;
  height: number;
  lines: Line[];
  enemies: Enemy[];
  particles: Particle[];
  selectedLineType: LineType;
  isPlaying: boolean;
  obstacles: Obstacle[];
  startPoint: Point;
  endPoint: Point;
  onDrawLine: (points: Point[], type: LineType) => void;
}

export function GameCanvas({
  width,
  height,
  lines,
  enemies,
  particles,
  selectedLineType,
  isPlaying,
  obstacles,
  startPoint,
  endPoint,
  onDrawLine,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);

  const getCanvasPoint = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number;
    let clientY: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPlaying) return;
    
    e.preventDefault();
    const point = getCanvasPoint(e);
    setIsDrawing(true);
    setCurrentPoints([point]);
  }, [isPlaying, getCanvasPoint]);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !isPlaying) return;
    
    e.preventDefault();
    const point = getCanvasPoint(e);
    
    setCurrentPoints(prev => {
      if (prev.length === 0) return [point];
      
      const lastPoint = prev[prev.length - 1];
      const dist = Math.sqrt(
        (point.x - lastPoint.x) ** 2 + 
        (point.y - lastPoint.y) ** 2
      );
      
      if (dist > 5) {
        return [...prev, point];
      }
      return prev;
    });
  }, [isDrawing, isPlaying, getCanvasPoint]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentPoints.length > 1) {
      onDrawLine(currentPoints, selectedLineType);
    }
    setIsDrawing(false);
    setCurrentPoints([]);
  }, [isDrawing, currentPoints, selectedLineType, onDrawLine]);

  const drawDoodleLine = useCallback((
    ctx: CanvasRenderingContext2D,
    points: Point[],
    color: string,
    thickness: number,
    alpha: number = 1
  ) => {
    if (points.length < 2) return;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const wobble = (Math.random() - 0.5) * 1;
      ctx.lineTo(
        points[i].x + wobble,
        points[i].y + wobble
      );
    }

    ctx.stroke();

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = thickness + 2;
    ctx.globalAlpha = alpha * 0.3;
    ctx.beginPath();
    ctx.moveTo(points[0].x + 2, points[0].y + 2);

    for (let i = 1; i < points.length; i++) {
      const wobble = (Math.random() - 0.5) * 1;
      ctx.lineTo(
        points[i].x + wobble + 2,
        points[i].y + wobble + 2
      );
    }
    ctx.stroke();

    ctx.restore();
  }, []);

  const drawDoodleCircle = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string,
    fill: boolean = true
  ) => {
    ctx.save();
    ctx.beginPath();

    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const wobble = (Math.random() - 0.5) * 2;
      const px = x + (radius + wobble) * Math.cos(angle);
      const py = y + (radius + wobble) * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(px, py);
      } else {
        ctx.lineTo(px, py);
      }
    }

    ctx.closePath();

    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }, []);

  const drawEnemy = useCallback((
    ctx: CanvasRenderingContext2D,
    enemy: Enemy
  ) => {
    const config = ENEMY_CONFIG[enemy.type];
    const { x, y, size, health, maxHealth, slowedUntil, burningUntil } = enemy;
    const now = performance.now();

    ctx.save();

    let scale = 1;
    if (now < burningUntil) {
      scale = 1 + Math.sin(now / 100) * 0.05;
    }

    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);

    drawDoodleCircle(ctx, x, y, size / 2, config.color);

    const eyeOffset = size / 5;
    const eyeSize = size / 6;
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x - eyeOffset, y - eyeOffset / 2, eyeSize, 0, Math.PI * 2);
    ctx.arc(x + eyeOffset, y - eyeOffset / 2, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#2d2d2d';
    ctx.beginPath();
    ctx.arc(x - eyeOffset, y - eyeOffset / 2, eyeSize / 2, 0, Math.PI * 2);
    ctx.arc(x + eyeOffset, y - eyeOffset / 2, eyeSize / 2, 0, Math.PI * 2);
    ctx.fill();

    if (now < slowedUntil) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(x, y, size / 2 + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (now < burningUntil) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
      for (let i = 0; i < 5; i++) {
        const flameX = x + (Math.random() - 0.5) * size;
        const flameY = y - size / 2 - Math.random() * 10;
        const flameSize = Math.random() * 5 + 3;
        ctx.beginPath();
        ctx.arc(flameX, flameY, flameSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const healthBarWidth = size;
    const healthBarHeight = 6;
    const healthBarY = y - size / 2 - 15;

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(
      x - healthBarWidth / 2,
      healthBarY,
      healthBarWidth,
      healthBarHeight
    );

    ctx.fillStyle = '#10b981';
    ctx.fillRect(
      x - healthBarWidth / 2,
      healthBarY,
      healthBarWidth * (health / maxHealth),
      healthBarHeight
    );

    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      x - healthBarWidth / 2,
      healthBarY,
      healthBarWidth,
      healthBarHeight
    );

    ctx.restore();
  }, [drawDoodleCircle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#fffef9';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(200, 180, 160, 0.2)';
    ctx.lineWidth = 1;
    
    const gridSize = 20;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    for (const obs of obstacles) {
      ctx.save();
      ctx.fillStyle = '#d1d5db';
      ctx.strokeStyle = '#2d2d2d';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(obs.x + 2, obs.y + 2);
      ctx.lineTo(obs.x + obs.width - 2, obs.y + 1);
      ctx.lineTo(obs.x + obs.width - 1, obs.y + obs.height - 1);
      ctx.lineTo(obs.x + 1, obs.y + obs.height - 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < obs.height; i += 4) {
        ctx.beginPath();
        ctx.moveTo(obs.x + 5, obs.y + i + 5);
        ctx.lineTo(obs.x + obs.width - 5, obs.y + i + 5);
        ctx.stroke();
      }

      ctx.restore();
    }

    ctx.save();
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y - 15);
    ctx.lineTo(startPoint.x + 10, startPoint.y);
    ctx.lineTo(startPoint.x, startPoint.y + 15);
    ctx.lineTo(startPoint.x - 10, startPoint.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#2d2d2d';
    ctx.font = 'bold 12px "Comic Sans MS", cursive';
    ctx.textAlign = 'center';
    ctx.fillText('起点', startPoint.x, startPoint.y + 35);
    ctx.restore();

    ctx.save();
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#2d2d2d';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef2f2';
    ctx.font = 'bold 14px "Comic Sans MS", cursive';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('基地', endPoint.x, endPoint.y);

    ctx.fillStyle = '#2d2d2d';
    ctx.font = 'bold 12px "Comic Sans MS", cursive';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('终点', endPoint.x, endPoint.y + 40);
    ctx.restore();

    for (const line of lines) {
      const config = LINE_CONFIG[line.type];
      const now = performance.now();
      const age = now - line.createdAt;
      const lifeProgress = age / line.duration;
      const durabilityProgress = line.durability / line.maxDurability;
      const alpha = Math.min(1, Math.min(1 - lifeProgress, durabilityProgress) * 1.5);

      drawDoodleLine(ctx, line.points, config.color, line.thickness, alpha);

      if (line.type === 'magnet' && line.points.length > 0) {
        ctx.save();
        ctx.globalAlpha = alpha * 0.2;
        ctx.strokeStyle = config.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        for (let i = 0; i < line.points.length; i += 3) {
          const point = line.points[i];
          ctx.beginPath();
          ctx.arc(point.x, point.y, 60, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(point.x, point.y, 40, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        ctx.restore();
      }

      if (line.type === 'fire' && line.points.length > 0) {
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        
        for (let i = 0; i < line.points.length; i += 5) {
          const point = line.points[i];
          const flicker = Math.sin(now / 100 + i) * 2;
          
          ctx.fillStyle = 'rgba(251, 146, 60, 0.7)';
          ctx.beginPath();
          ctx.arc(
            point.x + (Math.random() - 0.5) * 10,
            point.y - 8 - flicker,
            4 + Math.random() * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
          ctx.beginPath();
          ctx.arc(
            point.x + (Math.random() - 0.5) * 8,
            point.y - 5 - flicker * 0.5,
            3 + Math.random() * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.restore();
      }

      if (line.type === 'slime' && line.points.length > 1) {
        ctx.save();
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
        
        for (let i = 0; i < line.points.length - 1; i += 8) {
          const p1 = line.points[i];
          const p2 = line.points[Math.min(i + 1, line.points.length - 1)];
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;
          
          const drip = Math.sin(now / 500 + i) * 5;
          
          ctx.beginPath();
          ctx.arc(
            midX + (Math.random() - 0.5) * 10,
            midY + 5 + drip,
            3 + Math.random() * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        ctx.restore();
      }
    }

    if (isDrawing && currentPoints.length > 0) {
      const config = LINE_CONFIG[selectedLineType];
      drawDoodleLine(ctx, currentPoints, config.color, 8, 0.7);
    }

    for (const enemy of enemies) {
      drawEnemy(ctx, enemy);
    }

    for (const particle of particles) {
      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

  }, [
    width,
    height,
    lines,
    enemies,
    particles,
    isDrawing,
    currentPoints,
    selectedLineType,
    obstacles,
    startPoint,
    endPoint,
    drawDoodleLine,
    drawEnemy,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="game-canvas w-full"
      style={{ maxWidth: width, maxHeight: height }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    />
  );
}
