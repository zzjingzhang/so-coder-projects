import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NODE_TEMPLATES } from '../../models/pipeline.models';

interface NodeTemplateInfo {
  key: string;
  type: 'source' | 'transform' | 'target';
  subtype: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-node-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-sidebar.component.html',
  styleUrls: ['./node-sidebar.component.css']
})
export class NodeSidebarComponent implements OnInit {
  @Output() dragStart = new EventEmitter<{ offset: { x: number; y: number } }>();

  nodeTemplates: {
    sources: NodeTemplateInfo[];
    transforms: NodeTemplateInfo[];
    targets: NodeTemplateInfo[];
  } = {
    sources: [],
    transforms: [],
    targets: []
  };

  private dragOffset = { x: 0, y: 0 };

  constructor() {}

  ngOnInit(): void {
    this.nodeTemplates = {
      sources: [],
      transforms: [],
      targets: []
    };

    Object.entries(NODE_TEMPLATES).forEach(([key, template]) => {
      const info: NodeTemplateInfo = {
        key,
        type: template.type,
        subtype: template.subtype,
        label: template.label,
        icon: this.getIcon(template.subtype)
      };

      switch (template.type) {
        case 'source':
          this.nodeTemplates.sources.push(info);
          break;
        case 'transform':
          this.nodeTemplates.transforms.push(info);
          break;
        case 'target':
          this.nodeTemplates.targets.push(info);
          break;
      }
    });
  }

  getIcon(subtype: string): string {
    switch (subtype) {
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

  getTypeColor(type: string): string {
    switch (type) {
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

  onDragStart(event: DragEvent, template: NodeTemplateInfo): void {
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.setData('text/plain', template.key);
      
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.dragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
      
      this.dragStart.emit({ offset: this.dragOffset });
    }
  }

  onDragEnd(event: DragEvent): void {
    // Drag end handled by parent
  }
}
