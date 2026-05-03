export interface Author {
  id: string;
  avatar: string;
  nickname: string;
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  content: string;
  mediaType: 'image' | 'video' | 'none';
  mediaUrl: string;
  category: string;
  shareCount: number;
  commentCount: number;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}
