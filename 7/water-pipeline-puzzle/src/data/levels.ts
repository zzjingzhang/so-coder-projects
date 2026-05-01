import { GameLevel, GameCell, PipeType } from '../types';

// 生成单元格ID
const generateCellId = (row: number, col: number): string => `${row}-${col}`;

// 创建单元格
const createCell = (
  row: number,
  col: number,
  type: PipeType,
  rotation: number = 0,
  isFixed: boolean = false
): GameCell => ({
  id: generateCellId(row, col),
  row,
  col,
  type,
  rotation,
  hasWater: false,
  isFixed
});

// 简单关卡（3x3）
export const level1: GameLevel = {
  id: 1,
  name: '入门教程',
  rows: 3,
  cols: 3,
  cells: [
    // 第一行
    createCell(0, 0, 'empty', 0, false),
    createCell(0, 1, 'straight', 90, false),
    createCell(0, 2, 'empty', 0, false),
    // 第二行 - 喷泉在左边，池塘在右边
    createCell(1, 0, 'fountain', 0, true),
    createCell(1, 1, 'straight', 0, false),
    createCell(1, 2, 'pond', 0, true),
    // 第三行
    createCell(2, 0, 'empty', 0, false),
    createCell(2, 1, 'straight', 90, false),
    createCell(2, 2, 'empty', 0, false)
  ]
};

// 中等关卡（4x4）
export const level2: GameLevel = {
  id: 2,
  name: '拐角挑战',
  rows: 4,
  cols: 4,
  cells: [
    // 第一行 - 喷泉在左上角
    createCell(0, 0, 'fountain', 90, true), // 向下出水
    createCell(0, 1, 'empty', 0, false),
    createCell(0, 2, 'empty', 0, false),
    createCell(0, 3, 'empty', 0, false),
    // 第二行
    createCell(1, 0, 'straight', 0, false),
    createCell(1, 1, 'corner', 0, false),
    createCell(1, 2, 'straight', 90, false),
    createCell(1, 3, 'empty', 0, false),
    // 第三行
    createCell(2, 0, 'empty', 0, false),
    createCell(2, 1, 'straight', 0, false),
    createCell(2, 2, 'corner', 90, false),
    createCell(2, 3, 'straight', 90, false),
    // 第四行 - 池塘在右下角
    createCell(3, 0, 'empty', 0, false),
    createCell(3, 1, 'empty', 0, false),
    createCell(3, 2, 'empty', 0, false),
    createCell(3, 3, 'pond', 180, true) // 从上方进水
  ]
};

// 困难关卡（5x5）
export const level3: GameLevel = {
  id: 3,
  name: '复杂迷宫',
  rows: 5,
  cols: 5,
  cells: [
    // 第一行 - 喷泉在左上角
    createCell(0, 0, 'fountain', 90, true), // 向下出水
    createCell(0, 1, 'empty', 0, false),
    createCell(0, 2, 'empty', 0, false),
    createCell(0, 3, 'empty', 0, false),
    createCell(0, 4, 'empty', 0, false),
    // 第二行
    createCell(1, 0, 'straight', 0, false),
    createCell(1, 1, 't-shape', 0, false),
    createCell(1, 2, 'straight', 90, false),
    createCell(1, 3, 'corner', 90, false),
    createCell(1, 4, 'empty', 0, false),
    // 第三行
    createCell(2, 0, 'empty', 0, false),
    createCell(2, 1, 'straight', 0, false),
    createCell(2, 2, 'cross', 0, false),
    createCell(2, 3, 'straight', 0, false),
    createCell(2, 4, 'corner', 180, false),
    // 第四行
    createCell(3, 0, 'empty', 0, false),
    createCell(3, 1, 'corner', 270, false),
    createCell(3, 2, 'straight', 90, false),
    createCell(3, 3, 't-shape', 180, false),
    createCell(3, 4, 'straight', 0, false),
    // 第五行 - 池塘在右下角
    createCell(4, 0, 'empty', 0, false),
    createCell(4, 1, 'empty', 0, false),
    createCell(4, 2, 'empty', 0, false),
    createCell(4, 3, 'empty', 0, false),
    createCell(4, 4, 'pond', 270, true) // 从上方进水
  ]
};

// 所有关卡
export const allLevels: GameLevel[] = [level1, level2, level3];
