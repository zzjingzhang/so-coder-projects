export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  imageUrl: string;
  tags: string[];
  readTime: number;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}
