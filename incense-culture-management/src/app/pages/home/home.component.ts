import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-home',
  imports: [CardModule, ButtonModule, RouterLink, TagModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  features = [
    {
      title: '香品档案',
      description: '管理沉香、檀香等各类香料的品质和产地信息，建立完整的香品资料库',
      icon: '🌿',
      color: 'bg-incense-brown',
      route: '/incense-archive'
    },
    {
      title: '品香记录',
      description: '记录香道仪式和品香体验感受，追踪每一次品香的细节与心得',
      icon: '📖',
      color: 'bg-incense-gold',
      route: '/incense-record'
    }
  ];

  quickStats = [
    { label: '香品总数', value: 0, icon: '🌿' },
    { label: '品香次数', value: 0, icon: '📖' },
    { label: '收藏香料', value: 0, icon: '⭐' },
    { label: '常用仪式', value: 0, icon: '🕯️' }
  ];
}
