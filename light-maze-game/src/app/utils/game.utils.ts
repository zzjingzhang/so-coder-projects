import { Point, Direction, GAME_CONFIG } from '../types';

// 游戏工具类
export class GameUtils {
  // 计算两点之间的距离
  static distance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  // 将网格坐标转换为像素坐标
  static gridToPixel(row: number, col: number): Point {
    return {
      x: col * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2,
      y: row * GAME_CONFIG.CELL_SIZE + GAME_CONFIG.CELL_SIZE / 2,
    };
  }

  // 将像素坐标转换为网格坐标
  static pixelToGrid(x: number, y: number): { row: number; col: number } {
    return {
      row: Math.floor(y / GAME_CONFIG.CELL_SIZE),
      col: Math.floor(x / GAME_CONFIG.CELL_SIZE),
    };
  }

  // 获取方向向量
  static getDirectionVector(direction: Direction): Point {
    switch (direction) {
      case Direction.Up:
        return { x: 0, y: -1 };
      case Direction.Down:
        return { x: 0, y: 1 };
      case Direction.Left:
        return { x: -1, y: 0 };
      case Direction.Right:
        return { x: 1, y: 0 };
    }
  }

  // 检查两点是否在同一单元格
  static isSameCell(p1: Point, p2: Point): boolean {
    const grid1 = this.pixelToGrid(p1.x, p1.y);
    const grid2 = this.pixelToGrid(p2.x, p2.y);
    return grid1.row === grid2.row && grid1.col === grid2.col;
  }

  // 线性插值
  static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }

  // 点到线段的距离
  static pointToLineDistance(point: Point, lineStart: Point, lineEnd: Point): number {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) param = dot / lenSq;

    let xx: number, yy: number;

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

  // 生成唯一ID
  static generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  // 随机选择数组中的元素
  static randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // 打乱数组（Fisher-Yates算法）
  static shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  // 限制值在范围内
  static clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  // 检查两个圆是否相交
  static circlesIntersect(
    c1: Point,
    r1: number,
    c2: Point,
    r2: number
  ): boolean {
    return this.distance(c1, c2) < r1 + r2;
  }

  // 检查点是否在圆内
  static pointInCircle(point: Point, center: Point, radius: number): boolean {
    return this.distance(point, center) <= radius;
  }
}
