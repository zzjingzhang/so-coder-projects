import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
  role: string;
  stats: {
    wins: number;
    losses: number;
    winRate: number;
    kda: string;
  };
  social: {
    twitch?: string;
    twitter?: string;
  };
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  founded: string;
  region: string;
  totalWins: number;
  totalLosses: number;
  championships: number;
  members: TeamMember[];
  isExpanded: boolean;
  colors: {
    primary: string;
    secondary: string;
  };
}

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.html',
  styleUrl: './team-profile.css',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('rotateIcon', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  standalone: false
})
export class TeamProfile implements OnInit {
  teams: Team[] = [
    {
      id: 1,
      name: '龙之队',
      logo: '🐉',
      tagline: '烈焰燃烧，永不言败',
      description: '龙之队成立于2018年，是中国最具影响力的电竞战队之一。以其激进的战术风格和出色的团队协作而闻名，曾多次获得国内外重大赛事的冠军。队伍的核心理念是"永不言败"，无论是在训练还是比赛中，队员们都展现出极高的竞技精神和团队凝聚力。',
      founded: '2018',
      region: '中国',
      totalWins: 156,
      totalLosses: 42,
      championships: 8,
      members: [
        {
          id: 1,
          name: '张伟',
          avatar: '🎮',
          role: '队长 / 中单',
          stats: { wins: 128, losses: 35, winRate: 78, kda: '4.2' },
          social: { twitch: 'zhangwei_live', twitter: 'zhangwei_gaming' }
        },
        {
          id: 2,
          name: '刘洋',
          avatar: '🔥',
          role: '上单',
          stats: { wins: 120, losses: 38, winRate: 76, kda: '3.8' },
          social: { twitch: 'liuyang_top' }
        },
        {
          id: 3,
          name: '陈明',
          avatar: '⚡',
          role: '打野',
          stats: { wins: 115, losses: 40, winRate: 74, kda: '3.5' },
          social: { twitter: 'chenming_jungle' }
        },
        {
          id: 4,
          name: '赵阳',
          avatar: '💫',
          role: '辅助',
          stats: { wins: 130, losses: 32, winRate: 80, kda: '4.5' },
          social: {}
        }
      ],
      isExpanded: false,
      colors: { primary: '#ef4444', secondary: '#f97316' }
    },
    {
      id: 2,
      name: '闪电战队',
      logo: '⚡',
      tagline: '速度与激情',
      description: '闪电战队以其快节奏的战术风格著称，擅长在比赛初期建立优势并迅速终结比赛。队伍成立于2019年，由一群热爱电竞的年轻选手组成。他们的打法充满激情，常常给观众带来精彩绝伦的比赛体验。',
      founded: '2019',
      region: '韩国',
      totalWins: 142,
      totalLosses: 48,
      championships: 6,
      members: [
        {
          id: 1,
          name: '李娜',
          avatar: '🎯',
          role: '队长 / ADC',
          stats: { wins: 118, losses: 38, winRate: 76, kda: '4.8' },
          social: { twitch: 'lina_adc', twitter: 'lina_gaming' }
        },
        {
          id: 2,
          name: '杨磊',
          avatar: '🌙',
          role: '中单',
          stats: { wins: 110, losses: 42, winRate: 72, kda: '3.6' },
          social: { twitch: 'yanglei_mid' }
        },
        {
          id: 3,
          name: '王芳',
          avatar: '🌸',
          role: '辅助',
          stats: { wins: 125, losses: 35, winRate: 78, kda: '4.2' },
          social: { twitter: 'wangfang_support' }
        },
        {
          id: 4,
          name: '刘强',
          avatar: '💪',
          role: '上单',
          stats: { wins: 108, losses: 44, winRate: 71, kda: '3.2' },
          social: {}
        }
      ],
      isExpanded: false,
      colors: { primary: '#3b82f6', secondary: '#06b6d4' }
    },
    {
      id: 3,
      name: '暗影猎人',
      logo: '🌙',
      tagline: '在黑暗中寻找胜利',
      description: '暗影猎人是一支来自欧洲的神秘战队，以其稳健的后期运营和出色的团战配合而闻名。他们擅长在逆境中寻找机会，往往能在看似不可能的情况下逆转战局。队伍的战术风格冷静而致命，如同暗夜中的猎手。',
      founded: '2017',
      region: '欧洲',
      totalWins: 138,
      totalLosses: 52,
      championships: 5,
      members: [
        {
          id: 1,
          name: '王强',
          avatar: '⚔️',
          role: '队长 / 打野',
          stats: { wins: 115, losses: 42, winRate: 73, kda: '3.9' },
          social: { twitch: 'wangqiang_jungle', twitter: 'wangqiang_esports' }
        },
        {
          id: 2,
          name: '赵敏',
          avatar: '⭐',
          role: '中单',
          stats: { wins: 120, losses: 38, winRate: 76, kda: '4.1' },
          social: { twitch: 'zhaomin_mid' }
        },
        {
          id: 3,
          name: '周杰',
          avatar: '🎭',
          role: 'ADC',
          stats: { wins: 105, losses: 45, winRate: 70, kda: '3.7' },
          social: { twitter: 'zhoujie_adc' }
        },
        {
          id: 4,
          name: '吴鹏',
          avatar: '🛡️',
          role: '辅助',
          stats: { wins: 118, losses: 40, winRate: 75, kda: '4.0' },
          social: {}
        }
      ],
      isExpanded: false,
      colors: { primary: '#8b5cf6', secondary: '#a855f7' }
    },
    {
      id: 4,
      name: '极光战队',
      logo: '💎',
      tagline: '闪耀赛场，创造奇迹',
      description: '极光战队是北美赛区的新锐力量，成立于2020年。虽然队伍年轻，但他们展现出的潜力令人瞩目。队员们技术精湛，配合默契，善于创新战术。他们就像极光一样，在赛场上闪耀着独特的光芒，不断创造奇迹。',
      founded: '2020',
      region: '北美',
      totalWins: 98,
      totalLosses: 56,
      championships: 3,
      members: [
        {
          id: 1,
          name: '陈静',
          avatar: '💎',
          role: '队长 / 辅助',
          stats: { wins: 85, losses: 42, winRate: 67, kda: '4.3' },
          social: { twitch: 'chenjing_support', twitter: 'chenjing_gaming' }
        },
        {
          id: 2,
          name: '黄涛',
          avatar: '🚀',
          role: '打野',
          stats: { wins: 88, losses: 40, winRate: 69, kda: '3.6' },
          social: { twitch: 'huangtao_jungle' }
        },
        {
          id: 3,
          name: '林达',
          avatar: '🌊',
          role: '上单',
          stats: { wins: 82, losses: 44, winRate: 65, kda: '3.4' },
          social: { twitter: 'linda_top' }
        },
        {
          id: 4,
          name: '郑天',
          avatar: '🌟',
          role: 'ADC',
          stats: { wins: 90, losses: 38, winRate: 70, kda: '4.0' },
          social: {}
        }
      ],
      isExpanded: false,
      colors: { primary: '#10b981', secondary: '#06b6d4' }
    }
  ];

  ngOnInit(): void {}

  toggleTeam(team: Team): void {
    team.isExpanded = !team.isExpanded;
  }

  getWinRate(wins: number, losses: number): number {
    const total = wins + losses;
    return total > 0 ? Math.round((wins / total) * 100) : 0;
  }

  getRoleIcon(role: string): string {
    if (role.includes('中单')) return '🔮';
    if (role.includes('上单')) return '🛡️';
    if (role.includes('打野')) return '🌲';
    if (role.includes('ADC')) return '🏹';
    if (role.includes('辅助')) return '💚';
    return '👤';
  }

  expandAll(): void {
    this.teams.forEach(team => team.isExpanded = true);
  }

  collapseAll(): void {
    this.teams.forEach(team => team.isExpanded = false);
  }
}
