import { Direction, CellType } from '../types';

const levels = [
  {
    id: 1,
    name: '初次见面',
    description: '学习基本操作，引导机器人到达终点',
    gridSize: { rows: 5, cols: 7 },
    startPos: { row: 2, col: 0 },
    endPos: { row: 2, col: 6 },
    startDirection: Direction.RIGHT,
    maxArrows: 0,
    obstacles: [],
    coins: [],
    specialArrows: []
  },
  {
    id: 2,
    name: '转弯学习',
    description: '学习放置箭头改变机器人方向',
    gridSize: { rows: 5, cols: 7 },
    startPos: { row: 0, col: 0 },
    endPos: { row: 4, col: 6 },
    startDirection: Direction.RIGHT,
    maxArrows: 2,
    obstacles: [],
    coins: [{ row: 0, col: 3 }],
    specialArrows: []
  },
  {
    id: 3,
    name: '躲避障碍',
    description: '避开障碍物到达终点',
    gridSize: { rows: 6, cols: 8 },
    startPos: { row: 0, col: 0 },
    endPos: { row: 5, col: 7 },
    startDirection: Direction.RIGHT,
    maxArrows: 4,
    obstacles: [
      { row: 1, col: 2 }, { row: 1, col: 3 }, { row: 1, col: 4 },
      { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 3, col: 6 }
    ],
    coins: [{ row: 2, col: 1 }, { row: 4, col: 6 }],
    specialArrows: []
  },
  {
    id: 4,
    name: '迷宫探索',
    description: '在复杂地图中找到路径',
    gridSize: { rows: 7, cols: 9 },
    startPos: { row: 0, col: 0 },
    endPos: { row: 6, col: 8 },
    startDirection: Direction.RIGHT,
    maxArrows: 6,
    obstacles: [
      { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
      { row: 3, col: 3 }, { row: 3, col: 4 }, { row: 3, col: 5 }, { row: 3, col: 6 },
      { row: 5, col: 2 }, { row: 5, col: 3 }, { row: 5, col: 4 },
      { row: 2, col: 7 }, { row: 4, col: 7 }
    ],
    coins: [{ row: 0, col: 4 }, { row: 2, col: 2 }, { row: 4, col: 5 }, { row: 6, col: 3 }],
    specialArrows: []
  },
  {
    id: 5,
    name: '极限挑战',
    description: '最少箭头，最多障碍',
    gridSize: { rows: 8, cols: 10 },
    startPos: { row: 0, col: 0 },
    endPos: { row: 7, col: 9 },
    startDirection: Direction.DOWN,
    maxArrows: 5,
    obstacles: [
      { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
      { row: 4, col: 3 }, { row: 4, col: 4 }, { row: 4, col: 5 }, { row: 4, col: 6 },
      { row: 6, col: 0 }, { row: 6, col: 1 }, { row: 6, col: 2 }, { row: 6, col: 3 },
      { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 },
      { row: 5, col: 8 }, { row: 5, col: 9 }
    ],
    coins: [
      { row: 1, col: 2 }, { row: 3, col: 5 }, { row: 5, col: 1 },
      { row: 3, col: 8 }, { row: 7, col: 6 }
    ],
    specialArrows: []
  }
];

export default levels;
