import { Injectable } from '@angular/core';
import { Node, Edge, Graph, AlgorithmStep } from '../models/graph.model';

@Injectable({
  providedIn: 'root'
})
export class DijkstraService {

  generateSampleGraph(): Graph {
    const nodes: Node[] = [
      { id: 'A', label: 'A', x: 100, y: 200, distance: 0, visited: false, previous: null, isStart: true, isEnd: false },
      { id: 'B', label: 'B', x: 250, y: 100, distance: Infinity, visited: false, previous: null, isStart: false, isEnd: false },
      { id: 'C', label: 'C', x: 250, y: 300, distance: Infinity, visited: false, previous: null, isStart: false, isEnd: false },
      { id: 'D', label: 'D', x: 400, y: 100, distance: Infinity, visited: false, previous: null, isStart: false, isEnd: false },
      { id: 'E', label: 'E', x: 400, y: 300, distance: Infinity, visited: false, previous: null, isStart: false, isEnd: false },
      { id: 'F', label: 'F', x: 550, y: 200, distance: Infinity, visited: false, previous: null, isStart: false, isEnd: true }
    ];

    const edges: Edge[] = [
      { id: 'AB', from: 'A', to: 'B', weight: 4, visited: false, isInPath: false },
      { id: 'AC', from: 'A', to: 'C', weight: 2, visited: false, isInPath: false },
      { id: 'BC', from: 'B', to: 'C', weight: 1, visited: false, isInPath: false },
      { id: 'BD', from: 'B', to: 'D', weight: 5, visited: false, isInPath: false },
      { id: 'CE', from: 'C', to: 'E', weight: 8, visited: false, isInPath: false },
      { id: 'DE', from: 'D', to: 'E', weight: 2, visited: false, isInPath: false },
      { id: 'DF', from: 'D', to: 'F', weight: 6, visited: false, isInPath: false },
      { id: 'EF', from: 'E', to: 'F', weight: 3, visited: false, isInPath: false }
    ];

    return { nodes, edges };
  }

  generateAlgorithmSteps(graph: Graph, startNodeId: string, endNodeId: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const unvisited = new Set<string>();
    const visited = new Set<string>();

    graph.nodes.forEach(node => {
      distances.set(node.id, node.id === startNodeId ? 0 : Infinity);
      previous.set(node.id, null);
      unvisited.add(node.id);
    });

    steps.push({
      stepNumber: 0,
      description: `初始化：将起始节点 ${startNodeId} 的距离设为 0，其他节点距离设为无穷大。`,
      currentNode: null,
      visitedNodes: [],
      relaxedEdges: [],
      pathEdges: [],
      distances: new Map(distances),
      previous: new Map(previous)
    });

    let stepNumber = 1;

    while (unvisited.size > 0) {
      let minDistance = Infinity;
      let currentNode: string | null = null;

      unvisited.forEach(nodeId => {
        const dist = distances.get(nodeId) || Infinity;
        if (dist < minDistance) {
          minDistance = dist;
          currentNode = nodeId;
        }
      });

      if (currentNode === null || (distances.get(currentNode) || Infinity) === Infinity) {
        break;
      }

      unvisited.delete(currentNode);
      visited.add(currentNode);

      const currentDist = distances.get(currentNode) || 0;
      steps.push({
        stepNumber: stepNumber++,
        description: `选择距离最小的未访问节点 ${currentNode}，当前距离: ${currentDist}`,
        currentNode: currentNode,
        visitedNodes: Array.from(visited),
        relaxedEdges: [],
        pathEdges: [],
        distances: new Map(distances),
        previous: new Map(previous)
      });

      const neighbors = this.getNeighbors(graph, currentNode);
      const relaxedEdges: string[] = [];

      neighbors.forEach(neighbor => {
        if (unvisited.has(neighbor.nodeId)) {
          const newDist = currentDist + neighbor.weight;
          const oldDist = distances.get(neighbor.nodeId) || Infinity;

          if (newDist < oldDist) {
            distances.set(neighbor.nodeId, newDist);
            previous.set(neighbor.nodeId, currentNode);
            relaxedEdges.push(neighbor.edgeId);
          }
        }
      });

      if (relaxedEdges.length > 0) {
        steps.push({
          stepNumber: stepNumber++,
          description: `松弛节点 ${currentNode} 的邻居节点，更新距离和前驱。`,
          currentNode: currentNode,
          visitedNodes: Array.from(visited),
          relaxedEdges: relaxedEdges,
          pathEdges: [],
          distances: new Map(distances),
          previous: new Map(previous)
        });
      }

      if (currentNode === endNodeId) {
        const pathEdges = this.reconstructPath(graph, previous, startNodeId, endNodeId);
        steps.push({
          stepNumber: stepNumber++,
          description: `到达目标节点 ${endNodeId}！最短路径长度: ${distances.get(endNodeId)}`,
          currentNode: currentNode,
          visitedNodes: Array.from(visited),
          relaxedEdges: [],
          pathEdges: pathEdges,
          distances: new Map(distances),
          previous: new Map(previous)
        });
        break;
      }
    }

    return steps;
  }

  private getNeighbors(graph: Graph, nodeId: string): Array<{ nodeId: string; weight: number; edgeId: string }> {
    const neighbors: Array<{ nodeId: string; weight: number; edgeId: string }> = [];

    graph.edges.forEach(edge => {
      if (edge.from === nodeId) {
        neighbors.push({ nodeId: edge.to, weight: edge.weight, edgeId: edge.id });
      } else if (edge.to === nodeId) {
        neighbors.push({ nodeId: edge.from, weight: edge.weight, edgeId: edge.id });
      }
    });

    return neighbors;
  }

  private reconstructPath(graph: Graph, previous: Map<string, string | null>, start: string, end: string): string[] {
    const pathEdges: string[] = [];
    let current = end;

    while (current !== start && previous.has(current)) {
      const prev = previous.get(current);
      if (prev) {
        const edge = graph.edges.find(e =>
          (e.from === prev && e.to === current) || (e.from === current && e.to === prev)
        );
        if (edge) {
          pathEdges.unshift(edge.id);
        }
        current = prev;
      } else {
        break;
      }
    }

    return pathEdges;
  }

  resetGraph(graph: Graph, startNodeId: string): Graph {
    return {
      nodes: graph.nodes.map(node => ({
        ...node,
        distance: node.id === startNodeId ? 0 : Infinity,
        visited: false,
        previous: null
      })),
      edges: graph.edges.map(edge => ({
        ...edge,
        visited: false,
        isInPath: false
      }))
    };
  }
}
