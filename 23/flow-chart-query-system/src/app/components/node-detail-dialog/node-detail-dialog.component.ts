import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FlowNode } from '../../models/flow-chart.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-node-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './node-detail-dialog.component.html',
  styleUrls: ['./node-detail-dialog.component.css']
})
export class NodeDetailDialogComponent {
  selectedTabIndex = 0;

  nodeTypeMap: Record<string, string> = {
    'start': '开始节点',
    'end': '结束节点',
    'process': '处理节点',
    'decision': '判断节点',
    'parallel': '并行节点'
  };

  nodeTypeColorMap: Record<string, string> = {
    'start': 'bg-green-500',
    'end': 'bg-red-500',
    'process': 'bg-blue-500',
    'decision': 'bg-yellow-500',
    'parallel': 'bg-purple-500'
  };

  constructor(
    public dialogRef: MatDialogRef<NodeDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { node: FlowNode }
  ) {}

  getNodeTypeDisplay(nodeType: string): string {
    return this.nodeTypeMap[nodeType] || '未知节点';
  }

  getNodeTypeColor(nodeType: string): string {
    return this.nodeTypeColorMap[nodeType] || 'bg-gray-500';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
