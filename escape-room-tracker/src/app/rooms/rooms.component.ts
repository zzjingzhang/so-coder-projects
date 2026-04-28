import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { EscapeRoom, DifficultyLevel } from '../types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    NzGridModule
  ],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">场馆档案</h1>
        <p class="text-gray-600">探索体验过的密室主题和难度等级</p>
      </div>

      <nz-row [nzGutter]="[16, 16]">
        @for (room of rooms; track room.id) {
          <nz-col nzXs="24" nzSm="12" nzMd="8" nzLg="6">
            <nz-card
              class="h-full"
              [nzCover]="coverTemplate"
              [nzActions]="[
                viewAction
              ]"
            >
              <ng-template #coverTemplate>
                <div class="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  @if (room.imageUrl) {
                    <img [src]="room.imageUrl" [alt]="room.name" class="w-full h-full object-cover">
                  } @else {
                    <span nz-icon nzType="camera" nzTheme="outline" class="text-4xl text-gray-400"></span>
                  }
                </div>
              </ng-template>
              
              <ng-template #viewAction>
                <span>
                  <span nz-icon nzType="eye" class="mr-1"></span>
                  查看详情
                </span>
              </ng-template>

              <nz-card-meta
                [nzTitle]="room.name"
                [nzDescription]="room.description"
              ></nz-card-meta>
              
              <div class="mt-4 space-y-2">
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">难度：</span>
                  <nz-tag [nzColor]="getDifficultyColor(room.difficulty)">
                    {{ getDifficultyLabel(room.difficulty) }}
                  </nz-tag>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">主题：</span>
                  <span class="text-gray-800">{{ room.theme }}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">预计时间：</span>
                  <span class="text-gray-800">{{ room.estimatedTime }} 分钟</span>
                </div>
                <div class="flex items-center">
                  <span class="text-gray-600 mr-2">场馆：</span>
                  <span class="text-gray-800">{{ room.location }}</span>
                </div>
              </div>
            </nz-card>
          </nz-col>
        }
      </nz-row>
    </div>
  `,
  styles: [
    `
      .ant-card-meta-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
    `
  ]
})
export class RoomsComponent implements OnInit {
  rooms: EscapeRoom[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.rooms = this.dataService.getRooms();
  }

  getDifficultyLabel(difficulty: DifficultyLevel): string {
    return this.dataService.getDifficultyLabel(difficulty);
  }

  getDifficultyColor(difficulty: DifficultyLevel): string {
    return this.dataService.getDifficultyColor(difficulty);
  }
}
