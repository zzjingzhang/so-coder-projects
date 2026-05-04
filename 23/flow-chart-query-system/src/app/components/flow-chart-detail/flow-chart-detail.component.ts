import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FlowChart, FlowNode } from '../../models/flow-chart.model';
import { FlowChartDataService } from '../../services/flow-chart-data.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NodeDetailDialogComponent } from '../node-detail-dialog/node-detail-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-flow-chart-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './flow-chart-detail.component.html',
  styleUrls: ['./flow-chart-detail.component.css']
})
export class FlowChartDetailComponent implements OnInit {
  flowChart: FlowChart | undefined;
  loading = true;
  svgWidth = 1600;
  svgHeight = 800;
  selectedNodeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flowChartDataService: FlowChartDataService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFlowChart(id);
    }
  }

  loadFlowChart(id: string): void {
    this.loading = true;
    this.flowChartDataService.getFlowChartById(id).subscribe({
      next: (data) => {
        this.flowChart = data;
        this.calculateLayout();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  calculateLayout(): void {
    if (!this.flowChart) return;

    const levels: FlowNode[][] = this.buildLevels();
    const levelCount = levels.length;
    const verticalGap = 120;
    const horizontalGap = 60;
    const nodeWidth = 160;
    const nodeHeight = 50;

    let maxLevelWidth = 0;
    levels.forEach(level => {
      const width = level.length * nodeWidth + (level.length - 1) * horizontalGap;
      maxLevelWidth = Math.max(maxLevelWidth, width);
    });

    this.svgWidth = Math.max(1000, maxLevelWidth + 100);
    this.svgHeight = Math.max(600, levelCount * (nodeHeight + verticalGap) + 100);

    levels.forEach((level, levelIndex) => {
      const totalWidth = level.length * nodeWidth + (level.length - 1) * horizontalGap;
      const startX = (this.svgWidth - totalWidth) / 2;

      level.forEach((node, nodeIndex) => {
        node.x = startX + nodeIndex * (nodeWidth + horizontalGap);
        node.y = 50 + levelIndex * (nodeHeight + verticalGap);
        node.width = nodeWidth;
        node.height = nodeHeight;
      });
    });
  }

  buildLevels(): FlowNode[][] {
    if (!this.flowChart) return [];

    const levels: FlowNode[][] = [];
    const visited = new Set<string>();

    const startNodes = this.flowChart.nodes.filter(
      node => node.nodeType === 'start'
    );

    let currentLevel = [...startNodes];
    startNodes.forEach(n => visited.add(n.id));

    while (currentLevel.length > 0) {
      levels.push(currentLevel);

      const nextLevel: FlowNode[] = [];
      currentLevel.forEach(node => {
        node.connectedTo.forEach(targetId => {
          if (!visited.has(targetId)) {
            const targetNode = this.getNodeById(targetId);
            if (targetNode) {
              visited.add(targetId);
              nextLevel.push(targetNode);
            }
          }
        });
      });

      currentLevel = nextLevel;
    }

    return levels;
  }

  getNodeById(id: string): FlowNode | undefined {
    return this.flowChart?.nodes.find(n => n.id === id);
  }

  getNodeCenterX(node: FlowNode): number {
    return node.x + node.width / 2;
  }

  getNodeCenterY(node: FlowNode): number {
    return node.y + node.height / 2;
  }

  getDecisionPoints(node: FlowNode): string {
    const cx = this.getNodeCenterX(node);
    const cy = this.getNodeCenterY(node);
    const halfW = node.width / 2;
    const halfH = node.height / 2;

    return `${cx},${cy - halfH} ${cx + halfW},${cy} ${cx},${cy + halfH} ${cx - halfW},${cy}`;
  }

  getConnectionPath(fromNode: FlowNode, toNode: FlowNode): string {
    const fromX = this.getNodeCenterX(fromNode);
    const fromY = fromNode.y + fromNode.height;
    const toX = this.getNodeCenterX(toNode);
    const toY = toNode.y;

    const midY = (fromY + toY) / 2;

    if (Math.abs(fromX - toX) < 10) {
      return `M ${fromX} ${fromY} L ${toX} ${toY}`;
    }

    return `M ${fromX} ${fromY} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY}`;
  }

  getNodeFillColor(nodeType: string, isSelected: boolean): string {
    if (isSelected) {
      return '#1e40af';
    }
    const colors: Record<string, string> = {
      'start': '#22c55e',
      'end': '#ef4444',
      'process': '#3b82f6',
      'decision': '#eab308',
      'parallel': '#8b5cf6'
    };
    return colors[nodeType] || '#6b7280';
  }

  getNodeStrokeColor(nodeType: string): string {
    const colors: Record<string, string> = {
      'start': '#15803d',
      'end': '#b91c1c',
      'process': '#1d4ed8',
      'decision': '#ca8a04',
      'parallel': '#6d28d9'
    };
    return colors[nodeType] || '#4b5563';
  }

  onNodeClick(node: FlowNode): void {
    this.selectedNodeId = node.id;
    this.openNodeDetailDialog(node);
  }

  openNodeDetailDialog(node: FlowNode): void {
    this.dialog.open(NodeDetailDialogComponent, {
      data: { node },
      width: '900px',
      maxHeight: '80vh',
      disableClose: false
    });
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }
}
