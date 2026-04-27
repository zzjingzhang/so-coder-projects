import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkService } from '../../services/link.service';
import { RetroLink, LinkCategory } from '../../types';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, ButtonModule, CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredLinks: RetroLink[] = [];
  popularLinks: RetroLink[] = [];
  categories: { category: LinkCategory; label: string; count: number }[] = [];
  
  currentTime = new Date();
  hitCount = 42069;
  onlineVisitors = Math.floor(Math.random() * 20) + 5;

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.linkService.getFeaturedLinks().subscribe(links => {
      this.featuredLinks = links;
    });

    this.linkService.getPopularLinks(5).subscribe(links => {
      this.popularLinks = links;
    });

    this.linkService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    // 模拟时间更新
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  getCategoryIcon(category: LinkCategory): string {
    const icons: Record<LinkCategory, string> = {
      games: '🎮',
      music: '🎵',
      art: '🎨',
      tech: '💻',
      social: '👥',
      humor: '😂',
      personal: '🏠',
      forum: '💬'
    };
    return icons[category] || '🔗';
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}
