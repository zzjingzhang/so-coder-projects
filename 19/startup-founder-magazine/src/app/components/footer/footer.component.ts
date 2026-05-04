import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = {
    about: [
      { label: '关于我们', path: '#' },
      { label: '团队介绍', path: '#' },
      { label: '联系我们', path: '#' },
      { label: '加入我们', path: '#' }
    ],
    resources: [
      { label: '成功故事', path: '/success-stories' },
      { label: '资源指南', path: '/resource-guide' },
      { label: '博客文章', path: '#' },
      { label: '播客节目', path: '#' }
    ],
    support: [
      { label: '帮助中心', path: '#' },
      { label: '常见问题', path: '#' },
      { label: '隐私政策', path: '#' },
      { label: '服务条款', path: '#' }
    ]
  };

  socialLinks = [
    { icon: 'facebook', label: 'Facebook', url: '#' },
    { icon: 'twitter', label: 'Twitter', url: '#' },
    { icon: 'linkedin', label: 'LinkedIn', url: '#' },
    { icon: 'instagram', label: 'Instagram', url: '#' }
  ];

  constructor() { }
}
