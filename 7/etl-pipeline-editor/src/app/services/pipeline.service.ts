import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NodeData, ConnectionData, PipelineData, NODE_TEMPLATES, NodeProperty } from '../models/pipeline.models';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private pipelineSubject = new BehaviorSubject<PipelineData>(this.createEmptyPipeline());
  public pipeline$: Observable<PipelineData> = this.pipelineSubject.asObservable();

  private selectedNodeSubject = new BehaviorSubject<NodeData | null>(null);
  public selectedNode$: Observable<NodeData | null> = this.selectedNodeSubject.asObservable();

  private createEmptyPipeline(): PipelineData {
    return {
      id: this.generateId(),
      name: 'Untitled Pipeline',
      nodes: [],
      connections: []
    };
  }

  private generateId(): string {
    return 'id_' + Math.random().toString(36).substr(2, 9);
  }

  public getPipeline(): PipelineData {
    return this.pipelineSubject.getValue();
  }

  public setPipeline(pipeline: PipelineData): void {
    this.pipelineSubject.next(pipeline);
  }

  public addNode(templateKey: string, position: { x: number; y: number }): void {
    const template = NODE_TEMPLATES[templateKey];
    if (!template) {
      console.error(`Node template not found: ${templateKey}`);
      return;
    }

    const newNode: NodeData = {
      id: this.generateId(),
      type: template.type,
      subtype: template.subtype,
      label: template.label,
      position: { ...position },
      properties: JSON.parse(JSON.stringify(template.properties))
    };

    const pipeline = this.getPipeline();
    pipeline.nodes.push(newNode);
    this.pipelineSubject.next({ ...pipeline });
    this.selectNode(newNode);
  }

  public removeNode(nodeId: string): void {
    const pipeline = this.getPipeline();
    
    const selectedNode = this.selectedNodeSubject.getValue();
    if (selectedNode?.id === nodeId) {
      this.selectedNodeSubject.next(null);
    }

    pipeline.nodes = pipeline.nodes.filter(node => node.id !== nodeId);
    pipeline.connections = pipeline.connections.filter(
      conn => conn.source !== nodeId && conn.target !== nodeId
    );
    
    this.pipelineSubject.next({ ...pipeline });
  }

  public updateNodePosition(nodeId: string, position: { x: number; y: number }): void {
    const pipeline = this.getPipeline();
    const node = pipeline.nodes.find(n => n.id === nodeId);
    
    if (node) {
      node.position = { ...position };
      this.pipelineSubject.next({ ...pipeline });
    }
  }

  public updateNodeProperty(nodeId: string, propertyName: string, value: any): void {
    const pipeline = this.getPipeline();
    const node = pipeline.nodes.find(n => n.id === nodeId);
    
    if (node) {
      const property = node.properties.find(p => p.name === propertyName);
      if (property) {
        property.value = value;
        this.pipelineSubject.next({ ...pipeline });
        
        if (this.selectedNodeSubject.getValue()?.id === nodeId) {
          this.selectedNodeSubject.next({ ...node });
        }
      }
    }
  }

  public updateNodeLabel(nodeId: string, label: string): void {
    const pipeline = this.getPipeline();
    const node = pipeline.nodes.find(n => n.id === nodeId);
    
    if (node) {
      node.label = label;
      this.pipelineSubject.next({ ...pipeline });
      
      if (this.selectedNodeSubject.getValue()?.id === nodeId) {
        this.selectedNodeSubject.next({ ...node });
      }
    }
  }

  public addConnection(sourceId: string, targetId: string): void {
    const pipeline = this.getPipeline();
    
    const exists = pipeline.connections.some(
      conn => (conn.source === sourceId && conn.target === targetId)
    );
    
    if (!exists && sourceId !== targetId) {
      const connection: ConnectionData = {
        id: this.generateId(),
        source: sourceId,
        target: targetId
      };
      
      pipeline.connections.push(connection);
      this.pipelineSubject.next({ ...pipeline });
    }
  }

  public removeConnection(connectionId: string): void {
    const pipeline = this.getPipeline();
    pipeline.connections = pipeline.connections.filter(conn => conn.id !== connectionId);
    this.pipelineSubject.next({ ...pipeline });
  }

  public selectNode(node: NodeData | null): void {
    this.selectedNodeSubject.next(node ? { ...node } : null);
  }

  public clearPipeline(): void {
    this.selectedNodeSubject.next(null);
    this.pipelineSubject.next(this.createEmptyPipeline());
  }

  public exportToJson(): string {
    const pipeline = this.getPipeline();
    return JSON.stringify(pipeline, null, 2);
  }

  public importFromJson(jsonString: string): boolean {
    try {
      const pipeline: PipelineData = JSON.parse(jsonString);
      
      if (!pipeline.id || !pipeline.nodes || !pipeline.connections) {
        return false;
      }
      
      this.selectedNodeSubject.next(null);
      this.pipelineSubject.next(pipeline);
      return true;
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return false;
    }
  }

  public downloadPipeline(): void {
    const json = this.exportToJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.getPipeline().name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
