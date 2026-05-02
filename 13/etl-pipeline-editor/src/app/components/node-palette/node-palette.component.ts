import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NodeType, NodeTemplates, PipelineNode, generateId } from '../../models/node.model';
import { CdkDrag, CdkDragStart } from '@angular/cdk/drag-drop';
import { DragService } from '../../services/drag.service';

@Component({
  selector: 'app-node-palette',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    CdkDrag
  ],
  templateUrl: './node-palette.component.html',
  styleUrl: './node-palette.component.css'
})
export class NodePaletteComponent {
  NodeTemplates = NodeTemplates;
  expandedPanels: { [key: string]: boolean } = {
    source: true,
    transform: true,
    sink: true
  };

  constructor(private dragService: DragService) {}

  getNodeColor(type: NodeType): string {
    switch (type) {
      case 'source':
        return 'bg-blue-500';
      case 'transform':
        return 'bg-emerald-500';
      case 'sink':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  }

  getNodeIcon(type: NodeType): string {
    switch (type) {
      case 'source':
        return 'input';
      case 'transform':
        return 'swap_horiz';
      case 'sink':
        return 'output';
      default:
        return 'help';
    }
  }

  onDragStart(event: CdkDragStart, type: NodeType, template: any): void {
    const nodeData: Partial<PipelineNode> = {
      id: generateId(),
      type: type,
      name: template.name,
      label: template.label,
      config: { ...template.config },
      inputPort: template.inputPort,
      outputPort: template.outputPort,
      x: 0,
      y: 0
    };

    this.dragService.startDrag(nodeData);
  }

  togglePanel(type: string): void {
    this.expandedPanels[type] = !this.expandedPanels[type];
  }
}
