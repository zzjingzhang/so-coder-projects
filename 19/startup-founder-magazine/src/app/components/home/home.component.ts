import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface MagazineIssue {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isScrolled = false;
  currentSlide = 0;

  features: Feature[] = [
    {
      icon: 'trending_up',
      title: '行业洞察',
      description: '深度分析创业趋势，把握市场脉搏',
      color: '#FF6B35'
    },
    {
      icon: 'people',
      title: '创始人故事',
      description: '聆听成功创业者的经验与智慧',
      color: '#4361EE'
    },
    {
      icon: 'menu_book',
      title: '资源指南',
      description: '实用工具与资源，助力创业旅程',
      color: '#F72585'
    },
    {
      icon: 'psychology',
      title: '思维模式',
      description: '培养企业家思维，突破认知边界',
      color: '#1D3557'
    }
  ];

  magazineIssues: MagazineIssue[] = [
    {
      id: 1,
      title: '从0到1的创业指南',
      date: '2026年4月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20startup%20magazine%20cover%20with%20clean%20white%20background%20and%20orange%20accent%20colors%20showing%20entrepreneur%20working&image_size=square_hd',
      excerpt: '详解创业初期的关键步骤，从想法验证到产品发布'
    },
    {
      id: 2,
      title: '融资策略全解析',
      date: '2026年3月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=business%20financing%20magazine%20cover%20with%20blue%20and%20white%20color%20scheme%20showing%20investment%20charts&image_size=square_hd',
      excerpt: '天使轮、A轮、B轮...各阶段融资策略深度解析'
    },
    {
      id: 3,
      title: '团队建设之道',
      date: '2026年2月',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=team%20building%20magazine%20cover%20with%20pink%20and%20white%20colors%20showing%20diverse%20team%20collaboration&image_size=square_hd',
      excerpt: '如何打造高效创业团队，吸引和留住优秀人才'
    }
  ];

  heroSlides = [
    {
      title: '激发创业灵感',
      subtitle: '每月精选最具价值的创业内容',
      ctaText: '立即探索'
    },
    {
      title: '连接创业社区',
      subtitle: '与志同道合的创始人共同成长',
      ctaText: '加入社区'
    },
    {
      title: '加速创业成功',
      subtitle: '实用工具和资源助你少走弯路',
      ctaText: '获取资源'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  startAutoSlide() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
