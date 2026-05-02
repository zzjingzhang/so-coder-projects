import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PipelineNode, Connection, generateId, NodeType } from '../../models/node.model';
import { DragService } from '../../services/drag.service';
import { Subscription } from 'rxjs';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnChanges, OnInit, OnDestroy {
  @Input() nodes: PipelineNode[] = [];
  @Input() connections: Connection[] = [];
  @Input() selectedNodeId: string | null = null;
  
  @Output() nodeAdded = new EventEmitter<PipelineNode>();
  @Output() nodeSelected = new EventEmitter<string>();
  @Output() nodeMoved = new EventEmitter<{ id: string; x: number; y: number }>();
  @Output() nodeDeleted = new EventEmitter<string>();
  @Output() connectionAdded = new EventEmitter<Connection>();
  @Output() connectionDeleted = new EventEmitter<string>();
  @Output() canvasClicked = new EventEmitter<void>();

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  draggingNodeId: string | null = null;
  dragOffset: Point = { x: 0, y: 0 };
  
  isCreatingConnection: boolean = false;
  connectionStart: { nodeId: string; portType: 'input' | 'output' } | null = null;
  tempConnectionStart: Point = { x: 0, y: 0 };
  tempConnectionEnd: Point = { x: 0, y: 0 };

  private subscriptions: Subscription[] = [];

  constructor(private dragService: DragService) {
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  ngOnInit(): void {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  ngOnDestroy(): void {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getNodeColor(type: NodeType): string {
    switch (type) {
      case 'source':
        return 'node-source';
      case 'transform':
        return 'node-transform';
      case 'sink':
        return 'node-sink';
      default:
        return 'node-source';
    }
  }

  onCanvasClick(event: MouseEvent): void {
    if (event.target === this.canvasContainer.nativeElement) {
      this.canvasClicked.emit();
    }
  }

  onNodeMouseDown(event: MouseEvent, node: PipelineNode): void {
    event.stopPropagation();
    this.nodeSelected.emit(node.id);
    
    const nodeElement = (event.target as HTMLElement).closest('.node');
    if (nodeElement) {
      const rect = nodeElement.getBoundingClientRect();
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      this.draggingNodeId = node.id;
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    if (this.draggingNodeId) {
      const containerRect = this.canvasContainer.nativeElement.getBoundingClientRect();
      const x = event.clientX - containerRect.left - this.dragOffset.x;
      const y = event.clientY - containerRect.top - this.dragOffset.y;
      
      this.nodeMoved.emit({
        id: this.draggingNodeId,
        x: Math.max(0, x),
        y: Math.max(0, y)
      });
    }
    
    if (this.isCreatingConnection) {
      const containerRect = this.canvasContainer.nativeElement.getBoundingClientRect();
      this.tempConnectionEnd = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      };
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    if (this.draggingNodeId) {
      this.draggingNodeId = null;
    }
    
    if (this.dragService.isDragging()) {
      const containerRect = this.canvasContainer.nativeElement.getBoundingClientRect();
      
      if (
        event.clientX >= containerRect.left &&
        event.clientX <= containerRect.right &&
        event.clientY >= containerRect.top &&
        event.clientY <= containerRect.bottom
      ) {
        const draggedNode = this.dragService.getDraggedNode();
        if (draggedNode) {
          const x = event.clientX - containerRect.left - 80;
          const y = event.clientY - containerRect.top - 30;
          
          const newNode: PipelineNode = {
            ...draggedNode,
            x: Math.max(0, x),
            y: Math.max(0, y)
          } as PipelineNode;
          
          this.nodeAdded.emit(newNode);
        }
      }
      
      this.dragService.endDrag();
    }
    
    if (this.isCreatingConnection) {
      this.cancelConnection();
    }
  }

  onPortClick(event: MouseEvent, nodeId: string, portType: 'input' | 'output'): void {
    event.stopPropagation();
    
    if (!this.isCreatingConnection) {
      this.startConnection(nodeId, portType, event);
    } else {
      this.completeConnection(nodeId, portType);
    }
  }

  private startConnection(nodeId: string, portType: 'input' | 'output', event: MouseEvent): void {
    this.isCreatingConnection = true;
    this.connectionStart = { nodeId, portType };
    
    const containerRect = this.canvasContainer.nativeElement.getBoundingClientRect();
    this.tempConnectionStart = {
      x: event.clientX - containerRect.left,
      y: event.clientY - containerRect.top
    };
    this.tempConnectionEnd = { ...this.tempConnectionStart };
  }

  private completeConnection(targetNodeId: string, targetPortType: 'input' | 'output'): void {
    if (!this.connectionStart) return;
    
    const sourceId = this.connectionStart.portType === 'output' 
      ? this.connectionStart.nodeId 
      : targetNodeId;
    const targetId = this.connectionStart.portType === 'input' 
      ? this.connectionStart.nodeId 
      : targetNodeId;
    
    if (sourceId !== targetId) {
      const connection: Connection = {
        id: generateId(),
        sourceId,
        targetId
      };
      this.connectionAdded.emit(connection);
    }
    
    this.cancelConnection();
  }

  private cancelConnection(): void {
    this.isCreatingConnection = false;
    this.connectionStart = null;
  }

  getConnectionPath(connection: Connection): string {
    const sourceNode = this.nodes.find(n => n.id === connection.sourceId);
    const targetNode = this.nodes.find(n => n.id === connection.targetId);
    
    if (!sourceNode || !targetNode) return '';
    
    const startX = sourceNode.x + 160;
    const startY = sourceNode.y + 40;
    const endX = targetNode.x;
    const endY = targetNode.y + 40;
    
    return this.createBezierPath(startX, startY, endX, endY);
  }

  getTempConnectionPath(): string {
    if (!this.isCreatingConnection) return '';
    
    return this.createBezierPath(
      this.tempConnectionStart.x,
      this.tempConnectionStart.y,
      this.tempConnectionEnd.x,
      this.tempConnectionEnd.y
    );
  }

  private createBezierPath(x1: number, y1: number, x2: number, y2: number): string {
    const dx = Math.abs(x2 - x1);
    const controlOffset = Math.max(dx * 0.5, 50);
    
    const cp1x = x1 + controlOffset;
    const cp1y = y1;
    const cp2x = x2 - controlOffset;
    const cp2y = y2;
    
    return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
  }

  onConnectionClick(event: MouseEvent, connectionId: string): void {
    event.stopPropagation();
    this.connectionDeleted.emit(connectionId);
  }

  deleteNode(nodeId: string): void {
    this.nodeDeleted.emit(nodeId);
  }
}
