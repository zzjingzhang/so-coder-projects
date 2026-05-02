import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Node, Edge, AlgorithmStep } from '../../models/graph.model';

@Component({
  selector: 'app-graph-visualization',
  templateUrl: './graph-visualization.component.html',
  styleUrls: ['./graph-visualization.component.css']
})
export class GraphVisualizationComponent implements OnChanges {
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];
  @Input() currentStep: AlgorithmStep | null = null;

  svgWidth = 650;
  svgHeight = 400;
  nodeRadius = 25;

  ngOnChanges(changes: SimpleChanges): void {
  }

  getNodeColor(node: Node): string {
    if (this.currentStep) {
      if (this.currentStep.currentNode === node.id) {
        return '#FF6B6B';
      }
      if (this.currentStep.visitedNodes.includes(node.id)) {
        return '#4ECDC4';
      }
    }
    
    if (node.isStart) {
      return '#45B7D1';
    }
    if (node.isEnd) {
      return '#96CEB4';
    }
    return '#F0E68C';
  }

  getNodeStroke(node: Node): string {
    if (this.currentStep?.currentNode === node.id) {
      return '#C44D58';
    }
    if (this.currentStep?.visitedNodes.includes(node.id)) {
      return '#2A9D8F';
    }
    return '#333';
  }

  getEdgeColor(edge: Edge): string {
    if (this.currentStep?.pathEdges.includes(edge.id)) {
      return '#FF6B6B';
    }
    if (this.currentStep?.relaxedEdges.includes(edge.id)) {
      return '#45B7D1';
    }
    return '#999';
  }

  getEdgeWidth(edge: Edge): number {
    if (this.currentStep?.pathEdges.includes(edge.id)) {
      return 4;
    }
    if (this.currentStep?.relaxedEdges.includes(edge.id)) {
      return 3;
    }
    return 2;
  }

  getEdgeOpacity(edge: Edge): number {
    if (this.currentStep?.pathEdges.includes(edge.id)) {
      return 1;
    }
    if (this.currentStep?.relaxedEdges.includes(edge.id)) {
      return 0.9;
    }
    return 0.6;
  }

  getNodeDistance(node: Node): string {
    if (!this.currentStep) {
      return node.distance === Infinity ? '∞' : node.distance.toString();
    }
    const distance = this.currentStep.distances.get(node.id);
    if (distance === undefined || distance === Infinity) {
      return '∞';
    }
    return distance.toString();
  }

  getEdgeMidpoint(edge: Edge): { x: number; y: number } {
    const fromNode = this.nodes.find(n => n.id === edge.from);
    const toNode = this.nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) {
      return { x: 0, y: 0 };
    }
    return {
      x: (fromNode.x + toNode.x) / 2,
      y: (fromNode.y + toNode.y) / 2
    };
  }

  getNodeById(nodeId: string): Node | undefined {
    return this.nodes.find(n => n.id === nodeId);
  }
}
