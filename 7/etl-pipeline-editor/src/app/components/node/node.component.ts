import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeData } from '../../models/pipeline.models';

@Component({
  selector: 'app-node',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {
  @Input({ required: true }) node!: NodeData;
  @Input() isSelected = false;
  
  @Output() portMouseDown = new EventEmitter<{ isOutput: boolean; event: MouseEvent }>();
  @Output() portMouseUp = new EventEmitter<{ isOutput: boolean; event: MouseEvent }>();
  @Output() nodeClick = new EventEmitter<NodeData>();
  @Output() deleteNode = new EventEmitter<string>();

  getTypeColor(): string {
    switch (this.node.type) {
      case 'source':
        return 'bg-emerald-500';
      case 'transform':
        return 'bg-amber-500';
      case 'target':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  getTypeBorder(): string {
    if (this.isSelected) {
      return 'ring-2 ring-indigo-500';
    }
    return '';
  }

  getTypeLabel(): string {
    switch (this.node.type) {
      case 'source':
        return 'Source';
      case 'transform':
        return 'Transform';
      case 'target':
        return 'Target';
      default:
        return 'Node';
    }
  }

  getSubtypeIcon(): string {
    switch (this.node.subtype) {
      case 'database':
        return '🗄️';
      case 'csv':
        return '📄';
      case 'api':
        return '🔗';
      case 'filter':
        return '🔍';
      case 'map':
        return '🔄';
      case 'aggregate':
        return '📊';
      case 'join':
        return '🔗';
      default:
        return '📦';
    }
  }

  onPortMouseDown(event: MouseEvent, isOutput: boolean): void {
    event.stopPropagation();
    event.preventDefault();
    this.portMouseDown.emit({ isOutput, event });
  }

  onPortMouseUp(event: MouseEvent, isOutput: boolean): void {
    event.stopPropagation();
    this.portMouseUp.emit({ isOutput, event });
  }

  onNodeClick(event: MouseEvent): void {
    event.stopPropagation();
    this.nodeClick.emit(this.node);
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteNode.emit(this.node.id);
  }
}
