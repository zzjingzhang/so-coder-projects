import { Injectable } from '@angular/core';
import { Workflow, PipelineNode, Connection, generateId } from '../models/node.model';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'etl-pipeline-workflows';
const CURRENT_WORKFLOW_KEY = 'etl-current-workflow';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
  private currentWorkflowSubject = new BehaviorSubject<Workflow | null>(null);

  workflows$ = this.workflowsSubject.asObservable();
  currentWorkflow$ = this.currentWorkflowSubject.asObservable();

  get currentWorkflows(): Workflow[] {
    return this.workflowsSubject.value;
  }

  constructor() {
    this.loadWorkflows();
    this.loadCurrentWorkflow();
  }

  private loadWorkflows(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const workflows = JSON.parse(stored);
        this.workflowsSubject.next(workflows);
      } catch (e) {
        console.error('Failed to parse workflows:', e);
        this.workflowsSubject.next([]);
      }
    }
  }

  private loadCurrentWorkflow(): void {
    const stored = localStorage.getItem(CURRENT_WORKFLOW_KEY);
    if (stored) {
      try {
        const workflow = JSON.parse(stored);
        this.currentWorkflowSubject.next(workflow);
      } catch (e) {
        console.error('Failed to parse current workflow:', e);
        this.createNewWorkflow();
      }
    } else {
      this.createNewWorkflow();
    }
  }

  private saveWorkflows(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.workflowsSubject.value));
  }

  private saveCurrentWorkflow(): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      localStorage.setItem(CURRENT_WORKFLOW_KEY, JSON.stringify(workflow));
    }
  }

  createNewWorkflow(): void {
    const workflow: Workflow = {
      id: generateId(),
      name: `New Pipeline ${this.workflowsSubject.value.length + 1}`,
      nodes: [],
      connections: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.currentWorkflowSubject.next(workflow);
    this.saveCurrentWorkflow();
  }

  saveCurrentWorkflowAs(name: string): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const updatedWorkflow: Workflow = {
        ...workflow,
        name,
        updatedAt: new Date()
      };

      const workflows = [...this.workflowsSubject.value];
      const existingIndex = workflows.findIndex(w => w.id === workflow.id);
      
      if (existingIndex >= 0) {
        workflows[existingIndex] = updatedWorkflow;
      } else {
        workflows.push(updatedWorkflow);
      }

      this.workflowsSubject.next(workflows);
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveWorkflows();
      this.saveCurrentWorkflow();
    }
  }

  loadWorkflow(id: string): void {
    const workflow = this.workflowsSubject.value.find(w => w.id === id);
    if (workflow) {
      this.currentWorkflowSubject.next({ ...workflow });
      this.saveCurrentWorkflow();
    }
  }

  deleteWorkflow(id: string): void {
    const workflows = this.workflowsSubject.value.filter(w => w.id !== id);
    this.workflowsSubject.next(workflows);
    this.saveWorkflows();

    const current = this.currentWorkflowSubject.value;
    if (current && current.id === id) {
      this.createNewWorkflow();
    }
  }

  addNode(node: PipelineNode): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const updatedWorkflow: Workflow = {
        ...workflow,
        nodes: [...workflow.nodes, node],
        updatedAt: new Date()
      };
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveCurrentWorkflow();
    }
  }

  updateNode(node: PipelineNode): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const nodes = workflow.nodes.map(n => n.id === node.id ? node : n);
      const updatedWorkflow: Workflow = {
        ...workflow,
        nodes,
        updatedAt: new Date()
      };
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveCurrentWorkflow();
    }
  }

  removeNode(nodeId: string): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const nodes = workflow.nodes.filter(n => n.id !== nodeId);
      const connections = workflow.connections.filter(c => c.sourceId !== nodeId && c.targetId !== nodeId);
      const updatedWorkflow: Workflow = {
        ...workflow,
        nodes,
        connections,
        updatedAt: new Date()
      };
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveCurrentWorkflow();
    }
  }

  addConnection(connection: Connection): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const exists = workflow.connections.some(
        c => c.sourceId === connection.sourceId && c.targetId === connection.targetId
      );
      
      if (!exists) {
        const updatedWorkflow: Workflow = {
          ...workflow,
          connections: [...workflow.connections, connection],
          updatedAt: new Date()
        };
        this.currentWorkflowSubject.next(updatedWorkflow);
        this.saveCurrentWorkflow();
      }
    }
  }

  removeConnection(connectionId: string): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const connections = workflow.connections.filter(c => c.id !== connectionId);
      const updatedWorkflow: Workflow = {
        ...workflow,
        connections,
        updatedAt: new Date()
      };
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveCurrentWorkflow();
    }
  }

  updateNodePosition(nodeId: string, x: number, y: number): void {
    const workflow = this.currentWorkflowSubject.value;
    if (workflow) {
      const nodes = workflow.nodes.map(n => {
        if (n.id === nodeId) {
          return { ...n, x, y };
        }
        return n;
      });
      const updatedWorkflow: Workflow = {
        ...workflow,
        nodes,
        updatedAt: new Date()
      };
      this.currentWorkflowSubject.next(updatedWorkflow);
      this.saveCurrentWorkflow();
    }
  }
}
