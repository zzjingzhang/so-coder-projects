import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NodeData, NodeProperty } from '../../models/pipeline.models';
import { PipelineService } from '../../services/pipeline.service';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-properties-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    TextareaModule,
    ButtonModule
  ],
  templateUrl: './properties-panel.component.html',
  styleUrls: ['./properties-panel.component.css']
})
export class PropertiesPanelComponent implements OnInit, OnDestroy {
  selectedNode: NodeData | null = null;
  public Number = Number;
  private subscriptions: Subscription[] = [];

  constructor(private pipelineService: PipelineService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.pipelineService.selectedNode$.subscribe(node => {
        this.selectedNode = node;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getTypeColor(): string {
    if (!this.selectedNode) return 'bg-gray-500';
    
    switch (this.selectedNode.type) {
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

  getTypeLabel(): string {
    if (!this.selectedNode) return 'Node';
    
    switch (this.selectedNode.type) {
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
    if (!this.selectedNode) return '📦';
    
    switch (this.selectedNode.subtype) {
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

  onLabelChange(value: string): void {
    if (this.selectedNode) {
      this.pipelineService.updateNodeLabel(this.selectedNode.id, value);
    }
  }

  onPropertyChange(property: NodeProperty, value: any): void {
    if (this.selectedNode) {
      this.pipelineService.updateNodeProperty(this.selectedNode.id, property.name, value);
    }
  }

  onDeleteNode(): void {
    if (this.selectedNode && confirm('Are you sure you want to delete this node?')) {
      this.pipelineService.removeNode(this.selectedNode.id);
    }
  }
}
