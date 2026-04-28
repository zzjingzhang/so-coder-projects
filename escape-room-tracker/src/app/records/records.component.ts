import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { EscapeRecord, TeamCoordination } from '../types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzBadgeModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">通关记录</h1>
        <p class="text-gray-600">查看逃脱时间和团队配合情况</p>
      </div>

      <!-- 统计卡片 -->
      <nz-row [nzGutter]="[16, 16]" class="mb-8">
        <nz-col nzXs="24" nzSm="12" nzMd="6">
          <nz-card>
            <nz-statistic
              [nzTitle]="'总场次'"
              [nzValue]="records.length"
              [nzPrefix]="prefixGameIcon"
            >
              <ng-template #prefixGameIcon>
                <span nz-icon nzType="trophy" nzTheme="outline"></span>
              </ng-template>
            </nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col nzXs="24" nzSm="12" nzMd="6">
          <nz-card>
            <nz-statistic
              [nzTitle]="'成功逃脱'"
              [nzValue]="successCount"
              [nzPrefix]="prefixSuccessIcon"
              [nzValueStyle]="{ color: '#3f8600' }"
            >
              <ng-template #prefixSuccessIcon>
                <span nz-icon nzType="check-circle" nzTheme="outline"></span>
              </ng-template>
            </nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col nzXs="24" nzSm="12" nzMd="6">
          <nz-card>
            <nz-statistic
              [nzTitle]="'失败次数'"
              [nzValue]="failCount"
              [nzPrefix]="prefixFailIcon"
              [nzValueStyle]="{ color: '#cf1322' }"
            >
              <ng-template #prefixFailIcon>
                <span nz-icon nzType="close-circle" nzTheme="outline"></span>
              </ng-template>
            </nz-statistic>
          </nz-card>
        </nz-col>
        <nz-col nzXs="24" nzSm="12" nzMd="6">
          <nz-card>
            <nz-statistic
              [nzTitle]="'平均用时(分钟)'"
              [nzValue]="averageTime"
              [nzPrefix]="prefixTimeIcon"
              [nzValueStyle]="{ color: '#1890ff' }"
            >
              <ng-template #prefixTimeIcon>
                <span nz-icon nzType="clock-circle" nzTheme="outline"></span>
              </ng-template>
            </nz-statistic>
          </nz-card>
        </nz-col>
      </nz-row>

      <!-- 记录表格 -->
      <nz-card>
        <nz-table
          #basicTable
          [nzData]="records"
          [nzPageSize]="10"
          [nzShowSizeChanger]="true"
          [nzShowQuickJumper]="true"
        >
          <thead>
            <tr>
              <th>日期</th>
              <th>密室名称</th>
              <th>结果</th>
              <th>用时(分钟)</th>
              <th>团队成员</th>
              <th>团队配合</th>
              <th>使用提示</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            @for (record of basicTable.data; track record.id) {
              <tr>
                <td>{{ record.date }}</td>
                <td>
                  <span class="font-medium">{{ record.roomName }}</span>
                </td>
                <td>
                  @if (record.escaped) {
                    <nz-badge nzStatus="success" nzText="成功逃脱"></nz-badge>
                  } @else {
                    <nz-badge nzStatus="error" nzText="未能逃脱"></nz-badge>
                  }
                </td>
                <td>
                  <span class="text-lg font-semibold">{{ record.escapeTime }}</span>
                </td>
                <td>
                  <div class="flex flex-wrap gap-1">
                    @for (member of record.teamMembers; track member) {
                      <nz-tag>{{ member }}</nz-tag>
                    }
                  </div>
                </td>
                <td>
                  <nz-tag [nzColor]="getCoordinationColor(record.teamCoordination)">
                    {{ getCoordinationLabel(record.teamCoordination) }}
                  </nz-tag>
                </td>
                <td>
                  <span>{{ record.hintsUsed }} 次</span>
                </td>
                <td>
                  <span class="text-gray-600 text-sm">{{ record.notes || '无' }}</span>
                </td>
              </tr>
            }
          </tbody>
        </nz-table>
      </nz-card>
    </div>
  `,
  styles: []
})
export class RecordsComponent implements OnInit {
  records: EscapeRecord[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.records = this.dataService.getRecords();
  }

  get successCount(): number {
    return this.records.filter(r => r.escaped).length;
  }

  get failCount(): number {
    return this.records.filter(r => !r.escaped).length;
  }

  get averageTime(): number {
    if (this.records.length === 0) return 0;
    const totalTime = this.records.reduce((sum, r) => sum + r.escapeTime, 0);
    return Math.round(totalTime / this.records.length);
  }

  getCoordinationLabel(coordination: TeamCoordination): string {
    return this.dataService.getCoordinationLabel(coordination);
  }

  getCoordinationColor(coordination: TeamCoordination): string {
    return this.dataService.getCoordinationColor(coordination);
  }
}
