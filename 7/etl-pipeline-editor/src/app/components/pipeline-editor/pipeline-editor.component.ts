import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NodeData, ConnectionData, NODE_TEMPLATES } from '../../models/pipeline.models';
import { PipelineService } from '../../services/pipeline.service';
import { NodeComponent } from '../node/node.component';
import { NodeSidebarComponent } from '../node-sidebar/node-sidebar.component';
import { PropertiesPanelComponent } from '../properties-panel/properties-panel.component';

@Component({
  selector: 'app-pipeline-editor',
  standalone: true,
  imports: [
    CommonModule,
    NodeComponent,
    NodeSidebarComponent,
    PropertiesPanelComponent
  ],
  templateUrl: './pipeline-editor.component.html',
  styleUrls: ['./pipeline-editor.component.css']
})
export class PipelineEditorComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLDivElement>;
  
  nodes: NodeData[] = [];
  connections: ConnectionData[] = [];
  selectedNode: NodeData | null = null;
  pipelineName: string = 'Untitled Pipeline';
  
  public Math = Math;
  
  private subscriptions: Subscription[] = [];
  
  private isDraggingNode = false;
  private draggingNodeId: string | null = null;
  private dragOffset = { x: 0, y: 0 };
  
  private isConnecting = false;
  private connectionStart: { nodeId: string; isOutput: boolean } | null = null;
  private connectionLine: SVGLineElement | null = null;
  
  private dropOffset = { x: 0, y: 0 };
  
  constructor(private pipelineService: PipelineService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.pipelineService.pipeline$.subscribe(pipeline => {
        this.nodes = [...pipeline.nodes];
        this.connections = [...pipeline.connections];
        this.pipelineName = pipeline.name;
      })
    );
    
    this.subscriptions.push(
      this.pipelineService.selectedNode$.subscribe(node => {
        this.selectedNode = node;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCanvasMouseDown(event: MouseEvent): void {
    if (event.target === this.canvasRef.nativeElement) {
      this.pipelineService.selectNode(null);
    }
  }

  onNodeMouseDown(event: MouseEvent, nodeId: string): void {
    event.stopPropagation();
    this.isDraggingNode = true;
    this.draggingNodeId = nodeId;
    
    const node = this.nodes.find(n => n.id === nodeId);
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    
    if (node) {
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (this.isDraggingNode && this.draggingNodeId) {
      const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const newX = event.clientX - canvasRect.left - this.dragOffset.x;
      const newY = event.clientY - canvasRect.top - this.dragOffset.y;
      
      this.pipelineService.updateNodePosition(this.draggingNodeId, {
        x: Math.max(0, newX),
        y: Math.max(0, newY)
      });
    }
    
    if (this.isConnecting && this.connectionLine && this.connectionStart) {
      const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      const startNode = this.nodes.find(n => n.id === this.connectionStart!.nodeId);
      
      if (startNode) {
        const startX = startNode.position.x + (this.connectionStart.isOutput ? 180 : 0);
        const startY = startNode.position.y + 40;
        
        this.connectionLine.setAttribute('x1', startX.toString());
        this.connectionLine.setAttribute('y1', startY.toString());
        this.connectionLine.setAttribute('x2', (event.clientX - canvasRect.left).toString());
        this.connectionLine.setAttribute('y2', (event.clientY - canvasRect.top).toString());
      }
    }
  }

  onCanvasMouseUp(event: MouseEvent): void {
    if (this.isDraggingNode) {
      this.isDraggingNode = false;
      this.draggingNodeId = null;
    }
    
    if (this.isConnecting) {
      this.cancelConnection();
    }
  }

  onPortMouseDown(eventData: { isOutput: boolean; event: MouseEvent }, nodeId: string): void {
    const { isOutput, event } = eventData;
    event.stopPropagation();
    event.preventDefault();
    
    this.isConnecting = true;
    this.connectionStart = { nodeId, isOutput };
    
    const svg = this.canvasRef.nativeElement.querySelector('svg');
    if (svg) {
      this.connectionLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      this.connectionLine.setAttribute('stroke', '#6366f1');
      this.connectionLine.setAttribute('stroke-width', '2');
      this.connectionLine.setAttribute('stroke-dasharray', '5,5');
      svg.appendChild(this.connectionLine);
    }
  }

  onPortMouseUp(eventData: { isOutput: boolean; event: MouseEvent }, nodeId: string): void {
    const { isOutput, event } = eventData;
    event.stopPropagation();
    
    if (this.isConnecting && this.connectionStart) {
      const startNode = this.nodes.find(n => n.id === this.connectionStart!.nodeId);
      const endNode = this.nodes.find(n => n.id === nodeId);
      
      if (startNode && endNode && startNode.id !== endNode.id) {
        if (this.connectionStart.isOutput && !isOutput) {
          this.pipelineService.addConnection(startNode.id, endNode.id);
        } else if (!this.connectionStart.isOutput && isOutput) {
          this.pipelineService.addConnection(endNode.id, startNode.id);
        }
      }
      
      this.cancelConnection();
    }
  }

  private cancelConnection(): void {
    this.isConnecting = false;
    this.connectionStart = null;
    
    if (this.connectionLine) {
      this.connectionLine.remove();
      this.connectionLine = null;
    }
  }

  getNodeCenter(node: NodeData, isOutput: boolean): { x: number; y: number } {
    return {
      x: node.position.x + (isOutput ? 180 : 0),
      y: node.position.y + 40
    };
  }

  onNodeClick(node: NodeData): void {
    this.pipelineService.selectNode(node);
  }

  onDeleteNode(nodeId: string): void {
    this.pipelineService.removeNode(nodeId);
  }

  onDeleteConnection(connectionId: string): void {
    this.pipelineService.removeConnection(connectionId);
  }

  onClearPipeline(): void {
    if (confirm('Are you sure you want to clear the pipeline?')) {
      this.pipelineService.clearPipeline();
    }
  }

  onExportPipeline(): void {
    this.pipelineService.downloadPipeline();
  }

  onImportPipeline(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = this.pipelineService.importFromJson(content);
        if (!success) {
          alert('Failed to import pipeline. Invalid JSON format.');
        }
      };
      reader.readAsText(file);
    }
    
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    
    if (event.dataTransfer) {
      const templateKey = event.dataTransfer.getData('text/plain');
      
      if (templateKey && NODE_TEMPLATES[templateKey]) {
        const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
        const x = event.clientX - canvasRect.left - this.dropOffset.x;
        const y = event.clientY - canvasRect.top - this.dropOffset.y;
        
        this.pipelineService.addNode(templateKey, {
          x: Math.max(0, x),
          y: Math.max(0, y)
        });
      }
    }
  }

  setDropOffset(offset: { x: number; y: number }): void {
    this.dropOffset = offset;
  }
}
