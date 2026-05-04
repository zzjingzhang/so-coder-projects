import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private rooms: Room[] = [
    {
      id: 1,
      name: '创新会议室 A',
      type: 'meeting',
      capacity: 8,
      pricePerHour: 150,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20conference%20room%20with%20glass%20walls%20and%20whiteboard&image_size=landscape_4_3',
      amenities: ['投影仪', '白板', '视频会议系统', '茶水服务', '高速WiFi'],
      description: '现代化设计的会议室，配备先进的视频会议设备，适合团队讨论和客户会议。玻璃墙面设计带来充足的自然光线，营造开放协作的氛围。',
      isAvailable: true
    },
    {
      id: 2,
      name: '私密办公室 B',
      type: 'private',
      capacity: 2,
      pricePerHour: 80,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cozy%20private%20office%20with%20wooden%20desk%20and%20plants&image_size=landscape_4_3',
      amenities: ['独立空调', '储物柜', '24小时门禁', '高速WiFi', '打印服务'],
      description: '温馨私密的独立办公室，适合需要专注工作的个人或小型团队。配备舒适的办公桌椅和储物柜，提供24小时门禁权限。',
      isAvailable: false,
      nextAvailableTime: '14:00'
    },
    {
      id: 3,
      name: '开放工位区 C',
      type: 'open',
      capacity: 20,
      pricePerHour: 30,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20open%20workspace%20with%20communal%20tables%20and%20plants&image_size=landscape_4_3',
      amenities: ['自由入座', '咖啡吧', '休闲区', '高速WiFi', '储物柜'],
      description: '开放式共享工位区域，灵活自由的工作环境。适合自由职业者和临时办公需求，提供免费咖啡和休闲交流空间。',
      isAvailable: true
    },
    {
      id: 4,
      name: '董事会议室 D',
      type: 'meeting',
      capacity: 16,
      pricePerHour: 300,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20boardroom%20with%20long%20table%20and%20leather%20chairs&image_size=landscape_4_3',
      amenities: ['4K投影仪', '音响系统', '视频会议', '秘书服务', '茶歇安排'],
      description: '高端董事会议室，豪华配置适合重要商务会议和董事会。配备专业视听设备和秘书服务，可提供茶歇和商务接待。',
      isAvailable: true
    },
    {
      id: 5,
      name: '单人专注舱 E',
      type: 'private',
      capacity: 1,
      pricePerHour: 50,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=compact%20soundproof%20pod%20with%20desk%20and%20chair&image_size=landscape_4_3',
      amenities: ['隔音设计', '充电接口', '通风系统', '高速WiFi'],
      description: '紧凑型隔音专注舱，完美适合需要高度集中注意力的工作。配备人体工学座椅和充足的充电接口，确保高效工作。',
      isAvailable: false,
      nextAvailableTime: '15:30'
    },
    {
      id: 6,
      name: '创意协作区 F',
      type: 'open',
      capacity: 10,
      pricePerHour: 60,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20collaboration%20space%20with%20bean%20bags%20and%20whiteboard%20walls&image_size=landscape_4_3',
      amenities: ['白板墙', '休闲座椅', '创意工具包', '高速WiFi', '投影设备'],
      description: '充满创意氛围的协作空间，非传统布局激发灵感。配备白板墙和各种创意工具，适合头脑风暴和团队协作。',
      isAvailable: true
    }
  ];

  constructor() { }

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getRoomById(id: number): Observable<Room | undefined> {
    const room = this.rooms.find(r => r.id === id);
    return of(room);
  }

  toggleRoomAvailability(id: number): Observable<Room | undefined> {
    const room = this.rooms.find(r => r.id === id);
    if (room) {
      room.isAvailable = !room.isAvailable;
      if (!room.isAvailable) {
        const hours = Math.floor(Math.random() * 4) + 10;
        room.nextAvailableTime = `${hours}:${Math.floor(Math.random() * 2) * 30 || '00'}`;
      } else {
        delete room.nextAvailableTime;
      }
    }
    return of(room);
  }
}
