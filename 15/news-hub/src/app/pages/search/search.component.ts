import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsArticle } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  articles: NewsArticle[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      this.searchQuery = query;
      if (query) {
        this.searchArticles(query);
      } else {
        this.isLoading = false;
        this.articles = [];
      }
    });
  }

  private searchArticles(query: string): void {
    this.isLoading = true;
    this.newsService.searchArticles(query).subscribe(articles => {
      this.articles = articles;
      this.isLoading = false;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
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
