import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule
  ],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('availabilityPulse', [
      state('available', style({})),
      state('unavailable', style({})),
      transition('available => unavailable', [
        animate('500ms ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('500ms ease-in-out', style({ transform: 'scale(1)' }))
      ]),
      transition('unavailable => available', [
        animate('500ms ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('500ms ease-in-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class RoomListComponent implements OnInit {
  rooms: Room[] = [];
  loading = true;
  expandedRoomId: number | null = null;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.loading = true;
    this.roomService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
        this.loading = false;
      },
      error: (err) => {
        console.error('加载房间数据失败:', err);
        this.loading = false;
      }
    });
    
    setTimeout(() => {
      if (this.loading) {
        console.log('加载超时，强制显示内容');
        this.loading = false;
      }
    }, 2000);
  }

  getRoomTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'meeting': '会议室',
      'private': '私密办公室',
      'open': '开放空间'
    };
    return labels[type] || type;
  }

  getRoomTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'meeting': 'bg-blue-100 text-blue-800',
      'private': 'bg-green-100 text-green-800',
      'open': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  }

  toggleAvailability(room: Room, event: Event): void {
    event.stopPropagation();
    this.roomService.toggleRoomAvailability(room.id).subscribe(updatedRoom => {
      if (updatedRoom) {
        const index = this.rooms.findIndex(r => r.id === updatedRoom.id);
        if (index !== -1) {
          this.rooms[index] = updatedRoom;
        }
      }
    });
  }

  toggleExpansion(roomId: number): void {
    this.expandedRoomId = this.expandedRoomId === roomId ? null : roomId;
  }
}
