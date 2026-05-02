import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsArticle, Category } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category | undefined;
  articles: NewsArticle[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      this.loadCategoryData(categoryId);
    });
  }

  private loadCategoryData(categoryId: string): void {
    this.isLoading = true;
    
    this.newsService.getCategoryById(categoryId).subscribe(category => {
      this.category = category;
    });

    this.newsService.getArticlesByCategory(categoryId).subscribe(articles => {
      this.articles = articles;
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
}
