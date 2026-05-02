import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { NodePaletteComponent } from '../node-palette/node-palette.component';
import { CanvasComponent } from '../canvas/canvas.component';
import { NodeConfigComponent } from '../node-config/node-config.component';
import { WorkflowService } from '../../services/workflow.service';
import { PipelineNode, Connection, Workflow } from '../../models/node.model';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    NodePaletteComponent,
    CanvasComponent,
    NodeConfigComponent
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit {
  @ViewChild('canvasComponent') canvasComponent!: CanvasComponent;

  nodes: PipelineNode[] = [];
  connections: Connection[] = [];
  selectedNodeId: string | null = null;
  selectedNode: PipelineNode | null = null;
  currentWorkflowName: string = '';

  constructor(
    private workflowService: WorkflowService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.workflowService.currentWorkflow$.subscribe(workflow => {
      if (workflow) {
        this.nodes = [...workflow.nodes];
        this.connections = [...workflow.connections];
        this.currentWorkflowName = workflow.name;
      }
    });
  }

  onNodeAdded(node: PipelineNode): void {
    this.workflowService.addNode(node);
    this.showSnackBar('Node added to pipeline');
  }

  onNodeSelected(nodeId: string): void {
    this.selectedNodeId = nodeId;
    this.selectedNode = this.nodes.find(n => n.id === nodeId) || null;
  }

  onNodeMoved(event: { id: string; x: number; y: number }): void {
    this.workflowService.updateNodePosition(event.id, event.x, event.y);
  }

  onNodeDeleted(nodeId: string): void {
    this.workflowService.removeNode(nodeId);
    if (this.selectedNodeId === nodeId) {
      this.selectedNodeId = null;
      this.selectedNode = null;
    }
    this.showSnackBar('Node removed from pipeline');
  }

  onConnectionAdded(connection: Connection): void {
    this.workflowService.addConnection(connection);
    this.showSnackBar('Connection created');
  }

  onConnectionDeleted(connectionId: string): void {
    this.workflowService.removeConnection(connectionId);
    this.showSnackBar('Connection removed');
  }

  onCanvasClicked(): void {
    this.selectedNodeId = null;
    this.selectedNode = null;
  }

  onNodeUpdated(node: PipelineNode): void {
    this.workflowService.updateNode(node);
    this.selectedNode = node;
    this.showSnackBar('Node configuration saved');
  }

  createNewWorkflow(): void {
    this.workflowService.createNewWorkflow();
    this.selectedNodeId = null;
    this.selectedNode = null;
    this.showSnackBar('New pipeline created');
  }

  saveWorkflow(): void {
    const dialogRef = this.dialog.open(SaveWorkflowDialogComponent, {
      width: '400px',
      data: { name: this.currentWorkflowName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name) {
        this.workflowService.saveCurrentWorkflowAs(result.name);
        this.showSnackBar(`Pipeline "${result.name}" saved successfully`);
      }
    });
  }

  loadWorkflow(): void {
    const dialogRef = this.dialog.open(LoadWorkflowDialogComponent, {
      width: '500px',
      data: { workflows: this.workflowService.currentWorkflows }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workflowService.loadWorkflow(result);
        this.selectedNodeId = null;
        this.selectedNode = null;
        this.showSnackBar('Pipeline loaded successfully');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}

@Component({
  selector: 'app-save-workflow-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-semibold text-gray-800">Save Pipeline</h2>
    <mat-dialog-content class="py-4">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Pipeline Name</mat-label>
        <input matInput [(ngModel)]="data.name" placeholder="Enter pipeline name">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="gap-2">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(data)">Save</button>
    </mat-dialog-actions>
  `
})
export class SaveWorkflowDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveWorkflowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}

@Component({
  selector: 'app-load-workflow-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <h2 mat-dialog-title class="text-xl font-semibold text-gray-800">Load Pipeline</h2>
    <mat-dialog-content class="py-4 min-h-[200px]">
      @if (data.workflows && data.workflows.length > 0) {
        <mat-list>
          @for (workflow of data.workflows; track workflow.id) {
            <mat-list-item 
              class="hover:bg-gray-50 rounded-lg cursor-pointer mb-2"
              (click)="selectWorkflow(workflow.id)"
            >
              <div class="flex items-center justify-between w-full py-2">
                <div>
                  <div class="font-medium text-gray-800">{{ workflow.name }}</div>
                  <div class="text-xs text-gray-500">
                    {{ workflow.nodes.length }} nodes • {{ workflow.connections.length }} connections
                  </div>
                </div>
                <button 
                  mat-icon-button 
                  color="warn"
                  (click)="$event.stopPropagation(); deleteWorkflow(workflow.id)"
                >
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </mat-list-item>
            @if (!$last) {
              <mat-divider></mat-divider>
            }
          }
        </mat-list>
      } @else {
        <div class="flex flex-col items-center justify-center py-8 text-gray-500">
          <mat-icon class="text-5xl mb-2">folder_open</mat-icon>
          <p>No saved pipelines found</p>
        </div>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end" class="gap-2">
      <button mat-button (click)="dialogRef.close()">Cancel</button>
    </mat-dialog-actions>
  `
})
export class LoadWorkflowDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoadWorkflowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { workflows: Workflow[] },
    private workflowService: WorkflowService
  ) {}

  selectWorkflow(id: string): void {
    this.dialogRef.close(id);
  }

  deleteWorkflow(id: string): void {
    this.workflowService.deleteWorkflow(id);
    this.data.workflows = this.data.workflows.filter(w => w.id !== id);
  }
}
