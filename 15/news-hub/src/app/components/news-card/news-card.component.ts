import { Component, Input } from '@angular/core';
import { NewsArticle, Category } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  standalone: false,
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent {
  @Input() article!: NewsArticle;
  @Input() variant: 'default' | 'horizontal' | 'featured' = 'default';

  constructor(private newsService: NewsService) { }

  getCategoryName(categoryId: string): string {
    const categories = {
      'politics': '政治',
      'technology': '科技',
      'business': '商业',
      'sports': '体育',
      'health': '健康',
      'entertainment': '娱乐'
    };
    return categories[categoryId as keyof typeof categories] || categoryId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
