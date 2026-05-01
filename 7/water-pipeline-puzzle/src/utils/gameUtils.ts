import { PipeType, PipeConnections, GameCell } from '../types';

// 根据管道类型和旋转角度获取连接方向
export const getPipeConnections = (type: PipeType, rotation: number): PipeConnections => {
  // 基础连接配置（rotation = 0）
  const baseConnections: Record<PipeType, PipeConnections> = {
    'straight': { top: true, right: false, bottom: true, left: false },
    'corner': { top: true, right: true, bottom: false, left: false },
    't-shape': { top: true, right: true, bottom: true, left: false },
    'cross': { top: true, right: true, bottom: true, left: true },
    'empty': { top: false, right: false, bottom: false, left: false },
    'fountain': { top: false, right: true, bottom: false, left: false }, // 喷泉向右出水
    'pond': { top: false, right: false, bottom: false, left: true } // 池塘从左边进水
  };

  const base = baseConnections[type];
  
  // 根据旋转角度计算实际连接方向
  const rotations = rotation / 90;
  
  const connections: PipeConnections = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };

  // 旋转逻辑：每次90度顺时针旋转
  for (let i = 0; i < rotations; i++) {
    const temp = connections.top;
    connections.top = connections.left;
    connections.left = connections.bottom;
    connections.bottom = connections.right;
    connections.right = temp;
  }

  // 应用基础连接
  return {
    top: rotations % 2 === 0 ? base.top : base.left,
    right: rotations % 2 === 0 ? base.right : base.top,
    bottom: rotations % 2 === 0 ? base.bottom : base.right,
    left: rotations % 2 === 0 ? base.left : base.bottom
  };
};

// 旋转管道
export const rotatePipe = (rotation: number): number => {
  return (rotation + 90) % 360;
};

// 检查两个相邻单元格是否连接
export const areConnected = (
  cell1: GameCell,
  cell2: GameCell,
  direction: 'top' | 'right' | 'bottom' | 'left'
): boolean => {
  const conn1 = getPipeConnections(cell1.type, cell1.rotation);
  const conn2 = getPipeConnections(cell2.type, cell2.rotation);

  // 检查方向对应关系
  const opposite: Record<string, 'top' | 'right' | 'bottom' | 'left'> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };

  return conn1[direction] && conn2[opposite[direction]];
};

// 检查游戏是否获胜
export const checkWin = (cells: GameCell[], rows: number, cols: number): boolean => {
  // 找到喷泉和池塘
  const fountain = cells.find(c => c.type === 'fountain');
  const pond = cells.find(c => c.type === 'pond');

  if (!fountain || !pond) return false;

  // 使用 BFS 检查从喷泉到池塘是否有连通路径
  const visited = new Set<string>();
  const queue: GameCell[] = [fountain];
  visited.add(fountain.id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current.type === 'pond') {
      return true;
    }

    // 检查四个方向
    const directions = [
      { dir: 'top' as const, row: -1, col: 0 },
      { dir: 'right' as const, row: 0, col: 1 },
      { dir: 'bottom' as const, row: 1, col: 0 },
      { dir: 'left' as const, row: 0, col: -1 }
    ];

    for (const { dir, row, col } of directions) {
      const newRow = current.row + row;
      const newCol = current.col + col;

      // 检查边界
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        continue;
      }

      const neighbor = cells.find(c => c.row === newRow && c.col === newCol);
      
      if (!neighbor || visited.has(neighbor.id)) {
        continue;
      }

      // 检查是否连接
      if (areConnected(current, neighbor, dir)) {
        visited.add(neighbor.id);
        queue.push(neighbor);
      }
    }
  }

  return false;
};

// 获取水流动的路径（用于显示水流动画）
export const getWaterPath = (cells: GameCell[], rows: number, cols: number): string[] => {
  const fountain = cells.find(c => c.type === 'fountain');
  const pond = cells.find(c => c.type === 'pond');

  if (!fountain || !pond) return [];

  const visited = new Set<string>();
  const queue: GameCell[] = [fountain];
  const path: string[] = [fountain.id];
  visited.add(fountain.id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current.type === 'pond') {
      return path;
    }

    const directions = [
      { dir: 'top' as const, row: -1, col: 0 },
      { dir: 'right' as const, row: 0, col: 1 },
      { dir: 'bottom' as const, row: 1, col: 0 },
      { dir: 'left' as const, row: 0, col: -1 }
    ];

    for (const { dir, row, col } of directions) {
      const newRow = current.row + row;
      const newCol = current.col + col;

      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        continue;
      }

      const neighbor = cells.find(c => c.row === newRow && c.col === newCol);
      
      if (!neighbor || visited.has(neighbor.id)) {
        continue;
      }

      if (areConnected(current, neighbor, dir)) {
        visited.add(neighbor.id);
        path.push(neighbor.id);
        queue.push(neighbor);
      }
    }
  }

  return path;
};
