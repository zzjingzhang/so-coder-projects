import { Component, OnInit } from '@angular/core';
import { NewsArticle, Category } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredArticles: NewsArticle[] = [];
  latestArticles: NewsArticle[] = [];
  categories: Category[] = [];
  isLoading: boolean = true;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.newsService.getFeaturedArticles().subscribe(articles => {
      this.featuredArticles = articles;
    });

    this.newsService.getLatestArticles(6).subscribe(articles => {
      this.latestArticles = articles;
    });

    this.newsService.getCategories().subscribe(categories => {
      this.categories = categories;
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
