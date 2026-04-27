import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LinkService } from '../../services/link.service';
import { RetroLink, LinkCategory } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    FormsModule
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent implements OnInit {
  allLinks: RetroLink[] = [];
  filteredLinks: RetroLink[] = [];
  categories: { category: LinkCategory; label: string; count: number }[] = [];
  
  searchQuery = '';
  selectedCategory: LinkCategory | 'all' = 'all';
  sortBy: 'visits' | 'title' | 'year' = 'visits';
  
  categoryOptions: { label: string; value: LinkCategory | 'all' }[] = [
    { label: 'All Categories', value: 'all' }
  ];
  
  sortOptions = [
    { label: 'Most Visits', value: 'visits' },
    { label: 'Title (A-Z)', value: 'title' },
    { label: 'Newest First', value: 'year' }
  ];

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.linkService.getAllLinks().subscribe(links => {
      this.allLinks = links;
      this.filteredLinks = [...links];
    });

    this.linkService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categoryOptions = [
        { label: 'All Categories', value: 'all' },
        ...categories.map(cat => ({ label: cat.label, value: cat.category }))
      ];
    });

    // 检查URL查询参数
    this.route.queryParams.subscribe(params => {
      const categoryParam = params['category'] as LinkCategory;
      if (categoryParam && this.isValidCategory(categoryParam)) {
        this.selectedCategory = categoryParam;
        this.filterLinks();
      }
    });
  }

  isValidCategory(cat: string): cat is LinkCategory {
    return ['games', 'music', 'art', 'tech', 'social', 'humor', 'personal', 'forum'].includes(cat);
  }

  filterLinks(): void {
    let result = [...this.allLinks];

    // 按分类过滤
    if (this.selectedCategory !== 'all') {
      result = result.filter(link => link.category === this.selectedCategory);
    }

    // 按搜索词过滤
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(link => 
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query)
      );
    }

    // 排序
    result = this.sortLinks(result);

    this.filteredLinks = result;
  }

  sortLinks(links: RetroLink[]): RetroLink[] {
    switch (this.sortBy) {
      case 'visits':
        return [...links].sort((a, b) => b.visits - a.visits);
      case 'title':
        return [...links].sort((a, b) => a.title.localeCompare(b.title));
      case 'year':
        return [...links].sort((a, b) => b.createdYear - a.createdYear);
      default:
        return links;
    }
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

  getCategoryLabel(category: LinkCategory): string {
    const cat = this.categories.find(c => c.category === category);
    return cat ? cat.label : category;
  }

  getCategoryColor(category: LinkCategory): string {
    const colors: Record<LinkCategory, string> = {
      games: 'bg-retro-green',
      music: 'bg-retro-magenta',
      art: 'bg-retro-cyan',
      tech: 'bg-retro-yellow',
      social: 'bg-retro-blue',
      humor: 'bg-retro-red',
      personal: 'bg-retro-gray',
      forum: 'bg-retro-orange'
    };
    return colors[category] || 'bg-retro-gray';
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.sortBy = 'visits';
    this.filterLinks();
  }
}
