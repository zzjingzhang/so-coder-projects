import type { Difficulty } from '../types';

function getBoxSize(gridSize: number): { rows: number; cols: number } {
  if (gridSize === 4) return { rows: 2, cols: 2 };
  if (gridSize === 6) return { rows: 2, cols: 3 };
  if (gridSize === 9) return { rows: 3, cols: 3 };
  if (gridSize === 16) return { rows: 4, cols: 4 };
  return { rows: 2, cols: 2 };
}

function isValidPlacement(
  grid: number[][],
  row: number,
  col: number,
  num: number,
  size: number
): boolean {
  for (let x = 0; x < size; x++) {
    if (grid[row][x] === num && x !== col) return false;
  }
  for (let x = 0; x < size; x++) {
    if (grid[x][col] === num && x !== row) return false;
  }
  const boxSize = getBoxSize(size);
  const startRow = Math.floor(row / boxSize.rows) * boxSize.rows;
  const startCol = Math.floor(col / boxSize.cols) * boxSize.cols;
  for (let i = 0; i < boxSize.rows; i++) {
    for (let j = 0; j < boxSize.cols; j++) {
      if (grid[startRow + i][startCol + j] === num &&
          (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }
  return true;
}

function fillGrid(grid: number[][], size: number): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (grid[row][col] === 0) {
        const nums = shuffleArray(Array.from({ length: size }, (_, i) => i + 1));
        for (const num of nums) {
          if (isValidPlacement(grid, row, col, num, size)) {
            grid[row][col] = num;
            if (fillGrid(grid, size)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCellsToRemove(difficulty: Difficulty, size: number): number {
  const totalCells = size * size;
  const ratios: Record<Difficulty, number> = {
    easy: 0.4,
    medium: 0.5,
    hard: 0.6,
    expert: 0.75
  };
  return Math.floor(totalCells * ratios[difficulty]);
}

export function generateSudoku(size: number, difficulty: Difficulty): { 
  puzzle: number[][], 
  solution: number[][] 
} {
  const grid: number[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
  fillGrid(grid, size);
  const solution = grid.map(row => [...row]);
  const cellsToRemove = getCellsToRemove(difficulty, size);
  const positions = shuffleArray(
    Array.from({ length: size * size }, (_, i) => ({
      row: Math.floor(i / size),
      col: i % size
    }))
  );
  const puzzle = solution.map(row => [...row]);
  let removed = 0;
  for (const { row, col } of positions) {
    if (removed >= cellsToRemove) break;
    puzzle[row][col] = 0;
    removed++;
  }
  return { puzzle, solution };
}

export function isValidSudoku(board: number[][], size: number): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const value = board[row][col];
      if (value !== 0) {
        if (!isValidPlacement(board, row, col, value, size)) {
          return false;
        }
      }
    }
  }
  return true;
}

export function isSudokuComplete(board: number[][], size: number): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) return false;
    }
  }
  return isValidSudoku(board, size);
}
