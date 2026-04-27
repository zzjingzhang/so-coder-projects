import { Direction, CellType } from '../types';

export const isPositionValid = (pos, gridSize) => {
  return (
    pos.row >= 0 &&
    pos.row < gridSize.rows &&
    pos.col >= 0 &&
    pos.col < gridSize.cols
  );
};

export const isObstacle = (pos, obstacles) => {
  return obstacles.some(
    (obstacle) => obstacle.row === pos.row && obstacle.col === pos.col
  );
};

export const isCoin = (pos, coins) => {
  return coins.some((coin) => coin.row === pos.row && coin.col === pos.col);
};

export const getArrowAtPosition = (pos, arrows) => {
  return arrows.find(
    (arrow) => arrow.row === pos.row && arrow.col === pos.col
  );
};

export const getNextPosition = (currentPos, direction) => {
  switch (direction) {
    case Direction.UP:
      return { row: currentPos.row - 1, col: currentPos.col };
    case Direction.DOWN:
      return { row: currentPos.row + 1, col: currentPos.col };
    case Direction.LEFT:
      return { row: currentPos.row, col: currentPos.col - 1 };
    case Direction.RIGHT:
      return { row: currentPos.row, col: currentPos.col + 1 };
    default:
      return currentPos;
  }
};

export const isAtEnd = (pos, endPos) => {
  return pos.row === endPos.row && pos.col === endPos.col;
};

export const getDirectionArrow = (direction) => {
  switch (direction) {
    case Direction.UP:
      return '↑';
    case Direction.DOWN:
      return '↓';
    case Direction.LEFT:
      return '←';
    case Direction.RIGHT:
      return '→';
    default:
      return '?';
  }
};

export const getOppositeDirection = (direction) => {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
    default:
      return direction;
  }
};

export const getCellType = (row, col, level) => {
  const pos = { row, col };
  
  if (level.startPos.row === row && level.startPos.col === col) {
    return CellType.START;
  }
  
  if (level.endPos.row === row && level.endPos.col === col) {
    return CellType.END;
  }
  
  if (isObstacle(pos, level.obstacles)) {
    return CellType.OBSTACLE;
  }
  
  if (isCoin(pos, level.coins)) {
    return CellType.COIN;
  }
  
  return CellType.EMPTY;
};
