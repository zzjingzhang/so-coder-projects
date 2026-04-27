import type { Point, Obstacle } from '@/types';

interface Node {
  x: number;
  y: number;
  g: number;
  h: number;
  f: number;
  parent: Node | null;
}

function heuristic(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(point: Point, gridSize: number): Point[] {
  const directions = [
    { x: 0, y: -gridSize },
    { x: gridSize, y: 0 },
    { x: 0, y: gridSize },
    { x: -gridSize, y: 0 },
    { x: gridSize, y: -gridSize },
    { x: gridSize, y: gridSize },
    { x: -gridSize, y: gridSize },
    { x: -gridSize, y: -gridSize },
  ];
  
  return directions.map(d => ({
    x: point.x + d.x,
    y: point.y + d.y,
  }));
}

function isInObstacle(point: Point, obstacles: Obstacle[], margin: number = 20): boolean {
  return obstacles.some(obs => 
    point.x >= obs.x - margin && 
    point.x <= obs.x + obs.width + margin &&
    point.y >= obs.y - margin && 
    point.y <= obs.y + obs.height + margin
  );
}

function isPointInBounds(point: Point, width: number, height: number): boolean {
  return point.x >= 0 && point.x < width && point.y >= 0 && point.y < height;
}

function roundToGrid(point: Point, gridSize: number): Point {
  return {
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize,
  };
}

export function findPath(
  start: Point,
  end: Point,
  obstacles: Obstacle[],
  width: number,
  height: number,
  gridSize: number = 20
): Point[] {
  const roundedStart = roundToGrid(start, gridSize);
  const roundedEnd = roundToGrid(end, gridSize);
  
  const openSet: Node[] = [];
  const closedSet = new Set<string>();
  
  const startNode: Node = {
    x: roundedStart.x,
    y: roundedStart.y,
    g: 0,
    h: heuristic(roundedStart, roundedEnd),
    f: 0,
    parent: null,
  };
  startNode.f = startNode.g + startNode.h;
  
  openSet.push(startNode);
  
  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift()!;
    
    if (Math.abs(current.x - roundedEnd.x) <= gridSize && 
        Math.abs(current.y - roundedEnd.y) <= gridSize) {
      const path: Point[] = [];
      let node: Node | null = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }
      return path;
    }
    
    const key = `${current.x},${current.y}`;
    closedSet.add(key);
    
    const neighbors = getNeighbors({ x: current.x, y: current.y }, gridSize);
    
    for (const neighbor of neighbors) {
      if (!isPointInBounds(neighbor, width, height)) continue;
      if (isInObstacle(neighbor, obstacles)) continue;
      
      const neighborKey = `${neighbor.x},${neighbor.y}`;
      if (closedSet.has(neighborKey)) continue;
      
      const moveCost = Math.abs(neighbor.x - current.x) + Math.abs(neighbor.y - current.y) === gridSize * 2 
        ? gridSize * 1.4 
        : gridSize;
      
      const g = current.g + moveCost;
      const h = heuristic(neighbor, roundedEnd);
      const f = g + h;
      
      const existingNode = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
      
      if (existingNode) {
        if (g < existingNode.g) {
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = current;
        }
      } else {
        openSet.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          h,
          f,
          parent: current,
        });
      }
    }
  }
  
  return [start, end];
}

export function simplifyPath(path: Point[], tolerance: number = 10): Point[] {
  if (path.length <= 2) return path;
  
  const result: Point[] = [path[0]];
  
  for (let i = 1; i < path.length - 1; i++) {
    const prev = result[result.length - 1];
    const curr = path[i];
    const next = path[i + 1];
    
    const dx1 = curr.x - prev.x;
    const dy1 = curr.y - prev.y;
    const dx2 = next.x - curr.x;
    const dy2 = next.y - curr.y;
    
    const cross = dx1 * dy2 - dy1 * dx2;
    const dot = dx1 * dx2 + dy1 * dy2;
    
    const angle = Math.abs(Math.atan2(cross, dot));
    
    if (angle > tolerance * Math.PI / 180) {
      result.push(curr);
    }
  }
  
  result.push(path[path.length - 1]);
  
  return result;
}
