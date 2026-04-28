import { Injectable } from '@angular/core';
import { EscapeRoom, EscapeRecord, DifficultyLevel, TeamCoordination } from '../types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rooms: EscapeRoom[] = [
    {
      id: '1',
      name: '古墓探秘',
      theme: '冒险',
      difficulty: 'medium',
      description: '探索一座神秘的古墓，解开千年谜题',
      estimatedTime: 60,
      location: '神秘密室馆',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ancient%20tomb%20interior%20with%20mystical%20symbols%20and%20dim%20lighting&image_size=square_hd'
    },
    {
      id: '2',
      name: '太空站危机',
      theme: '科幻',
      difficulty: 'hard',
      description: '空间站发生故障，必须在限定时间内修复',
      estimatedTime: 75,
      location: '未来密室馆',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20space%20station%20interior%20with%20control%20panels&image_size=square_hd'
    },
    {
      id: '3',
      name: '魔法学院',
      theme: '奇幻',
      difficulty: 'easy',
      description: '学习魔法，通过考试才能毕业',
      estimatedTime: 45,
      location: '奇幻密室馆',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=magical%20academy%20classroom%20with%20spell%20books&image_size=square_hd'
    },
    {
      id: '4',
      name: '银行抢劫',
      theme: '犯罪',
      difficulty: 'extreme',
      description: '在警察到来之前，破解银行保险柜',
      estimatedTime: 90,
      location: '极限密室馆',
      imageUrl: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bank%20vault%20interior%20with%20security%20systems&image_size=square_hd'
    }
  ];

  private records: EscapeRecord[] = [
    {
      id: '1',
      roomId: '1',
      roomName: '古墓探秘',
      escapeTime: 52,
      escaped: true,
      teamMembers: ['张三', '李四', '王五'],
      teamCoordination: 'excellent',
      notes: '团队配合很好，最后关头解开了关键谜题',
      date: '2026-04-20',
      hintsUsed: 2
    },
    {
      id: '2',
      roomId: '2',
      roomName: '太空站危机',
      escapeTime: 72,
      escaped: true,
      teamMembers: ['张三', '李四', '王五', '赵六'],
      teamCoordination: 'good',
      notes: '时间比较紧张，最后几分钟才完成',
      date: '2026-04-15',
      hintsUsed: 3
    },
    {
      id: '3',
      roomId: '3',
      roomName: '魔法学院',
      escapeTime: 40,
      escaped: true,
      teamMembers: ['张三', '李四'],
      teamCoordination: 'excellent',
      notes: '比较简单，适合新手',
      date: '2026-04-10',
      hintsUsed: 0
    },
    {
      id: '4',
      roomId: '4',
      roomName: '银行抢劫',
      escapeTime: 90,
      escaped: false,
      teamMembers: ['张三', '李四', '王五', '赵六', '钱七'],
      teamCoordination: 'average',
      notes: '难度太大，时间不够用',
      date: '2026-04-05',
      hintsUsed: 5
    }
  ];

  constructor() { }

  getRooms(): EscapeRoom[] {
    return [...this.rooms];
  }

  getRoomById(id: string): EscapeRoom | undefined {
    return this.rooms.find(room => room.id === id);
  }

  getRecords(): EscapeRecord[] {
    return [...this.records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getRecordById(id: string): EscapeRecord | undefined {
    return this.records.find(record => record.id === id);
  }

  getRecordsByRoomId(roomId: string): EscapeRecord[] {
    return this.records.filter(record => record.roomId === roomId);
  }

  getDifficultyLabel(difficulty: DifficultyLevel): string {
    const labels: Record<DifficultyLevel, string> = {
      easy: '简单',
      medium: '中等',
      hard: '困难',
      extreme: '极限'
    };
    return labels[difficulty];
  }

  getDifficultyColor(difficulty: DifficultyLevel): string {
    const colors: Record<DifficultyLevel, string> = {
      easy: 'green',
      medium: 'gold',
      hard: 'orange',
      extreme: 'red'
    };
    return colors[difficulty];
  }

  getCoordinationLabel(coordination: TeamCoordination): string {
    const labels: Record<TeamCoordination, string> = {
      excellent: '优秀',
      good: '良好',
      average: '一般',
      poor: '较差'
    };
    return labels[coordination];
  }

  getCoordinationColor(coordination: TeamCoordination): string {
    const colors: Record<TeamCoordination, string> = {
      excellent: 'green',
      good: 'blue',
      average: 'gold',
      poor: 'red'
    };
    return colors[coordination];
  }
}
