import { Injectable } from '@angular/core';
import { MazeCell, Direction, WallPosition, Point } from '../types';
import { GameUtils } from '../utils/game.utils';

@Injectable({
  providedIn: 'root',
})
export class MazeGeneratorService {
  // 生成迷宫
  generate(rows: number, cols: number): MazeCell[][] {
    // 初始化迷宫网格，所有单元格都有四面墙
    const grid: MazeCell[][] = [];
    for (let row = 0; row < rows; row++) {
      grid[row] = [];
      for (let col = 0; col < cols; col++) {
        grid[row][col] = {
          row,
          col,
          walls: {
            top: true,
            bottom: true,
            left: true,
            right: true,
          },
          visited: false,
        };
      }
    }

    // 使用深度优先搜索算法生成迷宫
    this.dfsGenerate(grid, 0, 0);

    return grid;
  }

  // 深度优先搜索生成迷宫
  private dfsGenerate(grid: MazeCell[][], startRow: number, startCol: number): void {
    const stack: { row: number; col: number }[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // 标记起始单元格为已访问并压入栈
    grid[startRow][startCol].visited = true;
    stack.push({ row: startRow, col: startCol });

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const currentCell = grid[current.row][current.col];

      // 获取所有未访问的邻居
      const neighbors = this.getUnvisitedNeighbors(grid, current.row, current.col);

      if (neighbors.length > 0) {
        // 随机选择一个邻居
        const next = GameUtils.randomChoice(neighbors);

        // 移除当前单元格和邻居之间的墙
        this.removeWalls(currentCell, grid[next.row][next.col]);

        // 标记邻居为已访问并压入栈
        grid[next.row][next.col].visited = true;
        stack.push(next);
      } else {
        // 没有未访问的邻居，回溯
        stack.pop();
      }
    }
  }

  // 获取未访问的邻居
  private getUnvisitedNeighbors(
    grid: MazeCell[][],
    row: number,
    col: number
  ): { row: number; col: number }[] {
    const neighbors: { row: number; col: number }[] = [];
    const rows = grid.length;
    const cols = grid[0].length;

    // 上
    if (row > 0 && !grid[row - 1][col].visited) {
      neighbors.push({ row: row - 1, col });
    }
    // 下
    if (row < rows - 1 && !grid[row + 1][col].visited) {
      neighbors.push({ row: row + 1, col });
    }
    // 左
    if (col > 0 && !grid[row][col - 1].visited) {
      neighbors.push({ row, col: col - 1 });
    }
    // 右
    if (col < cols - 1 && !grid[row][col + 1].visited) {
      neighbors.push({ row, col: col + 1 });
    }

    return neighbors;
  }

  // 移除两个相邻单元格之间的墙
  private removeWalls(cell1: MazeCell, cell2: MazeCell): void {
    const rowDiff = cell2.row - cell1.row;
    const colDiff = cell2.col - cell1.col;

    if (rowDiff === -1) {
      // cell2 在 cell1 上方
      cell1.walls.top = false;
      cell2.walls.bottom = false;
    } else if (rowDiff === 1) {
      // cell2 在 cell1 下方
      cell1.walls.bottom = false;
      cell2.walls.top = false;
    } else if (colDiff === -1) {
      // cell2 在 cell1 左边
      cell1.walls.left = false;
      cell2.walls.right = false;
    } else if (colDiff === 1) {
      // cell2 在 cell1 右边
      cell1.walls.right = false;
      cell2.walls.left = false;
    }
  }

  // 检查从一个单元格到另一个单元格是否有通路
  hasPath(
    grid: MazeCell[][],
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number
  ): boolean {
    const fromCell = grid[fromRow]?.[fromCol];
    const toCell = grid[toRow]?.[toCol];

    if (!fromCell || !toCell) return false;

    const rowDiff = toRow - fromRow;
    const colDiff = toCol - fromCol;

    // 检查是否相邻
    if (Math.abs(rowDiff) + Math.abs(colDiff) !== 1) return false;

    // 检查墙是否存在
    if (rowDiff === -1) {
      // 向上
      return !fromCell.walls.top && !toCell.walls.bottom;
    } else if (rowDiff === 1) {
      // 向下
      return !fromCell.walls.bottom && !toCell.walls.top;
    } else if (colDiff === -1) {
      // 向左
      return !fromCell.walls.left && !toCell.walls.right;
    } else if (colDiff === 1) {
      // 向右
      return !fromCell.walls.right && !toCell.walls.left;
    }

    return false;
  }

  // 检查移动是否合法（没有墙阻挡）
  canMove(grid: MazeCell[][], row: number, col: number, direction: Direction): boolean {
    const cell = grid[row]?.[col];
    if (!cell) return false;

    const rows = grid.length;
    const cols = grid[0].length;

    switch (direction) {
      case Direction.Up:
        return row > 0 && !cell.walls.top;
      case Direction.Down:
        return row < rows - 1 && !cell.walls.bottom;
      case Direction.Left:
        return col > 0 && !cell.walls.left;
      case Direction.Right:
        return col < cols - 1 && !cell.walls.right;
    }
  }

  // 获取所有可达的单元格
  getReachableCells(
    grid: MazeCell[][],
    startRow: number,
    startCol: number
  ): { row: number; col: number }[] {
    const visited = new Set<string>();
    const queue: { row: number; col: number }[] = [];
    const result: { row: number; col: number }[] = [];

    queue.push({ row: startRow, col: startCol });
    visited.add(`${startRow},${startCol}`);

    while (queue.length > 0) {
      const current = queue.shift()!;
      result.push(current);

      // 检查四个方向
      const directions = [
        { dir: Direction.Up, dr: -1, dc: 0 },
        { dir: Direction.Down, dr: 1, dc: 0 },
        { dir: Direction.Left, dr: 0, dc: -1 },
        { dir: Direction.Right, dr: 0, dc: 1 },
      ];

      for (const { dir, dr, dc } of directions) {
        if (this.canMove(grid, current.row, current.col, dir)) {
          const newRow = current.row + dr;
          const newCol = current.col + dc;
          const key = `${newRow},${newCol}`;

          if (!visited.has(key)) {
            visited.add(key);
            queue.push({ row: newRow, col: newCol });
          }
        }
      }
    }

    return result;
  }
}
