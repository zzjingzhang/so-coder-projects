import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle, Category } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-article',
  standalone: false,
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: NewsArticle | undefined;
  relatedArticles: NewsArticle[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const articleId = parseInt(params['id'], 10);
      this.loadArticleData(articleId);
    });
  }

  private loadArticleData(articleId: number): void {
    this.isLoading = true;
    
    this.newsService.getArticleById(articleId).subscribe(article => {
      this.article = article;
      
      if (article) {
        this.newsService.getArticlesByCategory(article.category).subscribe(articles => {
          this.relatedArticles = articles.filter(a => a.id !== articleId).slice(0, 3);
        });
      }
      
      this.isLoading = false;
    });
  }

  getCategoryName(categoryId: string): string {
    const categories: { [key: string]: string } = {
      'politics': '政治',
      'technology': '科技',
      'business': '商业',
      'sports': '体育',
      'health': '健康',
      'entertainment': '娱乐'
    };
    return categories[categoryId] || categoryId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
