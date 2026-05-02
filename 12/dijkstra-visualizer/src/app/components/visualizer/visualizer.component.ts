import { Component, OnInit, OnDestroy } from '@angular/core';
import { Graph, AlgorithmStep } from '../../models/graph.model';
import { DijkstraService } from '../../services/dijkstra.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  graph!: Graph;
  steps: AlgorithmStep[] = [];
  currentStepIndex: number = 0;
  isRunning: boolean = false;
  animationSpeed: number = 1000;
  animationInterval: any = null;

  constructor(private dijkstraService: DijkstraService) {}

  ngOnInit(): void {
    this.initializeGraph();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  initializeGraph(): void {
    this.graph = this.dijkstraService.generateSampleGraph();
    const startNode = this.graph.nodes.find(n => n.isStart);
    const endNode = this.graph.nodes.find(n => n.isEnd);
    
    if (startNode && endNode) {
      this.steps = this.dijkstraService.generateAlgorithmSteps(
        this.graph,
        startNode.id,
        endNode.id
      );
    }
    this.currentStepIndex = 0;
  }

  get currentStep(): AlgorithmStep | null {
    if (this.steps.length > 0 && this.currentStepIndex < this.steps.length) {
      return this.steps[this.currentStepIndex];
    }
    return null;
  }

  get totalSteps(): number {
    return this.steps.length;
  }

  start(): void {
    if (this.isRunning || this.currentStepIndex >= this.steps.length - 1) {
      return;
    }
    
    this.isRunning = true;
    this.animationInterval = setInterval(() => {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
      } else {
        this.pause();
      }
    }, this.animationSpeed);
  }

  step(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  pause(): void {
    this.isRunning = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  reset(): void {
    this.pause();
    this.currentStepIndex = 0;
    this.graph = this.dijkstraService.resetGraph(
      this.graph,
      this.graph.nodes.find(n => n.isStart)?.id || 'A'
    );
  }

  onSpeedChange(speed: number): void {
    this.animationSpeed = speed;
    if (this.isRunning && this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(() => {
        if (this.currentStepIndex < this.steps.length - 1) {
          this.currentStepIndex++;
        } else {
          this.pause();
        }
      }, this.animationSpeed);
    }
  }
}
