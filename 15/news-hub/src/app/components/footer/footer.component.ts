import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/news.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: Category[] = [];
  currentYear: number = new Date().getFullYear();

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
}
