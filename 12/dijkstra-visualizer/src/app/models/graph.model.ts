export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  distance: number;
  visited: boolean;
  previous: string | null;
  isStart: boolean;
  isEnd: boolean;
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  weight: number;
  visited: boolean;
  isInPath: boolean;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export interface AlgorithmStep {
  stepNumber: number;
  description: string;
  currentNode: string | null;
  visitedNodes: string[];
  relaxedEdges: string[];
  pathEdges: string[];
  distances: Map<string, number>;
  previous: Map<string, string | null>;
}
